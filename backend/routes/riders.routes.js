import express from "express";
const router = express.Router();
import { body } from "express-validator";
import registerRider, {
  loginRider,
  logout,
  profileUpdateController,
  riderProfile,
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
router.put(
  "/profile/update",
  riderAuth,
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
  ],
  profileUpdateController
);
export default router;
