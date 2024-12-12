import riderModel from "../models/rider.models.js";

const createRider = ({ firstname, lastname, email, password }) => {
  if (!firstname || !lastname || !email || !password) {
    throw new Error("all fields are required");
  }

  try {
    const rider = new riderModel({
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    });

    return rider;
  } catch (error) {
    console.log(error);
  }
};

export default createRider;
