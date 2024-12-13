import riderModel from "../models/rider.models.js";
import jwt from "jsonwebtoken";
import blacklistedToken from "../models/blacklistedToken.models.js";

export default () => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Invalid authorization" });
  }

  const isBlacklisted = blacklistedToken.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ error: "invalid authorization" });
  }

  try {
    const decode = jwt.verify(token, JWT_SECRET);
    const user = riderModel.findById({ _id: decode._id });
    req.user = user;
    return next();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
};
