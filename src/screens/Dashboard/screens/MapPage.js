import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

function ContactInfo() {
  const [contactInfo, setContactInfo] = useState({ email: "", phone: "" });
  const [newContactInfo, setNewContactInfo] = useState({ email: "", phone: "" });
  const [status, setStatus] = useState(null);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/contact-info");
        setContactInfo(response.data);
        setNewContactInfo(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des informations de contact", error);
        setStatus({ type: "error", message: "Erreur lors du chargement des données" });
      }
    };

    fetchContactInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContactInfo({ ...newContactInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const response = await axios.put("http://localhost:5000/api/contact-info", newContactInfo, config);
      setContactInfo(newContactInfo);
      setStatus({ type: "success", message: response.data.message });
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.message || "Une erreur est survenue" });
    }
  };

  const handleDelete = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      await axios.delete("http://localhost:5000/api/contact-info", config);
      setContactInfo({ email: "", phone: "" });
      setStatus({ type: "success", message: "Informations supprimées avec succès" });
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.message || "Une erreur est survenue" });
    }
  };

  const handleAdd = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const response = await axios.post("http://localhost:5000/api/contact-info", newContactInfo, config);
      setContactInfo(response.data.data);
      setStatus({ type: "success", message: response.data.message });
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.message || "Erreur lors de l'ajout des informations" });
    }
  };

  const gradientBlue = {
    background: "linear-gradient(to right, #1e3c72, #2a5298)",
    color: "white",
    border: "none",
    transition: "all 0.3s ease",
    fontSize: "14px",
  };

  const gradientRed = {
    background: "linear-gradient(to right, #ff4e50, #f00000)",
    color: "white",
    border: "none",
    transition: "all 0.3s ease",
    fontSize: "14px",
  };

  return (
    <>
      <Sidebar />
      <div className="container mt-5">
        <div className="card shadow-lg p-4" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 className="text-center mb-4" style={{ fontSize: "20px", color: "#0d47a1" }}>
            Edit contact information
          </h2>

          {status && (
            <div className={`alert ${status.type === "success" ? "alert-success" : "alert-danger"}`} style={{ fontSize: "14px" }}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={newContactInfo.email}
                onChange={handleInputChange}
                className="form-control"
                style={{ fontSize: "14px", padding: "10px" }}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={newContactInfo.phone}
                onChange={handleInputChange}
                className="form-control"
                style={{ fontSize: "14px", padding: "10px" }}
              />
            </div>

            <button type="submit" className="btn btn-block mt-3" style={gradientBlue}>
              Save changes
            </button>
          </form>

          <button onClick={handleDelete} className="btn btn-block mt-3" style={gradientRed}>
            Delete information
          </button>

          {isAdmin && (
            <button
              onClick={handleAdd}
              className="btn btn-block mt-3"
              style={{ ...gradientBlue, background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)" }}
              disabled={!newContactInfo.email || !newContactInfo.phone}
            >
              Add contact info
            </button>
          )}

          <h3 className="mt-4" style={{ fontSize: "18px" }}>Informations actuelles</h3>
          <div className="border p-3" style={{ fontSize: "14px" }}>
            <p><strong>Email:</strong> {contactInfo.email}</p>
            <p><strong>Phone:</strong> {contactInfo.phone}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactInfo;
