import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

function GererLocations() {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState("");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/places");
        setLocations(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des locations", error);
        setStatus({ type: "error", message: "Erreur lors du chargement des locations" });
      }
    };

    fetchLocations();
  }, []);

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

  const gradientBlue = {
    background: "linear-gradient(to right, #1e3c72, #2a5298)",
    color: "white",
    border: "none",
    fontSize: "14px",
  };

  const gradientRed = {
    background: "linear-gradient(to right, #ff4e50, #f00000)",
    color: "white",
    border: "none",
    fontSize: "14px",
  };

  return (
    <>
      <Sidebar />
      <div className="container mt-5">
        <div className="card shadow-lg p-4" style={{ maxWidth: "600px", margin: "0 auto",background:"#f9f9f9" }}>
          <h2 className="text-center mb-4" style={{ fontSize: "20px",color:"#0d47a1" }}>Gérer les locations</h2>

          {status && (
            <div className={`alert ${status.type === "success" ? "alert-success" : "alert-danger"}`} style={{ fontSize: "14px" }}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleAddLocation} className="form-inline mb-3">
            <input
              type="text"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              className="form-control mr-2"
              placeholder="Nouvelle location"
              style={{ fontSize: "14px", padding: "10px" }}
            />
            <button type="submit" className="btn ml-2" style={gradientBlue}>
              Ajouter
            </button>
          </form>

          <ul className="list-group">
            {locations.map((location) => (
              <li key={location._id} className="list-group-item d-flex justify-content-between align-items-center" style={{ fontSize: "14px" }} >
                {location.name}
                <button onClick={() => handleDeleteLocation(location._id)} className="btn btn-sm" style={gradientRed}>
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default GererLocations;
