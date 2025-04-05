import React, { useState } from "react";
import Header from "./Header";

function Postuler() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    adress: "",
    cv: null,
  });

  const governorates = [
    "Ariana", "Beja", "Ben Arous", "Bizerte", "Gabes", "Gafsa", "Jendouba", "Kairouan",
    "Kasserine", "Kebili", "Kef", "Mahdia", "Manouba", "Medenine", "Monastir", "Nabeul",
    "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      cv: file,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <>
      <Header />
      <section style={{ backgroundColor: "#8b92dd" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block" style={{ position: "relative" }}>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="application form"
                      className="img-fluid"
                      style={{
                        borderRadius: "1rem 0 0 1rem",
                        objectFit: "cover",
                        height: "100%",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        borderRadius: "1rem 0 0 1rem",
                        backgroundSize: "cover",
                        minHeight: "100vh"
                      }}
                    ></div>
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                       

                        <h4 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                          Simplified Application
                        </h4>

                        {/* First Name */}
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="firstName"
                            className="form-control form-control-lg"
                            value={formData.firstName}
                            onChange={handleChange}
                            name="firstName"
                            required
                          />
                          <label className="form-label" htmlFor="firstName">
                            First Name
                          </label>
                        </div>

                        {/* Last Name */}
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="lastName"
                            className="form-control form-control-lg"
                            value={formData.lastName}
                            onChange={handleChange}
                            name="lastName"
                          />
                          <label className="form-label" htmlFor="lastName">
                            Last Name
                          </label>
                        </div>

                        {/* Email */}
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            required
                          />
                          <label className="form-label" htmlFor="email">
                            Email Address
                          </label>
                        </div>

                        {/* Gender */}
                        <div className="form-outline mb-4">
                          <select
                            className="form-control form-control-lg"
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                          <label className="form-label" htmlFor="gender">
                            Gender
                          </label>
                        </div>

                        {/* Address - Dropdown List */}
                        <div className="form-outline mb-4">
                          <select
                            className="form-control form-control-lg"
                            id="adress"
                            name="adress"
                            value={formData.adress}
                            onChange={handleChange}
                          >
                            <option value="">Select your governorate</option>
                            {governorates.map((gov, index) => (
                              <option key={index} value={gov}>
                                {gov}
                              </option>
                            ))}
                          </select>
                          <label className="form-label" htmlFor="adress">
                            Address
                          </label>
                        </div>

                        {/* Upload CV */}
                        <div className="form-outline mb-4">
                          <input
                            type="file"
                            className="form-control form-control-lg"
                            id="cv"
                            name="cv"
                            accept=".pdf, .doc, .docx"
                            onChange={handleFileChange}
                          />
                          <label className="form-label" htmlFor="cv">
                            Upload CV
                          </label>
                          {formData.cv && (
                            <p className="text-center mt-2" style={{ color: "#0b1c39" }}>
                              Selected File: {formData.cv.name}
                            </p>
                          )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg btn-block" type="submit">
                            Submit Application
                          </button>
                        </div>
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

export default Postuler;
