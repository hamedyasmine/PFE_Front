import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

function MessagePage() {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [filterTerm, setFilterTerm] = useState('');
  const [showImportantOnly, setShowImportantOnly] = useState(false);

  // Récupérer les messages depuis le backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contact/messages');
        setMessages(response.data);
        setFilteredMessages(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des messages', error);
      }
    };

    fetchMessages();
  }, []);

  // Mise à jour après filtre ou changement important
  useEffect(() => {
    let updated = [...messages];

    if (filterTerm) {
      updated = updated.filter(message =>
        message.name.toLowerCase().includes(filterTerm.toLowerCase())
      );
    }

    if (showImportantOnly) {
      updated = updated.filter(message => message.isImportant);
    }

    setFilteredMessages(updated);
  }, [messages, filterTerm, showImportantOnly]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleDeleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contact/messages/${id}`);
      const updatedMessages = messages.filter(message => message._id !== id);
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
    }
  };

  const toggleImportant = async (id, currentValue) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/messages/${id}`, {
        isImportant: !currentValue
      });

      const updatedMessages = messages.map(message =>
        message._id === id ? { ...message, isImportant: response.data.isImportant } : message
      );

      setMessages(updatedMessages);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut important', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <Sidebar />
      </div>

      <div style={styles.content}>
        <h2 style={styles.title}>Messages</h2>

        <div style={styles.controls}>
          <input
            type="text"
            placeholder="Rechercher par nom..."
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
            style={styles.input}
          />
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={showImportantOnly}
              onChange={() => setShowImportantOnly(!showImportantOnly)}
            />
            Messages importants
          </label>
        </div>

        <div style={styles.messageList}>
          {filteredMessages.length === 0 ? (
            <p>Aucun message trouvé.</p>
          ) : (
            filteredMessages.map(message => (
              <div key={message._id} style={styles.messageItem}>
                <div style={styles.messageHeader}>
                  <h4 style={{ margin: 0 }}>{message.name}</h4>
                  <div style={styles.actions}>
                    <button
                      onClick={() => toggleImportant(message._id, message.isImportant)}
                      style={styles.starButton}
                      title="Marquer comme important"
                    >
                      <i
                        className="fa fa-star"
                        style={{
                          color: message.isImportant ? 'gold' : '#ccc',
                          fontSize: '20px',
                          cursor: 'pointer', // Ajout du curseur pointer
                          zIndex: 10, // Augmenter le z-index de l'icône
                        }}
                      ></i>
                    </button>
                    <button
                      onClick={() => handleDeleteMessage(message._id)}
                      style={styles.deleteButton}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
                <p><strong>Email:</strong> {message.email}</p>
                <p><strong>Sujet:</strong> {message.subject}</p>
                <p><strong>Message:</strong> {message.message}</p>
                <p style={styles.date}><strong>Date:</strong> {formatDate(message.createdAt)}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ✅ CSS en JS (inline styles)
const styles = {
  container: {
    display: 'flex',
  },
  sidebar: {
    width: '250px', // Largeur de la sidebar
    padding: '20px',
    backgroundColor: '#f4f4f4',
  },
  content: {
    flex: 1, // Prendre tout l'espace restant
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#0d47a1',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '15px',
  },
  input: {
    padding: '8px',
    fontSize: '14px',
    flex: 1,
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  messageList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  messageItem: {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '8px',
    background: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    position: 'relative',
  },
  messageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  starButton: {
    background: 'none',
    border: 'none',
    padding: '0',
    cursor: 'pointer',
    zIndex: 10,
    position: 'relative',
  },
  deleteButton: {
    padding: '5px 10px',
    background: '#fffff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  date: {
    fontStyle: 'italic',
    color: '#555',
  },
};

export default MessagePage;
