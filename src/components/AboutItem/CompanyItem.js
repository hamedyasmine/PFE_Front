import React from 'react';

// Composant qui affiche un élément avec un titre et une description
function CompanyItem({ title, description }) {
  return (
    <div className="about-item">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default CompanyItem;
