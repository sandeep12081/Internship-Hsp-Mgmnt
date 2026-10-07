const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

router.post("/add", async (req, res) => {
    try {
        const data = new Doctor(req.body);
        await data.save();
        res.status(201).send("Doctor Added");
    } catch (error) {
        res.status(500).json({ error: "Failed to add doctor" });
    }
});

router.get("/", async (req, res) => {
    try {
        const data = await Doctor.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch doctors" });
    }
});

module.exports = router;
