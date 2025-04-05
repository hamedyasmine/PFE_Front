import React, { useState } from "react";
import Header from "../Home/Homee/Header";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccess("Inscription réussie ! Redirection en cours...");
      setTimeout(() => {
        window.location.href = "/login"; // Redirection après inscription
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue lors de l'inscription.");
    }
  };

  return (
    <>
      <Header />
      <section
        className="vh-100"
        style={{
          backgroundImage:
            "url('https://st2.depositphotos.com/3894705/7745/i/450/depositphotos_77458360-stock-photo-grunge-background-of-dark-blue.jpg')",
        }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="register form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <h4 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                          Créez votre compte
                        </h4>

                        {error && <p style={{ color: "red" }}>{error}</p>}
                        {success && <p style={{ color: "green" }}>{success}</p>}

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            name="name"
                            className="form-control form-control-lg"
                            placeholder="Nom complet"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            name="email"
                            className="form-control form-control-lg"
                            placeholder="Adresse e-mail"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="tel"
                            name="phone"
                            className="form-control form-control-lg"
                            placeholder="Numéro de téléphone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            name="password"
                            className="form-control form-control-lg"
                            placeholder="Mot de passe"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            name="confirmPassword"
                            className="form-control form-control-lg"
                            placeholder="Confirmez le mot de passe"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg btn-block" type="submit">
                            S'inscrire
                          </button>
                        </div>

                        <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                          Vous avez déjà un compte ?{" "}
                          <a href="/login" style={{ color: "#393f81" }}>
                            Connectez-vous ici
                          </a>
                        </p>
                        <a href="#!" className="small text-muted">
                          Conditions d'utilisation.
                        </a>
                        <a href="#!" className="small text-muted">
                          Politique de confidentialité.
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
