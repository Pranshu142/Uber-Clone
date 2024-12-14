import captainModel from "../models/captain.models.js";
import blacklistedToken from "../models/blacklistedToken.models.js";

const createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  vehicleType,
  color,
  plate,
  capacity,
}) => {
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !plate ||
    !capacity ||
    !color ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }

  try {
    const captain = new captainModel({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicleInfo: {
        vehicleType,
        color,
        plate,
        capacity,
      },
    });

    // Save the captain to the database
    await captain.save();

    return captain; // Return the saved captain object
  } catch (error) {
    console.error("Error creating captain:", error);
    throw new Error("Error while creating captain");
  }
};

export const createBlackListTokens = async ({ token }) => {
  if (!token) throw new Error("please provide a valid token");
  try {
    const blacklistToken = new blacklistedToken({ token });
    await blacklistToken.save();
    // return blacklistToken;
  } catch (err) {
    console.error("Error creating blacklist token:", err);
    res.status(500).json({ error: "Error creating blacklist token" });
  }
};
export default createCaptain;
