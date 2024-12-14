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
    const user = riderModel.findById({ _id: decode._id });
    req.user = user;
    return next();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const captainAuth = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const isBlacklisted = await blacklistedTokenModel.findOne({ token });

  if (!isBlacklisted) {
    return res.status(401).json({ error: "unauthorized" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const captain = captainModel.findById({ _id: decode._id });
    req.captain = captain;
    return next();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
};
