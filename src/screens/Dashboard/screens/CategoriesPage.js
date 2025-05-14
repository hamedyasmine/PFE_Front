import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState('');
  const itemsPerPage = 4;
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";
  const navigate = useNavigate();
  

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories", error);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory) return;
  
    try {
      const config = {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      };
      const response = await axios.post(
        'http://localhost:5000/api/categories',
        { name: newCategory },
        config
      );
      
      setNotification('Catégorie ajoutée avec succès !');
      setCategories(prev => [...prev, response.data]);
      setNewCategory('');
      setCurrentPage(Math.ceil((categories.length + 1) / itemsPerPage));
    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
    }
  };
  

  const handleDeleteCategory = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      await axios.delete(`http://localhost:5000/api/categories/${id}`, config);
      const updated = categories.filter(c => c._id !== id);
      setCategories(updated);
      setNotification('Catégorie supprimée');
      const newPage = Math.max(1, Math.ceil(updated.length / itemsPerPage));
      setCurrentPage(prev => Math.min(prev, newPage));
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };
  

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const displayedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
    <Sidebar/>
    <div style={styles.container}>
      <h1 style={styles.title}>Category Management</h1>

      {notification && <div style={styles.notification}>{notification}</div>}

      <form style={styles.form} onSubmit={handleAddCategory}>
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>Add</button>
      </form>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Name</th>
            <th style={styles.headerCell}>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedCategories.map(category => (
            <tr key={category._id}>
              <td style={styles.cell}>{category.name}</td>
              <td style={styles.cell}>
                <button style={styles.deleteButton} onClick={() => handleDeleteCategory(category._id)}>
                Delete
                </button>
                <button style={styles.viewButton} onClick={() => navigate(`/jobs/${category._id}`)}>
                View Applications
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                ...styles.pageButton,
                backgroundColor: currentPage === i + 1 ? '#1565c0' : '#fff',
                color: currentPage === i + 1 ? '#fff' : '#1565c0',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

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
    fontSize: '24px',
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
    marginBottom: '10px',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px'
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    width: '250px'
  },
  addButton: {
    padding: '10px 20px',
    background: '#0d47a1',
    color: 'white',
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
    padding: '12px',
    textAlign: 'left',
    background: '#0d47a1',
    color: 'white',
    borderBottom: '1px solid #ddd'
  },
  cell: {
    padding: '12px',
    borderBottom: '1px solid #ddd'
  },
  deleteButton: {
    padding: '8px 12px',
    marginRight: '5px',
    background: '#e53935',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  viewButton: {
    padding: '8px 12px',
    background: '#0d47a1',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  pagination: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '8px'
  },
  pageButton: {
    padding: '8px 12px',
    border: '1px solid #1565c0',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default CategoriesPage;
