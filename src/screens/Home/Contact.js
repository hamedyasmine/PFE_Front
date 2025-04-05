import React, { useState, useEffect } from "react";
import axios from "axios"; // Importer axios
import Header from "./Homee/Header";
import Footer from "./Homee/Footer";
import ContactItem from "../../components/ContactItem";

function Contact() {
  const [contactInfo, setContactInfo] = useState([]); // Etat pour les informations de contact
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(null); // Pour afficher le message de succès ou d'erreur
  const [isSubmitted, setIsSubmitted] = useState(false); // Indicateur si le formulaire a été soumis avec succès

  // Utilisation de useEffect pour récupérer les informations de contact du backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/contact-info"); // Appel à l'API pour récupérer les informations
        const { email, phone } = response.data; // Supposons que ces champs existent dans la réponse
        const dummyData = [
          {
            icon: "ti-tablet",
            title: phone,
            text: "Mon to Fri 9am to 6pm",
          },
          {
            icon: "ti-email",
            title: email,
            text: "Send us your query anytime!",
          },
        ];
        setContactInfo(dummyData); // Met à jour l'état avec les données récupérées
      } catch (error) {
        console.error("Erreur lors de la récupération des données de contact:", error);
        setContactInfo([]); // Si une erreur survient, on peut choisir de laisser vide ou afficher un message d'erreur
      }
    };

    fetchData(); // Appel de la fonction pour récupérer les données
  }, []);

  // Gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fonction de validation de l'email
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  // Gérer l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire

    // Vérification de l'email
    if (!validateEmail(formData.email)) {
      setStatus({ type: "error", message: "Veuillez entrer un email valide." });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/contact", formData); // Envoi de la requête POST
      setIsSubmitted(true); // Le formulaire a été soumis avec succès
      setStatus({ type: "success", message: response.data.message }); // Message de succès
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.message || "Une erreur est survenue" }); // Message d'erreur
    }
  };

  return (
    <div>
      <Header />
      {/* Hero Area Start */}
      <div className="slider-area">
        <div
          className="single-slider section-overly slider-height2 d-flex align-items-center"
          style={{
            backgroundImage: "url('/assets/img/hero/about.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap text-center">
                  <h2>Contact us</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero Area End */}

      {/* Contact Section Start */}
      <section className="contact-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="contact-title">Get in Touch</h2>
            </div>
            <div className="col-lg-8">
              <form
                className="form-contact contact_form"
                onSubmit={handleSubmit} // Gestion de l'envoi du formulaire
                noValidate="novalidate"
              >
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <textarea
                        className="form-control w-100"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        cols={30}
                        rows={9}
                        placeholder="Enter Message"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        className="form-control valid"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        className="form-control valid"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        className="form-control"
                        name="subject"
                        type="text"
                        placeholder="Enter Subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <button type="submit" className="button button-contactForm boxed-btn">
                    Send
                  </button>
                </div>
              </form>
              {status && (
                <div className={`status-message ${status.type}`}>
                  {status.message}
                </div>
              )}
              {isSubmitted && !status && (
                <div className="status-message success">
                  Merci pour votre message !
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="col-lg-3 offset-lg-1">
              {contactInfo.map((item, index) => (
                <ContactItem key={index} icon={item.icon} title={item.title} text={item.text} />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section End */}

      <footer>
        <Footer />
      </footer>

      {/* Styles CSS directement dans le code */}
      <style jsx>{`
        .status-message {
          text-align: center;
          padding: 15px;
          margin-top: 20px;
          font-size: 16px;
          border-radius: 5px;
        }

        .status-message.success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .status-message.error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
      `}</style>
    </div>
  );
}

export default Contact;
