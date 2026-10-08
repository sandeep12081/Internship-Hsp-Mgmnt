import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../api";

const DATE_PATTERN = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

function Billing() {
  const [data, setData] = useState({ patientId: "", amount: "", date: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let nextValue = value;

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
    if (!data.patientId || !data.amount || !data.date) {
      alert("All fields are required");
      return;
    }

    if (!DATE_PATTERN.test(data.date)) {
      alert("Date must be in dd/mm/yyyy format");
      return;
    }

    try {
      await axios.post(apiUrl("/billing/add"), data);
      alert("Bill Generated");
      setData({ patientId: "", amount: "", date: "" });
    } catch (error) {
      const message = error.response?.data?.error || error.message || "Failed to generate bill";
      alert(message);
    }
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <p className="panel-kicker">Finance</p>
        <h3>Billing</h3>
      </div>
      <div className="form-grid">
        <input required name="patientId" placeholder="Patient ID" value={data.patientId} onChange={handleChange} />
        <input required name="amount" type="number" min="0" placeholder="Amount" value={data.amount} onChange={handleChange} />
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
      </div>
      <button onClick={submit}>Generate</button>
    </section>
  );
}

export default Billing;
