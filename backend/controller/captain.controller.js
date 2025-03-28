import captainModel from "../models/captain.models.js";
import createCaptain, {
  createBlackListTokens,
  updateProfileDetails,
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

    res.status(200).json({ captain, token });
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
  res.cookie("captain-token", token);

  res.status(200).json({ message: "captain login successful", captain, token });
};

export const captainProfileDataUpdate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Add your profile update logic here
    const profileData = req.body;
    const captainId = req.captain._id;
    const updatedCaptainProfile = await updateProfileDetails({
      profileData,
      captainId,
    });

    res.status(200).json({
      message: "Profile updated successfully",
      captain: updatedCaptainProfile,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
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
    console.log(captain);

    return res.status(200).json(captain);
  } catch (error) {
    console.error("Error starting ride:", error);
    return res.status(500).json({ error: "Failed to start ride" });
  }
};

export const logout = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await createBlackListTokens({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "captain logout successful" });
};
export const captainProfile = (req, res, next) => {
  res
    .status(200)
    .json({ message: "captain logged in successfully", captain: req.captain });
  // console.log("🚀 ~ captainProfile ~ req.captain:", req.captain);
};
