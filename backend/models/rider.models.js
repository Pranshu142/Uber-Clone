import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const riderSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: "String",
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastname: {
      type: "String",
    },
  },

  email: {
    type: "String",
    required: true,
    unique: true,
    minlength: [5, "Email address must be at least 5 characters long"],
  },

  password: {
    type: "String",
    required: true,
    select: false,
  },

  socketId: {
    type: "String",
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
riderSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// // Pre Save Hook for Password Hashing
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

const riderModel = mongoose.model("Rider", riderSchema);
export default riderModel;
