import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const isAdmin = role === "admin";

const JobApplicationsPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const [scores, setScores] = useState({});
  const [loadingScores, setLoadingScores] = useState({});
  
  
  const goBack = () => {
    navigate(-1);
  };
 useEffect(() => {
  const fetchData = async () => {
    try {
      const applicationsResponse = await axios.get(`http://localhost:5000/api/applications/job/${jobId}/applications`);
      const applicationsData = applicationsResponse.data;
      setApplications(applicationsData);

      // Initialiser les scores à partir des données de similarityScore
      const initialScores = {};
      applicationsData.forEach(app => {
        if (app.similarityScore) {
          initialScores[app._id] = app.similarityScore;
        }
      });
      setScores(initialScores);

      const jobResponse = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
      setJobDetails(jobResponse.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  fetchData();
}, [jobId]);

  const updateStatus = async (applicationId, newStatus) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.put(`http://localhost:5000/api/applications/application/${applicationId}/status`, { status: newStatus },config);
      const updatedApplication = response.data.application;
      setApplications(applications.map(app => app._id === applicationId ? updatedApplication : app));
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut", error);
    }
  };

  const deleteApplication = async (applicationId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.delete(`http://localhost:5000/api/applications/application/${applicationId}`,config);
      setApplications(applications.filter(app => app._id !== applicationId));
    } catch (error) {
      console.error("Erreur lors de la suppression de la candidature", error);
    }
  };

  const calculateMatchingScore = async (applicationId, cvPath, userId, jobId) => {
  if (!jobDetails?.description) {
    alert("La description du poste n'est pas disponible.");
    return;
  }

  try {
    setLoadingScores(prev => ({ ...prev, [applicationId]: true }));

    const cvUrl = `http://localhost:5000/${cvPath}`;
    const cvResponse = await axios.get(cvUrl, { responseType: 'blob' });
    const cvFile = new File([cvResponse.data], cvPath.split('/').pop(), { type: cvResponse.data.type });

    const formData = new FormData();
    formData.append('cv_file', cvFile);
    formData.append('job_description', jobDetails.description);
    formData.append('userId', userId); // Ajout de l'ID utilisateur
    formData.append('jobId', jobId);   // Ajout de l'ID du job

    const response = await axios.post('http://localhost:5000/api/analyze-cv', formData);

    if (response.data?.results?.length > 0) {
      setScores(prev => ({ ...prev, [applicationId]: response.data.results[0].score }));
    }
  } catch (error) {
    console.error("Erreur lors du calcul du score de correspondance", error);
    alert("Erreur lors du calcul du score de correspondance");
  } finally {
    setLoadingScores(prev => ({ ...prev, [applicationId]: false }));
  }
};

  const handleGoToManageQuestions = () => {
    navigate(`/manage-questions/${jobId}`);
  };

  return (
    <>
    <Sidebar/>
    <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px 300px 10px 250px' }}>
    <button style={styles.backButton} onClick={goBack}>Back</button>
  </div>
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>	Applications for this Job</h1>
        
        <button style={styles.manageButton} onClick={handleGoToManageQuestions}>
        Manage Interview Questions
        </button>
      </div>

      {applications.length === 0 ? (
        <p>No Applications for this Job</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.headerCell}>Name</th>
              <th style={styles.headerCell}>Email</th>
              <th style={styles.headerCell}>Resume</th>
              <th style={styles.headerCell}>Statut</th>
              <th style={styles.headerCell}>Score</th>
              <th style={{ ...styles.headerCell, minWidth: '200px' }}>Actions</th>

            </tr>
          </thead>
          <tbody>
            {applications.map((app) => {
              const user = app.userId || app.user;
              return (
                <tr key={app._id}>
                  <td style={styles.cell}>{user?.name || 'Nom inconnu'}</td>
                  <td style={styles.cell}>{user?.email || 'Email inconnu'}</td>
                  <td style={styles.cell}>
                    {app.cv ? (
                      <a href={`http://localhost:5000/${app.cv}`} target="_blank" rel="noopener noreferrer">View CV</a>
                    ) : 'Non disponible'}
                  </td>
                  <td style={styles.cell}>
                  <select
  value={app.status}
  onChange={(e) => updateStatus(app._id, e.target.value)}
  style={{
    ...styles.select,
    color:
      app.status === 'accepted'
        ? 'green'
        : app.status === 'rejected'
        ? 'red'
        : 'orange'
  }}
>

<option value="pending" style={{ color: 'orange' }}>Pending</option>
  <option value="accepted" style={{ color: 'green' }}>Accepted</option>
  <option value="rejected" style={{ color: 'red' }}>Rejected</option>

                    </select>
                  </td>
                  <td style={styles.cell}>
                    
{scores[app._id] !== undefined ? (
  <div style={getScoreStyle(scores[app._id])}>{scores[app._id]}%</div>
) : (
  <button
    style={styles.scoreButton}
    onClick={() => calculateMatchingScore(app._id, app.cv, user?._id, jobId)}
    disabled={!app.cv || loadingScores[app._id]}
  >
    {loadingScores[app._id] ? 'Calculation...' : 'Calculate'}
  </button>
)}
                  </td>
                  <td style={styles.cell}>
  <button 
    style={styles.deleteButton} 
    onClick={() => deleteApplication(app._id)}
  >
    Delete
  </button>
  <button 
    style={{ ...styles.scoreButton, marginLeft: '10px' }} 
    onClick={() => navigate(`/applications/${app._id}/questions-answers`)}
  >
    View Q&A
  </button>
</td>

                  
                </tr>
                
              );
            })}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
};

const getScoreStyle = (score) => {
  let backgroundColor = '#d32f2f';
  if (score >= 70) backgroundColor = '#2e7d32';
  else if (score >= 50) backgroundColor = '#fbc02d';

  return {
    backgroundColor,
    color: 'white',
    padding: '5px 10px',
    borderRadius: '20px',
    fontWeight: 'bold',
    display: 'inline-block'
  };
};

const styles = {
  container: {
    width: '60%',
    margin: '40px auto',
    background: '#f9f9f9',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  title: {
    fontSize: '24px',
    color: '#0d47a1'
  },
  manageButton: {
    padding: '10px 20px',
    background: '#0d47a1',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  },
  headerCell: {
    padding: '12px',
    background: '#0d47a1',
    color: 'white',
    borderBottom: '1px solid #ddd'
  },
  cell: {
    padding: '12px',
    borderBottom: '1px solid #ddd'
  },
  deleteButton: {
    padding: '8px 14px',
    backgroundColor: '#d32f2f',
    color: 'white',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer'
  },
  scoreButton: {
    padding: '8px 14px',
    backgroundColor: '#0d47a1',
    color: 'white',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer'
  },
  select: {
    padding: '6px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  }
};

export default JobApplicationsPage;
