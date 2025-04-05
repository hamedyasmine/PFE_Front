import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/message.css'; // Assurez-vous que le chemin est correct

function MessagePage() {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [filterTerm, setFilterTerm] = useState('');
  const [filterType, setFilterType] = useState('name'); // 'name' ou 'date'
  const [currentMessage, setCurrentMessage] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [notification, setNotification] = useState('');

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formate la date en fonction de la locale
  };

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

  const handleFilterChange = (e) => {
    const term = e.target.value;
    setFilterTerm(term);
    filterMessages(term, filterType);
  };

 

  const filterMessages = (term, type) => {
    const filtered = messages.filter(message =>
      message[type].toLowerCase().includes(term.toLowerCase())
    );
    setFilteredMessages(filtered);
  };

  const handleDeleteMessage = async (id) => {
    try {
      // Requête DELETE vers le backend
      await axios.delete(`http://localhost:5000/api/contact/messages/${id}`);
      
      // Mise à jour de l'état après suppression
      setMessages(messages.filter(message => message._id !== id));
      setFilteredMessages(filteredMessages.filter(message => message._id !== id));
  
      setNotification('Message deleted successfully');
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error deleting message:', error);
      setNotification('Error deleting message');
      setTimeout(() => setNotification(''), 3000);
    }
  };
  

  

  return (
    <div className="message-container">
      <div className="au-card">
        <div className="au-card-title">
          <h3>Messages</h3>
        </div>
  
        {/* Filtrage */}
        <div className="filter-controls">
          <input
            type="text"
            value={filterTerm}
            onChange={handleFilterChange}
            placeholder="Search..."
          />
        </div>
  
        <div className="au-inbox-wrap js-inbox-wrap">
          <div className="au-message">
            <div className="au-message__noti">
              <p>You Have <span>{filteredMessages.length}</span> messages</p>
            </div>
            <div className="au-message-list">
              {filteredMessages.length === 0 ? (
                <div style={{ textAlign: 'center' }}>No messages available</div>
              ) : (
                filteredMessages.map(message => (
                  <div key={message._id} className="au-message__item">
                    <div className="au-message__item-inner">
                      <div className="au-message__item-text">
                        <div className="text">
                          <h5 className="name">{message.name}</h5>
                          <p><strong>Subject:</strong> {message.subject}</p>
                          <p><strong>Email:</strong> {message.email}</p>
                          <p><strong>Message:</strong> {message.message}</p>
                        </div>
                      </div>
                      <div className="au-message__item-time">
                        <span>{formatDate(message.createdAt)}</span>
                      </div>
                      <div className="au-message__item-actions">
                        <button onClick={() => handleDeleteMessage(message._id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
}

export default MessagePage;
