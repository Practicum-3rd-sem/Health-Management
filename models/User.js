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
  details: [
    {
      medname: {
        type: String,
        required: true,
      },
      time:{
        type: String,
        required: true,
      },
      freq:{
        type: Number,
        required: true,
      }
    }
  ],
  appointments: [
    {
      Date:{
        type: String,
        required: true,
      },
    Description:{
        type: String,
        required: true,
    },
    Start_time:{
        type: String,
        required: true,
    },
    End_time:{
        type: String,
    }
    }
  ],
  meals: [
    {
      food:{
        type: String,
        required: true,
      },
      calories:{
        type: Number,
        required: true,
      }
    }
  ],
  userDetails: [
    {
      weight:{
        type: Number,
        required: true,
      },
      height:{
        type: Number,
        required: true,
      },
      mobile:{
        type: String,
        required: true,
      },
      mail:{
        type: String,
        required: true,
      },
      bg:{
        type: String,
        required: true,
      },
      address:{
        type: String,
        required: true,
      },
      gen:{
        type: String,
        required: true,
      },
      BMI:{
        type: Number,
        required: true,
      }
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
