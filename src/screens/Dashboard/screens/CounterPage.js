import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const styles = {
  container: {
    width: '60%',
    margin: 'auto',
    padding: '20px',
    background: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  },
  title: {
    color: '#0d47a1'
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
    justifyContent: 'space-between', // Espace entre les éléments
    alignItems: 'center',
    gap: '20px', // Ajout d'un écart plus grand entre les éléments
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
    background: '#0d47a1',
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
    background: '#0d47a1',
    color: 'white',
    borderBottom: '1px solid #ddd'
  },
  cell: {
    padding: '12px',
    background: '#f9f9f9',
    borderBottom: '1px solid #ddd'
  },
  deleteButton: {
    padding: '8px 12px',
    marginRight: '10px', // Ajout d'un espacement à droite
    background: '#FF0000',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px'
  },
  editButton: {
    padding: '8px 12px',
    background: '#0d47a1',
    marginRight: '5px', // Ajout d'un espacement à gauche
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px'
  }
};


function NumberPage() {
  const [counts, setCounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState('');
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  useEffect(() => {
    // Charger les compteurs
    fetch("http://localhost:5000/api/counters/getcounter")
      .then(response => response.json())
      .then(data => setCounts(data))
      .catch(error => {
        console.error("Erreur lors du chargement des compteurs:", error);
        setNotification("Erreur lors du chargement des compteurs");
        setTimeout(() => setNotification(''), 3000);
      });
  }, []);

  const handleAddCount = () => {
    const label = prompt("Entrez le label du compteur :");
    const value = prompt("Entrez la valeur du compteur :");

    if (label && value) {
      const newCount = { label, value };

      fetch("http://localhost:5000/api/counters", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newCount)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status === 403 ? 'Accès refusé' : 'Erreur du serveur');
          }
          return response.json();
        })
        .then(data => {
          setCounts([...counts, data]);
          setNotification("Compteur ajouté avec succès !");
          setTimeout(() => setNotification(''), 3000);
        })
        .catch(error => {
          console.error("Erreur lors de l'ajout du compteur :", error);
          setNotification(error.message === 'Accès refusé' 
            ? "Accès refusé : droits insuffisants" 
            : "Erreur lors de l'ajout du compteur");
          setTimeout(() => setNotification(''), 3000);
        });
    }
  };

  const handleDeleteCount = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce compteur ?")) {
      fetch(`http://localhost:5000/api/counters/${id}`, { 
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status === 403 ? 'Accès refusé' : 'Erreur du serveur');
          }
          return response.json();
        })
        .then(() => {
          setCounts(counts.filter(count => count._id !== id));
          setNotification("Compteur supprimé avec succès !");
          setTimeout(() => setNotification(''), 3000);
        })
        .catch(error => {
          console.error("Erreur lors de la suppression :", error);
          setNotification(error.message === 'Accès refusé' 
            ? "Accès refusé : droits insuffisants" 
            : "Erreur lors de la suppression du compteur");
          setTimeout(() => setNotification(''), 3000);
        });
    }
  };

  const handleAlertEdit = (count) => {
    const label = prompt("Modifier le label:", count.label);
    const value = prompt("Modifier la valeur:", count.value);

    if (label && value) {
      const updatedCount = { ...count, label, value };

      fetch(`http://localhost:5000/api/counters/updatecounter/${count._id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedCount),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status === 403 ? 'Accès refusé' : 'Erreur du serveur');
          }
          return response.json();
        })
        .then((data) => {
          setCounts((prevCounts) =>
            prevCounts.map((c) => (c._id === data._id ? data : c))
          );
          setNotification("Compteur modifié avec succès !");
          setTimeout(() => setNotification(''), 3000);
        })
        .catch((error) => {
          console.error("Erreur lors de la modification :", error);
          setNotification(error.message === 'Accès refusé' 
            ? "Accès refusé : droits insuffisants" 
            : "Erreur lors de la modification du compteur");
          setTimeout(() => setNotification(''), 3000);
        });
    }
  };

  // Filtrer les compteurs selon le terme de recherche
  const filteredCounts = counts.filter(count => 
    count.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Sidebar />
    <div style={styles.container}>
      <h1 style={styles.title}>Counter Management</h1>
      {notification && <div style={styles.notification}>{notification}</div>}
      <div style={styles.form}>
        <button style={styles.addButton} onClick={handleAddCount}>
          Add a Counter
        </button>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          style={styles.input}
        />
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Title</th>
            <th style={styles.headerCell}>Value</th>
            <th style={styles.headerCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCounts.length === 0 ? (
            <tr>
              <td colSpan="3" style={styles.cell}>No counters available</td>
            </tr>
          ) : (
            filteredCounts.map((count) => (
              <tr key={count._id}>
                <td style={styles.cell}>{count.label}</td>
                <td style={styles.cell}>{count.value}</td>
                <td style={styles.cell}>
                  <button style={styles.editButton} onClick={() => handleAlertEdit(count)}>Edit</button>
                  <button style={styles.deleteButton} onClick={() => handleDeleteCount(count._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </>
  );
}


export default NumberPage;