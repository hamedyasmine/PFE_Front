




import React, { useState, useEffect } from "react";
import HeaderItem from "../../components/HomeItem/HeaderItem";
import { FaUser, FaSignOutAlt } from "react-icons/fa"; // Icônes utilisateur et logout
import { useNavigate } from "react-router-dom";
import axios from "axios";
const DashboardUser = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [userData, setUserData] = useState(null); 
  
 
  const navigate = useNavigate();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Find a Job", path: "/findjob" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

 

  
    // Récupérer les données utilisateur protégées
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
            const {data} = await axios.get("http://localhost:5000/api/auth/me", config);
            setUserData(data._id); // Mettre à jour l'état avec les données utilisateur
            setUserData(data.name);
            setUserData(data.email);
            setUserData(data.phone);
            const token = data.token; // Supposons que la réponse contient le token
            localStorage.setItem('authToken', token); 
            
          } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
          }
        } else {
          console.log("Aucun token trouvé.");
          navigate("/Login"); // Redirige vers la page de login si pas de token
        }
      };
  
      fetchUserData();
    }, [navigate]); // Le useEffect se déclenche lors du montage du composant

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleShowInfo = () => {
    navigate("/my-account"); // Redirige vers My-Account
  };

  return (
    <div className="dashboard-container">
      {/* Navbar blanche propre */}
      <nav className="navbar">
        <div className="navbar-left">
        <div className="header-area header-transparrent">
        <div className="headder-top header-sticky">
          <div className="container">
            <div className="row align-items-center">
              {/* Logo */}
              <div className="col-lg-3 col-md-2">
                <div className="logo">
                  <a href="index.html">
                    <img src="assets/img/logo/logo.png" alt="" />
                  </a>
                </div>
              </div>

              {/* Menu principal */}
              <div className="col-lg-9 col-md-9">
                <div className="menu-wrapper">
                  <div className="main-menu">
                    <nav className="d-none d-lg-block">
                      <ul id="navigation">
                        {menuItems.map((item, index) => (
                          <HeaderItem key={index} {...item} />
                        ))}
                      </ul>
                    </nav>
                  </div>

                  
                </div>
              </div>

              {/* Mobile Menu */}
              <div className="col-12">
                <div className="mobile_menu d-block d-lg-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
        <div className="navbar-right">
          <div className="user-icon" onClick={toggleMenu}>
            <FaUser size={24} color="black" /> {/* Icône noir */}
            {isMenuVisible && (
              <div className="dropdown-menu">
                <button onClick={handleShowInfo} style={{  color: "black"}}>Show Account</button>

                <a href="/"><FaSignOutAlt color="black" /> Logout</a> {/* Icône noir */}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="dashboard-content">
        <h1>Find New Jobs</h1>
        <p>How are you today?</p>

        

        

        {/* Section Show My Information */}
        {showInfo && userData && (
          <div className="info-section">
            <h2>My Information</h2>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
          </div>
        )}

        {/* Boutons */}
        <button className="discuss-btn" onClick={() => navigate("/findjob")}>
          Find Jobs
        </button>
        <button className="applications-btn" onClick={() => navigate("/userapplication")}>Show My Applications</button>
       
      </main>

      {/* Styles CSS améliorés */}
      <style jsx>{`
         .dashboard-container {
    font-family: Arial, sans-serif;
    background-image: url('https://st2.depositphotos.com/3894705/7745/i/450/depositphotos_77458360-stock-photo-grunge-background-of-dark-blue.jpg');
    min-height: 100vh;
    color: white;
    text-align: center;
    padding: 20px;
        }

        /* Navbar blanche alignée proprement */
        .navbar {
          background-color: white;
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }

        .navbar-left {
          flex: 1;
        }

        .navbar-right {
          display: flex;
          align-items: center;
        }

        .user-icon {
          cursor: pointer;
          position: relative;
          margin-right: 20px;
        }

        .dropdown-menu {
          position: absolute;
          right: 0;
          top: 30px;
          background-color: white;
          color: black;
          padding: 10px;
          border-radius: 5px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
        }

        .dropdown-menu button,
        .dropdown-menu a {
          background: none;
          border: none;
          padding: 8px 10px;
          cursor: pointer;
          text-align: left;
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dropdown-menu a {
          text-decoration: none;
          color: black;
        }

        .dashboard-content {
          margin-top: 50px;
        }

        h1 {
          font-size: 3em;
          margin-bottom: 20px;
        }

        p {
          font-size: 1.5em;
          margin-bottom: 20px;
          color: white;
        }

        .form-group {
          margin: 20px 0;
        }

        .form-group label {
          display: block;
          font-size: 1.2em;
          margin-bottom: 10px;
        }

        .form-group input, .form-group select {
          width: 50%;
          padding: 10px;
          border-radius: 5px;
          border: none;
        }

        /* Section My Information */
        .info-section {
          background-color: white;
          color: black;
          padding: 20px;
          border-radius: 10px;
          margin-top: 20px;
          display: inline-block;
        }

        .info-section h2 {
          margin-bottom: 10px;
        }

        /* Bouton Show My Applications */
        .applications-btn {
          background-color: white;
          color: #007bff;
          border: none;
          padding: 10px 20px;
          font-size: 1.2em;
          border-radius: 5px;
          margin-top: 20px;
          cursor: pointer;
          display: block;
          width: 200px;
          margin: 10px auto;
        }

        .applications-btn:hover {
          background-color: #0056b3;
          color: white;
        }

        /* Nouveau bouton Discuter */
        .discuss-btn {
          background-color: white;
          color: #007bff;
          border: none;
          padding: 10px 20px;
          font-size: 1.2em;
          border-radius: 5px;
          margin-top: 20px;
          cursor: pointer;
          display: block;
          width: 200px;
          margin: 10px auto;
        }

        .discuss-btn:hover {
          background-color: #0056b3;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default DashboardUser;
