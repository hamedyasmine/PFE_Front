import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  
  console.log("AdminRoute - token:", token); // Pour débogage
  console.log("AdminRoute - role:", role);   // Pour débogage

  // Si pas de token OU pas admin, rediriger vers login
  if (!token || role !== "admin") {
    console.log("Redirection vers login"); // Pour débogage
    return <Navigate to="/login" />;
  }

  // Si tout est ok, afficher le dashboard
  return children;
};

export default AdminRoute;