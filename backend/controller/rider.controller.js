import riderModel from "../models/rider.models.js";
import createRider, {
  createBlackListTokens,
} from "../services/rider.service.js";
import { validationResult } from "express-validator";
import { captainAcceptedRideDetailsUpdate } from "../services/rider.service.js";
import Socket from "../socket.js";
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
    const token = await rider.generateToken();
    res.cookie("token", token);
    res.status(200).json({ rider, token });
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
    return res.status(401).json({ errors: "Invalid email or password" });
  }

  const isMatch = await rider.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ errors: "Invalid email or password" });
  }

  const token = await rider.generateToken();

  // Set the cookie
  res.cookie("token", token, {
    httpOnly: true,
  });

  console.log(req.cookies.token);

  res.status(200).json({ message: "Rider login successfully", rider, token });
};

export const riderProfile = (req, res, next) => {
  res.status(200).json({ message: "rider profile display", rider: req.rider });
};

export const logout = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Invalid token" });
  }

  await createBlackListTokens({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "rider logout successful" });
};
export const captainRideDetailsUpdation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId, captainId } = req.query;

  try {
    const captain = await captainAcceptedRideDetailsUpdate({
      rideId,
      captainId,
    });
    Socket.sendMessage(captain.socketId, "payment-done", captain);
    console.log(captain);

    return res.status(200).json(captain);
  } catch (error) {
    console.error("Error starting ride:", error);
    return res.status(500).json({ error: "Failed to start ride" });
  }
};
