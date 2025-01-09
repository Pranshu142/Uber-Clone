import mapsService from "../services/maps.service.js";
import { validationResult } from "express-validator";
export default async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors });
  }
  const { address } = req.query;
  try {
    const location = await mapsService(address);
    res.status(200).json(location);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Error fetching location" });
  }
};
