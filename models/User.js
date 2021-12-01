const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  medname: [{
    type: String,
    required: true,
  }],
  time:[{
    type: String,
    required: true,
  }],
  freq:[{
    type: Number,
    required: true,
  }]
});

module.exports = mongoose.model("User", UserSchema);
