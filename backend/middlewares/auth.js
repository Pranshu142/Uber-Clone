import riderModel from "../models/rider.models.js";
import captainModel from "../models/captain.models.js";
import jwt from "jsonwebtoken";
import blacklistedTokenModel from "../models/blacklistedToken.models.js";

export default async function riderAuth(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Invalid authorization" });
  }

  const isBlacklisted = await blacklistedTokenModel.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ error: "invalid authorization" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const rider = await riderModel.findById({ _id: decode.id });
    req.rider = rider;
    return next();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const captainAuth = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "unauthorized token" });
  }

  const isBlacklisted = await blacklistedTokenModel.findOne({ token });

  if (isBlacklisted) {
    return res.status(401).json({ error: "unauthorized black" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decode.id);
    req.captain = captain;
    return next();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
};
