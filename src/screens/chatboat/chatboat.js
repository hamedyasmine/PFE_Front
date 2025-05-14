import React, { useState, useRef } from 'react';
import { FaPaperPlane, FaMicrophone, FaStop, FaFileUpload  } from 'react-icons/fa'; // Ajout d'icônes stylées

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you?' },
  ]);
  const [input, setInput] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    // Afficher un message de chargement
    const loadingMessage = { sender: 'bot', text: 'Analyse de votre CV en cours...' };
    setMessages(prev => [...prev, loadingMessage]);
  
    const formData = new FormData();
    formData.append('cv', file);
  
    try {
      console.log('Envoi du CV au serveur...');
      
      // Remplacez cette URL par l'URL de votre API backend
      const response = await fetch('https://votre-backend-api-url/compare_cv_to_jobs', {
        method: 'POST',
        body: formData,
      });
  
      console.log('Réponse du serveur:', response.status);
      
      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Données reçues:', data);
  
      // Remplacer le message de chargement
      const newMessages = [...messages];
      // Trouver et supprimer le message de chargement
      const loadingIndex = newMessages.findIndex(msg => 
        msg.sender === 'bot' && msg.text === 'Analyse de votre CV en cours...');
      if (loadingIndex !== -1) {
        newMessages.splice(loadingIndex, 1);
      }
  
      if (data.matches && data.matches.length > 0) {
        // Créer un message qui montre les 3 meilleures correspondances
        const bestMatches = data.matches.slice(0, 3); // Prendre les 3 premiers
        
        let matchesText = "Voici les meilleures correspondances pour votre CV:\n\n";
        
        bestMatches.forEach((match, index) => {
          matchesText += `${index + 1}. ${match.job_title} - Correspondance: ${match.similarity_score}%\n`;
        });
        
        // Ajouter des conseils si disponibles
        if (data.fraud_warning) {
          matchesText += "\n⚠️ Attention: Certains éléments de votre CV pourraient être améliorés:\n";
          data.fraud_warning.flags.forEach(flag => {
            matchesText += `- ${flag}\n`;
          });
        }
        
        const botMessage = { sender: 'bot', text: matchesText };
        setMessages([...newMessages, botMessage]);
      } else {
        const botMessage = { 
          sender: 'bot', 
          text: 'Aucun emploi correspondant trouvé. Essayez de mettre à jour votre CV avec des compétences plus pertinentes.' 
        };
        setMessages([...newMessages, botMessage]);
      }
    } catch (error) {
      console.error('Erreur complète:', error);
      
      // Remplacer le message de chargement par un message d'erreur
      const newMessages = [...messages];
      const loadingIndex = newMessages.findIndex(msg => 
        msg.sender === 'bot' && msg.text === 'Analyse de votre CV en cours...');
      if (loadingIndex !== -1) {
        newMessages.splice(loadingIndex, 1);
      }
      
      const errorMessage = { 
        sender: 'bot', 
        text: `Désolé, une erreur s'est produite lors de l'analyse de votre CV. Veuillez réessayer.` 
      };
      setMessages([...newMessages, errorMessage]);
    }
  };

  
  

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    await sendQuestionToBot(input);

    setInput('');
  };

  const sendQuestionToBot = async (question) => {
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
  
      const data = await response.json(); // ✅ ici on récupère les données d’abord
      console.log('Données reçues:', data); // ✅ puis on les affiche
  
      const botMessage = { sender: 'bot', text: data.answer };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error talking to API:', error);
    }
  };
  

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        handleSendAudioBlob(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Erreur micro:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSendAudioBlob = async (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    try {
      const response = await fetch('http://localhost:5000/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const transcription = data.transcription;

      if (transcription) {
        const userMessage = { sender: 'user', text: transcription };
        setMessages(prev => [...prev, userMessage]);

        await sendQuestionToBot(transcription);
      }
    } catch (error) {
      console.error('Erreur envoi audio:', error);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
  
      const userMessage = { sender: 'user', text: `Résumé "${file.name}" uploaded ✅` };
      setMessages(prev => [...prev, userMessage]);
    }
  };
  

  return (
    <div>
      {!isOpen && (
        <div className="launcher" onClick={toggleChat}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Agent"
            className="avatar-img"
          />
          <div className="talk-bubble">Let’s Talk 💬</div>
        </div>
      )}

      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            Chatbot IA
            <span className="close-btn" onClick={toggleChat}>×</span>
          </div>
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Écrivez un message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <input
  type="file"
  accept="application/pdf"
  style={{ display: 'none' }}
  ref={fileInputRef}
  onChange={handleFileUpload}
/>
<button onClick={() => fileInputRef.current.click()} className="icon-button upload-button">
  <FaFileUpload size={18} />
</button>

            <button onClick={handleSend} className="icon-button">
              <FaPaperPlane size={18} />
            </button>
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className="icon-button mic-button"
              style={{ backgroundColor: isRecording ? '#dc3545' : '#17a2b8' }}
            >
              {isRecording ? <FaStop size={18} /> : <FaMicrophone size={18} />}
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .launcher {
          position: fixed;
          bottom: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          z-index: 999;
        }

        .avatar-img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
          .upload-button {
  background-color: #28a745; /* Vert pour l'upload */
}

.upload-button:hover {
  background-color: #218838;
}


        .talk-bubble {
          background-color: #007bff;
          color: white;
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 14px;
          margin-top: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .chat-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 360px;
          height: 500px;
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 1000;
        }

        .chat-header {
          background-color: #007bff;
          color: white;
          padding: 12px;
          font-weight: bold;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .close-btn {
          cursor: pointer;
          font-size: 20px;
        }

        .chat-messages {
          flex: 1;
          padding: 10px;
          overflow-y: auto;
          background: #f9f9f9;
          display: flex;
          flex-direction: column;
        }

        .chat-msg {
          margin: 8px 0;
          padding: 10px;
          border-radius: 8px;
          max-width: 80%;
        }

        .chat-msg.user {
          background-color: #daf1ff;
          align-self: flex-end;
          text-align: right;
        }

        .chat-msg.bot {
          background-color: #eee;
          align-self: flex-start;
        }

        .chat-input {
          display: flex;
          padding: 10px;
          border-top: 1px solid #ddd;
          align-items: center;
        }

        .chat-input input {
          flex: 1;
          padding: 8px;
          border-radius: 20px;
          border: 1px solid #ccc;
          outline: none;
        }

        .icon-button {
          margin-left: 8px;
          padding: 8px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-button:hover {
          background-color: #0056b3;
        }

        .mic-button {
          background-color: #17a2b8;
        }
      `}</style>
    </div>
  );
};

export default ChatbotWidget;
