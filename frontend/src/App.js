import React, { useState } from "react";
import AddPatient from "./components/AddPatient";
import AddDoctor from "./components/AddDoctor";
import Appointment from "./components/Appointment";
import Billing from "./components/Billing";

const sections = [
  {
    id: "patient",
    label: "Patient",
    title: "Patient Section",
    description: "Register new patients and store their basic details.",
    component: <AddPatient />,
  },
  {
    id: "doctor",
    label: "Doctor",
    title: "Doctor Section",
    description: "Add doctors and manage specialization details.",
    component: <AddDoctor />,
  },
  {
    id: "appointment",
    label: "Appointment",
    title: "Appointment Section",
    description: "Book and manage visit scheduling in one place.",
    component: <Appointment />,
  },
  {
    id: "billing",
    label: "Billing",
    title: "Billing Section",
    description: "Generate billing records for patient payments.",
    component: <Billing />,
  },
];

function App() {
  const [activeSection, setActiveSection] = useState("appointment");
  const selectedSection = sections.find((section) => section.id === activeSection) || sections[0];

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Care Operations</p>
        <h1>Hospital Management System</h1>
        <p className="hero-copy">
          Choose a box to open the section you want to work in.
        </p>
      </section>

      <section className="menu-grid">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={`menu-card${activeSection === section.id ? " is-active" : ""}`}
            onClick={() => setActiveSection(section.id)}
          >
            <span className="menu-card-label">{section.label}</span>
            <span className="menu-card-copy">{section.description}</span>
          </button>
        ))}
      </section>

      <section className="active-section">
        <div className="active-section-header">
          <p className="panel-kicker">Open Section</p>
          <h2>{selectedSection.title}</h2>
        </div>
        {selectedSection.component}
      </section>
    </main>
  );
}

export default App;
