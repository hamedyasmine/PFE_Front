import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function ApplicationsList() {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [message, setMessage] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [similarities, setSimilarities] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [fraudReasons, setFraudReasons] = useState({});
  const [showAnalysis, setShowAnalysis] = useState(false);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";
  
// Ajoutez ces lignes dans les déclarations d'état au début de votre composant
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  
  // Fetch des catégories à l'initialisation
useEffect(() => {
  fetch("http://localhost:5000/api/categories") // adapte le endpoint à ton backend
    .then((res) => res.json())
    .then((data) => setCategories(data))
    .catch((err) => console.error("Erreur catégories:", err));
}, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/applications-simplifiees/applications")
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Vérification des données reçues
        setApplications(data);
      })
      .catch((err) => console.error("Erreur:", err));
  }, []);
  // Ajoutez cette fonction pour gérer le changement de catégorie
const handleCategoryChange = (e) => {
  const category = e.target.value;
  setSelectedCategory(category);
  
  // Filtrer les applications en fonction de la catégorie sélectionnée
  if (category) {
    setFilteredApplications(applications.filter(app => app.category === category));
  } else {
    // Si aucune catégorie n'est sélectionnée, afficher toutes les applications
    setFilteredApplications(applications);
  }
};
// Updated handleStatusChange function
const handleStatusChange = (id, newStatus) => {
    // Find the application to get email and other details
    const application = applications.find(app => app._id === id);
    if (!application) {
      console.error("Application not found");
      return;
    }

    // Update the application status in local state
    setApplications((prev) => {
      const updatedApplications = prev.map((app) =>
        app._id === id ? { ...app, status: newStatus } : app
      );
      return updatedApplications;
    });

    // Send update to backend
    const token = localStorage.getItem("token");
    
    // Log the request for debugging
    console.log(`Updating status for application ${id} to ${newStatus}`);
    
    fetch(`http://localhost:5000/api/applications-simplifiees/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => {
        // Log response status for debugging
        console.log(`Status update response code: ${res.status}`);
        
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Status updated successfully:", data);
        
        // Show success message to user
        setMessage("Status updated successfully");
        
        // Send email notification if status is Accepted or Rejected
        if (newStatus === "Accepted" || newStatus === "Rejected") {
          sendStatusEmail(application, newStatus);
        }
        
        // Clear message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((err) => {
        console.error("Error updating status:", err);
        
        // Show error message to user
        setMessage(`Failed to update status: ${err.message}`);
        
        // Clear message after 5 seconds
        setTimeout(() => setMessage(""), 5000);
        
        // Revert the local state change since the update failed
        setApplications((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, originalStatus: app.originalStatus || app.status } : app
          )
        );
      });
  };
 // Updated sendStatusEmail function to match the corrected backend endpoint
const sendStatusEmail = (application, status) => {
  const token = localStorage.getItem("token");
  
  // Prepare email data
  const emailData = {
    recipientEmail: application.email,
    recipientName: `${application.firstname} ${application.lastname}`,
    applicationId: application._id,
    status: status,
    category: application.category,
    jobType: application.jobType
  };
  
  console.log("Sending email notification with data:", emailData);
  
  // Updated URL to match the backend route
  fetch("http://localhost:5000/api/applications-simplifiees/send-status-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(emailData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error sending email: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Email sent successfully:", data);
      setMessage(`Status updated and notification email sent to ${application.email}`);
      setTimeout(() => setMessage(""), 5000);
    })
    .catch((err) => {
      console.error("Failed to send email notification:", err);
      setMessage(`Status updated but failed to send email: ${err.message}`);
      setTimeout(() => setMessage(""), 5000);
    });
};


  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
  
    fetch(`http://localhost:5000/api/applications-simplifiees/applications-simplifiees/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        setApplications(applications.filter((app) => app._id !== id));
        setMessage("Candidature supprimée avec succès");
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((err) => console.error("Erreur lors de la suppression:", err));
  };
  
const handleSimilarityCheck = async () => {
  const token = localStorage.getItem("token");
  if (!selectedCategory) {
    alert("Please select a category first.");
    return;
  }
  
  setMessage("Calcul des scores en cours...");
  
  // Tableau pour stocker toutes les promesses des analyses
  const analysisPromises = [];

  for (let app of filteredApplications) {
    // Créer une promesse pour chaque analyse d'application
    const appPromise = (async () => {
      try {
        // Initialize scores object for this application if it doesn't exist
        setSimilarities((prev) => ({
          ...prev,
          [app._id]: prev[app._id] || {},
        }));

        // Analyse du CV classique
        if (app.cv) {
          const formDataCv = new FormData();
          formDataCv.append("job_description", jobDescription);

          const responseCv = await fetch(`http://localhost:5000/${app.cv}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const blobCv = await responseCv.blob();
          const fileCv = new File([blobCv], app.cv.split("/").pop(), { type: blobCv.type });

          formDataCv.append("cv_file", fileCv);

          const resCv = await fetch("http://localhost:5000/api/analyze-cv", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formDataCv,
          });

          const dataCv = await resCv.json();

          if (dataCv.fraud) {
            setFraudReasons((prev) => ({
              ...prev,
              [app._id]: dataCv.flags,
            }));
          } else {
            const cvScore = dataCv?.results?.[0]?.score || 0;
            setSimilarities((prev) => ({
              ...prev,
              [app._id]: {
                ...prev[app._id],
                cv: cvScore.toFixed(2),
              },
            }));
          }
        } else {
          // No CV exists
          setSimilarities((prev) => ({
            ...prev,
            [app._id]: {
              ...prev[app._id],
              cv: "0.00",
            },
          }));
        }

        // Analyse du CV Parlant
        if (app.cvSpeaking) {
          try {
            const formDataCvSpeaking = new FormData();

            // Récupérer le fichier média
            const responseCvSpeaking = await fetch(`http://localhost:5000/${app.cvSpeaking}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const blobCvSpeaking = await responseCvSpeaking.blob();
            const fileCvSpeaking = new File([blobCvSpeaking], app.cvSpeaking.split("/").pop(), { type: blobCvSpeaking.type });

            formDataCvSpeaking.append("media", fileCvSpeaking);
            formDataCvSpeaking.append("jobDescription", jobDescription);
            formDataCvSpeaking.append("email", app.email);

            // Appeler l'API de transcription Node.js
            const resCvSpeaking = await fetch("http://localhost:5000/api/cvparlant", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formDataCvSpeaking,
            });

            if (resCvSpeaking.ok) {
              const analysisData = await resCvSpeaking.json();
              console.log("CV parlant analysis:", analysisData); // Debug

              const cvSpeakingScore = analysisData?.score || 0;

              setSimilarities((prev) => {
                // Get current CV score or default to 0
                const cvScore = parseFloat(prev[app._id]?.cv || 0);
                const speakingScore = parseFloat(cvSpeakingScore);

                // Calculate total score (70% CV + 30% CV parlant)
                const totalScore = (cvScore * 0.7) + (speakingScore * 0.3);

                return {
                  ...prev,
                  [app._id]: {
                    ...prev[app._id],
                    cvSpeaking: cvSpeakingScore.toFixed(2),
                    cvConfidenceScore: analysisData?.confidenceScore?.toFixed(2) || "N/A",
                    cvSentiment: analysisData?.sentiment || "NEUTRAL",
                    totalScore: totalScore.toFixed(2),
                  },
                };
              });

              // Check for fraud analysis
              if (analysisData.fraudConfidence) {
                setFraudReasons((prev) => ({
                  ...prev,
                  [app._id]: {
                    ...(prev[app._id] || {}),
                    speaking: {
                      fraudConfidence: analysisData.fraudConfidence,
                      ...analysisData.flags,
                    },
                  },
                }));
              }
            } else {
              console.error("Erreur API CVParlant:", await resCvSpeaking.text());
            }
          } catch (speakingError) {
            console.error("Erreur lors de l'analyse du CV parlant:", speakingError);
          }
        } else {
          // If no speaking CV, calculate total score with just the regular CV
          setSimilarities((prev) => {
            const cvScore = parseFloat(prev[app._id]?.cv || 0);
            return {
              ...prev,
              [app._id]: {
                ...prev[app._id],
                cvSpeaking: "Non existant",
                cvConfidenceScore: null,
                cvSentiment: null,
                totalScore: cvScore.toFixed(2), // Total score is just CV score if no speaking CV
              },
            };
          });
        }
      } catch (err) {
        console.error("Erreur de similarité pour l'application", app._id, ":", err);
      }
    })();
    
    // Ajouter la promesse au tableau
    analysisPromises.push(appPromise);
  }
  
  try {
    // Attendre que toutes les analyses soient terminées
    await Promise.all(analysisPromises);
    
    // Trier les applications par score une fois toutes les analyses terminées
    sortApplicationsByScore();
    
    setMessage("Analyse terminée et résultats triés par score");
    setTimeout(() => setMessage(""), 3000);
  } catch (error) {
    console.error("Erreur lors du traitement des analyses:", error);
    setMessage("Une erreur est survenue lors de l'analyse");
    setTimeout(() => setMessage(""), 5000);
  }
};

