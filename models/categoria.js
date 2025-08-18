import connection from "../config/connection/connection.js";

import { DataTypes } from "sequelize";

const Categoria = connection.define(
  "Categoria",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "Categoria",
  }
);

export default Categoria;
