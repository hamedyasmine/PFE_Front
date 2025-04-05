import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../Homee/Header";

function LoginJob() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 
  const jobId = location.state?.jobId;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);

        navigate("/accountpost", { state: { jobId } });
      } else {
        alert("Authentication failed.");
      }
    } catch (error) {
      alert(error.response?.data.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };
   return (
    <>
      <Header />
      <section className="vh-100" style={{ backgroundImage: "url('https://st2.depositphotos.com/3894705/7745/i/450/depositphotos_77458360-stock-photo-grunge-background-of-dark-blue.jpg')" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp" alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem" }} />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <h4 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                          Sign into your account
                        </h4>

                        <div className="form-outline mb-4">
                          <input type="email" id="email" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} required />
                          <label className="form-label" htmlFor="email">Email address</label>
                        </div>

                        <div className="form-outline mb-4">
                          <input type="password" id="password" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} required />
                          <label className="form-label" htmlFor="password">Password</label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg btn-block" type="submit" disabled={loading}>
                            {loading ? "Loading..." : "Login"}
                          </button>
                        </div>

                        <a className="small text-muted" href="/ForgotPassword">Forgot password?</a>
                        <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                          Don't have an account? <a href="/Register" style={{ color: "#393f81" }}>Register here</a>
                        </p>
                        <a href="#!" className="small text-muted">Terms of use.</a>
                        <a href="#!" className="small text-muted">Privacy policy</a>
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

export default LoginJob;
