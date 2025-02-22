import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { captainAuth } from "../middlewares/auth.js";
import registerCaptain, {
  loginCaptain,
  captainProfile,
  logout,
} from "../controller/captain.controller.js";

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
    body("vehicleInfo.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),
    body("vehicleInfo.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters long"),
    body("vehicleInfo.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vehicleInfo.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicleInfo type"),
  ],
  registerCaptain
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  loginCaptain
);

router.get("/profile", captainAuth, captainProfile);
router.post("/logout", captainAuth, logout);

export default router;
