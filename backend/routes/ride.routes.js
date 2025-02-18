import express from "express";
import createRideController, {
  calculateAmount,
  confirmRideRequest,
} from "../controller/ride.controller.js";
import riderAuth, { captainAuth } from "../middlewares/auth.js";
import { body, query } from "express-validator";

const router = express.Router();

router.post(
  "/create-ride",
  riderAuth,
  [
    body("origin").isString().isLength({ min: 3 }),
    body("destination").isString().isLength({ min: 3 }),
    body("vehicleType").isString().isIn(["auto", "moto", "car"]),
  ],
  createRideController
);

router.get(
  "/calculate-fare",
  riderAuth,
  [
    query("origin").isString().isLength({ min: 3 }),
    query("destination").isString().isLength({ min: 3 }),
    query("vehicleType").isString().isIn(["auto", "moto", "car"]),
  ],
  calculateAmount
);

router.post(
  "/confirm-ride",
  captainAuth,
  body("rideId").isMongoId().withMessage("provide a valid id"),
  confirmRideRequest
);
export default router;
