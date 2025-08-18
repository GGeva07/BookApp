import AutorRepo from "../repository/AutorRepository.js";
import HandAsync from "../utils/handlerAsync.js";
import { HandError } from "../utils/errorHandler.js";

export const index = HandAsync(async (req, res) => {
  const autor = await AutorRepo.findAutorLibros();

  res.render("autor/index", {
    hasAutores: autor.length,
    autor,
    title: "Autores Home",
  });
});

export const createForm = HandAsync(async (req, res) => {
  res.render("autor/create", {
    title: "Crear nuevo autor",
  });
});

export const create = HandAsync(async (req, res) => {
  const { Nombre, Email } = req.body;

  if (!Nombre || !Email) HandError("No se permiten campos vacios", 400);

  const nuevo = await AutorRepo.create({ Nombre, Email });

  if (!nuevo) HandError("Error al crear el autor", 500);

  res.redirect("/autor/index");
});

export const updateForm = HandAsync(async (req, res) => {
  const { id } = req.params;
  const data = await AutorRepo.findById(id);

  const autor = data.dataValues;

  if (!autor) HandError("Autor no encontrado", 404);

  res.render("autor/create", {
    isEditing: true,
    autor,
    title: `Editar autor - ${autor.Nombre}`,
  });
});

export const update = HandAsync(async (req, res) => {
  const { id } = req.params;
  const { Nombre, Email } = req.body;

  if (!Nombre || !Email) HandError("Faltan campos obligatorios", 400);

  const editado = await AutorRepo.update(id, { Nombre, Email });

  if (!editado) HandError("Error al actualizar el autor", 500);

  res.redirect("/autor/index");
});

export const deleteA = HandAsync(async (req, res) => {
  const { id } = req.params;

  const data = await AutorRepo.findById(id);

  const autor = data.dataValues;

  if (!autor) HandError("Autor no encontrado", 404);

  const eliminado = await AutorRepo.delete(autor.id);
  if (!eliminado) HandError("Error al eliminar el autor", 500);

  res.redirect("/autor/index");
});
