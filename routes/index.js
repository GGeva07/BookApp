import CategoriaRoutes from "./categoriaRoute.js";
import EditorialRoutes from "./editorialRoute.js";
import AutorRoutes from "./autorRoute.js";
import libroRoutes from "./libroRoute.js";
import homeRoutes from "./homeRoute.js";
const rutas = {
  home: homeRoutes,
  categoria: CategoriaRoutes,
  editorial: EditorialRoutes,
  autor: AutorRoutes,
  libro: libroRoutes,
};

export default rutas;