// Fonction pour trier les applications par score total
const sortApplicationsByScore = () => {
  // Créer une copie des applications filtrées
  const sortedApps = [...filteredApplications];
  
  // Trier les applications du score le plus élevé au plus bas
  sortedApps.sort((a, b) => {
    // Récupérer les scores des états
    const scoreA = parseFloat(similarities[a._id]?.totalScore || 0);
    const scoreB = parseFloat(similarities[b._id]?.totalScore || 0);
    
    // Tri décroissant (du plus grand au plus petit)
    return scoreB - scoreA;
  });
  
  // Mettre à jour l'état avec les applications triées
  setFilteredApplications(sortedApps);

  };
  
// Fonction pour extraire le score total d'une application en utilisant votre logique existante
const getApplicationTotalScore = (app) => {
  // Récupérer les scores des états existants
  const cvScore = parseFloat(similarities[app._id]?.cv) || 0;
  const cvSpeakingScore = parseFloat(similarities[app._id]?.cvSpeaking) || 0;
  
  // Vérifier si le CV parlant existe
  const hasCvSpeaking = app.cvSpeaking || 
    (cvSpeakingScore !== 0 && similarities[app._id]?.cvSpeaking !== "Non existant");
  
  // Utiliser la même logique que dans votre rendu
  let totalScore = 0; // Par défaut 0 pour le tri
  
  if (cvScore > 0) {
    if (hasCvSpeaking && cvSpeakingScore > 0) {
      totalScore = 0.7 * cvScore + 0.3 * cvSpeakingScore;
    } else {
      totalScore = cvScore;
    }
  }
  
  return totalScore;
};


  // Calcul des candidatures à afficher pour la page courante
 const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
