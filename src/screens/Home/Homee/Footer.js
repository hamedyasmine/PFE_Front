import React, { useState, useEffect } from "react";
import axios from "axios";
import FooterItem from "../../../components/HomeItem/FooterItem";

function Footer() {
  const [contactInfo, setContactInfo] = useState({ email: "", phone: "" });
  const [places, setPlaces] = useState([]); // État pour stocker les emplacements
  const [loading, setLoading] = useState(true); // État pour gérer le chargement

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/contact-info");
        setContactInfo({
          email: response.data.email,
          phone: response.data.phone,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des informations de contact", error);
      }
    };

    const fetchPlaces = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/places");
        setPlaces(response.data);
        setLoading(false); // Fin du chargement une fois les données récupérées
      } catch (error) {
        console.error("Erreur lors de la récupération des emplacements", error);
        setLoading(false);
      }
    };

    fetchContactInfo();
    fetchPlaces();
  }, []);

  return (
    <footer>
      {/* Section principale du footer */}
      <div className="footer-area footer-bg footer-padding">
        <div className="container">
          <div className="row d-flex justify-content-between">
            {/* Section About Us */}
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <FooterItem title="À propos de nous">
                <p>Notre plateforme alimentée par l'IA simplifie le recrutement en automatisant le tri des CV, en associant efficacement les candidats et en améliorant l'expérience d'embauche pour les employeurs et les chercheurs d'emploi.</p>
              </FooterItem>
            </div>

            {/* Section Contact Info */}
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
              <FooterItem title="Informations de contact">
                <ul>
                  {loading ? (
                    <li>Chargement des emplacements...</li>
                  ) : (
                    places.map((place) => (
                      <li key={place._id}>{place.name}</li>
                    ))
                  )}
                </ul>
                <ul>
                  <li><a href={`tel:${contactInfo.phone}`}>Téléphone : {contactInfo.phone || "+216 365 8951"}</a></li>
                  <li><a href={`mailto:${contactInfo.email}`}>Email : {contactInfo.email || "LeoniRecruit@leoni.com"}</a></li>
                </ul>
              </FooterItem>
            </div>

            {/* Section Chatbot */}
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
              <FooterItem title="Chatbot">
                <p>Chatbot pour vous guider et vous assister—n'hésitez pas à l'utiliser !</p>
                <div className="footer-form">
                  <div className="header-btn d-none f-right d-lg-block">
                    <a href="/Chatbot" className="btn head-btn1">Discuter</a>
                  </div>
                </div>
              </FooterItem>
            </div>
          </div>

          {/* Section logo et nombre de places */}
          <div className="row footer-wejed justify-content-between">
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="footer-logo mb-20">
                <h2 style={{ color: 'white', fontWeight: 'normal' }}>LeoniRecruit</h2>
              </div>
            </div>

            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
              <div className="footer-tittle-bottom">
                <span>{loading ? "0" : places.length}</span>
                <p>Emplacements</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section bas de page */}
      <div className="footer-bottom-area footer-bg">
        <div className="container">
          <div className="footer-border">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-xl-10 col-lg-10">
                <div className="footer-copy-right">
                  <p>
                    Copyright &copy;{new Date().getFullYear()} Tous droits réservés | Ce modèle est réalisé avec <i className="fa fa-heart" aria-hidden="true"></i> par <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">Colorlib</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
