import React, { useState, useEffect } from 'react';
import ValueItem from '../../../components/AboutItem/ValuesItem'; // Assure-toi que le chemin est correct

function Values() {
  const [values, setValues] = useState([]); // Initialise un état pour stocker les valeurs
  const [loading, setLoading] = useState(true); // État pour gérer le chargement

  useEffect(() => {
    // Simulation de récupération des données (tu peux remplacer ça par un appel API réel)
    setTimeout(() => {
      const fetchedValues = [
        { title: "Care", description: "Recognizing the needs of others and considering them in our actions." },
        { title: "Result orientation", description: "Knowing and achieving goals and expected results." },
        { title: "Respect", description: "Treating each other as equals in an open manner while considering diversity." },
        { title: "Responsibility", description: "Accepting it, acting reliably, standing up for one’s actions and being accountable for them." },
        { title: "Collaboration", description: "Working for a common cause based on trust and diversity of opinion." },
      ];
      setValues(fetchedValues); // Met à jour les valeurs dans l'état
      setLoading(false); // On marque la fin du chargement
    }, 2000); // Délai pour simuler une récupération de données
  }, []); // Le tableau vide [] signifie que l'effet ne s'exécute qu'une seule fois au chargement du composant

  return (
    <div className="about-section-padding">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="about-section-tittle text-center mb-4">
              <h2>Our Values</h2>
              <p>These are the values that guide our work and vision.</p>
            </div>
            <div className="text-center">
              <img
                src="https://www.shutterstock.com/image-illustration/our-values-text-written-over-260nw-1257938047.jpg"
                alt="Values"
                style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
              />
            </div>
            <div>
              {loading ? (
                <p>Loading values...</p> // Afficher un message de chargement
              ) : (
                <ul>
                  {values.map((value, index) => (
                    <ValueItem key={index} title={value.title} description={value.description} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Values;
