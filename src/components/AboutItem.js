import React from "react";

function AboutItem({ title, description }) {
  return (
    <div className="support-caption">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default AboutItem;
