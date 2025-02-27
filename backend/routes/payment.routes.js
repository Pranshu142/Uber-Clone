import express from "express";
import { query } from "express-validator";
const router = express.Router();
import initiatePayment, {
  paymentStatusUpdate,
} from "../controller/payment.controller.js";
import riderAuth, { captainAuth } from "../middlewares/auth.js";

router.get(
  "/generate-upi-link",
  riderAuth,
  query("rideId").isMongoId().withMessage("provide a valid id"),
  initiatePayment
);
router.post(
  "/payment-status-update",
  captainAuth,
  query("rideId").isMongoId().withMessage("provide a valid id"),
  paymentStatusUpdate
);

export default router;
