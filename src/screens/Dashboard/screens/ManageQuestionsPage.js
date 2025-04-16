import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ManageQuestionsPage = () => {
  const { jobId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [newQuestions, setNewQuestions] = useState([]);
  const [mode, setMode] = useState('add');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/questions/${jobId}`);
        const data = response.data.questions || [];
        const formattedQuestions = data.map(q =>
          typeof q === 'string' ? { question: q, tempsDeReponse: 60 } : q
        );
        setQuestions(formattedQuestions);
        setNewQuestions(formattedQuestions);
      } catch (error) {
        console.error("Erreur lors de la récupération des questions", error);
      }
    };

    fetchQuestions();
  }, [jobId]);

  const addQuestionField = () => {
    setNewQuestions([...newQuestions, { question: "", tempsDeReponse: 60 }]);
  };

  const handleQuestionChange = (index, value) => {
    const updated = [...newQuestions];
    updated[index].question = value;
    setNewQuestions(updated);
  };

  const handleTimeChange = (index, value) => {
    const updated = [...newQuestions];
    updated[index].tempsDeReponse = parseInt(value);
    setNewQuestions(updated);
  };

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
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h1 style={styles.title}>Gérer les Questions d'Entretien</h1>

        <h3 style={styles.subtitle}>Questions actuelles</h3>
        {questions.length > 0 ? (
          <ul style={styles.questionList}>
            {questions.map((q, index) => (
              <li key={index} style={styles.questionItem}>
                • {q.question} <span style={{ color: '#777', fontSize: '14px' }}>(Temps : {q.tempsDeReponse}s)</span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ marginTop: 10, color: "#666" }}>Aucune question définie pour ce poste.</p>
        )}

        <div style={styles.buttonGroup}>
          <button style={styles.primaryButton} onClick={() => { setShowModal(true); setMode('add'); }}>
            Ajouter des Questions
          </button>
          {questions.length > 0 && (
            <button style={styles.deleteButton} onClick={deleteQuestions}>
              Supprimer toutes les Questions
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>
              {mode === 'add' ? 'Ajouter des questions' : 'Modifier les questions'}
            </h2>

            {newQuestions.map((q, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  placeholder={`Question ${index + 1}`}
                  style={styles.input}
                />
                <input
                  type="number"
                  value={q.tempsDeReponse}
                  onChange={(e) => handleTimeChange(index, e.target.value)}
                  placeholder="Temps de réponse (en secondes)"
                  style={styles.input}
                  min="1"
                />
              </div>
            ))}

            <button style={styles.addFieldButton} onClick={addQuestionField}>
              + Ajouter une question
            </button>

            <div style={styles.modalActions}>
              <button style={styles.primaryButton} onClick={submitQuestions}>
                Enregistrer
              </button>
              <button style={styles.cancelButton} onClick={() => setShowModal(false)}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  pageContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: 'sans-serif',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    padding: '30px',
    textAlign: 'left',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#003366',
  },
  subtitle: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#333',
  },
  questionList: {
    listStyleType: 'none',
    padding: 0,
    marginBottom: '20px',
  },
  questionItem: {
    padding: '10px',
    borderBottom: '1px solid #eee',
    fontSize: '16px',
    color: '#444',
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
    marginTop: '20px',
  },
  primaryButton: {
    backgroundColor: '#003366',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    flex: 1,
    minWidth: '200px',
  },
  deleteButton: {
    backgroundColor: '#cc0000',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    flex: 1,
    minWidth: '200px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: '22px',
    marginBottom: '20px',
    color: '#003366',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
  },
  addFieldButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    marginTop: '10px',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    gap: '10px',
  },
  cancelButton: {
    backgroundColor: '#aaa',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    flex: 1,
  },
};

export default ManageQuestionsPage;
