import context from "../config/context/context.js";
import HandError from "../utils/errorHandler.js";
import HandAsync from "../utils/handlerAsync.js";

import AutorRepo from "../repository/AutorRepository.js";
import CategoriaRepo from "../repository/CategoriaRepository.js";
import editorialRepo from "../repository/EditorialRepository.js";
import BookRepo from "../repository/LibroRepository.js";

export const index = HandAsync(async (req, res) => {
  const libros = await BookRepo.findAll();
  const categorias = await CategoriaRepo.findAll();

  res.render("home/home", {
    hasCategorias: categorias.length,
    hasLibros: libros.length,
    libros,
    categorias,
    title: "Home",
  });
});

export const buscar = HandAsync(async (req, res) => {
  try {
    const { Titulo, Categoria } = req.body;

    let libros = [];

    if (
      Titulo &&
      Titulo.trim() !== "" &&
      Categoria &&
      Categoria !== "" &&
      Categoria !== "0"
    ) {
      const librosTitulo = await BookRepo.findByTitulo(Titulo.trim());

      if (Array.isArray(Categoria)) {
        const categoriaIds = Categoria.filter(
          (cat) => cat !== "" && cat !== "0"
        );
        libros = librosTitulo.filter((libro) =>
          categoriaIds.includes(libro.idCategoria.toString())
        );
      } else {
        libros = librosTitulo.filter(
          (libro) => libro.idCategoria.toString() === Categoria
        );
      }
    } else if (Titulo && Titulo.trim() !== "") {
      libros = await BookRepo.findByTitulo(Titulo.trim());
    } else if (Categoria && Categoria !== "" && Categoria !== "0") {
      if (Array.isArray(Categoria)) {
        const categoriaIds = Categoria.filter(
          (cat) => cat !== "" && cat !== "0"
        );
        libros = await BookRepo.findByCategories(categoriaIds);
      } else {
        libros = await BookRepo.findByCategories([Categoria]);
      }
    } else {
      libros = await BookRepo.findAll();
    }

    const categorias = await CategoriaRepo.findAll();

    let categoriaSeleccionada = null;
    let categoriasSeleccionadas = [];

    if (Categoria && Categoria !== "" && Categoria !== "0") {
      if (Array.isArray(Categoria)) {
        const categoriaIds = Categoria.filter(
          (cat) => cat !== "" && cat !== "0"
        );
        categoriasSeleccionadas = categorias.filter((cat) =>
          categoriaIds.includes(cat.id.toString())
        );
      } else {
        categoriaSeleccionada = categorias.find(
          (cat) => cat.id.toString() === Categoria
        );
      }
    }

    res.render("home/home", {
      Busqueda: true,
      libros,
      categorias,
      hasCategorias: categorias.length > 0,
      hasLibros: libros.length > 0,
      SCategoria: categoriaSeleccionada,
      SCategorias: categoriasSeleccionadas,
      BTitulo: Titulo || "",
      "page-title": "Búsqueda",
    });
  } catch (error) {
    console.error("Error al buscar libros:", error);
    next(error);
  }
});
