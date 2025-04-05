import React, { useState } from "react";
import ChatbotMessage from "./ChatbotMessage";
import Header from "../Home/Homee/Header";

function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "How can I help you?" },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      const newMessages = [...messages, { sender: "user", text: userInput }];
      setMessages(newMessages);
      setUserInput("");

      // Simulate bot's reply (you can modify this for real responses)
      setTimeout(() => {
        const botReply = {
          sender: "bot",
          text: "You said: " + userInput,
        };
        setMessages((prevMessages) => [...prevMessages, botReply]);
      }, 1000);
    }
  };

  return (
    <>
      <Header />
      <div
        style={{
          backgroundImage:
            "url('https://st2.depositphotos.com/3894705/7745/i/450/depositphotos_77458360-stock-photo-grunge-background-of-dark-blue.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh", // Toute la hauteur de la page
          display: "flex",
          justifyContent: "center", // Centrer horizontalement
          alignItems: "center", // Centrer verticalement
        }}
      >
        <div
          className="chatbot-container"
          style={{
            backgroundColor: "white", // Fond blanc pour le chatbot
            width: "600px",
            height: "700px",
            display: "flex",
            flexDirection: "column",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Titre du chatbot */}
          <div
            className="chatbot-header"
            style={{
              backgroundColor: "#003366",
              color: "white",
              padding: "20px",
              textAlign: "center",
              fontSize: "1.4rem",
              fontWeight: "bold",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
            }}
          >
            <h2>How can I help you?</h2>
          </div>

          {/* Zone des messages */}
          <div
            className="chatbot-messages"
            style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              backgroundColor: "#fff",
              borderBottom: "1px solid #ddd",
            }}
          >
            {messages.map((message, index) => (
              <ChatbotMessage
                key={index}
                sender={message.sender}
                text={message.text}
              />
            ))}
          </div>

          {/* Zone de saisie de message */}
          <div
            className="chatbot-input"
            style={{
              display: "flex",
              padding: "15px",
              backgroundColor: "#fff",
              borderBottomLeftRadius: "15px",
              borderBottomRightRadius: "15px",
            }}
          >
            <input
              type="text"
              value={userInput}
              onChange={handleUserInput}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: "15px",
                borderRadius: "20px",
                border: "1px solid #ddd",
                fontSize: "1.1rem",
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                backgroundColor: "#003366",
                color: "white",
                padding: "15px 25px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontSize: "1.1rem",
                marginLeft: "15px",
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chatbot;
