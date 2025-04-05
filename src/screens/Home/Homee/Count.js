import React, { useState, useEffect } from "react";

function Counts() {
  // Utilisation de useState pour stocker les données des compteurs
  const [countersState, setCountersState] = useState([]);

  // Utilisation de useEffect pour récupérer les données lors du chargement du composant
  useEffect(() => {
    // Appel API pour récupérer les compteurs depuis le backend
    fetch("http://localhost:5000/api/counters/getcounter")
      .then((response) => response.json())  // Transformer la réponse en JSON
      .then((data) => setCountersState(data))  // Mettre à jour le state avec les données
      .catch((error) => console.error("Erreur lors du chargement des compteurs:", error));
  }, []); // Le tableau vide [] signifie que l'effet se lance une seule fois au chargement du composant

  return (
    <section id="counts" className="counts">
      <div className="container">
        <div className="row counters">
          {countersState.length > 0 ? (
            countersState.map((counter, index) => (
              <div key={index} className="col-lg-3 col-6 text-center">
                <span className="purecounter">{counter.value}</span>
                <p>{counter.label}</p>
              </div>
            ))
          ) : (
            <p>Chargement des compteurs...</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Counts;
