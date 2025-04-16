import React, { useState } from "react";
import JobCategorie from "./JobCategorie";
import JobType from "./JobType";
import JobPlace from "./JobPlace"; 
import JobPost from "./JobPost";
import ListeJob from "./ListeJob";

function FindJobPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPostPeriod, setSelectedPostPeriod] = useState([]);

  // Gestionnaire pour les types d'emploi
  const handleJobTypeChange = (selectedTypes) => {
    setSelectedJobTypes(selectedTypes);
  };

  // Gestionnaire pour la localisation
  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  // Gestionnaire pour la période de publication
  const handlePostPeriodChange = (selectedPeriods) => {
    setSelectedPostPeriod(selectedPeriods);
  };

  return (
    <div className="container d-flex">
      <aside style={{ width: "25%" }}>
        <JobCategorie onCategoryChange={setSelectedCategory} />
        <JobType onSelectionChange={handleJobTypeChange} />
        <JobPlace onLocationChange={handleLocationChange} />
        <JobPost onSelectionChange={handlePostPeriodChange} />
      </aside>
      <main style={{ width: "75%" }}>
        <ListeJob 
          selectedCategory={selectedCategory}
          selectedJobTypes={selectedJobTypes}
          selectedLocation={selectedLocation}
          selectedPostPeriod={selectedPostPeriod}
        />
      </main>
    </div>
  );
}

export default FindJobPage;