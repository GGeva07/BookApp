import mailer from "../services/mailer.js";
import AutorRepo from "../repository/AutorRepository.js";
import CategoriaRepo from "../repository/CategoriaRepository.js";
import editorialRepo from "../repository/EditorialRepository.js";
import BookRepo from "../repository/LibroRepository.js";
import HandError from "../utils/errorHandler.js";
import HandAsync from "../utils/handlerAsync.js";
import fs from "fs";
import path from "path";
import { projectRoute } from "../utils/path.js";
import context from "../config/context/context.js";

export const index = HandAsync(async (req, res) => {
  const libros = await BookRepo.findAll();

  res.render("libro/index", {
    hasLibros: libros.length,
    libros,
    title: "Manejo de libros",
  });
});

export const details = HandAsync(async (req, res) => {
  const { id } = req.params;
  const data = await BookRepo.findById(id);
  const libro = data.get({ plain: true });
  if (!libro) HandError("No se permiten campos vacios", 400);

  console.log("libro :>> ", libro);
  res.render("libro/details", {
    libro,
    title: `Detalle del libro - ${libro.title}`,
  });
});

export const createForm = HandAsync(async (req, res) => {
  const categorias = await CategoriaRepo.findAll();
  const autores = await AutorRepo.findAll();
  const editoriales = await editorialRepo.findAll();

  res.render("libro/create", {
    hasCategorias: categorias.length,
    hasAutores: autores.length,
    hasEditoriales: editoriales.length,
    categorias,
    autores,
    editoriales,
    title: "Crear libro",
  });
});

export const create = HandAsync(async (req, res) => {
  const { Titulo, Anio, idCategoria, idAutor, idEditorial } = req.body;

  if (!Titulo || !Anio || !idCategoria || !idAutor || !idEditorial || !req.file)
    HandError("No se permiten campos vacios", 400);

  const Cover = req.file;
  const CoverPath = "\\" + path.relative("public", Cover.path);

  const nuevo = await BookRepo.create({
    Titulo,
    Anio,
    CoverImg: CoverPath,
    idCategoria: idCategoria,
    idAutor: idAutor,
    idEditorial: idEditorial,
  });

  if (!nuevo) HandError("Error al crear el libro", 500);

  const autor = await AutorRepo.findById(idAutor);

  if (autor && autor.Email) {
    const enviado = await mailer.sendEmail(
      autor.Email,
      "Tu libro ha sido publicado",
      `<h1>Congratulations!</h1><h4>Tu libro "${Titulo}" ha sido publicado en nuestra app</h4>
      <img src="https://i5.walmartimages.com/seo/Avanti-Press-Kitten-Rainbow-Funny-Humorous-Cat-Congratulations-Card_1d585531-d998-40f6-b245-fcfb3e29aca2.87e2f0022e73ba3e4fd26995970c829f.jpeg" alt="gato con arcoiris" width="200px" height="200px">`
    );
    if (!enviado) HandError("Error enviando el Email", 500);
  }

  res.redirect("/libro/index");
});

export const updateForm = HandAsync(async (req, res) => {
  const { id } = req.params;
  const data = await BookRepo.findById(id);

  const libros = data.get({ plain: true });
  if (!libros) HandError("El libro no ha sido encontrado", 400);
  const categorias = await CategoriaRepo.findAll();
  const autores = await AutorRepo.findAll();
  const editoriales = await editorialRepo.findAll();

  res.render("libro/create", {
    hasCategorias: categorias.length,
    hasAutores: autores.length,
    hasEditoriales: editoriales.length,
    isEditing: true,
    libros,
    categorias,
    autores,
    editoriales,
    title: `Editar el libro - ${libros.title}`,
  });
});

export const update = HandAsync(async (req, res) => {
  const { id } = req.params;
  const { Titulo, Anio, idCategoria, idAutor, idEditorial } = req.body;

  const data = await context.Libro.findOne({
    where: { id: id },
  });

  const libro = data.get({ plain: true });
  const Cover = req.file;

  if (!Titulo || !Anio || !idCategoria || !idAutor || !idEditorial)
    HandError("No se permiten campos vacios", 400);

  let CoverPath = null;

  if (Cover === undefined) {
    CoverPath = libro.CoverImg;
  } else {
    CoverPath = "\\" + path.relative("public", Cover.path);
  }

  const editada = await BookRepo.update(id, {
    Titulo,
    Anio,
    CoverImg: CoverPath,
    idCategoria: idCategoria,
    idAutor: idAutor,
    idEditorial: idEditorial,
  });

  if (!editada) HandError("Error al actualizar el libro", 500);

  res.redirect("/libro/index");
});

export const deleteA = HandAsync(async (req, res) => {
  const { id } = req.params;

  const libro = await BookRepo.findById(id);
  if (!libro) HandError("Libro no encontrado", 404);

  if (libro.CoverImg) {
    const Path = path.join(projectRoute, "public", libro.CoverImg);
    if (fs.existsSync(Path)) {
      fs.unlinkSync(Path);
    }
  }
  const eliminado = await BookRepo.delete(libro.id);
  if (!eliminado) HandError("Error al eliminar el Libro", 500);

  res.redirect("/libro/index");
});
