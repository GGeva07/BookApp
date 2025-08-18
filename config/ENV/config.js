import { projectRoute } from "../../utils/path.js";
import path from "path";
import dotenv from "dotenv";

const envPath = path.join(
  projectRoute,
  `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`
);

dotenv.config({ path: envPath });
