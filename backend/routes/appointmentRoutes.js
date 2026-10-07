const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

router.post("/add", async (req, res) => {
    try {
        const data = new Appointment(req.body);
        await data.save();
        res.status(201).send("Appointment Booked");
    } catch (error) {
        res.status(500).json({ error: "Failed to book appointment" });
    }
});

router.get("/", async (req, res) => {
    try {
        const data = await Appointment.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch appointments" });
    }
});

module.exports = router;
