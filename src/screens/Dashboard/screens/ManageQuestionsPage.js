import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ManageQuestionsPage = () => {
  const { jobId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [newQuestions, setNewQuestions] = useState([]);
  const [mode, setMode] = useState('add'); // Mode pour ajouter ou modifier
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/questions/${jobId}`);
        setQuestions(response.data.questions || []);
        setNewQuestions(response.data.questions || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des questions", error);
      }
    };

    fetchQuestions();
  }, [jobId]);

  // Ajouter un champ pour une nouvelle question
  const addQuestionField = () => {
    setNewQuestions([...newQuestions, ""]);
  };

  // Modifier une question dans la liste
  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...newQuestions];
    updatedQuestions[index] = value;
    setNewQuestions(updatedQuestions);
  };

  // Soumettre les nouvelles questions (ajout ou mise à jour)
  const submitQuestions = async () => {
    try {
      await axios.put(`http://localhost:5000/api/questions/${jobId}`, { questions: newQuestions });
      alert("Questions mises à jour avec succès !");
      setShowModal(false);
      setQuestions(newQuestions);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des questions", error);
    }
  };

  // Supprimer toutes les questions du job
  const deleteQuestions = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/questions/${jobId}`);
      alert("Questions supprimées avec succès !");
      setQuestions([]);
    } catch (error) {
      console.error("Erreur lors de la suppression des questions", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Gérer les Questions d'Entretien</h1>

        <h2>Questions d'entretien actuelles</h2>
        {questions.length > 0 ? (
          <ul style={styles.questionList}>
            {questions.map((q, index) => (
              <li key={index} style={styles.questionItem}>{q}</li>
            ))}
          </ul>
        ) : (
          <p>Aucune question pour ce job.</p>
        )}

        <button style={styles.button} onClick={() => { setShowModal(true); setMode('add'); }}>Ajouter des Questions</button>
        
        {questions.length > 0 && <button style={styles.button} onClick={deleteQuestions}>Supprimer les Questions</button>}

        {/* Modale pour ajouter/éditer des questions */}
        {showModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <h2>{mode === 'add' ? 'Ajouter des questions d\'entretien' : 'Modifier des questions d\'entretien'}</h2>

              {newQuestions.map((question, index) => (
                <input
                  key={index}
                  type="text"
                  value={question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  placeholder={`Question ${index + 1}`}
                  style={styles.inputField}
                />
              ))}

              <button style={styles.button} onClick={addQuestionField}>+ Ajouter une autre question</button>

              <div style={styles.modalActions}>
                <button style={styles.button} onClick={submitQuestions}>
                  {mode === 'add' ? 'Enregistrer' : 'Mettre à jour'}
                </button>
                <button style={styles.cancelButton} onClick={() => setShowModal(false)}>Annuler</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { 
    width: '80%', 
    margin: 'auto', 
    padding: '20px', 
    textAlign: 'center', 
    backgroundColor: '#f7f7f7' 
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginTop: '20px',
    border: '1px solid #ddd'
  },
  title: {
    color: '#007bff',
    fontSize: '24px',
    marginBottom: '20px'
  },
  questionList: {
    listStyleType: 'none',
    padding: 0
  },
  questionItem: {
    marginBottom: '10px',
    fontSize: '16px',
    color: '#333'
  },
  button: {
    marginTop: '10px',
    padding: '12px 24px',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '200px'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContent: {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    width: '400px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  },
  inputField: {
    width: '90%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  modalActions: {
    marginTop: '20px'
  },
  cancelButton: {
    marginLeft: '10px',
    padding: '10px 15px',
    backgroundColor: '#dc3545',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none'
  },
};

export default ManageQuestionsPage;
