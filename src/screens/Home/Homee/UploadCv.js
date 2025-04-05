import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importer Link pour gérer la navigation

function UploadCv() {
  const [title, setTitle] = useState("Candidature Simplifiée");
  const [description, setDescription] = useState("Postulez facilement avec votre CV en ligne !");
  
  useEffect(() => {
    // Logique de récupération des données si nécessaire
  }, []);

  return (
    <div
  className="online-cv cv-bg section-overly pt-90 pb-120"
  style={{
    backgroundImage: "url('/assets/img/gallery/cv_bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-xl-10">
        {/* Titre et description avec les couleurs spécifiées */}
        <div className="text-center">
          <h2 style={{ color: "#0b1c39" }}>Candidature Simplifiée</h2> {/* Candidature Simplifiée en rose */}
          <p style={{ color: "#0b1c39" }}>Postulez facilement avec votre CV en ligne !</p> {/* Description en bleu */}
        </div>

        {/* Bouton de redirection avec le même design */}
        <div className="browse-btn2 text-center mt-50">
          <Link to="/simplified-application" className="border-btn2">
            Candidature Simplifiée
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default UploadCv;
