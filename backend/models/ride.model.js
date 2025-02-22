import { Schema, model } from "mongoose";

const rideSchema = new Schema(
  {
    rider: {
      type: Schema.Types.ObjectId,
      ref: "riders",
      required: true,
    },
    captain: {
      type: Schema.Types.ObjectId,
      ref: "captains",
    },
    startLocation: {
      type: String,
      required: true,
    },
    endLocation: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
    },
    fare: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
      default: "pending",
    },
    duration: {
      type: Number,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
    },
    orderId: {
      type: String,
    },
    otp: {
      type: String,
      required: true,
      selected: false,
    },
  },
  {
    timestamps: true,
  }
);
export default model("rides", rideSchema);
