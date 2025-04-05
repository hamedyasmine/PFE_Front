import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Importer useNavigate
import axios from "axios";
import { Link } from "react-router-dom";

const UserApplication = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Créer la fonction de navigation
  

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
        const response = await axios.get("http://localhost:5000/api/applications/my-applications", config);
        console.log("Données reçues :", response.data);
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
    // Naviguer vers la page des questions
    navigate(`/questions/${applicationId}`);
  };
  const handleViewDetails = (jobId) => {
    navigate(`/jobs/${jobId}`); // 👈 Naviguer vers la page détails du job
  };

  return (
    <div>
      <div className="container">
        <h1>Mes Candidatures</h1>

        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : applications.length === 0 ? (
          <p>Aucune candidature trouvée.</p>
        ) : (
          <ul>
            {applications.map((app) => {
              return (
                <li key={app._id} className="job-card">
<h2 className="job-title">{app.job?.name || "Nom du job non disponible"}</h2>
<p className="company">{app.job?.location || "location non disponible"}</p>
<p className="duration">
  {app.job?.duration ? `Durée : ${app.job.jobType}` : "type non disponible"}
</p>


                  <span className={`status ${app.status === "accepted" ? "accepted" : app.status === "rejected" ? "rejected" : "pending"}`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                  <Link to={`/ApplicationDetails/${app.job?._id}`} className="btn btn-outline-primary" style={{ marginTop: '10px' }}>
  Voir les détails
</Link>

                  {app.status === "accepted" && (
  <>
    {app.deadlineMessage && (
  <p style={{ color: "red", fontWeight: "bold" }}>{app.deadlineMessage}</p>
)}

    <button onClick={() => handleViewQuestions(app._id)}>
      Voir les questions d'entretien
    </button>
    
  </>
)}

                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserApplication;
