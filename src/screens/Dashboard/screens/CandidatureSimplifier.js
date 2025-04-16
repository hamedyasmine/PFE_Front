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

  useEffect(() => {
    fetch("http://localhost:5000/api/applications-simplifiees/applications")
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Vérification des données reçues
        setApplications(data);
      })
      .catch((err) => console.error("Erreur:", err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/applications-simplifiees/applications-simplifiees/${id}`, {
      method: "DELETE",
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
    for (let app of applications) {
      try {
        const formData = new FormData();
        formData.append("job_description", jobDescription);

        const response = await fetch(`http://localhost:5000/${app.cv}`);
        const blob = await response.blob();
        const file = new File([blob], "cv.pdf", { type: blob.type });

        formData.append("cv_file", file);

        const res = await fetch("http://localhost:5000/api/analyze-cv", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        setSimilarities((prev) => ({
          ...prev,
          [app._id]: data?.results?.[0]?.score?.toFixed(2) || "N/A",
        }));
      } catch (err) {
        console.error("Erreur de similarité:", err);
      }
    }
  };

  // Calcul des candidatures à afficher pour la page courante
  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const displayedApplications = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
    <Sidebar/>
    <div style={styles.container}>
      <h1 style={styles.title}>Candidatures Simplifiées</h1>

      {message && <div style={styles.notification}>{message}</div>}

      <div style={styles.info}>
        Nombre total de candidatures :
        <span style={styles.bold}> {applications.length}</span>
      </div>

      <div style={styles.textareaContainer}>
        <textarea
          style={styles.textarea}
          rows="6"
          placeholder="Entrez une description de poste ici..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <button style={styles.similarityButton} onClick={handleSimilarityCheck}>
          Calculer la Similarité
        </button>
      </div>

      <ul style={styles.list}>
        {displayedApplications.length > 0 ? (
          displayedApplications.map((app) => (
            <li key={app._id} style={styles.item}>
              <span style={styles.applicantInfo}>
                {app.firstname} - {app.category} - {app.jobType}
                {similarities[app._id] && (
                  <span style={styles.similarityScore}>
                    &nbsp;| Score : {similarities[app._id]}
                  </span>
                )}
              </span>
              <div style={styles.buttons}>
                <button style={styles.viewButton} onClick={() => setSelectedApp(app)}>
                  Voir plus
                </button>
                <button style={styles.deleteButton} onClick={() => handleDelete(app._id)}>
                  Supprimer
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>Aucune candidature à afficher</p>
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
  }
};
