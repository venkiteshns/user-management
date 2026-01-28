import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import route from "./routes/index.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*------------- Views -------------- */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/*------------- Middle wares -------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/*-------------Static Files-------------- */
app.use(express.static(path.join(__dirname, "public")));

/*------------- Routes ------------- */
app.use("/", route);

/*------------- error handler middleware -------------- */
app.use((err, req, res, next) => {
  const message = err.message;
  console.log("middleware for error :", err.message);
  res.status(500).json({ message });
});

export default app;
