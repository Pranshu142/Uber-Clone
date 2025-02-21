import express from "express";
import createRideController, {
  calculateAmount,
  confirmRideRequest,
  rideStartedInfo,
  rideCompletedInfo,
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

router.post(
  "/ride-started",
  captainAuth,
  query("rideId").isMongoId().withMessage("provide a valid id"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("provide a valid otp"),
  rideStartedInfo
);

router.post(
  "/ride-completed",
  captainAuth,
  query("rideId").isMongoId().withMessage("provide a valid id"),
  rideCompletedInfo
);
export default router;
