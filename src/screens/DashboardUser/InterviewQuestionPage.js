import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const InterviewQuestionsPage = () => {
  const { applicationId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timers, setTimers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // ✅ Fonction corrigée : gestion correcte du timer
  const startTimer = (index, duration) => {
    setTimers((prevTimers) => ({
      ...prevTimers,
      [index]: duration,
    }));

    const timerInterval = setInterval(() => {
      setTimers((prevTimers) => {
        const current = prevTimers[index];
        if (current <= 1) {
          clearInterval(timerInterval);
          return { ...prevTimers, [index]: 0 };
        } else {
          return { ...prevTimers, [index]: current - 1 };
        }
      });
    }, 1000);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/questions/applications/${applicationId}/questions`
        );
        setQuestions(response.data);
        startTimer(0, response.data[0].tempsDeReponse);
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
    if (timers[index] > 0) {
      setAnswers({
        ...answers,
        [index]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("➡️ Envoi des réponses...");
      const response = await axios.post(
        `http://localhost:5000/api/questions/applications/${applicationId}/submit-answers`,
        { answers }
      );
      console.log("✅ Réponses soumises :", response.data);
  
      console.log("➡️ Marquage entretien comme passé...");
      const markResponse = await axios.put(
        `http://localhost:5000/api/questions/applications/${applicationId}/markInterviewPassed`
      );
      console.log("✅ Entretien marqué :", markResponse.data);
  
      alert("Réponses soumises avec succès !");
    } catch (error) {
      console.error("❌ Erreur :", error.response?.data || error.message || error);
      alert("Erreur lors de la soumission : " + (error.response?.data?.message || error.message));
    }
  };
  
  

  // ✅ Mise à jour propre du passage à la question suivante
  useEffect(() => {
    if (
      questions.length > 0 &&
      timers[currentQuestionIndex] === 0 &&
      currentQuestionIndex < questions.length - 1
    ) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      startTimer(nextIndex, questions[nextIndex].tempsDeReponse);
    }
  }, [timers, currentQuestionIndex, questions]);

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
              <div
                key={index}
                style={{
                  ...questionCardStyle,
                  display: index === currentQuestionIndex ? 'block' : 'none',
                }}
              >
                <div style={questionStyle}>
                  <h3>{question.question}</h3>
                  <p>Temps restant : {timers[index]} secondes</p>
                </div>
                <div style={answerContainerStyle}>
                  <textarea
                    style={answerTextareaStyle}
                    rows="4"
                    placeholder="Votre réponse..."
                    value={answers[index] || ""}
                    onChange={(e) => handleInputChange(e, index)}
                    disabled={timers[index] <= 0}
                  />
                </div>
              </div>
            ))}
          </div>

          {currentQuestionIndex === questions.length - 1 &&
            timers[currentQuestionIndex] === 0 && (
              <div style={submitButtonContainerStyle}>
                <button type="submit" style={submitButtonStyle}>
                  Soumettre mes réponses
                </button>
              </div>
            )}
        </form>
      )}
    </div>
  );
};

export default InterviewQuestionsPage;
