import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../api";

const genderOptions = ["Male", "Female", "Transgender"];

function AddPatient() {
  const [data, setData] = useState({
    name: "",
    age: "",
    gender: "",
    disease: "",
    mobileNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValue = name === "mobileNumber" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setData({ ...data, [name]: nextValue });
  };

  const submit = async () => {
    if (!data.name || !data.age || !data.gender || !data.disease || !data.mobileNumber) {
      alert("All fields are required");
      return;
    }

    if (!/^\d{10}$/.test(data.mobileNumber)) {
      alert("Mobile number must contain exactly 10 digits");
      return;
    }

    try {
      await axios.post(apiUrl("/patients/add"), {
        ...data,
        age: Number(data.age),
      });
      alert("Patient Added");
      setData({ name: "", age: "", gender: "", disease: "", mobileNumber: "" });
    } catch (error) {
      const message = error.response?.data?.error || error.message || "Failed to add patient";
      alert(message);
    }
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <p className="panel-kicker">Patient Desk</p>
        <h3>Add Patient</h3>
      </div>
      <div className="form-grid">
        <input required name="name" placeholder="Name" value={data.name} onChange={handleChange} />
        <input required name="age" type="number" min="0" placeholder="Age" value={data.age} onChange={handleChange} />
        <select required name="gender" value={data.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          {genderOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
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
        <input required name="disease" placeholder="Disease" value={data.disease} onChange={handleChange} />
      </div>
      <button onClick={submit}>Add</button>
    </section>
  );
}

export default AddPatient;
