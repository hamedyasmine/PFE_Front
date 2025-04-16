import React from "react";

function TopCategItem({ name, count }) {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
      <div
        style={{
          backgroundColor: "#f4f8ff",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          textAlign: "center",
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.09)";
          e.currentTarget.style.backgroundColor = "#e0ecff";
          e.currentTarget.querySelector("h5").style.color = "#0b3d91";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.backgroundColor = "#f4f8ff";
          e.currentTarget.querySelector("h5").style.color = "#333";
        }}
      >
        <h5 style={{ color: "#333", fontWeight: "600" }}>{name}</h5>
        <p style={{ color: "#555", marginTop: "10px" }}>
          {count} job{count > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}

export default TopCategItem;
