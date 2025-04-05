import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header"; // Vérifie le bon chemin

const ShowMoreJob = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const jobDetails = [
      { id: 1, title: "Digital Marketer", company: "Creative Agency", description: "Description of the job..." },
      { id: 2, title: "Software Engineer", company: "Tech Startup", description: "Description of the job..." },
      { id: 3, title: "Project Manager", company: "Consulting Firm", description: "Description of the job..." },
      { id: 4, title: "UX Designer", company: "Creative Studio", description: "Description of the job..." },
    ];

    const selectedJob = jobDetails.find((job) => job.id === parseInt(jobId));
    setJob(selectedJob);
  }, [jobId]);

  return (
    <>
      <Header />  {/* Vérifie que cette ligne est bien là */}
      <section className="job-details-area">
        {job ? (
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>{job.title}</h2>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Description:</strong> {job.description}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            <p>Loading job details...</p>
          </div>
        )}
      </section>
    </>
  );
};

export default ShowMoreJob;
