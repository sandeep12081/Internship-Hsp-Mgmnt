const mongoose = require("mongoose");

const mobileNumberField = {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Mobile number must contain exactly 10 digits"]
};

const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    specialization: {
        type: String,
        required: true,
        trim: true
    },
    experience: {
        type: Number,
        required: true,
        min: 0
    },
    mobileNumber: mobileNumberField
});

module.exports = mongoose.model("Doctor", DoctorSchema);
