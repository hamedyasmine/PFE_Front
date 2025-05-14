import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Homee/Footer";
import Header from "./Homee/Header";
import AboutItem from "../../components/AboutItem";
import Counts from "./Homee/Count";
import Values from "./About/Values";
import Company from "./About/Company";
import ChatBubble from "../chatboat/chatboat";

function About() {
  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dummyData = [
        {
          title: "It All Began In 1977...",
          description:
            "LEONI is a global provider of products, solutions and services for energy and data management in the automotive industry. The value chain ranges from standardized cables and special and data cables to highly complex wiring systems and related components, from development to production.",
        },
        {
          title: "Revolutionizing Recruitment with Intelligent AI Solutions",
          description:
            "Our intelligent recruitment platform leverages advanced AI technology to streamline the hiring process. By intelligently matching candidates with the right job opportunities, our app ensures a more efficient, data-driven approach to recruitment. From CV filtering to personalized job recommendations, we empower both job seekers and employers with the tools they need to find the perfect match, faster and more accurately.",
        },
      ];
      setAboutData(dummyData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        {/* Hero Area Start */}
        <h2 style={{ textAlign: "center" }}>About Us</h2>
        {/* Hero Area End */}

        {/* About Us Section */}
        <div className="about-section-padding">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="about-section-tittle text-center mb-4">
                  <p>Learn more about what Leoni does </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <img
                src="https://tunisieauto.tn/wp-content/uploads/2017/11/Sans-titre-1-2.jpg"
                alt="Vision"
                style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
              />
            </div>

            {/* Premier bloc : Affichage du premier AboutItem */}
            {aboutData.slice(0, 1).map((item, index) => (
              <AboutItem key={index} title={item.title} description={item.description} />
            ))}
          </div>
        </div>

        <ChatBubble/>

        <Counts />

        {/* Our Values Section */}
        <Values/>

        {/* Support Company Section */}
        <Company/>
       
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default About;
