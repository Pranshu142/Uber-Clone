import { getDistanceTime } from "./maps.service.js";
import crypto from "crypto";
import RideModel from "../models/ride.model.js";

const BASE_FARE = {
  moto: 30, // Base fare for moto in INR
  auto: 40, // Base fare for auto in INR
  car: 50, // Base fare for car in INR
};

const COST_PER_MINUTE = {
  moto: 2, // Cost per minute for moto in INR
  auto: 3, // Cost per minute for auto in INR
  car: 5, // Cost per minute for car in INR
};

const COST_PER_METER = {
  moto: 0.003, // Cost per meter for moto in INR
  auto: 0.004, // Cost per meter for auto in INR
  car: 0.00621371, // Cost per meter for car in INR
};

export const calculateFare = async (origin, destination, vehicleType) => {
  try {
    const { distance, duration } = await getDistanceTime(origin, destination);
    const distanceInMeters = distance.value; // Distance is already in meters
    const durationInMinutes = duration.value / 60; // Convert seconds to minutes

    const fare =
      BASE_FARE[vehicleType] +
      COST_PER_MINUTE[vehicleType] * durationInMinutes +
      COST_PER_METER[vehicleType] * distanceInMeters;
    return { fare: fare.toFixed(2), distanceInMeters, durationInMinutes }; // Return fare rounded to 2 decimal places
  } catch (error) {
    console.error("Error calculating fare:", error.message);
    throw error;
  }
};

const generateOtp = (length) => {
  const otp = crypto
    .randomInt(0, Math.pow(10, length))
    .toString()
    .padStart(length, "0");
  return otp;
};

export const createRide = async ({
  origin,
  destination,
  vehicleType,
  rider,
}) => {
  if (!origin || !destination || !vehicleType || !rider) {
    throw new Error("All fields are required");
  }
  try {
    const fare = await calculateFare(origin, destination, vehicleType);
    const otp = generateOtp(6); // Assuming OTP length is 6
    const ride = {
      startLocation: origin,
      endLocation: destination,
      rider: rider._id,
      startTime: new Date(),
      fare: fare.fare,
      duration: fare.durationInMinutes,
      distance: fare.distanceInMeters,
      vehicleType,
      otp,
    };

    // Save the ride to the database
    const newRide = await RideModel.create(ride);

    // For demonstration, returning the ride object
    return newRide;
  } catch (error) {
    console.error("Error creating ride:", error.message);
    throw error;
  }
};
