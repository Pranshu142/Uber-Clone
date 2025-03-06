import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const riderSchema = new Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastname: {
      type: String,
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email address must be at least 5 characters long"],
  },
  phone: {
    type: String,
    minlength: [10, "Phone number must be at least 10 characters long"],
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "male",
  },
  dob: {
    type: String,
    date: "Date",
  },
  totalRides: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },

  socketId: {
    type: String,
  },
});

// Generate JWT Token
riderSchema.methods.generateToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d", // Optional expiration time
  });
  return token;
};

// Compare Password
riderSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Hash Password
// riderSchema.statics.hashPassword = async function (password) {
//   const salt = await bcrypt.genSalt(10);
//   return await bcrypt.hash(password, salt);
// };

//  Pre Save Hook for Password Hashing
riderSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const riderModel = model("riders", riderSchema);
export default riderModel;
