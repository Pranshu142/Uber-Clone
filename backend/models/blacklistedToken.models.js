import mongoose from "mongoose";

const blacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: "String",
    unique: true,
    required: true,
  },
  createdAt: {
    type: "Date",
    default: Date.now(),
    expiresIn: 86400,
  },
});

const blacklistedToken = mongoose.model(
  "blacklistedToken",
  blacklistedTokenSchema
);

export default blacklistedToken;
