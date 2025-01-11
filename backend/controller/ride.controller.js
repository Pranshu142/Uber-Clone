import { createRide } from "../services/ride.service.js";
import riderModel from "../models/rider.models.js";

export default async (req, res) => {
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
