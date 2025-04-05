import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobApplicationsPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/applications/job/${jobId}/applications`);
        setApplications(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des candidatures", error);
      }
    };

    fetchApplications();
  }, [jobId]);

  // Fonction pour mettre à jour le statut d'une candidature
  const updateStatus = async (applicationId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/applications/application/${applicationId}/status`, { status: newStatus });
      const updatedApplication = response.data.application;
      
      // Mettre à jour les candidatures dans l'état
      setApplications(applications.map(application =>
        application._id === applicationId ? updatedApplication : application
      ));
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut", error);
    }
  };

  // Fonction pour supprimer une candidature
  const deleteApplication = async (applicationId) => {
    try {
      await axios.delete(`http://localhost:5000/api/applications/application/${applicationId}`);
      setApplications(applications.filter(application => application._id !== applicationId));
    } catch (error) {
      console.error("Erreur lors de la suppression de la candidature", error);
    }
  };

  // Fonction de redirection vers la page de gestion des questions
  const handleGoToManageQuestions = () => {
    navigate(`/manage-questions/${jobId}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Candidatures pour ce job</h1>
      {applications.length === 0 ? (
        <p>Aucune candidature pour ce job.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.headerCell}>Nom</th>
              <th style={styles.headerCell}>Email</th>
              <th style={styles.headerCell}>Cv</th>
              <th style={styles.headerCell}>Statut</th>
              <th style={styles.headerCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => {
              const user = application.userId || application.user;
              return (
                <tr key={application._id}>
                  <td style={styles.cell}>{user ? user.name : 'Nom inconnu'}</td>
                  <td style={styles.cell}>{user ? user.email : 'Email inconnu'}</td>
                  <td style={styles.cell}>
                    {application.cv ? (
                      <a href={`http://localhost:5000/${application.cv}`} target="_blank" rel="noopener noreferrer">
                        Voir le CV
                      </a>
                    ) : (
                      'CV non disponible'
                    )}
                  </td>
                  <td style={styles.cell}>
                    <select
                      value={application.status}
                      onChange={(e) => updateStatus(application._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td style={styles.cell}>
                    <button
                      style={styles.deleteButton}
                      onClick={() => deleteApplication(application._id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <button style={styles.addInterviewButton} onClick={handleGoToManageQuestions}>
        Gérer les Questions d'Entretien
      </button>
    </div>
  );
};

// Styles en JSX
const styles = {
  container: { width: '80%', margin: 'auto', padding: '20px', textAlign: 'center' },
  title: { color: '#007bff' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
  headerCell: { padding: '12px', background: '#007bff', color: 'white', borderBottom: '1px solid #ddd' },
  cell: { padding: '12px', borderBottom: '1px solid #ddd' },
  deleteButton: { padding: '8px 16px', backgroundColor: '#ff4d4d', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer' },
  addInterviewButton: { marginTop: '20px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', borderRadius: '5px', cursor: 'pointer' },
};

export default JobApplicationsPage;
