import React, { useState, useEffect } from "react";

function Hero() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]); // État pour stocker les catégories
  const [locations, setLocations] = useState([]); // État pour stocker les locations

  // Récupérer les catégories depuis l'API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        const data = await response.json();
        console.log("Categories received:", data); // Debugging
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Récupérer les locations depuis l'API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/places");
        const data = await response.json();
        console.log("Locations received:", data); // Debugging
        setLocations(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des locations:", error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="slider-area">
      <div className="slider-active">
        <div
          className="single-slider slider-height d-flex align-items-center"
          style={{
            backgroundImage: "url('/assets/img/hero/h1_hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-9 col-md-10">
                <div className="hero__caption">
                  <h1>Explore Exciting Career Opportunities at LEONI</h1>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-8">
                <form action="#" className="search-box">
                  {/* Sélecteur de catégories avec le même design que Location */}
                  <div className="select-form">
                    <div className="select-itms">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        <option value="">Category</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Sélecteur de localisation dynamique */}
                  <div className="select-form">
                    <div className="select-itms">
                      <select name="select" id="select1">
                        <option value="">Location</option>
                        {locations.map((location) => (
                          <option key={location._id} value={location.name}>
                            {location.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="search-form">
                    <a href="#">Find job</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
