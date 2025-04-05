import React, { useRef } from "react";

function UploadCvItem({ title, description, onFileChange }) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Déclenche le clic sur l'input file
  };

  return (
    <div className="cv-caption text-center">
      <p className="pera1">{title}</p>
      <p className="pera2">{description}</p>
      
      {/* Input caché pour l'upload */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onFileChange}
        accept=".pdf,.doc,.docx"
      />

      {/* Bouton pour déclencher l'upload */}
      <button onClick={handleButtonClick} className="border-btn2 border-btn4">
        Upload your CV
      </button>
    </div>
  );
}

export default UploadCvItem;
