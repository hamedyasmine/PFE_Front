import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

function ListeJob() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const jobsPerPage = 2;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs');
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des offres d'emploi");
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Fonction pour calculer la différence de temps
  const timeAgo = (date) => {
    const now = new Date();
    const postedDate = new Date(date);
    const diffInSeconds = Math.floor((now - postedDate) / 1000);

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInSeconds / 3600);
    const diffInDays = Math.floor(diffInSeconds / (3600 * 24));

    if (diffInDays > 1) return `${diffInDays} days ago`;
    if (diffInDays === 1) return `Yesterday`;
    if (diffInHours > 1) return `${diffInHours} hours ago`;
    if (diffInHours === 1) return `1 hour ago`;
    if (diffInMinutes > 1) return `${diffInMinutes} minutes ago`;
    return `Just now`;
  };

  // Gestion de la pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="featured-job-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="count-job mb-35">
              <span>{jobs.length} Jobs found</span>
            </div>
          </div>
        </div>

        {currentJobs.map((job) => (
          <div key={job._id} className="job-item d-flex justify-content-between align-items-center p-3 border-bottom">
            <div>
              <h4>{job.name}</h4>
              <p>{job.category.name} - {job.location}</p>
              <small>
                {timeAgo(job.postedAt)} | <strong>{job.jobType}</strong>
              </small>
            </div>
            <Link to={`/job_details/${job._id}`} className="apply-button">
              Apply
            </Link>
          </div>
        ))}

        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </section>
  );
}

export default ListeJob;
