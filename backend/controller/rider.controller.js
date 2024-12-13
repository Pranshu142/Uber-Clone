import riderModel from "../models/rider.models.js";
import createRider from "../services/rider.service.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

export default async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract fields
  const { fullname, email, password } = req.body;

  const userAlreadyExists = riderModel.findOne({ email: email });
  if (!userAlreadyExists) {
    return res.status(400).json({ errors: "User already exists" });
  }

  try {
    // Hash the password
    // const hashPassword = await riderModel.hashPassword(password);

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
  const user = await riderModel.findOne({ email: email }).select("+password");
  console.log(user);
  if (!user) {
    return res.status(401).json({ errors: "invalid email or password" });
  }
  console.log(await bcrypt.compare(password, user.password), user.password);
  const isMatch = await user.comparePassword(password);
  console.log(isMatch);
  if (!isMatch) {
    return res.status(401).json({ errors: "invalid email or password" });
  }

  const token = await user.generateToken();
  res.cookie("token", token);

  res.status(200).json({ message: "Rider login successful" });
};

export const riderProfile = (req, res, next) => {};
