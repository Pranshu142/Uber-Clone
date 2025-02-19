import {
  createRide,
  calculateFair,
  confirmRide,
  rideStarted,
} from "../services/ride.service.js";
import riderModel from "../models/rider.models.js";
import rideModel from "../models/ride.model.js";
import { validationResult } from "express-validator";
import captainModel from "../models/captain.models.js";
import { getCaptainsNearby } from "../services/maps.service.js";
import getPosition from "../services/maps.service.js";
import Socket from "../socket.js";

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

    try {
      const ride = await createRide({
        origin,
        destination,
        vehicleType,
        rider,
      });
      const { lat, lng } = await getPosition(origin);

      if (!lat || !lng) {
        throw new Error("Could not determine pickup location coordinates");
      }

      const nearByCaptains = await getCaptainsNearby(lng, lat, vehicleType, 2);
      ride.otp = "";
      // console.log("Nearby captains:", nearbyCaptains);
      const rideWithRider = await rideModel
        .findOne({ _id: ride._id })
        .populate("rider");
      // console.log(rideWithRider);

      nearByCaptains.map((captain) => {
        Socket.sendMessage(captain.socketId, "ride-request", {
          ride: rideWithRider,
          rider: rider,
        });
      });
      return res.status(201).json({
        ride,
        nearByCaptains,
      });
    } catch (error) {
      console.error("Error creating ride:", error.message);
      return res.status(500).json({ error: error.message });
    }
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

export const confirmRideRequest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors });
  }

  const { rideId, captain } = req.body;

  try {
    const ride = await confirmRide({ rideId, captain });
    console.log(ride.rider.socketId);
    Socket.sendMessage(ride.rider.socketId, "ride-confirmed", ride);
    return res.status(200).json(ride);
  } catch (error) {
    console.error("Error confirming ride:", error);
    return res.status(500).json({ error: "Failed to confirm ride" });
  }
};

export const rideStartedInfo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors });
  }
  const { rideId, otp } = req.query;
  try {
    const ride = await rideStarted(rideId, otp, req.captain);

    Socket.sendMessage(ride.rider.socketId, "ride-started", ride);
    return res.status(200).json(ride);
  } catch (error) {
    console.error("Error starting ride:", error);
    return res.status(500).json({ error: "Failed to start ride" });
  }
};
