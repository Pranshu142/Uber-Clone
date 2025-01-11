import express from "express";
import createRideController from "../controller/ride.controller.js";
import riderAuth from "../middlewares/auth.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/create",
  riderAuth,
  [
    body("origin").isString().isLength({ min: 3 }),
    body("destination").isString().isLength({ min: 3 }),
    body("vehicleType").isString().isIn(["auto", "moto", "car"]),
  ],
  createRideController
);

export default router;
