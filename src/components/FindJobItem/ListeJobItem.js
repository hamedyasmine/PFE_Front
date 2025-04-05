import React from "react";
import { Link } from "react-router-dom";

function JobItem({ job }) {
  return (
    <div className="single-job-items mb-30 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        {/* Détails du job */}
        <div className="job-tittle job-tittle2 ml-3">
          <Link to={`/job_details/${job._id}`}>
            <h4>{job.name}</h4> {/* Affichage du nom du job */}
          </Link>
          <ul>
            <li>{job.category.name}</li> {/* Affichage de la catégorie */}
            <li>
              <i className="fas fa-map-marker-alt" /> {job.location} {/* Affichage de la localisation */}
            </li>
          </ul>
        </div>
      </div>

      {/* Type du job + Date + Bouton Apply */}
      <div className="items-link items-link2 text-right">
        <span className="badge badge-primary">{job.jobType}</span> {/* Type du job sous forme de badge */}
        <p className="text-muted">{new Date(job.postedAt).toLocaleDateString()}</p> {/* Date de publication du job */}
        <Link to={`/apply/${job._id}`} className="btn btn-success btn-sm">Apply</Link> {/* Bouton Apply */}
      </div>
    </div>
  );
}

export default JobItem;
