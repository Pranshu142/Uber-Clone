import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({
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
    lowecase: true,
    minlength: [5, "Email address must be at least 5 characters long"],
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  socketId: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },

  vehicleInfo: {
    vehicleType: {
      type: String,
      enum: ["car", "auto", "bike"],
    },
    plate: {
      type: String,
      required: true,
      unique: true,
      minLength: [3, "must contain atleast 3 characters"],
    },
    color: {
      type: String,
      required: true,
      minLength: [3, "must contain atleast 3 characters"],
    },
    capacity: {
      type: Number,
      minlength: [1, "capacity must be greater than or equal to 0"],
    },
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

captainSchema.methods.generateToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d", // Optional expiration time
  });
  return token;
};

// Compare Password
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// // Pre Save Hook for Password Hashing
captainSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("captains", captainSchema);
