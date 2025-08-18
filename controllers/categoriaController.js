import CategoriaRepo from "../repository/CategoriaRepository.js";
import HandAsync from "../utils/handlerAsync.js";
import { HandError } from "../utils/errorHandler.js";

export const index = HandAsync(async (req, res) => {
  const categorias = await CategoriaRepo.findAllBooks();

  res.render("categoria/index", {
    categorias,
    hasCategorias: categorias.length,
    title: "Categoria Home",
  });
});

export const createForm = HandAsync(async (req, res) => {
  res.render("categoria/create", {
    title: "Crear una nueva categoria",
  });
});

export const create = HandAsync(async (req, res) => {
  const { Nombre, Descripcion } = req.body;

  if (!Nombre || !Descripcion) HandError("No se permiten campos vacios", 400);

  const nueva = await CategoriaRepo.create({ Nombre, Descripcion });

  if (!nueva) HandError("Error al crear l categoria", 500);

  res.redirect("/categoria/index");
});

export const updateForm = HandAsync(async (req, res) => {
  const { id } = req.params;

  const data = await CategoriaRepo.findById(id);
  const categoria = data.dataValues;

  if (!categoria) HandError("Categoria no encontrada", 404);

  res.render("categoria/create", {
    isEditing: true,
    categoria,
    title: `Editar categoria - ${categoria.Nombre}`,
  });
});

export const update = HandAsync(async (req, res) => {
  const { id } = req.params;

  const { Nombre, Descripcion } = req.body;

  if (!Nombre || !Descripcion) HandError("Faltan campos obligatorios", 400);

  const editada = await CategoriaRepo.update(id, { Nombre, Descripcion });

  if (!editada) HandError("Error al actualizar la categoria", 500);

  res.redirect("/categoria/index");
});

export const deleteA = HandAsync(async (req, res) => {
  const { id } = req.params;

  const data = await CategoriaRepo.findById(id);

  const categoria = data.dataValues;

  if (!categoria) HandError("Categoria no encontrada", 404);

  const eliminada = await CategoriaRepo.delete(categoria.id);

  if (!eliminada) HandError("Error al eliminar la categoria", 500);
  res.redirect("/categoria/index");
});
