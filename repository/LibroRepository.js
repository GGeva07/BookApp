import BaseRepository from "./BaseRepository.js";
import context from "../config/context/context.js";
import { Op } from "sequelize";

class LibroRepository extends BaseRepository {
  constructor() {
    super(context.Libro);
  }

  async findAll() {
    const libros = await this.model.findAll({
      include: [
        { model: context.Categoria, as: "Categoria" },
        { model: context.Autor, as: "Autor" },
        { model: context.Editorial, as: "Editorial" },
      ],
    });
    return libros.map((libro) => libro.get({ plain: true }));
  }

  async findById(id, { plain = false } = {}) {
    const libro = await this.model.findByPk(id, {
      include: [
        { model: context.Categoria, as: "Categoria" },
        { model: context.Autor, as: "Autor" },
        { model: context.Editorial, as: "Editorial" },
      ],
    });
    if (!libro) return null;
    if (plain) return libro.get({ plain: true });
    return libro;
  }

  async findByTitulo(titulo) {
    const libros = await this.model.findAll({
      where: {
        Titulo: {
          [Op.like]: `%${titulo}%`,
        },
      },
      include: [
        { model: context.Categoria, as: "Categoria" },
        { model: context.Autor, as: "Autor" },
        { model: context.Editorial, as: "Editorial" },
      ],
    });
    return libros.map((libro) => libro.get({ plain: true }));
  }

  async findByCategories(categoryIds) {
    const books = await this.model.findAll({
      where: {
        idCategoria: {
          [Op.in]: categoryIds,
        },
      },
      include: [
        { model: context.Categoria, as: "Categoria" },
        { model: context.Autor, as: "Autor" },
        { model: context.Editorial, as: "Editorial" },
      ],
    });
    return books.map((book) => book.get({ plain: true }));
  }
}

export default new LibroRepository();
