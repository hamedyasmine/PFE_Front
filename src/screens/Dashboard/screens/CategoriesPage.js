import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [notification, setNotification] = useState('');
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
      await axios.post('http://localhost:5000/api/categories', { name: newCategory });
      setNotification('Catégorie ajoutée avec succès !');
      setNewCategory('');
      fetchCategories();
    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      setNotification('Catégorie supprimée');
      fetchCategories();
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gestion des Catégories</h1>

      {notification && <div style={styles.notification}>{notification}</div>}

      {/* Formulaire d'ajout */}
      <form style={styles.form} onSubmit={handleAddCategory}>
        <input
          type="text"
          placeholder="Nouvelle catégorie"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>Ajouter</button>
      </form>

      {/* Liste des catégories */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Nom</th>
            <th style={styles.headerCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category._id}>
              <td style={styles.cell}>{category.name}</td>
              <td style={styles.cell}>
                <button style={styles.deleteButton} onClick={() => handleDeleteCategory(category._id)}>
                  Supprimer
                </button>
                <button style={styles.viewButton} onClick={() => navigate(`/jobs/${category._id}`)}>
                  Consulter les Jobs
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 🎨 Styles en JSX
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
  notification: {
    padding: '10px',
    background: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
    borderRadius: '5px',
    marginBottom: '10px'
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
    border: '1px solid #ddd',
    borderRadius: '5px',
    width: '250px'
  },
  addButton: {
    padding: '10px',
    background: '#1E90FF',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px'
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
    marginRight: '5px',
    background: '#0000FF',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px'
  },
  viewButton: {
    padding: '8px 12px',
    background: '#0000FF',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px'
  }
};

export default CategoriesPage;
