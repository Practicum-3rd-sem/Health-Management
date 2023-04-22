const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    description: {
        type: String,
    },
    start_time: {
        type: String,
    },
    end_time: {
        type: String,
    },
});

appointmentSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select:
            "firstName lastName userDetails.mobile userDetails.gen _id -appointments",
    });
    next();
});

module.exports = mongoose.model("Appointment", appointmentSchema);
