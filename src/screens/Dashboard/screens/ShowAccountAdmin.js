import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const ModifyAccountAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState("");
  const goBack = () => {
    navigate(-1);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        try {
          const response = await axios.get("http://localhost:5000/api/auth/me", config);
          setUserId(response.data._id);
          setName(response.data.name);
          setEmail(response.data.email);
          setPhone(response.data.phone);
        } catch (error) {
          console.error("Erreur lors de la récupération des données utilisateur :", error);
        }
      } else {
        navigate("/Login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSave = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first!");
      navigate("/Login");
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      await axios.put(
        `http://localhost:5000/api/auth/update/${userId}`,
        { name, email, phone },
        config
      );
      alert("Changes saved!");
      navigate("/dashboard"); // Redirige vers le dashboard admin
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error.response);
      alert(`Erreur : ${error.response?.data?.message || "Mise à jour impossible"}`);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px 300px 10px 250px' }}>
    <button style={styles.backButton} onClick={goBack}>Back</button>
  </div>
  
    <section style={{ backgroundColor: "#f5f6fa", minHeight: "100vh", padding: "40px 0" }}>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card shadow-lg" style={{ borderRadius: "1rem", width: "700px" }}>
          <div className="card-body p-5">
            <h3 className="mb-4 text-center" style={{ color: "#2c3e50" }}>
              Modify Your Admin Account
            </h3>
            <form onSubmit={handleSave}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control form-control-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="form-control form-control-lg"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary btn-lg">
                  Save Changes
                </button>
              </div>

              <div className="mt-4 text-center">
                <p>
                  Want to change your password?{" "}
                  <a href="/modify-password" style={{ color: "#2980b9" }}>
                    Change Password
                  </a>
                </p>
                <p className="text-muted small mt-2">
                  <a href="#!" className="me-3 text-muted">
                    Terms of use
                  </a>
                  |
                  <a href="#!" className="ms-3 text-muted">
                    Privacy policy
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};
const styles = {
   
    backButton: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    }
};

export default ModifyAccountAdmin;
