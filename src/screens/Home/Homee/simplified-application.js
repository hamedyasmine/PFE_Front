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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      cv: file,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("jobType", formData.jobType);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("cv", formData.cv);

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
          backgroundImage:
            "url('https://st2.depositphotos.com/3894705/7745/i/450/depositphotos_77458360-stock-photo-grunge-background-of-dark-blue.jpg')",
          backgroundSize: "cover",
          minHeight: "100vh",
          padding: "50px 0",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <div style={{ maxWidth: "700px", width: "100%", padding: "30px", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#0b1c39" }}>Simplified Application</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                  required
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                  required
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                  required
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Informatique">Informatique</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>Job Type</label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                  required
                >
                  <option value="">Select Job Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", fontWeight: "bold" }}>Upload CV</label>
                <input
                  type="file"
                  name="cv"
                  accept=".pdf, .doc, .docx"
                  onChange={handleFileChange}
                  style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                  required
                />
              </div>

              <div style={{ textAlign: "center" }}>
                <button type="submit" style={{ backgroundColor: "#0b1c39", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer" }}>
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default SimplifiedApplication;
