import { createRide, calculateFair } from "../services/ride.service.js";
import riderModel from "../models/rider.models.js";
import { validationResult } from "express-validator";

export default async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors });
  }
  const { origin, destination, vehicleType } = req.body;

  if (!origin || !destination || !vehicleType) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const riderObj = req.rider;
    if (!riderObj) {
      return res.status(400).json({ error: "Rider information is missing" });
    }

    const rider = await riderModel.findById(riderObj._id);

    if (!rider) {
      return res.status(404).json({ error: "Rider not found" });
    }

    const ride = await createRide({ origin, destination, vehicleType, rider });
    return res.status(201).json(ride);
  } catch (error) {
    console.error("Error creating ride:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const calculateAmount = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors });
  }
  const { origin, destination, vehicleType } = req.query;

  if (!origin || !destination || !vehicleType) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const fare = await calculateFair(origin, destination, vehicleType);
    return res.status(200).json(fare);
  } catch (error) {
    console.error("Error calculating fare:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
