import express from "express";
import { query } from "express-validator";
import riderAuth from "../middlewares/auth.js";
import mapController, {
  getDistanceTimeFunc,
  getSuggestionsFunc,
} from "../controller/maps.controller.js";
const route = express.Router();

route.get(
  "/get-coordinate",
  [query("address").isString().isLength({ min: 3 })],
  riderAuth,
  mapController
);

route.get(
  "/get-distance-time",
  [
    query("origin").isString().isLength({ min: 3 }),
    query("destination").isString().isLength({ min: 3 }),
  ],
  riderAuth,
  getDistanceTimeFunc
);

route.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 3 }),
  riderAuth,
  getSuggestionsFunc
);

export default route;
