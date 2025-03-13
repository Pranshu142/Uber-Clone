import captainModel from "../models/captain.models.js";
import blacklistedToken from "../models/blacklistedToken.models.js";
import rideModel from "../models/ride.model.js";
import { updateProfileDetails } from "./rider.service.js";

const createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  vehicleType,
  color,
  plate,
  capacity,
}) => {
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !plate ||
    !capacity ||
    !color ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }

  try {
    const captain = new captainModel({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicleInfo: {
        vehicleType,
        color,
        plate,
        capacity,
      },
    });

    // Save the captain to the database
    await captain.save();

    return captain; // Return the saved captain object
  } catch (error) {
    console.error("Error creating captain:", error);
    throw new Error("Error while creating captain");
  }
};

export const createBlackListTokens = async ({ token }) => {
  try {
    // Use upsert to avoid duplicate errors
    await blacklistedToken.updateOne(
      { token }, // Filter
      { token }, // Update
      { upsert: true } // Insert if not exists
    );
    console.log("Token blacklisted successfully.");
  } catch (error) {
    console.error("Error creating blacklist token:", error);
  }
};
export const captainAcceptedRideDetailsUpdate = async ({
  rideId,
  captainId,
}) => {
  try {
    console.log("hello");
    const ride = await rideModel.findById(rideId);
    console.log(ride);
    const captain = await captainModel.findById(captainId).populate({
      path: "rideEarnings.ride",
      select: "startLocation endLocation fare status",
    });
    if (!captain || !ride) {
      throw new Error("Captain or ride not found");
    }
    if (ride.status !== "completed") {
      throw new Error("Ride is not completed yet");
    } else {
      // Update captain's ride earnings
      captain.rideEarnings.push({
        ride: ride._id,
        amount: ride.fare,
      });

      // Update total earnings
      captain.totalEarnings = (captain.totalEarnings + ride.fare).toFixed(2);

      // Increment total rides
      captain.totalRides += 1;

      // Save the changes
      await captain.save();
    }

    console.log("Captain availability updated successfully.");
    return captain;
  } catch (error) {
    console.error("Error updating captain availability:", error);
  }
};

export const updateProfileDetails = async ({ profileData, captainId }) => {
  try {
    if (!captainId)
      return res.status(404).json({ error: "captain id is required" });
    const updatedCaptain = await captainModel.findByIdAndUpdate(
      captainId,
      {
        ...profileData,
      },
      {
        new: true,
      }
    );

    return updatedCaptain;
  } catch (error) {
    console.log("Error updating captain profile data");
    return res.status(500).json({ error: error });
  }
};

export default createCaptain;
