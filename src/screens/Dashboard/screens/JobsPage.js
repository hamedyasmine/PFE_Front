import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const JobsPage = () => {
  const { categoryId } = useParams();
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [newJob, setNewJob] = useState({
    name: '',
    location: '',
    jobType: 'Full-time',
    description: '',
    duration: '',
    category: categoryId
  });

  // Pour récupérer la liste des jobs de la catégorie
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/filter?category=${categoryId}`);
        setJobs(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des jobs", error);
      }
    };

    fetchJobs();
  }, [categoryId]);

  // Fonction pour ajouter un job
  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/jobs', {
        ...newJob,
        category: categoryId // Assurer que la catégorie est correcte
      });

      setJobs([...jobs, response.data]); // Ajout du job à la liste
      setNewJob({ name: '', location: '', jobType: 'Full-time', description: '', duration: '' }); // Réinitialiser le formulaire
    } catch (error) {
      console.error("Erreur lors de l'ajout du job", error);
    }
  };

  // Fonction pour supprimer un job
  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`);
      setJobs(jobs.filter(job => job._id !== jobId)); // Filtrer le job supprimé
    } catch (error) {
      console.error("Erreur lors de la suppression du job", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Jobs de la catégorie</h1>

      {/* Formulaire d'ajout de job */}
      <form onSubmit={handleAddJob} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Titre du job</label>
          <input
            id="name"
            type="text"
            placeholder="Titre du job"
            value={newJob.name}
            onChange={(e) => setNewJob({ ...newJob, name: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="location" style={styles.label}>Localisation</label>
          <input
            id="location"
            type="text"
            placeholder="Localisation"
            value={newJob.location}
            onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="jobType" style={styles.label}>Type de job</label>
          <select
            id="jobType"
            value={newJob.jobType}
            onChange={(e) => setNewJob({ ...newJob, jobType: e.target.value })}
            style={styles.input}
            required
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>Description</label>
          <textarea
            id="description"
            placeholder="Description"
            value={newJob.description}
            onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            required
            style={styles.textarea}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="duration" style={styles.label}>Durée (en heures)</label>
          <input
            id="duration"
            type="number"
            placeholder="Durée en heures"
            value={newJob.duration}
            onChange={(e) => setNewJob({ ...newJob, duration: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.addButton}>Ajouter Job</button>
      </form>

      {/* Affichage des jobs existants */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Titre</th>
            <th style={styles.headerCell}>Localisation</th>
            <th style={styles.headerCell}>Type</th>
            <th style={styles.headerCell}>Description</th>
            <th style={styles.headerCell}>Durée</th>
            <th style={styles.headerCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td style={styles.cell}>{job.name}</td>
              <td style={styles.cell}>{job.location}</td>
              <td style={styles.cell}>{job.jobType}</td>
              <td style={styles.cell}>{job.description}</td>
              <td style={styles.cell}>{job.duration} heures</td>
              <td style={styles.cell}>
                <button style={styles.deleteButton} onClick={() => handleDeleteJob(job._id)}>Supprimer</button>
                <button style={styles.viewButton} onClick={() => navigate(`/job/${job._id}/applications`)}>
  Consulter les candidatures
</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Styles en JSX
const styles = {
  container: {
    width: '80%',
    margin: 'auto',
    padding: '20px',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  },
  title: {
    color: '#007bff'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '20px',
    padding: '10px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    fontSize: '14px'
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    width: '100%',
    maxWidth: '400px'
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    width: '100%',
    maxWidth: '400px',
    height: '100px'
  },
  addButton: {
    padding: '10px',
    background: '#28a745',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    maxWidth: '200px',
    alignSelf: 'center'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  },
  headerCell: {
    padding: '12px',
    textAlign: 'left',
    background: '#007bff',
    color: 'white',
    borderBottom: '1px solid #ddd'
  },
  cell: {
    padding: '12px',
    background: 'white',
    borderBottom: '1px solid #ddd'
  },
  deleteButton: {
    padding: '8px 12px',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px'
  }
};

export default JobsPage;
