import React from "react";

function ApplyProcessItem({ title, icon, description }) {
  return (
    <div className="col-lg-4 col-md-6">
      <div className="single-process text-center mb-30">
        <div className="process-ion">
          <span className={icon}></span>
        </div>
        <div className="process-cap">
          <h5>{title}</h5>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default ApplyProcessItem;
