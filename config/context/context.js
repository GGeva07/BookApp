import connection from "../connection/connection.js";

import Libro from "../../models/libro.js";
import Categoria from "../../models/categoria.js";
import Autor from "../../models/autor.js";
import Editorial from "../../models/editorial.js";
Categoria.hasMany(Libro, {
  foreignKey: "idCategoria",
  as: "Libros",
});
Libro.belongsTo(Categoria, {
  foreignKey: "idCategoria",
  as: "Categoria",
});

Autor.hasMany(Libro, {
  foreignKey: "idAutor",
  as: "Libros",
});
Libro.belongsTo(Autor, {
  foreignKey: "idAutor",
  as: "Autor",
});

Editorial.hasMany(Libro, {
  foreignKey: "idEditorial",
  as: "Libros",
});
Libro.belongsTo(Editorial, {
  foreignKey: "idEditorial",
  as: "Editorial",
});

export default { Sequelize: connection, Autor, Libro, Categoria, Editorial };
