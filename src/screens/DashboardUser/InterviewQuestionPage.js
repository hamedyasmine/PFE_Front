import { useEffect, useState,useRef } from "react";
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
  const [saveTimeout, setSaveTimeout] = useState(null);
  const saveTimeoutRef = useRef(null);
  const saveAnswer = async (index, answer) => {
    try {
      console.log(`➡️ Saving answer for question ${index}...`);
      const response = await axios.post(
        `http://localhost:5000/api/applications/${applicationId}/save-answer`,
        { questionIndex: index, answer }
      );
      console.log(`✅ Answer saved for question ${index}:`, response.data);
    } catch (error) {
      console.error(`❌ Error saving answer for question ${index}:`, 
        error.response?.data || error.message || error);
    }
  };
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
        console.error("Error retrieving questions :", error);
        setError("Error retrieving questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [applicationId]);

  const handleInputChange = (event, index) => {
    if (timers[index] > 0) {
      const newAnswer = event.target.value;
      
      // Mettre à jour l'état local
      setAnswers({
        ...answers,
        [index]: newAnswer,
      });
      
      // Effacer le timeout précédent si existe
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      // Créer un nouveau timeout
      saveTimeoutRef.current = setTimeout(() => {
        saveAnswer(index, newAnswer);
      }, 500);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("➡️ 	Submitting answers...");
      const response = await axios.post(
        `http://localhost:5000/api/questions/applications/${applicationId}/submit-answers`,
        { answers }
      );
      console.log("✅	Answers submitted :", response.data);
  
      console.log("➡️ Marking interview as completed...");
      const markResponse = await axios.put(
        `http://localhost:5000/api/questions/applications/${applicationId}/markInterviewPassed`
      );
      console.log("✅ Interview marked :", markResponse.data);
  
      alert("Answers submitted successfully!");
    } catch (error) {
      console.error("❌ Error :", error.response?.data || error.message || error);
      alert("Answers submitted successfully! " + (error.response?.data?.message || error.message));
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
      <h1 style={titleStyle}>Interview questions</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div style={errorMessageStyle}>{error}</div>
      ) : questions.length === 0 ? (
        <p> No questions found.</p>
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
                  <p>Time remaining: {timers[index]} seconds</p>
                </div>
                <div style={answerContainerStyle}>
                  <textarea
                    style={answerTextareaStyle}
                    rows="4"
                    placeholder="Your answer..."
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
                Submit my answers
                </button>
              </div>
            )}
        </form>
      )}
    </div>
  );
};

export default InterviewQuestionsPage;
