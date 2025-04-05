import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Home/Homee/Header";
import axios from "axios";

const ModifyAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
  
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        try {
          const response = await axios.get("http://localhost:5000/api/auth/me", config);
          console.log("User data:", response.data); 
          setUserId(response.data._id); 
          setName(response.data.name);  // Remplacez 'name' par le bon champ du backend
          setEmail(response.data.email); // Remplacez 'email' par le bon champ du backend
          setPhone(response.data.phone); // Remplacez 'phone' par le bon champ du backend
        } catch (error) {
          console.error("Erreur lors de la récupération des données utilisateur :", error);
        }
      } else {
        console.log("Aucun token trouvé.");
        navigate("/Login"); // Redirige vers la page de login si pas de token
      }
    };

    fetchUserData();
  }, [navigate]);

  // Fonction de sauvegarde
    const handleSave = async (event) => {
    event.preventDefault();
    
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first!");
      navigate("/Login");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/auth/update/${userId}`
,  // Assurez-vous que l'URL correspond à la route de votre backend
        { name, email, phone },
        config
      );
      alert("Changes saved!");
      navigate("/dashboarduser");  // Redirige après la sauvegarde
    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations utilisateur :", error.response);
      alert(`Erreur : ${error.response?.data?.message || "Mise à jour impossible"}`);
    }
  };

  return (
    <>
      <Header />
      <section
        className="vh-100"
        style={{
          backgroundImage:
            "url('https://st2.depositphotos.com/3894705/7745/i/450/depositphotos_77458360-stock-photo-grunge-background-of-dark-blue.jpg')",
        }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="modify account"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSave}>
                        
                        <h4
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Modify Your Account
                        </h4>

                        {/* Champ Nom */}
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="name"
                            className="form-control form-control-lg"
                            value={name || ''}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="name">
                            Name
                          </label>
                        </div>

                        {/* Champ Email */}
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="email">
                            Email address
                          </label>
                        </div>

                        {/* Champ Téléphone */}
                        <div className="form-outline mb-4">
                          <input
                            type="tel"
                            id="phone"
                            className="form-control form-control-lg"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="phone">
                            Phone Number
                          </label>
                        </div>

                        {/* Bouton Save */}
                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg btn-block" type="submit">
                            Save Changes
                          </button>
                        </div>

                        <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                          Want to change something else? <a href="/modify-password" style={{ color: "#393f81" }}>Change Password</a>
                        </p>

                        <a href="#!" className="small text-muted">
                          Terms of use.
                        </a>
                        <a href="#!" className="small text-muted">
                          Privacy policy
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ModifyAccount;
