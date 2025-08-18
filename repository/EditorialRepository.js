import BaseRepository from "./BaseRepository.js";
import context from "../config/context/context.js";

class EditorialRepository extends BaseRepository {
  constructor() {
    super(context.Editorial);
  }

  async findAll(options = {}) {
    const editoriales = await super.findAll(options);
    return editoriales.map((editorial) => editorial.get({ plain: true }));
  }

  async findAllBooks() {
    const Editoriales = await this.model.findAll();

    const EditorialLibro = await Promise.all(
      Editoriales.map(async (editorial) => {
        const libro = await context.Libro.count({
          where: { idEditorial: editorial.id },
        });

        const edit = editorial.get({ plain: true });
        return {
          ...edit,
          libro,
        };
      })
    );

    return EditorialLibro;
  }
}

export default new EditorialRepository();
