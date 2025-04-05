import React from "react";
import { Link } from "react-router-dom";

function RecentJobItem({_id, title, company, location, timePosted, type }) {
  return (
    <div className="job-item d-flex justify-content-between align-items-center p-3 border-bottom">
      <div className="job-details" style={{ flex: 1 }}>
        <h4>{title}</h4>
        <p>{company} - {location}</p>
        <small>{timePosted} &nbsp; | &nbsp; <small>{type}</small></small>
      </div>

      
    </div>
  );
}

export default RecentJobItem;
