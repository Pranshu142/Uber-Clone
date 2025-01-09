import express from "express";
import { query } from "express-validator";
import riderAuth from "../middlewares/auth.js";
import mapController from "../controller/maps.controller.js";
const route = express.Router();

route.get(
  "/get-coordinate",
  [query("address").isString().isLength({ min: 3 })],
  riderAuth,
  mapController
);

export default route;
