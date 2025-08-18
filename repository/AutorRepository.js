import BaseRepository from "./BaseRepository.js";
import context from "../config/context/context.js";

class AutorRepository extends BaseRepository {
  constructor() {
    super(context.Autor);
  }

  async findAll(options = {}) {
    const autores = await super.findAll(options);
    return autores.map((autor) => autor.get({ plain: true }));
  }

  async findAutorLibros() {
    const autores = await this.model.findAll();

    const autoresLibros = await Promise.all(
      autores.map(async (autor) => {
        const librosCant = await context.Libro.count({
          where: { idAutor: autor.id },
        });

        const autorEncontrado = autor.get({ plain: true });
        return {
          ...autorEncontrado,
          librosCant,
        };
      })
    );

    return autoresLibros;
  }
}

export default new AutorRepository();
