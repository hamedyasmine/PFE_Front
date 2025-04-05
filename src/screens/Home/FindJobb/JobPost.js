import React, { useState, useEffect } from "react";
import JobPostItem from "../../../components/FindJobItem/JobtPostItem";

function JobPost({ onSelectionChange }) {
  const [postFilters, setPostFilters] = useState([]);

  useEffect(() => {
    // Simuler une récupération des données comme si elles venaient d'une API
    const fetchPostFilters = async () => {
      const dummyPostFilters = [
        { id: 1, label: "Any", checked: false },
        { id: 2, label: "Last 24 hours", checked: true },
        { id: 3, label: "Last 3 days", checked: false },
        { id: 4, label: "Last 7 days", checked: false },
        { id: 5, label: "Last 14 days", checked: false },
        { id: 6, label: "Last 30 days", checked: false },
      ];
      setPostFilters(dummyPostFilters);
    };

    fetchPostFilters();
  }, []);

  // Gérer la sélection/déselection des checkboxes
  const handleCheckboxChange = (id) => {
    const updatedFilters = postFilters.map((filter) =>
      filter.id === id ? { ...filter, checked: !filter.checked } : filter
    );
    setPostFilters(updatedFilters);

    // Envoyer les filtres sélectionnés au parent
    if (onSelectionChange) {
      onSelectionChange(updatedFilters.filter((filter) => filter.checked));
    }
  };

  return (
    <div className="single-listing">
      <div className="select-Categories pb-50">
        <div className="small-section-tittle2">
          <h4>Posted Within</h4>
        </div>
        {postFilters.map((filter) => (
          <JobPostItem
            key={filter.id}
            label={filter.label}
            checked={filter.checked}
            onChange={() => handleCheckboxChange(filter.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default JobPost;
