import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectionToDatabase from "./db/db.js";

import createError from "http-errors";
import express, { json, urlencoded, static as expressStatic } from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import logger from "morgan";

// import indexRouter from "./routes/index.js";
import usersRouter from "./routes/riders.routes.js";

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connectionToDatabase();
var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressStatic(join(__dirname, "public")));

// app.use("/", indexRouter);
app.use("/users", usersRouter);

export default app;
