const express = require("express");
const router = express.Router();
const Billing = require("../models/Billing");

router.post("/add", async (req, res) => {
    try {
        const data = new Billing(req.body);
        await data.save();
        res.status(201).send("Bill Generated");
    } catch (error) {
        res.status(500).json({ error: "Failed to generate bill" });
    }
});

router.get("/", async (req, res) => {
    try {
        const data = await Billing.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch billing records" });
    }
});

module.exports = router;
