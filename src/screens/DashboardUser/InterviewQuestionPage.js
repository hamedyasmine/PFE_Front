import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const InterviewQuestionsPage = () => {
  const { applicationId } = useParams(); // Récupérer l'ID de la candidature
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({}); // Stocker les réponses des utilisateurs

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/questions/applications/${applicationId}/questions`);
        console.log("Questions reçues :", response.data);
        setQuestions(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des questions :", error);
        setError("Erreur lors de la récupération des questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [applicationId]);

  const handleInputChange = (event, index) => {
    setAnswers({
      ...answers,
      [index]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Vérification des données envoyées avant l'envoi
    console.log("Réponses envoyées : ", answers);
    const token = localStorage.getItem('authToken');

    try {
      const response = await axios.post(
        `http://localhost:5000/api/questions/applications/${applicationId}/submit-answers`,
        { answers }
      );
      console.log("Réponse du serveur : ", response.data); // Log de la réponse du serveur
      alert("Réponses soumises avec succès!");
    } catch (error) {
      console.error("Erreur lors de l'envoi des réponses :", error.response || error);
      // Vérification des erreurs
      if (error.response) {
        // Si la réponse du serveur est présente
        alert(`Erreur: ${error.response.data.message || error.response.statusText}`);
      } else {
        alert("Erreur lors de la soumission des réponses.");
      }
    }
  };

  const containerStyle = {
    width: '80%',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle = {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  };

  const errorMessageStyle = {
    color: 'red',
    fontWeight: 'bold',
  };

  const questionsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const questionCardStyle = {
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  };

  const questionStyle = {
    fontSize: '1.25rem',
    color: '#333',
  };

  const answerContainerStyle = {
    marginTop: '10px',
  };

  const answerTextareaStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
    boxSizing: 'border-box',
    resize: 'none',
    minHeight: '100px',
  };

  const submitButtonContainerStyle = {
    marginTop: '20px',
    textAlign: 'center',
  };

  const submitButtonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Questions d'entretien</h1>

      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <div style={errorMessageStyle}>{error}</div>
      ) : questions.length === 0 ? (
        <p>Aucune question trouvée.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={questionsContainerStyle}>
            {questions.map((question, index) => (
              <div key={index} style={questionCardStyle}>
                <div style={questionStyle}>
                  <h3>{question}</h3>
                </div>
                <div style={answerContainerStyle}>
                  <textarea
                    style={answerTextareaStyle}
                    rows="4"
                    placeholder="Votre réponse..."
                    value={answers[index] || ""}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={submitButtonContainerStyle}>
            <button type="submit" style={submitButtonStyle}>
              Soumettre mes réponses
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default InterviewQuestionsPage;
