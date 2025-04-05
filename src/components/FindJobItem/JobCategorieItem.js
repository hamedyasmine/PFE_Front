import React, { useState, useEffect } from "react";

function JobCategorieItem({ selectedCategory, onCategoryChange, categories }) {
  const [category, setCategory] = useState(selectedCategory);

  useEffect(() => {
    setCategory(selectedCategory); // Mettre à jour la catégorie lorsqu'elle change
  }, [selectedCategory]);

  const handleChange = (event) => {
    const newCategory = event.target.value;
    setCategory(newCategory);
    onCategoryChange(newCategory); // Appeler la fonction de changement de catégorie
  };

  return (
    <div className="single-listing">
      <div className="small-section-tittle2">
        <h4>Job Category</h4>
      </div>

      {/* Liste déroulante pour la sélection de la catégorie */}
      <div className="select-job-items2">
        <select
          name="select"
          value={category}
          onChange={handleChange}
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#333",
            padding: "6px 10px",
            height: "36px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            cursor: "pointer",
            width: "100%",
            maxWidth: "300px",
          }}
        >
          <option value="all">All Categories</option>
          {categories && categories.length > 0 ? (
            categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))
          ) : (
            <option disabled>No categories available</option> // Affiche un message si aucune catégorie
          )}
        </select>
      </div>
    </div>
  );
}

export default JobCategorieItem;
