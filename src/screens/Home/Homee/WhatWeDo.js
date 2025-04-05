import React, { useState, useEffect } from "react";
import WhatWeDoItem from "../../../components/HomeItem/WhatWeDoItem";

function WhatWeDo() {
  const [whatWeDoData, setWhatWeDoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dummyData = [
        {
          title: "200+ Job Opportunities, 5 Recruitment Hubs",
          description:
            "Explore over 200 job opportunities across various fields and apply at one of our 5 recruitment locations. Find the right job for you with ease and convenience!",
        },
        {
          title: "Revolutionizing Recruitment with Intelligent AI Solutions",
          description:
            "Our intelligent recruitment platform leverages advanced AI technology to streamline the hiring process. By intelligently matching candidates with the right job opportunities, our app ensures a more efficient, data-driven approach to recruitment. From CV filtering to personalized job recommendations, we empower both job seekers and employers with the tools they need to find the perfect match, faster and more accurately.",
        },
      ];
      setWhatWeDoData(dummyData);
    };

    fetchData();
  }, []);

  return (
    <div className="support-company-area support-padding fix">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6">
            <div className="right-caption">
              <div className="section-tittle section-tittle2">
                <span>What we are doing</span>
              </div>

              {/* Affichage dynamique des WhatWeDoItems */}
              {whatWeDoData.map((item, index) => (
                <WhatWeDoItem key={index} title={item.title} description={item.description} />
              ))}

              <a href="/findjob" className="btn post-btn">
              Find a job
              </a>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6">
            <div className="support-location-img">
              <img src="assets/img/service/support-img.jpg" alt="support" />
              <div className="support-img-cap text-center">
                <p>Since</p>
                <span>1977</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatWeDo;
