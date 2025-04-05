import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Home/Homee/Header";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);

    // Ici, vous pouvez ajouter la logique d'envoi d'email pour la réinitialisation du mot de passe
    // Exemple simple (à remplacer par la logique réelle de l'API)
    if (email === "user@example.com") {
      alert("A password reset link has been sent to your email.");
      navigate("/login"); // Redirection vers la page de login après envoi
    } else {
      alert("Email not found. Please check your email address.");
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
                      alt="forgot password"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <h4
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Forgot your password?
                        </h4>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="email">
                            Email address
                          </label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg btn-block" type="submit">
                            Send Reset Link
                          </button>
                        </div>

                        <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                          Remembered your password?{" "}
                          <a href="/login" style={{ color: "#393f81" }}>
                            Login here
                          </a>
                        </p>

                        <a href="#!" className="small text-muted">
                          Terms of use.
                        </a>
                        <a href="#!" className="small text-muted">
                          Privacy policy
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
};

export default ForgotPassword;
