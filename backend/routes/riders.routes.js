import express from "express";
const router = express.Router();
import { body } from "express-validator";
import registerRider, {
  loginRider,
  riderProfile,
} from "../controller/rider.controller.js";
import authRiders from "../middlewares/riderAuth.js";

/* POST register a new rider */
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("fullname.lastname").optional().isString(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerRider
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  loginRider
);

router.get("/profile", authRiders, riderProfile);

export default router;
