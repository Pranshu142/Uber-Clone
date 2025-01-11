import { Schema, model } from "mongoose";

const blacklistedTokenSchema = new Schema({
  token: {
    type: "String",
    unique: true,
    required: true,
  },
  createdAt: {
    type: "Date",
    default: Date.now,
    expiresIn: 86400,
  },
});

const blacklistedToken = model("blacklistedToken", blacklistedTokenSchema);

export default blacklistedToken;
