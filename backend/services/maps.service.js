import axios from "axios";

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
