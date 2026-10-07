const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

router.post("/add", async (req, res) => {
    try {
        const data = new Patient(req.body);
        await data.save();
        res.status(201).send("Patient Added");
    } catch (error) {
        res.status(500).json({ error: "Failed to add patient" });
    }
});

router.get("/", async (req, res) => {
    try {
        const data = await Patient.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch patients" });
    }
});

module.exports = router;
