const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const billingRoutes = require("./routes/billingRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hospitalDB";

app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI)
.then(() => console.log(`MongoDB Connected: ${MONGODB_URI}`))
.catch((err) => console.log("MongoDB connection error:", err.message));

app.use("/patients", patientRoutes);
app.use("/doctors", doctorRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/billing", billingRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
