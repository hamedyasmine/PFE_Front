import React from 'react';
import { Link } from 'react-router-dom';
import CompanyItem from '../../../components/AboutItem/CompanyItem';

 // Assure-toi que le chemin est correct

// Définir des données de test pour "aboutData"
const aboutData = [
  { title: "Revolutionizing Recruitment with Intelligent AI Solutions", description: "Our intelligent recruitment platform leverages advanced AI technology to streamline the hiring process. By intelligently matching candidates with the right job opportunities, our app ensures a more efficient, data-driven approach to recruitment. From CV filtering to personalized job recommendations, we empower both job seekers and employers with the tools they need to find the perfect match, faster and more accurately." },
  
];

function Company() {
  return (
    <div className="about-support-company-area fix about-section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6">
            <div className="about-right-caption">
              <div className="about-section-tittle">
                <span>What we are doing</span>
              </div>
              {/* Affichage dynamique des AboutItems */}
              {aboutData.slice(0, 2).map((item, index) => (
                <CompanyItem key={index} title={item.title} description={item.description} />
              ))}
              <Link to="/findjob" className="btn about-post-btn">
                Find a job
              </Link>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6">
            <div className="about-support-location-img">
              <img
                src="https://orientini.com/uploads/orientini.com_Leoni_2021.jpg"
                alt="support"
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Company;
