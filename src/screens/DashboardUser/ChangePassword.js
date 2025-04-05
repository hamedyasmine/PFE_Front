import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Home/Homee/Header";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();

  // Fonction de sauvegarde du nouveau mot de passe
  const handleSave = (event) => {
    event.preventDefault();
    
    // Vérification que les mots de passe correspondent
    if (newPassword !== confirmNewPassword) {
      alert("The new passwords do not match!");
      return;
    }

    // Vérification du mot de passe actuel (vous pouvez ajouter une vérification via API si nécessaire)
    if (currentPassword === "currentpassword123") { // Exemple de vérification, à remplacer
      console.log("Password changed successfully!");
      alert("Your password has been updated!");
      // Rediriger vers le tableau de bord ou une autre page
      navigate("/dashboarduser");
    } else {
      alert("Current password is incorrect.");
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
                      alt="change password"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSave}>
                        <h4
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Change Your Password
                        </h4>

                        {/* Champ mot de passe actuel */}
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="currentPassword"
                            className="form-control form-control-lg"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="currentPassword">
                            Current Password
                          </label>
                        </div>

                        {/* Champ nouveau mot de passe */}
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="newPassword"
                            className="form-control form-control-lg"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="newPassword">
                            New Password
                          </label>
                        </div>

                        {/* Champ confirmation nouveau mot de passe */}
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="confirmNewPassword"
                            className="form-control form-control-lg"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="confirmNewPassword">
                            Confirm New Password
                          </label>
                        </div>

                        {/* Bouton de sauvegarde */}
                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg btn-block" type="submit">
                            Save Changes
                          </button>
                        </div>

                        <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                          Want to modify other details? <a href="/my-account" style={{ color: "#393f81" }}>Modify Account</a>
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

export default ChangePassword;
