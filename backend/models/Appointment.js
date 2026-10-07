const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true,
        trim: true
    },
    doctorId: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    mobileNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Mobile number must contain exactly 10 digits"]
    },
    status: {
        type: String,
        default: "Scheduled"
    }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
