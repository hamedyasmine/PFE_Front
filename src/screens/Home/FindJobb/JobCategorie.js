import React, { useState, useEffect } from "react";


function JobCategorie({ onCategoryChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <h4>Catégorie</h4>
      <select onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">Toutes</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>
    </div>
  );
}
export default JobCategorie;