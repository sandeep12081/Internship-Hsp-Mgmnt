const mongoose = require("mongoose");

const mobileNumberField = {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Mobile number must contain exactly 10 digits"]
};

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    disease: {
        type: String,
        required: true,
        trim: true
    },
    mobileNumber: mobileNumberField
});

module.exports = mongoose.model("Patient", PatientSchema);
