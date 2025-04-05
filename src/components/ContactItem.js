import React from 'react';

function ContactItem({ icon, title, text }) {
  return (
    <div className="contact-item">
      <div className="contact-icon">
        <i className={icon}></i>
      </div>
      <div className="contact-text">
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default ContactItem;
