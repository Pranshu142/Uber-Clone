import mapsService from "../services/maps.service.js";
import { getDistanceTime, getSuggestions } from "../services/maps.service.js";
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

export const getDistanceTimeFunc = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors });
  }
  const { origin, destination } = req.query;
  try {
    const distanceTime = await getDistanceTime(origin, destination);
    res.status(200).json(distanceTime);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Error fetching distance and time" });
  }
};

export const getSuggestionsFunc = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors });
  }
  const { input } = req.query;
  try {
    const suggestions = await getSuggestions(input);
    res.status(200).json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Error fetching suggestions" });
  }
};
