import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import NavbarUser from "./NavbarUser"; // adapte le chemin si besoin


const UserApplication = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Aucun token trouvé. L'utilisateur doit se connecter.");
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(
          "http://localhost:5000/api/applications/my-applications",
          config
        );
        setApplications(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des candidatures :", error);
        setError("Erreur lors de la récupération des candidatures. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleViewQuestions = (applicationId) => {
    navigate(`/questions/${applicationId}`);
  };

  return (
    <>
      <NavbarUser />
      <div style={styles.container}>
        <h1 style={styles.title}>Mes Candidatures</h1>
  
        {loading ? (
          <p style={styles.textGray}>Chargement...</p>
        ) : error ? (
          <div style={styles.textError}>{error}</div>
        ) : applications.length === 0 ? (
          <p style={styles.textGray}>Aucune candidature trouvée.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {applications.map((app) => (
              <div key={app._id} style={styles.card}>
                <div style={{ flex: 1 }}>
                  <h2 style={styles.jobTitle}>
                    {app.job?.name || "Nom du job non disponible"}
                  </h2>
                  <p style={styles.location}>{app.job?.location || "Lieu non disponible"}</p>
                  <p style={styles.jobType}>
                    {app.job?.jobType ? `Type : ${app.job.jobType}` : "Type non disponible"}
                  </p>
                </div>
  
                <div style={styles.rightSection}>
                  <span
                    style={{
                      ...styles.statusBadge,
                      backgroundColor:
                        app.status === "accepted"
                          ? "#d0f0c0"
                          : app.status === "rejected"
                          ? "#ffcdd2"
                          : "#fff9c4",
                      color:
                        app.status === "accepted"
                          ? "#2e7d32"
                          : app.status === "rejected"
                          ? "#c62828"
                          : "#f9a825",
                    }}
                  >
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
  
                  <Link
                    to={`/ApplicationDetails/${app.job?._id}`}
                    style={styles.link}
                  >
                    Voir les détails du job
                  </Link>
  
                  {app.status === "accepted" && (
                    <div style={{ marginTop: "10px" }}>
                      {app.deadlineMessage && (
                        <p style={{ color: "#d32f2f", fontWeight: "bold" }}>
                          {app.deadlineMessage}
                        </p>
                      )}
  
                      {app.answers && Object.keys(app.answers).length > 0 ? (
                        <button style={styles.disabledButton} disabled>
                          Entretien déjà passé
                        </button>
                      ) : (
                        <button
                          onClick={() => handleViewQuestions(app._id)}
                          style={styles.viewButton}
                        >
                          Voir les questions d'entretien
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
  
};

const styles = {
  container: {
    width: "85%",
    margin: "40px auto",
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#0d47a1",
    marginBottom: "20px",
  },
  textGray: {
    color: "#666",
  },
  textError: {
    color: "#d32f2f",
    fontWeight: "bold",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    background: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    borderLeft: "6px solid #0d47a1",
  },
  jobTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#1565c0",
    marginBottom: "8px",
  },
  location: {
    color: "#666",
    marginBottom: "4px",
  },
  jobType: {
    color: "#999",
  },
  rightSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "10px",
    minWidth: "250px",
  },
  statusBadge: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  viewButton: {
    background: "#0d47a1",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  disabledButton: {
    background: "#e0e0e0",
    color: "#888",
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "not-allowed",
  },
  link: {
    color: "#0d47a1",
    fontWeight: "bold",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default UserApplication;
