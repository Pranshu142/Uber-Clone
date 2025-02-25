import express from "express";
import { query } from "express-validator";
const router = express.Router();
import initiatePayment from "../controller/payment.controller.js";
import riderAuth from "../middlewares/auth.js";

router.get(
  "/generate-upi-link",
  riderAuth,
  query("rideId").isMongoId().withMessage("provide a valid id"),
  initiatePayment
);

export default router;
