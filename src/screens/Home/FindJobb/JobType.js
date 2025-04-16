import React, { useState, useEffect } from "react";
import JobTypeItem from "../../../components/FindJobItem/JobTypeItem";

function JobType({ onSelectionChange }) {
  const [jobTypes, setJobTypes] = useState([]);

  useEffect(() => {
    // Simuler une requête API pour récupérer les types de jobs
    const fetchJobTypes = async () => {
      
      const dummyJobTypes = [
        { id: 1, label: "Full-time", checked: false },
        { id: 2, label: "Internship", checked: false },
        { id: 3, label: "Freelance", checked: false },
      ];
      setJobTypes(dummyJobTypes);
    };

    fetchJobTypes();
  }, []);

  // Gérer la sélection/déselection des checkboxes
  const handleCheckboxChange = (id) => {
    const updatedJobTypes = jobTypes.map((job) =>
      job.id === id ? { ...job, checked: !job.checked } : job
    );
    setJobTypes(updatedJobTypes);

    // Envoyer la liste des types sélectionnés au parent
    if (onSelectionChange) {
      onSelectionChange(updatedJobTypes.filter((job) => job.checked));
    }
  };

  return (
    <div className="single-listing">
      <div className="select-Categories pb-50">
        <div className="small-section-tittle2">
        <h4>Job Type</h4>
      </div>
      {jobTypes.map((job) => (
        <JobTypeItem
          key={job.id}
          label={job.label}
          checked={job.checked}
          onChange={() => handleCheckboxChange(job.id)}
        />
      ))}
    </div>
    </div>
  );
}

export default JobType;
