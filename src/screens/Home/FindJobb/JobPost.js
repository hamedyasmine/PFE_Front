import React, { useState, useEffect } from "react";
import JobPostItem from "../../../components/FindJobItem/JobtPostItem";

function JobPost({ onPostPeriodChange }) {
  const [postFilters, setPostFilters] = useState([]);

  useEffect(() => {
    const fetchPostFilters = async () => {
      const dummyPostFilters = [
        { id: 1, label: "Any", value: 0, checked: false },
        { id: 2, label: "Last 24 hours", value: 1, checked: false },
        { id: 3, label: "Last 3 days", value: 3, checked: false },
        { id: 4, label: "Last 7 days", value: 7, checked: false },
        { id: 5, label: "Last 14 days", value: 14, checked: false },
        { id: 6, label: "Last 30 days", value: 30, checked: false },
      ];
      setPostFilters(dummyPostFilters);
    };

    fetchPostFilters();
  }, []);

  const handleCheckboxChange = (id) => {
    const updatedFilters = postFilters.map((filter) =>
      filter.id === id ? { ...filter, checked: !filter.checked } : filter
    );
    setPostFilters(updatedFilters);

    // Get the value of selected period (in days)
    const selectedPeriods = updatedFilters
      .filter((filter) => filter.checked)
      .map((filter) => filter.value);

    // Send the selected period values to parent
    if (onPostPeriodChange) {
      onPostPeriodChange(selectedPeriods);
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