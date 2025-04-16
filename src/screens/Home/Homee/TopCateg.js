import React, { useState, useEffect } from "react";
import TopCategItem from "../../../components/HomeItem/TopCategItem";
import axios from "axios";

function TopCateg() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="our-services section-pad-t30" style={{ backgroundColor: "#fff" }}>
      <div className="container">
        {/* Titre de la section */}
        <div className="row mb-5">
          <div className="col-lg-12">
            <div className="section-tittle text-center">
              <span style={{ color: "#0b3d91", fontWeight: "bold" }}>Our Job Sectors</span>
              <h2 style={{ fontWeight: "700" }}>Browse Top Categories</h2>
            </div>
          </div>
        </div>

        {/* Liste des catégories */}
        <div className="row d-flex justify-content-center">
          {categories.map((category) => (
            <TopCategItem
              key={category._id || category.id}
              name={category.name}
              count={category.jobCount || 0}
            />
          ))}
        </div>

        {/* Bouton pour voir toutes les catégories */}
        <div className="row">
          <div className="col-lg-12">
            <div className="browse-btn2 text-center mt-50">
              <a
                href="/findjob"
                className="border-btn2"
                style={{
                  border: "2px solid #0b3d91",
                  padding: "10px 25px",
                  borderRadius: "25px",
                  color: "#0b3d91",
                  fontWeight: "600",
                  textDecoration: "none",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#0b3d91", e.target.style.color = "#fff")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent", e.target.style.color = "#0b3d91")}
              >
                Browse All Sectors
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopCateg;
