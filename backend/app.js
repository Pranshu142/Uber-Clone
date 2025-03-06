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
import ridersRouter from "./routes/riders.routes.js";
``;
import captainsRouter from "./routes/captains.routes.js";
import mapRouter from "./routes/maps.routes.js";
import rideRouter from "./routes/ride.routes.js";
import paymentRouter from "./routes/payment.routes.js";

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connectionToDatabase();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressStatic(join(__dirname, "public")));

// app.use("/", indexRouter);
app.use("/riders", ridersRouter);
app.use("/captains", captainsRouter);
app.use("/maps", mapRouter);
app.use("/ride", rideRouter);
app.use("/payments", paymentRouter);
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, _next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

export default app;
