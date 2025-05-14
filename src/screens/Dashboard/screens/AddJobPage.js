import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const isAdmin = role === "admin";

const AddJobPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [newJob, setNewJob] = useState({
    name: '',
    location: '',
    jobType: 'Full-time',
    description: '',
    duration: '',
    category: categoryId
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.post('http://localhost:5000/api/jobs', newJob,config);
      navigate(`/category/${categoryId}/jobs`);
    } catch (error) {
      console.error("Erreur lors de l'ajout du job", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add a New Job</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {[
          { label: 'Title', name: 'name', type: 'text' },
          { label: 'Localisation', name: 'location', type: 'text' },
          { label: 'Duration (Hours)', name: 'duration', type: 'number' }
        ].map(({ label, name, type }) => (
          <div key={name} style={styles.formGroup}>
            <label style={styles.label}>{label}</label>
            <input
              type={type}
              value={newJob[name]}
              onChange={(e) => setNewJob({ ...newJob, [name]: e.target.value })}
              required
              style={styles.input}
            />
          </div>
        ))}

        <div style={styles.formGroup}>
          <label style={styles.label}>Job Type</label>
          <select
            value={newJob.jobType}
            onChange={(e) => setNewJob({ ...newJob, jobType: e.target.value })}
            style={styles.input}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Internship</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <textarea
            value={newJob.description}
            onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            required
            style={styles.textarea}
          />
        </div>

        <button type="submit" style={styles.submitButton}>Add</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '60%',
    margin: '40px auto',
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
  },
  title: {
    color: '#0d47a1',
    textAlign: 'center',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    fontWeight: '600',
    marginBottom: '5px'
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  textarea: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    height: '100px'
  },
  submitButton: {
    background: '#1976d2',
    color: 'white',
    padding: '10px',
    borderRadius: '8px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px'
  }
};

export default AddJobPage;
