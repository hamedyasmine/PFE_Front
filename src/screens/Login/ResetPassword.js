import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = new URLSearchParams(location.search).get('email');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Mot de passe réinitialisé avec succès !");
        navigate("/login");
      } else {
        alert(data.message || "Erreur lors de la réinitialisation.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur serveur.");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f8f9fa",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#0d6efd" }}>
          Réinitialiser le mot de passe
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Nouveau mot de passe</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label>Confirmer le mot de passe</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Réinitialiser
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
