import editorialRepo from "../repository/EditorialRepository.js";
import HandAsync from "../utils/handlerAsync.js";
import { HandError } from "../utils/errorHandler.js";

export const index = HandAsync(async (req, res) => {
  const editorial = await editorialRepo.findAllBooks();

  res.render("editorial/index", {
    hasEditoriales: editorial.length,
    editorial,
    title: "Editorial Home",
  });
});

export const createForm = HandAsync(async (req, res) => {
  res.render("editorial/create", {
    title: "Crear una nueva editorial",
  });
});

export const create = HandAsync(async (req, res) => {
  const { Nombre, Telefono, Pais } = req.body;
  if (!Nombre || !Telefono || !Pais)
    HandError("No se permiten campos vacios", 400);
  const nueva = await editorialRepo.create({ Nombre, Telefono, Pais });
  if (!nueva) HandError("Error al crear la editorial", 500);
  res.redirect("/editorial/index");
});

export const updateForm = HandAsync(async (req, res) => {
  const { id } = req.params;
  const data = await editorialRepo.findById(id);

  const editorial = data.dataValues;

  if (!editorial) HandError("Editorial no encontrada", 404);
  res.render("editorial/create", {
    isEditing: true,
    editorial,
    title: `Editar editorial - ${editorial.Nombre}`,
  });
});

export const update = HandAsync(async (req, res) => {
  const { id } = req.params;
  const { Nombre, Telefono, Pais } = req.body;
  if (!Nombre || !Telefono || !Pais)
    HandError("Faltan campos obligatorios", 400);
  const editada = await editorialRepo.update(id, { Nombre, Telefono, Pais });
  if (!editada) HandError("Error al actualizar la editorial", 500);
  res.redirect("/editorial/index");
});

export const deleteA = HandAsync(async (req, res) => {
  const { id } = req.params;
  const data = await editorialRepo.findById(id);

  const editorial = data.dataValues;

  if (!editorial) HandError("Editorial no encontrada", 404);
  const eliminada = await editorialRepo.delete(editorial.id);
  if (!eliminada) HandError("Error al eliminar la categoria", 500);
  res.redirect("/editorial/index");
});
