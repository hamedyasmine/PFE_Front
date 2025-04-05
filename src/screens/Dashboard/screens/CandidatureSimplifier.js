import { useEffect, useState } from "react";

export default function ApplicationsList() {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/applications-simplifiees/applications")
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((err) => console.error("Erreur:", err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/applications-simplifiees/applications-simplifiees/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setApplications(applications.filter((app) => app._id !== id));
        setMessage("Candidature supprimée avec succès");
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((err) => console.error("Erreur lors de la suppression:", err));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Candidatures Simplifiées</h1>
      {message && <div className="bg-green-500 text-white p-2 rounded mb-4 text-center">{message}</div>}
      <div className="mb-4 text-right font-semibold text-gray-700">
        Nombre total de candidatures : {applications.length}
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <ul className="space-y-3">
          {applications.map((app) => (
            <li key={app._id} className="p-3 border rounded-lg flex justify-between items-center">
              <span className="font-semibold flex-1">{app.firstname} - {app.category} - {app.jobType}</span>
              <div className="flex space-x-4">
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4" 
                  onClick={() => setSelectedApp(app)}
                >
                  Show More
                </button>
                <button 
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" 
                  onClick={() => handleDelete(app._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedApp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="text-xl font-bold mb-2">Détails de la candidature</h2>
            <p><strong>Nom:</strong> {selectedApp.firstname} {selectedApp.lastname}</p>
            <p><strong>Email:</strong> {selectedApp.email}</p>
            <p><strong>Genre:</strong> {selectedApp.gender}</p>
            <p>
               <a href={`http://localhost:5000/${selectedApp.cv}`} target="_blank" rel="noopener noreferrer">
                        Voir le CV
                      </a>
            </p>
            <p><strong>Date de candidature:</strong> {new Date(selectedApp.createdAt).toLocaleDateString()}</p>
            <button 
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => setSelectedApp(null)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
