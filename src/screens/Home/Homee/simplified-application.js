import React, { useState ,useEffect} from "react";
import Header from "./Header";

function SimplifiedApplication() {
    const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/api/categories")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading categories:", err);
        setError("Failed to load categories. Please try again later.");
        setIsLoading(false);
      });
  }, []);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    category: "",
    jobType: "",
    gender: "",
    cv: null,
    cvSpeaking: null, // ➔ nouveau champ ajouté ici
    verificationAnswer: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const [errors, setErrors] = useState({});


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, cv: file });
  };

  const handleSpeakingCvChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, cvSpeaking: file });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Add First Name.";
    if (!formData.lastName.trim()) newErrors.lastName = "Add Last Name.";
    if (formData.verificationAnswer.trim() !== "7") {
  newErrors.verificationAnswer = "La réponse à la question est incorrecte.";
}

  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      setErrors({});
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) { // ➔ pour ne pas envoyer de "null"
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch("http://localhost:5000/api/applications-simplifiees/apply", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Candidature envoyée avec succès !");
      } else {
        alert(`Erreur: ${data.message}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      alert("Erreur lors de l'envoi du formulaire.");
    }
  };

  return (
    <>
      <Header />
      <section
        style={{
          backgroundColor: "#f6f9fc",
          minHeight: "100vh",
          padding: "60px 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "700px",
            backgroundColor: "#ffffff",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#0b1c39" }}>
            Simplified Application
          </h2>

          <form onSubmit={handleSubmit}>
          {[
  { label: "First Name", name: "firstName", type: "text" },
  { label: "Last Name", name: "lastName", type: "text" },
  { label: "Email", name: "email", type: "email" }
].map(({ label, name, type }) => (
  <div key={name} style={{ marginBottom: "20px" }}>
    <label style={{ fontWeight: "600", marginBottom: "5px", display: "block" }}>
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={formData[name]}
      onChange={handleChange}
      
      style={{
        width: "100%",
        padding: "12px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontSize: "15px",
      }}
    />
    {errors[name] && (
      <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>{errors[name]}</p>
    )}
  </div>
))}
  <select
  name="category"
  value={formData.category}
  onChange={handleChange}
  required
  style={{
    width: "100%",
    padding: "12px",
    border: errors.category ? "1px solid red" : "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
    backgroundColor: "#fff",
  }}
>
  <option value="">Select Category</option>
  {isLoading ? (
    <option disabled>Loading categories...</option>
  ) : (
    categories.map((category) => (
      <option key={category._id} value={category.name}>
        {category.name}
      </option>
    ))
  )}
</select>
             
            {[
              { label: "Job Type", name: "jobType", options: ["Full-time", "Part-time", "Internship"] },
              { label: "Gender", name: "gender", options: ["Male", "Female", "Other"] },
            ].map(({ label, name, options }) => (
              <div key={name} style={{ marginBottom: "20px" }}>
                <label style={{ fontWeight: "600", marginBottom: "5px", display: "block" }}>
                  {label}
                </label>
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: "15px",
                    backgroundColor: "#fff",
                  }}
                >
                
                  <option value="">Select {label}</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <div style={{ marginBottom: "25px" }}>
              <label style={{ fontWeight: "600", marginBottom: "5px", display: "block" }}>
                Upload CV
              </label>
              <input
                type="file"
                name="cv"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "15px",
                }}
              />
            </div>

            {/* ➔ Nouveau champ : Upload CV parlant */}
            <div style={{ marginBottom: "25px" }}>
              <label style={{ fontWeight: "600", marginBottom: "5px", display: "block" }}>
                Upload Speaking CV (optional)
              </label>
              <input
                type="file"
                name="cvSpeaking"
                accept="audio/*,video/*"
                onChange={handleSpeakingCvChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "15px",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
  <label style={{ fontWeight: "600", marginBottom: "5px", display: "block" }}>
    Combien font 3 + 4 ?
  </label>
  <input
    type="text"
    name="verificationAnswer"
    value={formData.verificationAnswer}
    onChange={handleChange}
    style={{
      width: "100%",
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "15px",
    }}
  />
  {errors.verificationAnswer && (
    <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>{errors.verificationAnswer}</p>
  )}
</div>


            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
                style={{
                  backgroundColor: "#0b1c39",
                  color: "white",
                  padding: "12px 25px",
                  fontSize: "16px",
                  fontWeight: "600",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#142850")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#0b1c39")}
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default SimplifiedApplication;