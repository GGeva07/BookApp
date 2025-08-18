import connection from "../config/connection/connection.js";

import { DataTypes } from "sequelize";

const Editorial = connection.define(
  "Editorial",
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

    Telefono: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    Pais: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "Editorial" }
);

export default Editorial;
