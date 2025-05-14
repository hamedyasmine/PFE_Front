




import React, { useState, useEffect } from "react";
import HeaderItem from "../../components/HomeItem/HeaderItem";
import { FaUser, FaSignOutAlt } from "react-icons/fa"; // Icônes utilisateur et logout
import { useNavigate } from "react-router-dom";
import axios from "axios";
const DashboardUser = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [userData, setUserData] = useState(null); 
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirige vers la page de connexion
  };
 
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
    
        if (!token) {
          navigate("/Login");
          return;
        }
    
        try {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
    
          const { data } = await axios.get("http://localhost:5000/api/auth/me", config);
          setUserData({
            id: data._id,
            name: data.name,
            email: data.email,
            phone: data.phone,
          });
        } catch (error) {
          console.error("Token invalide ou expiré :", error);
          localStorage.removeItem("token");
          navigate("/Login");
        }
      };
    
      fetchUserData();
    }, [navigate]);
    
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
                  <a href="/">
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

                <button onClick={handleLogout}>Logout</button>
{/* Icône noir */}
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
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f5f7fa;
    min-height: 100vh;
    color: #333;
    padding: 30px;
  }

  .navbar {
    background-color: #ffffff;
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .navbar-left {
    flex: 1;
  }

  .navbar-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .user-icon {
    cursor: pointer;
    position: relative;
    margin-left: 20px;
  }

  .dropdown-menu {
    position: absolute;
    right: 0;
    top: 35px;
    background-color: #ffffff;
    color: #333;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    z-index: 100;
  }

  .dropdown-menu button,
  .dropdown-menu a {
    background: none;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    text-align: left;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #333;
    font-weight: 500;
  }

  .dropdown-menu a:hover,
  .dropdown-menu button:hover {
    background-color: #f0f0f0;
    border-radius: 5px;
  }

  .dashboard-content {
    margin-top: 50px;
    text-align: center;
  }

  h1 {
    font-size: 2.8em;
    color: #2c3e50;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2em;
    color: #555;
    margin-bottom: 30px;
  }

  .info-section {
    background-color: #ffffff;
    color: #333;
    padding: 25px 30px;
    border-radius: 10px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.05);
    display: inline-block;
    margin-bottom: 30px;
    text-align: left;
  }

  .info-section h2 {
    margin-bottom: 15px;
    color: #007bff;
  }

  .applications-btn,
  .discuss-btn {
    background-color: #ffffff;
    color: #007bff;
    border: 2px solid #007bff;
    padding: 12px 20px;
    font-size: 1.1em;
    border-radius: 8px;
    cursor: pointer;
    display: inline-block;
    margin: 10px 15px;
    transition: all 0.3s ease;
  }

  .applications-btn:hover,
  .discuss-btn:hover {
    background-color: #007bff;
    color: #fff;
  }
`}</style>

    </div>
  );
};

export default DashboardUser;
