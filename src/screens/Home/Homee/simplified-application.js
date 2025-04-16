import React, { useState } from "react";
import Header from "./Header";

function SimplifiedApplication() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    category: "",
    jobType: "",
    gender: "",
    cv: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, cv: file });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      formDataToSend.append(key, value)
    );

    try {
      const response = await fetch("http://localhost:5000/api/applications-simplifiees/apply", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Candidature envoyée avec succès !");
      } else {
        alert(`Erreur: ${data.message}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      alert("Erreur lors de l'envoi du formulaire.");
    }
  };

  return (
    <>
      <Header />
      <section
        style={{
          backgroundColor: "#f6f9fc",
          minHeight: "100vh",
          padding: "60px 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "700px",
            backgroundColor: "#ffffff",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#0b1c39" }}>
            Simplified Application
          </h2>

          <form onSubmit={handleSubmit}>
            {[
              { label: "First Name", name: "firstName", type: "text" },
              { label: "Last Name", name: "lastName", type: "text" },
              { label: "Email", name: "email", type: "email" },
            ].map(({ label, name, type }) => (
              <div key={name} style={{ marginBottom: "20px" }}>
                <label style={{ fontWeight: "600", marginBottom: "5px", display: "block" }}>
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: "15px",
                  }}
                />
              </div>
            ))}

            {[
              {
                label: "Category",
                name: "category",
                options: ["Informatique", "Marketing", "Finance"],
              },
              {
                label: "Job Type",
                name: "jobType",
                options: ["Full-time", "Part-time", "Internship"],
              },
              {
                label: "Gender",
                name: "gender",
                options: ["Male", "Female", "Other"],
              },
            ].map(({ label, name, options }) => (
              <div key={name} style={{ marginBottom: "20px" }}>
                <label style={{ fontWeight: "600", marginBottom: "5px", display: "block" }}>
                  {label}
                </label>
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: "15px",
                    backgroundColor: "#fff",
                  }}
                >
                  <option value="">Select {label}</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <div style={{ marginBottom: "25px" }}>
              <label style={{ fontWeight: "600", marginBottom: "5px", display: "block" }}>
                Upload CV
              </label>
              <input
                type="file"
                name="cv"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "15px",
                }}
              />
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
                style={{
                  backgroundColor: "#0b1c39",
                  color: "white",
                  padding: "12px 25px",
                  fontSize: "16px",
                  fontWeight: "600",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#142850")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#0b1c39")}
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default SimplifiedApplication;
