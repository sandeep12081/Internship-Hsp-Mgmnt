import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../api";

const specializationOptions = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "General Medicine",
];
function AddDoctor() {
  const [data, setData] = useState({
    name: "",
    specialization: "",
    experience: "",
    mobileNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValue = name === "mobileNumber" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setData({ ...data, [name]: nextValue });
  };

  const submit = async () => {
    if (!data.name || !data.specialization || !data.experience || !data.mobileNumber) {
      alert("All fields are required");
      return;
    }

    if (!/^\d{10}$/.test(data.mobileNumber)) {
      alert("Mobile number must contain exactly 10 digits");
      return;
    }

    try {
      await axios.post(apiUrl("/doctors/add"), {
        ...data,
        experience: Number(data.experience),
      });
      alert("Doctor Added");
      setData({ name: "", specialization: "", experience: "", mobileNumber: "" });
    } catch (error) {
      const message = error.response?.data?.error || error.message || "Failed to add doctor";
      alert(message);
    }
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <p className="panel-kicker">Clinician Desk</p>
        <h3>Add Doctor</h3>
      </div>
      <div className="form-grid">
        <input required name="name" placeholder="Name" value={data.name} onChange={handleChange} />
        <select required name="specialization" value={data.specialization} onChange={handleChange}>
          <option value="">Select Specialization</option>
          {specializationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input required name="experience" type="number" min="0" placeholder="Experience" value={data.experience} onChange={handleChange} />
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
      <button onClick={submit}>Add</button>
    </section>
  );
}

export default AddDoctor;
