import express from "express";
const router = express.Router();
import { body } from "express-validator";
import riderController from "../controller/rider.controller.js";

/* POST register a new rider */
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("fullname").exists().withMessage("Fullname is required"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  riderController.registerRider
);

export default router;
