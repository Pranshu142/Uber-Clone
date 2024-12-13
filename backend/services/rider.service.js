import riderModel from "../models/rider.models.js";

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

export default createRider;
