import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ApplicationDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${id}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des détails du job");
        }
        const data = await response.json();
        setJob(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) return <div>Loading job details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="job-details-area" style={{ padding: "30px 0", backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {job ? (
              <>
                <div className="job-detail-header" style={{ marginBottom: "20px", borderBottom: "2px solid #ccc", paddingBottom: "10px" }}>
                  <h2 style={{ color: "#343a40", fontSize: "2rem", fontWeight: "bold" }}>{job.name}</h2>
                  <p><strong>Category:</strong> {job.category?.name}</p>
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Type:</strong> {job.jobType}</p>
                  <p><strong>Description:</strong> {job.description}</p>
                  <p><strong>Duration:</strong> {job.duration} days</p>
                  <p><strong>Posted At:</strong> {new Date(job.postedAt).toLocaleDateString()}</p>
                </div>

                <div className="apply-button-container" style={{ textAlign: "center" }}>
              
                </div>
              </>
            ) : (
              <p>Job not found.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ApplicationDetails;
