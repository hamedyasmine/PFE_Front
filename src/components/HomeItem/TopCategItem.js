import React from "react";

function TopCategItem({ name, icon, count }) {
  return (
    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
      <div className="single-services text-center mb-30">
        <div className="services-ion">
          <span className={icon}></span>
        </div>
        <div className="services-cap">
          <h5>
            <a href="job_listing.html">{name}</a>
          </h5>
          <span>({count})</span>
        </div>
      </div>
    </div>
  );
}

export default TopCategItem;
