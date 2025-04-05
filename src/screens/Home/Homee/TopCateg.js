import React, { useState, useEffect } from "react";
import TopCategItem from "../../../components/HomeItem/TopCategItem";

function TopCateg() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Simulation de récupération des catégories
    setCategories([
      { id: 1, name: "HR", icon: "flaticon-tour", count: 653 },
      { id: 2, name: "IT", icon: "flaticon-cms", count: 658 },
      { id: 3, name: "Sales Supply Chain Management", icon: "flaticon-report", count: 658 },
      { id: 4, name: "Research, Design & Development", icon: "flaticon-app", count: 658 },
      { id: 5, name: "Process Management & Production Process Engineering", icon: "flaticon-helmet", count: 658 },
      { id: 6, name: "Project Management", icon: "flaticon-high-tech", count: 658 },
      { id: 7, name: "Quality customer interface", icon: "flaticon-real-estate", count: 658 },
      { id: 8, name: "Finance", icon: "flaticon-content", count: 658 },
    ]);
  }, []);

  return (
    <div className="our-services section-pad-t30">
      <div className="container">
        {/* Titre de la section */}
        <div className="row">
          <div className="col-lg-12">
            <div className="section-tittle text-center">
              <span>FEATURED TOURS Packages</span>
              <h2>Browse Top Categories</h2>
            </div>
          </div>
        </div>

        {/* Liste des catégories */}
        <div className="row d-flex justify-content-center">
          {categories.map((category) => (
            <TopCategItem key={category.id} {...category} />
          ))}
        </div>

        {/* Bouton pour voir toutes les catégories */}
        <div className="row">
          <div className="col-lg-12">
            <div className="browse-btn2 text-center mt-50">
              <a href="/findjob" className="border-btn2">Browse All Sectors</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopCateg;
