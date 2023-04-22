//db model/schema

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  displayName: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  details: [
    {
      medname: {
        type: String,
      },
      time: {
        type: String,
      },
      freq: {
        type: Number,
      },
    },
  ],
  appointments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Appointment"
    },
  ],
  meals: [
    {
      food: {
        type: String,
      },
      calories: {
        type: Number,
      },
    },
  ],
  userDetails: [
    {
      weight: {
        type: Number,
      },
      height: {
        type: Number,
      },
      mobile: {
        type: String,
      },
      mail: {
        type: String,
      },
      bg: {
        type: String,
      },
      address: {
        type: String,
      },
      gen: {
        type: String,
      },
      BMI: {
        type: Number,
      },
    }
  ],
});

UserSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'appointments',
    select: "-user",
  });
  next();
});

module.exports = mongoose.model("User", UserSchema);
//REQUIRED: TRUE IS GIVING ERROR WITH USERS TRYING TO LOGIN FIRST TIME
