import express from "express";
const router = express.Router();
import { body, query } from "express-validator";
import { captainAuth } from "../middlewares/auth.js";
import registerCaptain, {
  loginCaptain,
  captainProfile,
  logout,
  captainRideDetailsUpdation,
} from "../controller/captain.controller.js";

/* POST register a new rider */
router.post(
  "/register",
  [
    body("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid email address"),
    body("fullname").custom((val) => {
      if (!val?.firstname || val.firstname.length < 3) {
        throw new Error("First name must be at least 3 characters long");
      }
      if (val?.lastname && typeof val.lastname !== "string") {
        throw new Error("Last name must be a string");
      }
      return true;
    }),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicleInfo").custom((val) => {
      if (!val?.color || val.color.length < 3) {
        throw new Error("Color must be at least 3 characters long");
      }
      if (!val?.plate || val.plate.length < 3) {
        throw new Error("Plate must be at least 3 characters long");
      }
      if (!val?.capacity || val.capacity < 1) {
        throw new Error("Capacity must be at least 1");
      }
      if (!["car", "motorcycle", "auto"].includes(val?.vehicleType)) {
        throw new Error("Invalid vehicle type");
      }
      return true;
    }),
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

router.put(
  "/profile/update",
  captainAuth,
  [
    body("fullname.firstname")
      .isString()
      .trim()
      .optional()
      .withMessage("First name must be a string"),
    body("fullname.lastname")
      .isString()
      .trim()
      .optional()
      .withMessage("Last name must be a string"),
    body("email").isEmail().withMessage("Email must be in correct syntax"),
    body("phone")
      .optional()
      .matches(/^\+?[1-9]\d{1,14}$/)
      .withMessage("Phone must be a valid number"),

    body("age").optional().isDate(),
    body("upiId")
      .isString()
      .trim()
      .optional()
      .withMessage("UpiId must be a string"),

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
  captainProfileDataUpdate
);

router.post("/logout", captainAuth, logout);
router.post(
  "/captain-ride-details-updation",
  captainAuth,
  [
    query("rideId").isMongoId().withMessage("provide a valid id"),
    query("captainId").isMongoId().withMessage("provide a valid id"),
  ],
  captainRideDetailsUpdation
);
export default router;
