import captainModel from "../models/captain.models.js";
import createCaptain, {
  createBlackListTokens,
} from "../services/captain.service.js";
import { validationResult } from "express-validator";

export default async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract fields
  const { fullname, email, password, vehicleInfo } = req.body;

  const captainAlreadyExists = await captainModel.findOne({ email: email });
  if (captainAlreadyExists) {
    return res.status(400).json({ errors: "captain already exists" });
  }

  try {
    // Create the captain
    const captain = await createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password,
      vehicleType: vehicleInfo.vehicleType,
      color: vehicleInfo.color,
      plate: vehicleInfo.plate,
      capacity: vehicleInfo.capacity,
    });

    // Generate token
    const token = captain.generateToken();

    res.status(201).json({ captain, token });
  } catch (error) {
    console.error("Error registering captain:", error);
    res.status(500).json({ error: "Failed to register captain" });
  }
};

export const loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const captain = await captainModel
    .findOne({ email: email })
    .select("+password");

  if (!captain) {
    return res.status(401).json({ errors: "invalid email or password" });
  }
  //   console.log(await bcrypt.compare(password, captain.password), captain.password);
  const isMatch = await captain.comparePassword(password);
  console.log(isMatch);
  if (!isMatch) {
    return res.status(401).json({ errors: "invalid email or password" });
  }

  const token = await captain.generateToken();
  res.cookie("token", token);

  res.status(200).json({ message: "captain login successful" });
};

export const logout = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await createBlackListTokens({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "captain logout successful" });
};

export const captainProfile = (req, res, next) => {
  res.status(200).json({ message: "captain profile display" });
};
