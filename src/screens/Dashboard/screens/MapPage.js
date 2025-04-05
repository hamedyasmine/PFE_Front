import React, { useState, useEffect } from "react";
import axios from "axios";

function ContactInfo() {
  const [contactInfo, setContactInfo] = useState({ email: "", phone: "" });
  const [newContactInfo, setNewContactInfo] = useState({ email: "", phone: "" });
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState("");
  const [status, setStatus] = useState(null);

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

    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/places");
        setLocations(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des locations", error);
        setStatus({ type: "error", message: "Erreur lors du chargement des locations" });
      }
    };

    fetchContactInfo();
    fetchLocations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContactInfo({ ...newContactInfo, [name]: value });
  };

  const handleLocationChange = (e) => {
    setNewLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:5000/api/contact-info", newContactInfo);
      setContactInfo(newContactInfo);
      setStatus({ type: "success", message: response.data.message });
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.message || "Une erreur est survenue" });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/api/contact-info");
      setContactInfo({ email: "", phone: "" });
      setStatus({ type: "success", message: "Informations supprimées avec succès" });
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.message || "Une erreur est survenue" });
    }
  };

  const handleAddLocation = async (e) => {
    e.preventDefault();
    if (!newLocation.trim()) return;
    try {
      const response = await axios.post("http://localhost:5000/api/places", { name: newLocation });
      setLocations([...locations, response.data.data]);
      setNewLocation("");
      setStatus({ type: "success", message: "Location ajoutée avec succès" });
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.message || "Erreur lors de l'ajout de la location" });
    }
  };

  const handleDeleteLocation = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/places/${id}`);
      setLocations(locations.filter((location) => location._id !== id));
      setStatus({ type: "success", message: "Location supprimée avec succès" });
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.message || "Erreur lors de la suppression de la location" });
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Modifier les informations de contact</h2>

        {status && (
          <div className={`alert ${status.type === "success" ? "alert-success" : "alert-danger"}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={newContactInfo.email} onChange={handleInputChange} className="form-control" />
          </div>

          <div className="form-group">
            <label>Téléphone</label>
            <input type="text" name="phone" value={newContactInfo.phone} onChange={handleInputChange} className="form-control" />
          </div>

          <button type="submit" className="btn btn-primary btn-block mt-3">
            Sauvegarder les modifications
          </button>
        </form>

        <button onClick={handleDelete} className="btn btn-danger btn-block mt-3">
          Supprimer les informations
        </button>

        <h3 className="mt-4">Informations actuelles</h3>
        <div className="border p-3">
          <p><strong>Email:</strong> {contactInfo.email}</p>
          <p><strong>Téléphone:</strong> {contactInfo.phone}</p>
        </div>

        <h3 className="mt-4">Gérer les locations</h3>
        <form onSubmit={handleAddLocation} className="form-inline mb-3">
          <input type="text" value={newLocation} onChange={handleLocationChange} className="form-control mr-2" placeholder="Nouvelle location" />
          <button type="submit" className="btn btn-success">Ajouter</button>
        </form>

        <ul className="list-group">
          {locations.map((location) => (
            <li key={location._id} className="list-group-item d-flex justify-content-between align-items-center">
              {location.name}
              <button onClick={() => handleDeleteLocation(location._id)} className="btn btn-danger btn-sm">Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ContactInfo;
