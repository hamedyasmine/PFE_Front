import React from "react";

function ChatbotMessage({ sender, text }) {
  return (
    <div className={`chat-message ${sender}`}>
      <div className={`message ${sender}`}>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default ChatbotMessage;
