import React, { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserDropdownAdmin = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const handleShowAccount = () => {
    navigate("/ShowAccountAdmin");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Ferme le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      style={{
        position: "relative",
        display: "inline-block",
        zIndex: 1000,
      }}
    >
      <div
        onClick={toggleMenu}
        style={{
          cursor: "pointer",
          padding: "8px",
          borderRadius: "50%",
          backgroundColor: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FaUser size={22} color="black" />
      </div>

      {isMenuVisible && (
        <div
          style={{
            position: "absolute",
            top: "120%",
            right: 0,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            minWidth: "160px",
          }}
        >
          <button
            onClick={handleShowAccount}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "transparent",
              border: "none",
              textAlign: "left",
              cursor: "pointer",
              color: "black",
            }}
          >
            Show Account
          </button>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "transparent",
              border: "none",
              textAlign: "left",
              cursor: "pointer",
              color: "black",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdownAdmin;
