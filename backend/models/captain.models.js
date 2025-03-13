import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Mongoose schema for Captain/Driver in the ride-sharing application
 * @typedef {Object} CaptainSchema
 * @property {Object} fullname - Captain's full name
 * @property {String} fullname.firstname - Captain's first name (min 3 chars)
 * @property {String} fullname.lastname - Captain's last name
 * @property {Date} DOB - Captain's date of birth
 * @property {Number} mobileNumber - Captain's contact number (min 10 digits)
 * @property {String} email - Captain's email address (unique, lowercase)
 * @property {String} password - Captain's password (not included in queries)
 * @property {Object} vehicleInfo - Captain's vehicle details
 * @property {String} vehicleInfo.vehicleType - Type of vehicle (car/auto/bike)
 * @property {String} vehicleInfo.plate - Vehicle plate number (unique)
 * @property {String} vehicleInfo.color - Vehicle color
 * @property {Number} vehicleInfo.capacity - Vehicle passenger capacity
 * @property {Object} location - Captain's current location
 * @property {String} location.type - GeoJSON point type
 * @property {Number[]} location.coordinates - [longitude, latitude]
 * @property {String} upiId - Captain's UPI ID for payments (unique)
 * @property {Array} rideEarnings - List of earnings from each ride
 * @property {Number} totalEarnings - Cumulative earnings
 * @property {Number} totalRides - Total number of completed rides
 * @property {Array} ratings - List of ratings received from passengers
 * @property {Number} averageRating - Average rating (0-5)
 * @property {Number} totalTimeSpends - Total time spent on rides
 * @property {String} socketId - Socket connection ID for real-time updates
 * @property {Boolean} isAvailable - Captain's availability status
 */

const captainSchema = new Schema({
  // Full name object containing the full name of the driver as firstname and lastname
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

  DOB: {
    type: Date,
    default: new Date(),
    required: true,
  },

  mobileNumber: {
    type: Number,
    minlength: [10, "Mobile number must be at least 10 characters"],
    default: 1234567890,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: [5, "Email address must be at least 5 characters long"],
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },

  password: {
    type: String,
    required: true,
    select: false,
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
      minLength: [3, "must contain at least 3 characters"],
    },
    color: {
      type: String,
      required: true,
      minLength: [3, "must contain at least 3 characters"],
    },
    capacity: {
      type: Number,
      minlength: [1, "capacity must be greater than or equal to 0"],
    },
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  },
  upiId: {
    type: String,

    unique: true,
  },
  rideEarnings: [
    {
      ride: {
        type: Schema.Types.ObjectId,
        ref: "rides",
      },
      amount: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
  totalEarnings: {
    type: Number,
    default: 0,
  },
  totalRides: {
    type: Number,
    default: 0,
  },
  ratings: [
    {
      ride: {
        type: Schema.Types.ObjectId,
        ref: "rides",
      },
      value: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalTimeSpends: {
    type: Number,
    default: 0,
  },
  socketId: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});
captainSchema.index({ location: "2dsphere" });
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

// Pre Save Hook for Password Hashing
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

export default model("captains", captainSchema);
