import React from "react";
import { Link } from "react-router-dom";

function UploadCv() {
  return (
    <div
      className="online-cv section-overly pt-90 pb-120"
      style={{
        backgroundImage: "url('/assets/img/gallery/how-applybg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="col-xl-10 text-center"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              padding: "40px",
              borderRadius: "20px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ color: "#0b1c39", fontWeight: "700", fontSize: "2.2rem" }}>
            Open Application
            </h2>
            <p style={{ color: "#0b1c39", fontSize: "1.1rem", marginTop: "10px" }}>
            Apply easily with your online CV!
            </p>

            <div className="text-center mt-4">
              <Link
                to="/simplified-application"
                style={{
                  backgroundColor: "#0b1c39",
                  color: "#fff",
                  padding: "12px 30px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "1rem",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#142e66")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#0b1c39")}
              >
                	Start my application
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadCv;
