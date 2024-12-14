import riderModel from "../models/rider.models.js";
import createRider, {
  createBlackListTokens,
} from "../services/rider.service.js";
import { validationResult } from "express-validator";

export default async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract fields
  const { fullname, email, password } = req.body;

  const userAlreadyExists = await riderModel.findOne({ email: email });
  console.log(userAlreadyExists);
  if (userAlreadyExists) {
    return res.status(400).json({ errors: "User already exists" });
  }

  try {
    // Create the rider
    const rider = await createRider({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password,
    });

    // Generate token
    const token = rider.generateToken();

    res.status(201).json({ rider, token });
  } catch (error) {
    console.error("Error registering rider:", error);
    res.status(500).json({ error: "Failed to register rider" });
  }
};

export const loginRider = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const rider = await riderModel.findOne({ email: email }).select("+password");

  if (!rider) {
    return res.status(401).json({ errors: "invalid email or password" });
  }
  //   console.log(await bcrypt.compare(password, user.password), user.password);
  const isMatch = await rider.comparePassword(password);
  console.log(isMatch);
  if (!isMatch) {
    return res.status(401).json({ errors: "invalid email or password" });
  }

  const token = await rider.generateToken();
  res.cookie("token", token);

  res.status(200).json({ message: "Rider login successful" });
};

export const riderProfile = (req, res, next) => {
  res.status(200).json({ message: "rider profile display" });
};

export const logout = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await createBlackListTokens({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "rider logout successful" });
};
