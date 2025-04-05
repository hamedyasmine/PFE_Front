import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function AccountPost() {
  const location = useLocation();
  const navigate = useNavigate();
  const jobId = location.state?.jobId;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [cv, setCv] = useState(null);
  
  // Pour debugging
  console.log("Job ID received in AccountPost:", jobId);
  
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Redirect if not logged in
    if (!token || !userId) {
      navigate("/joblogin");
    }
  }, [token, userId, navigate]);

  const handleFileChange = (e) => {
    setCv(e.target.files[0]);
  };

  const handleApply = async (e) => {
    e.preventDefault();
    
    if (!jobId) {
      setError("No job ID found. Please try applying from the job details page.");
      return;
    }

    if (!cv) {
      setError("Veuillez télécharger votre CV.");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      // Créer un FormData pour envoyer le fichier CV
      const formData = new FormData();
      formData.append("cv", cv);
      formData.append("jobId", jobId);
      
      const response = await axios.post(
        "http://localhost:5000/api/applications/apply",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      
      setSuccess(true);
      // Redirect to success page or show success message
    } catch (err) {
      console.error("Error applying for job:", err);
      setError(err.response?.data?.message || "Error submitting application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4>Postuler à l'offre d'emploi</h4>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              {success ? (
                <div className="alert alert-success" role="alert">
                  <h5>Votre candidature a été soumise avec succès!</h5>
                  <p>Nous vous contacterons prochainement pour vous informer de l'avancement de votre candidature.</p>
                  <button 
                    className="btn btn-primary mt-3" 
                    onClick={() => navigate("/userapplication ")}
                  >
                    Mes Candidatures
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply}>
                  <div className="mb-3">
                    <p>Vous êtes sur le point de postuler pour l'offre <strong>ID: {jobId || "Inconnu"}</strong></p>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="cv" className="form-label">Télécharger votre CV (PDF)</label>
                    <input 
                      type="file" 
                      className="form-control" 
                      id="cv" 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleFileChange}
                      required
                    />
                    <div className="form-text">Formats acceptés: PDF, DOC, DOCX</div>
                  </div>
                  
                  <div className="d-flex justify-content-between">
                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      disabled={loading || !jobId}
                    >
                      {loading ? 
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Envoi en cours...
                        </> : 
                        "Envoyer ma candidature"
                      }
                    </button>
                    
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => navigate(-1)}
                    >
                      Retour
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPost;