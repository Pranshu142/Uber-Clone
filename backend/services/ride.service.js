import { getDistanceTime } from "./maps.service.js";
import crypto from "crypto";
import RideModel from "../models/ride.model.js";

// Base fare for different vehicle types in INR
const BASE_FARE = {
  moto: 30, // Base fare for moto
  auto: 40, // Base fare for auto
  car: 50, // Base fare for car
};

// Cost per minute for different vehicle types in INR
const COST_PER_MINUTE = {
  moto: 2, // Cost per minute for moto
  auto: 3, // Cost per minute for auto
  car: 5, // Cost per minute for car
};

// Cost per meter for different vehicle types in INR
const COST_PER_METER = {
  moto: 0.003, // Cost per meter for moto
  auto: 0.004, // Cost per meter for auto
  car: 0.00621371, // Cost per meter for car
};

// Function to calculate fare based on origin, destination, and vehicle type
export const calculateFare = async (origin, destination, vehicleType) => {
  try {
    // Get distance and duration between origin and destination
    const { distance, duration } = await getDistanceTime(origin, destination);
    const distanceInMeters = distance.value; // Distance is already in meters
    const durationInMinutes = duration.value / 60; // Convert seconds to minutes

    // Calculate fare based on base fare, cost per minute, and cost per meter
    const fare =
      BASE_FARE[vehicleType] +
      COST_PER_MINUTE[vehicleType] * durationInMinutes +
      COST_PER_METER[vehicleType] * distanceInMeters;

    // Return fare rounded to 2 decimal places along with distance and duration
    return { fare: fare.toFixed(2), distanceInMeters, durationInMinutes };
  } catch (error) {
    console.error("Error calculating fare:", error.message);
    throw error;
  }
};

// Function to generate a random OTP of specified length
const generateOtp = (length) => {
  const otp = crypto
    .randomInt(0, Math.pow(10, length))
    .toString()
    .padStart(length, "0");
  return otp;
};

// Function to create a new ride
export const createRide = async ({
  origin,
  destination,
  vehicleType,
  rider,
}) => {
  // Check if all required fields are provided
  if (!origin || !destination || !vehicleType || !rider) {
    throw new Error("All fields are required");
  }
  try {
    // Calculate fare for the ride
    const fare = await calculateFare(origin, destination, vehicleType);
    // Generate a 6-digit OTP
    const otp = generateOtp(6);
    // Create a ride object with all necessary details
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

    // Return the newly created ride object
    return newRide;
  } catch (error) {
    console.error("Error creating ride:", error.message);
    throw error;
  }
};
