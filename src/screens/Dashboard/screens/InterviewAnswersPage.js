import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar'; // Importation de la Sidebar

const QuestionsAnswersPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { idjob } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestionsAnswers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/applications/${idjob}/questions-answers`);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load questions and answers. Please try again later.');
        setLoading(false);
        console.error('Error fetching questions and answers:', err);
      }
    };

    fetchQuestionsAnswers();
  }, [idjob]);

  const goBack = () => {
    navigate(-1);
  };

  const styles = {
    container: {
        width: '60%',
      marginLeft: '350px', // Pour laisser la place à la Sidebar
      padding: '20px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      
       
    color: '#0d47a1'
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
    qaCard: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    question: {
      fontWeight: 'bold',
      fontSize: '18px',
      marginBottom: '10px',
      color: '#007bff',
    },
    answer: {
      fontSize: '16px',
      marginBottom: '10px',
      color: '#555',
    },
    time: {
      fontSize: '14px',
      color: '#888',
      textAlign: 'right',
    },
    loading: {
      textAlign: 'center',
      padding: '40px',
      fontSize: '18px',
    },
    error: {
      textAlign: 'center',
      color: 'red',
      fontSize: '18px',
      padding: '40px',
    },
    emptyMessage: {
      textAlign: 'center',
      padding: '40px',
      fontSize: '18px',
      color: '#777',
    },
  };

  if (loading) {
    return (
      <>
        <Sidebar />
        <div style={styles.loading}>Loading questions and answers...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Sidebar />
        <div style={styles.error}>{error}</div>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Questions and Answers</h1>
          <button style={styles.backButton} onClick={goBack}>Back</button>
        </div>

        {(!data || !data.questionsAndAnswers || data.questionsAndAnswers.length === 0) ? (
          <div style={styles.emptyMessage}>No questions and answers found for this application.</div>
        ) : (
          data.questionsAndAnswers.map((qa, index) => (
            <div key={index} style={styles.qaCard}>
              <div style={styles.question}>Q: {qa.question}</div>
              <div style={styles.answer}>A: {qa.answer}</div>
              <div style={styles.time}>Response time: {qa.tempsDeReponse} seconds</div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default QuestionsAnswersPage;
