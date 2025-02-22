import express from "express";
const router = express.Router();
import { body, query } from "express-validator";
import registerRider, {
  loginRider,
  logout,
  riderProfile,
  captainRideDetailsUpdation,
} from "../controller/rider.controller.js";
import riderAuth from "../middlewares/auth.js";

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

router.post("/logout", riderAuth, logout);

router.get("/profile", riderAuth, riderProfile);
router.post(
  "/captain-ride-details-updation",
  riderAuth,
  [
    query("rideId").isMongoId().withMessage("provide a valid id"),
    query("captainId").isMongoId().withMessage("provide a valid id"),
  ],
  captainRideDetailsUpdation
);

export default router;
