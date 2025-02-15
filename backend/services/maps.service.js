import axios from "axios";
import captainModel from "../models/captain.models.js";

export default async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY_2;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const { data, status } = await axios.get(url);
    if (status === 200) {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    } else {
      throw new Error("Error fetching location");
    }
  } catch (error) {
    console.error("Error fetching location:", error.message);
    throw error;
  }
};

export const getDistanceTime = async (origin, destination) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY_2;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
  try {
    const distancematrix = await axios.get(url);
    if (distancematrix.status === 200) {
      if (distancematrix.data.rows[0].elements[0].status == "ZERO_RESULTS") {
        throw new Error("No results found for the given locations");
      }
      const { distance, duration } = distancematrix.data.rows[0].elements[0];
      return { distance, duration };
    }
  } catch (error) {
    console.error("Error fetching distance and time:", error.message);
    throw error;
  }
};

export const getSuggestions = async (input) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY_2;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;

  try {
    const { data, status } = await axios.get(url);
    if (status === 200) {
      return data.predictions;
    } else {
      throw new Error("Error fetching suggestions");
    }
  } catch (error) {
    console.error("Error fetching suggestions:", error.message);
    throw error;
  }
};

export const getCaptainsNearby = async (lng, lat, vehicleType, radius) => {
  // Validate coordinates
  const longitude = parseFloat(lng);
  const latitude = parseFloat(lat);

  console.log(longitude, latitude);

  if (isNaN(longitude) || isNaN(latitude)) {
    throw new Error("Invalid coordinates provided");
  }

  try {
    const captains = await captainModel.find({
      location: {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], radius / 6378.1], // radius in km, Earth radius in km
        },
      },
      isAvailable: true,
      "vehicleInfo.vehicleType": vehicleType,
    });

    console.log(vehicleType);
    return captains;
  } catch (error) {
    console.error("Error finding nearby captains:", error);
    throw error;
  }
};
