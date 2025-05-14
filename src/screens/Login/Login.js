import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Home/Homee/Header";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Ajout d'un état pour la gestion du chargement
  const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Mise à jour de l'état loading à true avant la requête
    try {
      console.log({ email, password });
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
  
      if (response.data.token) {
        // Si la réponse contient un token
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
  
        if (response.data.role === "admin") {
          navigate("/Dashboard"); // Redirection vers le dashboard admin
        } else {
          navigate("/dashboarduser"); // Redirection vers le dashboard utilisateur
        }
      } else {
        alert("Authentication failed.");
      }
    } catch (error) {
      if (error.response) {
        // Si l'API retourne une erreur spécifique
        alert(error.response.data.message || "Invalid credentials. Please try again.");
      } else {
        // Si une erreur se produit sans réponse du backend
        alert("Server error, please try again later.");
      }
    } finally {
      setLoading(false); // Mise à jour de l'état loading à false une fois la requête terminée
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
                      alt="login form"
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
                          Sign into your account
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

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="password"
                            className="form-control form-control-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                            disabled={loading} // Désactivation du bouton pendant le chargement
                          >
                            {loading ? "Loading..." : "Login"}
                          </button>
                        </div>

                        <a className="small text-muted" href="/ForgotPassword">
                          Forgot password?
                        </a>
                        <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                          Don't have an account?{" "}
                          <a href="/Register" style={{ color: "#393f81" }}>
                            Register here
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
}

export default Login;
