import connection from "../config/connection/connection.js";

import { DataTypes } from "sequelize";

const Autor = connection.define(
  "Autor",
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

    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Autor",
  }
);

export default Autor;
