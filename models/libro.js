import connection from "../config/connection/connection.js";

import { DataTypes } from "sequelize";

const Libro = connection.define(
  "Libro",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    Titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CoverImg: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Anio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    idCategoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categoria",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    idAutor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "autor",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    idEditorial: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "editorial",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  { tableName: "Libro" }
);

export default Libro;
