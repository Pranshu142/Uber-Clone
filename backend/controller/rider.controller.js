import riderModel from "../models/rider.models.js";
import createRider from "../services/rider.service.js";
import { validationResult } from "express-validator";

const registerRider = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Proceed with registration logic
  const { fullname, email, password } = req.body;

  const hashPassword = riderModel.hashPassword(password);

  const rider = createRider({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
  });
  const token = rider.generateToken();
  res.status(201).json({ rider, token });
};

export default { registerRider };
