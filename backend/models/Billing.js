const mongoose = require("mongoose");

const BillingSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    paymentStatus: {
        type: String,
        default: "Pending"
    }
});

module.exports = mongoose.model("Billing", BillingSchema);
