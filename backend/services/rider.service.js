import riderModel from "../models/rider.models.js";
import blacklistedToken from "../models/blacklistedToken.models.js";

const createRider = async ({ firstname, lastname, email, password }) => {
  if (!firstname || !lastname || !email || !password) {
    throw new Error("All fields are required");
  }

  try {
    const rider = new riderModel({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    });

    // Save the rider to the database
    await rider.save();

    return rider; // Return the saved rider object
  } catch (error) {
    console.error("Error creating rider:", error);
    throw new Error("Error while creating rider");
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

export default createRider;
