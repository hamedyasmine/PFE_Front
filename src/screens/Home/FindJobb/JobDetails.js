import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function JobDetails() {
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

  if (loading) return <div style={styles.loading}>Chargement des détails du poste...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.card}>
          {job ? (
            <>
              <h2 style={styles.title}>{job.name}</h2>
              <div style={styles.detail}>
                <p><strong>Category :</strong> {job.category?.name}</p>
                <p><strong>Location :</strong> {job.location}</p>
                <p><strong>Type :</strong> {job.jobType}</p>
                <p><strong>Description :</strong> {job.description}</p>
                <p><strong>Duration :</strong> {job.duration} jours</p>
                <p><strong>Posted On :</strong> {new Date(job.postedAt).toLocaleDateString()}</p>
              </div>

              <div style={styles.buttonContainer}>
                <Link 
                  to={`/joblogin`} 
                  state={{ jobId: job._id }} 
                  style={styles.button}
                >
                  Apply Now
                </Link>
              </div>
            </>
          ) : (
            <p>Poste introuvable.</p>
          )}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: "#f8f9fa",
    padding: "50px 0",
    minHeight: "100vh"
  },
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "0 20px"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    color: "#343a40"
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
    borderBottom: "2px solid #dee2e6",
    paddingBottom: "10px"
  },
  detail: {
    lineHeight: "1.8",
    fontSize: "1rem"
  },
  buttonContainer: {
    marginTop: "30px",
    textAlign: "center"
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "1.1rem",
    padding: "12px 24px",
    borderRadius: "6px",
    textDecoration: "none",
    display: "inline-block",
    transition: "background-color 0.3s ease"
  },
  loading: {
    textAlign: "center",
    padding: "100px 0",
    fontSize: "1.25rem",
    color: "#6c757d"
  },
  error: {
    textAlign: "center",
    padding: "100px 0",
    fontSize: "1.25rem",
    color: "#dc3545"
  }
};

export default JobDetails;
