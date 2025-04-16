import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobsPage = () => {
  const { categoryId } = useParams();
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const navigate = useNavigate();

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

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`);
      setJobs(jobs.filter(job => job._id !== jobId));
    } catch (error) {
      console.error("Erreur lors de la suppression du job", error);
    }
  };

  const displayedJobs = jobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Jobs de la catégorie</h1>
        <button style={styles.addJobButton} onClick={() => navigate(`/category/${categoryId}/add-job`)}>
          + Ajouter un Job
        </button>
      </div>

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
          {displayedJobs.map((job) => (
            <tr key={job._id}>
              <td style={styles.cell}>{job.name}</td>
              <td style={styles.cell}>{job.location}</td>
              <td style={styles.cell}>{job.jobType}</td>
              <td style={styles.cell}>{job.description}</td>
              <td style={styles.cell}>{job.duration} h</td>
              <td style={styles.cell}>
                <button style={styles.deleteButton} onClick={() => handleDeleteJob(job._id)}>Supprimer</button>
                <button style={styles.viewButton} onClick={() => navigate(`/job/${job._id}/applications`)}>
                  Voir candidatures
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={styles.pagination}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            style={{
              ...styles.pageButton,
              backgroundColor: currentPage === number ? '#0d47a1' : '#e0e0e0',
              color: currentPage === number ? 'white' : '#333',
            }}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '85%',
    margin: '40px auto',
    background: '#f9f9f9',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
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
  addJobButton: {
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
    borderCollapse: 'collapse'
  },
  headerCell: {
    backgroundColor: '#1565c0',
    color: 'white',
    padding: '10px',
    textAlign: 'left',
    fontWeight: 'bold'
  },
  cell: {
    padding: '12px',
    borderBottom: '1px solid #ddd'
  },
  deleteButton: {
    background: '#e53935',
    color: '#fff',
    padding: '8px',
    border: 'none',
    borderRadius: '5px',
    marginRight: '8px'
  },
  viewButton: {
    background: '#0d47a1', // bouton bleu
    color: '#fff',
    padding: '8px',
    border: 'none',
    borderRadius: '5px'
  },
  pagination: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px'
  },
  pageButton: {
    padding: '8px 12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default JobsPage;
