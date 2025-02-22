import riderModel from "../models/rider.models.js";
import blacklistedToken from "../models/blacklistedToken.models.js";
import rideModel from "../models/ride.model.js";
import captainModel from "../models/captain.models.js";

const createRider = async ({ firstname, lastname, email, password }) => {
  if (!firstname || !lastname || !email || !password) {
    throw new Error("All fields are required");
  }

  try {
    const rider = new riderModel({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    });

    // Save the rider to the database
    await rider.save();

    return rider; // Return the saved rider object
  } catch (error) {
    console.error("Error creating rider:", error);
    throw new Error("Error while creating rider");
  }
};

export const createBlackListTokens = async ({ token }) => {
  if (!token) throw new Error("please provide a valid token");
  try {
    const blacklistToken = new blacklistedToken({ token });
    // await blacklistToken.save();
    // return blacklistToken;
  } catch (err) {
    console.error("Error creating blacklist token:", err);
    res.status(500).json({ error: "Error creating blacklist token" });
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
      captain.totalEarnings += ride.fare;

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

export default createRider;
