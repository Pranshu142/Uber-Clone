import { findRide } from "../services/ride.service.js";
import Socket from "../socket.js";
import { validationResult } from "express-validator";

const initiatePayment = async (req, res) => {
  try {
    const { rideId } = req.query;
    if (!rideId) {
      return res.status(400).json({ error: "rideId is required" });
    }

    // Find the ride and populate captain details
    const ride = await findRide(rideId);
    if (!ride) {
      return res.status(404).json({ error: "Ride not found" });
    }

    const captain = ride.captain;
    if (!captain) {
      return res.status(404).json({ error: "Captain not found in ride" });
    }

    // Use the captain's UPI ID (ensure you add this field to the captain model)
    const upiId = captain.upiId || "9305709783@axl"; // Replace with a proper default or error out
    const amount = ride.fare;
    const payeeName = `${captain.fullname.firstname} ${captain.fullname.lastname}`;
    const note = encodeURIComponent(`Payment for ride ${ride._id}`);

    // Construct the UPI URL using the UPI deep linking format
    const upiURL = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      payeeName
    )}&am=${amount}&cu=INR&tn=${note}`;

    Socket.sendMessage(ride.captain.socketId, "payment-initiated", { upiURL });

    // Return the generated UPI URL to the frontend
    return res.status(200).json({ upiURL });
  } catch (error) {
    console.error("Error initiating payment:", error.message);
    return res.status(500).json({ error: "Failed to initiate payment" });
  }
};
export const paymentStatusUpdate = async (req, res) => {
  try {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { rideId } = req.query;
    if (!rideId) {
      return res.status(400).json({ error: "rideId is required" });
    }

    // Find and validate ride
    const ride = await findRide(rideId);
    if (!ride) {
      return res.status(404).json({ error: "Ride not found" });
    }

    // Check if ride is already paid
    // if (ride.paymentStatus === "paid") {
    //   return res.status(400).json({ error: "Payment already processed" });
    // }

    // Update ride payment status
    // ride.paymentStatus = "paid";
    // ride.status = "completed";
    // await ride.save();

    // Emit socket event for real-time updates
    Socket.sendMessage(ride.rider.socketId, "payment-done", {
      status: "success",
      rideId: ride._id,
      timestamp: new Date(),
    });

    return res.status(200).json({
      message: "Payment successful",
      ride: {
        id: ride._id,
        status: ride.status,
      },
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    return res.status(500).json({
      error: "Failed to process payment",
      message: error.message,
    });
  }
};

export default initiatePayment;
