import React, { useState, useEffect } from 'react';

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
  editButton: {
    padding: '8px 12px',
    background: '#0000FF',
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

  useEffect(() => {
    fetch("http://localhost:5000/api/counters/getcounter")
      .then(response => response.json())
      .then(data => setCounts(data))
      .catch(error => console.error("Erreur lors du chargement des compteurs:", error));
  }, []);

  const handleAddCount = () => {
    const label = prompt("Entrez le label du compteur :");
    const value = prompt("Entrez la valeur du compteur :");

    if (label && value) {
      const newCount = { label, value };

      fetch("http://localhost:5000/api/counters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCount)
      })
        .then(response => response.json())
        .then(data => {
          setCounts([...counts, data]);
          setNotification("Compteur ajouté avec succès !");
          setTimeout(() => setNotification(''), 3000);
        })
        .catch(error => console.error("Erreur lors de l'ajout du compteur :", error));
    }
  };

  const handleDeleteCount = (id) => {
    fetch(`http://localhost:5000/api/counters/${id}`, { method: "DELETE" })
      .then(() => {
        setCounts(counts.filter(count => count._id !== id));
        setNotification("Compteur supprimé !");
        setTimeout(() => setNotification(''), 3000);
      })
      .catch(error => console.error("Erreur lors de la suppression :", error));
  };

  const handleAlertEdit = (count) => {
    const label = prompt("Modifier le label:", count.label);
    const value = prompt("Modifier la valeur:", count.value);

    if (label && value) {
      const updatedCount = { ...count, label, value };

      fetch(`http://localhost:5000/api/counters/updatecounter/${count._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCount),
      })
        .then((response) => response.json())
        .then((data) => {
          setCounts((prevCounts) =>
            prevCounts.map((c) => (c._id === data._id ? data : c))
          );
          setNotification("Compteur modifié avec succès !");
          setTimeout(() => setNotification(''), 3000);
        })
        .catch((error) => console.error("Erreur lors de la modification :", error));
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gestion des Compteurs</h1>
      {notification && <div style={styles.notification}>{notification}</div>}
      <div style={styles.form}>
        <button style={styles.addButton} onClick={handleAddCount}>Ajouter un Compteur</button>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher..."
          style={styles.input}
        />
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Label</th>
            <th style={styles.headerCell}>Valeur</th>
            <th style={styles.headerCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {counts.length === 0 ? (
            <tr>
              <td colSpan="3" style={styles.cell}>Aucun compteur disponible</td>
            </tr>
          ) : (
            counts.map((count) => (
              <tr key={count._id}>
                <td style={styles.cell}>{count.label}</td>
                <td style={styles.cell}>{count.value}</td>
                <td style={styles.cell}>
                  <button style={styles.editButton} onClick={() => handleAlertEdit(count) }>Modifier</button>
                  <button style={styles.deleteButton} onClick={() => handleDeleteCount(count._id)}>Supprimer</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default NumberPage;