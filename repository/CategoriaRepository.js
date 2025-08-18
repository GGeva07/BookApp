import BaseRepository from "./BaseRepository.js";
import context from "../config/context/context.js";

class CategoriaRepository extends BaseRepository {
  constructor() {
    super(context.Categoria);
  }

  async findAll(options = {}) {
    const categorias = await super.findAll(options);
    return categorias.map((categor) => categor.get({ plain: true }));
  }

  async findAllBooks() {
    const categories = await this.model.findAll();
    const categoriaLibro = await Promise.all(
      categories.map(async (categoria) => {
        const categoriaLib = await context.Libro.count({
          where: { idCategoria: categoria.id },
        });

        const cat = categoria.get({ plain: true });
        return {
          ...cat,
          categoriaLib,
        };
      })
    );

    return categoriaLibro;
  }
}

export default new CategoriaRepository();
