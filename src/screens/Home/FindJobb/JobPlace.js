import React, { useState, useEffect } from "react";
import JobPlaceItem from "../../../components/FindJobItem/JobPlaceItem";
import axios from "axios";

function JobPlace({ onLocationChange }) {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Récupérer les données de places depuis le backend
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/places");
        const fetchedLocations = response.data.map((place) => ({
          value: place.name,
          label: place.name,
        }));
        setLocations(fetchedLocations);
      } catch (error) {
        console.error("Erreur lors de la récupération des lieux", error);
      }
    };

    fetchLocations();
  }, []); // L'effet est exécuté une seule fois au montage du composant

  const handleLocationChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedLocation(selectedValue);

    // Transmettre la valeur sélectionnée au parent
    if (onLocationChange) {
      onLocationChange(selectedValue);
    }
  };

  return (
    <div className="single-listing">
      <div className="small-section-tittle2">
        <h4>Job Location</h4>
      </div>

      <div className="select-job-items2">
        <select
          name="select"
          value={selectedLocation}
          onChange={handleLocationChange}
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "12px",
            fontWeight: "bold",
            color: "#333",
            padding: "4px",
            height: "30px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            cursor: "pointer",
            zIndex: 1000,
            position: "relative",
          }}
        >
          <option value="">Sélectionner une ville</option>
          {locations.map((location) => (
            <JobPlaceItem key={location.value} value={location.value} label={location.label} />
          ))}
        </select>
      </div>
    </div>
  );
}

export default JobPlace;
