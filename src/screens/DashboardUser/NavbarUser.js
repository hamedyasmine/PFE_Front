// components/NavbarUser.js

import React, { useState, useEffect } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import HeaderItem from "../../components/HomeItem/HeaderItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NavbarUser = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Find a Job", path: "/findjob" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        try {
          const { data } = await axios.get("http://localhost:5000/api/auth/me", config);
          setUserData(data);
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
        }
      } else {
        navigate("/Login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);

  const handleShowInfo = () => navigate("/my-account");

  return (
    <>
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
                        <img src="/assets/img/logo/logo.png" alt="Logo" style={{ height: "40px" }} />
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

        {/* Icône utilisateur */}
        <div className="navbar-right">
          <div className="user-icon" onClick={toggleMenu}>
            <FaUser size={24} color="black" />
            {isMenuVisible && (
              <div className="dropdown-menu">
                <button onClick={handleShowInfo}>Show Account</button>
                <a href="/">
                  <FaSignOutAlt /> Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Styles */}
      <style jsx>{`
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
      `}</style>
    </>
  );
};

export default NavbarUser;
