import React, { useState, useEffect } from "react";
import RecentJobItem from "../../../components/HomeItem/RecentJobItem";
import { Link } from "react-router-dom";

function RecentJob() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Récupération des 4 derniers jobs depuis le backend
    fetch("http://localhost:5000/api/jobs/recent") // Mets l'URL correcte selon ton serveur
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Erreur lors de la récupération des jobs:", error));
  }, []);

  return (
    <section className="featured-job-area feature-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-tittle text-center">
              <span>Recent Job</span>
              <h2>Featured Jobs</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-10">
            {/* Affichage dynamique des offres d'emploi */}
            {jobs.map((job) => (
              <div key={job._id}>
                <Link to={`/job_details/${job._id}`} style={{ textDecoration: "none" }}>
                  <RecentJobItem
                    title={job.name}
                    company="Company Name" // Remplace si tu as une info sur l'entreprise
                    location={job.location}
                    type={job.jobType}
                    timePosted={new Date(job.postedAt).toLocaleDateString()} // Format de date
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton "Browse All Sectors" */}
        <div className="row">
          <div className="col-lg-12">
            <div className="browse-btn2 text-center mt-50">
              <a href="/findjob" className="border-btn2">
                Browse All Sectors
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecentJob;
