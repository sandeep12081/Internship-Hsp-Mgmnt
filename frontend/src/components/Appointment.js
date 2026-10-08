import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../api";

const DATE_PATTERN = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

function Appointment() {
  const [data, setData] = useState({ patientId: "", doctorId: "", date: "", mobileNumber: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let nextValue = value;

    if (name === "mobileNumber") {
      nextValue = value.replace(/\D/g, "").slice(0, 10);
    }

    if (name === "date") {
      const digits = value.replace(/\D/g, "").slice(0, 8);
      const parts = [];

      if (digits.length > 0) {
        parts.push(digits.slice(0, 2));
      }

      if (digits.length > 2) {
        parts.push(digits.slice(2, 4));
      }

      if (digits.length > 4) {
        parts.push(digits.slice(4, 8));
      }

      nextValue = parts.join("/");
    }

    setData({ ...data, [name]: nextValue });
  };

  const submit = async () => {
    if (!data.patientId || !data.doctorId || !data.date || !data.mobileNumber) {
      alert("All fields are required");
      return;
    }

    if (!/^\d{10}$/.test(data.mobileNumber)) {
      alert("Mobile number must contain exactly 10 digits");
      return;
    }

    if (!DATE_PATTERN.test(data.date)) {
      alert("Date must be in dd/mm/yyyy format");
      return;
    }

    try {
      await axios.post(apiUrl("/appointments/add"), data);
      alert("Appointment Booked");
      setData({ patientId: "", doctorId: "", date: "", mobileNumber: "" });
    } catch (error) {
      const message = error.response?.data?.error || error.message || "Failed to book appointment";
      alert(message);
    }
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <p className="panel-kicker">Scheduling</p>
        <h3>Appointment</h3>
      </div>
      <div className="form-grid">
        <input required name="patientId" placeholder="Patient ID" value={data.patientId} onChange={handleChange} />
        <input required name="doctorId" placeholder="Doctor ID" value={data.doctorId} onChange={handleChange} />
        <input
          required
          name="date"
          type="text"
          inputMode="numeric"
          maxLength="10"
          placeholder="dd/mm/yyyy"
          value={data.date}
          onChange={handleChange}
        />
        <input
          required
          name="mobileNumber"
          type="tel"
          inputMode="numeric"
          maxLength="10"
          placeholder="Mobile Number"
          value={data.mobileNumber}
          onChange={handleChange}
        />
      </div>
      <button onClick={submit}>Book</button>
    </section>
  );
}

export default Appointment;
