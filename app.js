import "./config/ENV/config.js";
import express from "express";
import { engine } from "express-handlebars";
import path from "path";

//imports propios
import { projectRoute } from "./utils/path.js";
import rutas from "./routes/index.js";
import context from "./config/context/context.js";
import BookCoverImages from "./config/multer/multer.js";
import multer from "multer";

//rutas de paginas
const app = express();

app.engine(
  "hbs",
  engine({
    layoutsDir: path.join(projectRoute, "views", "layouts"),
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(express.static(path.join(projectRoute, "public")));

//routes
app.use(multer({ storage: BookCoverImages }).single("CoverImg"));
app.use(rutas.categoria);
app.use(rutas.editorial);
app.use(rutas.autor);
app.use(rutas.libro);
app.use(rutas.home);

//
app.use((req, res, next) => {
  res.status(404).render("404", { "page.title": "Not found" });
});

await context.Sequelize.sync()
  .then(() => {
    app.listen(process.env.PORT || 3000);

    console.log("Base de datos conectada de manera correcta!");
  })
  .catch((err) => {
    console.log("err :>> ", err);
  });
