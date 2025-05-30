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
    // await blacklistToken.save();
    // return blacklistToken;
  } catch (err) {
    console.error("Error creating blacklist token:", err);
    res.status(500).json({ error: "Error creating blacklist token" });
  }
};

export const updateProfileDetails = async ({ profileData, riderId }) => {
  if (!profileData || !riderId) {
    throw new Error("new profile data and rider id is required");
  }

  try {
    const rider = await riderModel.findByIdAndUpdate(
      riderId,
      {
        $set: {
          fullname: {
            firstname: profileData.fullname.firstname,
            lastname: profileData.fullname.lastname,
          },
          email: profileData.email,
          phone: profileData.phone,
          gender: profileData.gender,
          dob: profileData.age,
        },
      },
      { new: true }
    );
    return rider;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Error updating profile data" });
  }
};

export default createRider;