const displayedApplications = filteredApplications.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);
    // Function to get status badge class
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case "Accepted": return styles.statusAccepted;
      case "Rejected": return styles.statusRejected;
      default: return styles.statusPending;
    }
  };

  // Function to get sentiment icon
  const getSentimentIcon = (sentiment) => {
    switch(sentiment) {
      case 'POSITIVE': return '😊';
      case 'NEGATIVE': return '😞';
      case 'NEUTRAL': return '😐';
      default: return '';
    }
  };

  return (
    <>
      <Sidebar />
      <div style={styles.container}>
        <h1 style={styles.title}>Spontaneous Application</h1>
    
        {message && <div style={styles.notification}>{message}</div>}
    
        <div style={styles.info}>
  Applications {selectedCategory ? `for "${selectedCategory}"` : "totales"} :
  <span style={styles.bold}> {filteredApplications.length}</span>
</div>
<div style={{ marginBottom: "1rem" }}>
  <label htmlFor="category">Filter by category: </label>
  <select
    id="category"
    value={selectedCategory}
    onChange={handleCategoryChange} // Utiliser la nouvelle fonction
  >
    <option value="">-- Select a category --</option>
    {categories.map((cat) => (
      <option key={cat._id} value={cat.name}>{cat.name}</option>
    ))}
  </select>
</div>

    
        <div style={styles.textareaContainer}>
          <textarea
            style={styles.textarea}
            rows="6"
            placeholder="Enter a job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
  
  <div style={{ display: 'flex', gap: '10px' }}>
    <button style={styles.similarityButton} onClick={handleSimilarityCheck}>
      Calculate similarity
    </button>
    <button 
      style={{...styles.similarityButton, backgroundColor: '#4CAF50'}} 
      onClick={sortApplicationsByScore}
      disabled={Object.keys(similarities).length === 0}
    >
      Re-trier par score
    </button>
  </div>
</div>
    
        <ul style={styles.list}>
          {displayedApplications.length > 0 ? (
            displayedApplications.map((app) => {
              // Assurez-vous que cvScore et cvSpeakingScore sont des nombres valides
              const cvScore = parseFloat(similarities[app._id]?.cv) || 0;
              const cvSpeakingScore = parseFloat(similarities[app._id]?.cvSpeaking) || 0;
              
              // Utiliser les valeurs des champs de MongoDB si disponibles, sinon utiliser les valeurs du state similarities
              const confidenceScore = app.cvConfidenceScore || similarities[app._id]?.cvConfidenceScore || null;
              const sentiment = similarities[app._id]?.cvSentiment || app.cvSentiment || null;

              
              // Vérifier si le CV parlant existe
              const hasCvSpeaking = app.cvSpeaking || 
                (cvSpeakingScore !== 0 && similarities[app._id]?.cvSpeaking !== "Non existant");
    
              // Calculer le score total avec un poids de 70% pour le CV et 30% pour le CV parlant
              // Si pas de CV parlant, utiliser 100% du score du CV
              let totalScore = "N/A";
              
              if (cvScore > 0) {
                if (hasCvSpeaking && cvSpeakingScore > 0) {
                  totalScore = (0.7 * cvScore + 0.3 * cvSpeakingScore).toFixed(2);
                } else {
                  totalScore = cvScore.toFixed(2);
                }
              }
    
              // Fonction pour obtenir la couleur en fonction du sentiment
              const getSentimentColor = (sentiment) => {
                switch(sentiment) {
                  case 'POSITIVE': return 'green';
                  case 'NEGATIVE': return 'red';
                  default: return '#888'; // Gris pour NEUTRAL ou null
                }
              };
    
              // Fonction pour obtenir le texte du sentiment
              const getSentimentText = (sentiment) => {
                switch(sentiment) {
                  case 'POSITIVE': return 'Positive';
                  case 'NEGATIVE': return 'Negative';
                  case 'NEUTRAL': return 'Neutral';
                  default: return 'Non disponible';
                }
              };
    
              return (
                <li key={app._id} style={styles.item}>
                  <span style={styles.applicantInfo}>
                    {app.firstname} {app.lastname} - {app.category} - {app.jobType}
                    <span style={{ ...styles.similarityScore, color: '#2196f3' }}>
                      &nbsp;| Total score : {totalScore}
                    </span>
                  </span>
    
                  {fraudReasons[app._id] && (
                    <div style={{ marginTop: '10px', color: 'red', fontWeight: 'bold' }}>
                      Fraudulent CV detected: {Array.isArray(fraudReasons[app._id]) 
                        ? fraudReasons[app._id].join(", ") 
                        : Object.keys(fraudReasons[app._id]).join(", ")}
                    </div>
                  )}
    
                  <div style={styles.buttons}>
                    <button style={styles.viewButton} onClick={() => setSelectedApp(app)}>
                    See more
                    </button>
    
                    <button
                      style={styles.viewButton}
                      onClick={() => setShowAnalysis((prev) => !prev)}
                    >
                      {showAnalysis ? " Hide analysis" : " View analysis"}
                    </button>
    
                    <button style={styles.deleteButton} onClick={() => handleDelete(app._id)}>
                      Delete
                    </button>
                  </div>
                <div style={styles.statusContainer}>
  <label htmlFor={`status-${app._id}`} style={styles.statusLabel}>
    Status:
  </label>
  <select
    id={`status-${app._id}`}
    value={app.status || "Pending"}
    onChange={(e) => handleStatusChange(app._id, e.target.value)}
    style={styles.statusSelect}
  >
    <option value="Pending">Pending</option>
    <option value="Accepted">Accepted</option>
    <option value="Rejected">Rejected</option>
  </select>
</div>
    
                  {showAnalysis && (
                    <div style={{ 
                      marginTop: '10px', 
                      backgroundColor: '#f0f8ff', 
                      padding: '15px', 
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr', 
                        gap: '15px' 
                      }}>
                        {/* Colonne CV */}
                        <div style={{ 
                          padding: '10px', 
                          backgroundColor: '#fff', 
                          borderRadius: '8px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                        }}>
                          <h3 style={{ 
                            fontSize: '16px', 
                            fontWeight: 'bold', 
                            color: '#555',
                            marginBottom: '10px'
                          }}> CV</h3>
                          <p style={{ marginBottom: '8px' }}>
                            <strong>Similarity Score :</strong> {cvScore > 0 ? cvScore.toFixed(2) : "N/A"}
                          </p>
                          
                        </div>
                        
                        {/* Colonne CV Parlant */}
                        <div style={{ 
                          padding: '10px', 
                          backgroundColor: '#fff', 
                          borderRadius: '8px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                        }}>
                          <h3 style={{ 
                            fontSize: '16px', 
                            fontWeight: 'bold', 
                            color: '#555',
                            marginBottom: '10px'
                          }}>CV Parlant</h3>
                          
                          {hasCvSpeaking ? (
                            <>
                              <p style={{ marginBottom: '8px' }}>
                                <strong>Similarity Score :</strong> {cvSpeakingScore > 0 ? cvSpeakingScore.toFixed(2) : "N/A"}
                              </p>
                              <p style={{ marginBottom: '8px' }}>
                                <strong> Confidence Score:</strong> {
                                  confidenceScore !== null 
                                    ? typeof confidenceScore === 'number' 
                                      ? (confidenceScore * 100).toFixed(0) + '%'
                                      : confidenceScore
                                    : "Not available"
                                }
                              </p>
                              <p style={{ marginBottom: '8px' }}>
                                <strong>Sentiment:</strong> <span style={{ 
                                  color: getSentimentColor(sentiment),
                                  fontWeight: sentiment ? 'bold' : 'normal'
                                }}>{getSentimentText(sentiment)}</span>
                              </p>
                            </>
                          ) : (
                            <p style={{ fontStyle: 'italic', color: '#888' }}>
                              Speaking CV not provided
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })
          ) : (
            <p> No applications to display</p>
          )}
        </ul>
      
      
      
    
    
    
          {/* Pagination */}
          
    {totalPages > 1 && (
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              currentPage === i + 1
                ? "bg-blue-600 text-white" // Page courante en bleu
                : "bg-gray-300 text-gray-700" // Autres pages en gris
            } hover:bg-blue-500`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    )}
    
    
    {selectedApp && (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <h2 style={styles.modalTitle}>Détails de la candidature</h2>
          <p><strong>Nom:</strong> {selectedApp.firstname} {selectedApp.lastname}</p>
          <p><strong>Email:</strong> {selectedApp.email}</p>
          <p><strong>Genre:</strong> {selectedApp.gender}</p>
          <p><strong>Catégorie:</strong> {selectedApp.category}</p>
          <p><strong>Type de poste:</strong> {selectedApp.jobType}</p>
          <p><strong>Date de création:</strong> {new Date(selectedApp.createdAt).toLocaleString()}</p>
    
          {/* Télécharger CV classique */}
          {selectedApp.cv && (
            <p>
              <strong>CV:</strong>{" "}
              <a
                href={`http://localhost:5000/${selectedApp.cv.replace(/\\/g, '/')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0d47a1", textDecoration: "underline" }}
              >
                Télécharger le CV
              </a>
            </p>
          )}
    
          {/* Télécharger CV Parlant */}
          {selectedApp.cvSpeaking ? (
      <p>
        <strong>Speaking CV:</strong>{" "}
        <a
          href={`http://localhost:5000/${selectedApp.cvSpeaking.replace(/\\/g, '/')}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0d47a1", textDecoration: "underline" }}
        >
          Download the Speaking CV
        </a>
      </p>
    ) : (
      <p>
        <strong>CV Parlant:</strong> Not available
      </p>
    )}
    
    
    
          {/* Bouton Fermer */}
          <button style={styles.closeButton} onClick={() => setSelectedApp(null)}>
            Fermer
          </button>
        </div>
      </div>
    )}
    
        </div>
        </>
      );
    }

const styles = {
  container: {
    width: '50%',
    margin: '40px auto',
    background: '#f9f9f9',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
  },
  title: {
    fontSize: '26px',
    color: '#0d47a1',
    textAlign: 'center',
    marginBottom: '20px'
  },
  notification: {
    padding: '10px',
    background: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
    borderRadius: '5px',
    marginBottom: '15px',
    textAlign: 'center'
  },
  info: {
    textAlign: 'right',
    fontSize: '16px',
    color: '#555',
    marginBottom: '10px'
  },
  bold: {
    fontWeight: 'bold',
    color: '#000'
  },
  textareaContainer: {
    marginBottom: '20px'
  },
  textarea: {
    width: '100%',
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    marginBottom: '10px'
  },
  similarityButton: {
    padding: '12px 20px',
    background: '#0d47a1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  list: {
    listStyleType: 'none',
    padding: 0
  },
  item: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '15px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd'
  },
  applicantInfo: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#333'
  },
  similarityScore: {
    marginLeft: '10px',
    color: '#0d47a1',
    fontSize: '14px'
  },
  buttons: {
    display: 'flex',
    gap: '10px'
  },
  viewButton: {
    padding: '10px 16px',
    background: '#1565c0',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  deleteButton: {
    padding: '10px 16px',
    background: '#e53935',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    background: 'white',
    padding: '30px',
    borderRadius: '10px',
    width: '400px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    textAlign: 'center'
  },
  modalTitle: {
    fontSize: '22px',
    color: '#0d47a1',
    marginBottom: '20px'
  },
  closeButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#0d47a1',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  status: {
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: "0.9rem",
    textAlign: "center",
    display: "inline-block",
  },
  accepted: {
    backgroundColor: "#e6f4ea",
    color: "#2e7d32",
  },
  rejected: {
    backgroundColor: "#fdecea",
    color: "#c62828",
  },
  pending: {
    backgroundColor: "#e3f2fd",
    color: "#1565c0",
  },
  select: {
    padding: "0.4rem 0.6rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "0.9rem",
    outline: "none",
  },
  button: {
    backgroundColor: "#003366",
    color: "white",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.3s",
    fontSize: "0.9rem",
  },
};
