import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

function ListeJob({ selectedCategory, selectedJobTypes, selectedLocation, selectedPostPeriod }) {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const jobsPerPage = 2;
  
  useEffect(() => {
    console.log("Filtres sélectionnés:");
    console.log("- Catégorie:", selectedCategory);
    console.log("- Types d'emploi:", selectedJobTypes);
    console.log("- Localisation:", selectedLocation);
    console.log("- Période:", selectedPostPeriod);
    
    console.log("selectedJobTypes:", selectedJobTypes, 
      "Type:", typeof selectedJobTypes, 
      "Est un tableau:", Array.isArray(selectedJobTypes),
      "Longueur:", selectedJobTypes?.length);
    
    const fetchJobs = async () => {
      try {
        // Construire l'URL avec les paramètres de filtrage
        let url = 'http://localhost:5000/api/jobs';
        const params = new URLSearchParams();
        
        // Ajouter les filtres sélectionnés à l'URL
        if (selectedCategory) {
          params.append('category', selectedCategory);
        }
        
        // Ajouter les types d'emploi sélectionnés
        if (selectedJobTypes && selectedJobTypes.length > 0) {
          // Vérifier la structure des objets dans selectedJobTypes
          console.log("Structure des objets jobType:", selectedJobTypes);
          
          // S'assurer que nous avons accès à la propriété 'label'
          const jobTypeLabels = selectedJobTypes.map(type => {
            // Si c'est un objet avec une propriété label
            if (type && typeof type === 'object' && type.label) {
              return type.label;
            }
            // Si c'est directement une chaîne de caractères
            else if (typeof type === 'string') {
              return type;
            }
            // Dans le doute, convertir en chaîne
            return String(type);
          }).join(',');
          
          console.log("jobType à envoyer:", jobTypeLabels);
          params.append('jobType', jobTypeLabels);
        }
        
        // Ajouter la localisation sélectionnée
        if (selectedLocation) {
          params.append('location', selectedLocation);
        }
        
        // Ajouter la période de publication sélectionnée
        if (selectedPostPeriod && selectedPostPeriod.length > 0) {
          // Obtenir la valeur maximale (filtre le plus inclusif)
          const maxDays = Math.max(...selectedPostPeriod);
          if (maxDays > 0) {
            params.append('postedWithin', maxDays.toString());
            console.log("Filtre postedWithin appliqué:", maxDays, "jours");
          }
        }
        
        // Ajouter les paramètres à l'URL si nécessaire
        const queryString = params.toString();
        if (queryString) {
          url += `?${queryString}`;
        }
        
        console.log("URL de recherche:", url);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des offres d'emploi");
        }
        const data = await response.json();
        setJobs(data);
        // Réinitialiser à la première page quand les filtres changent
        setCurrentPage(1);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [selectedCategory, selectedJobTypes, selectedLocation, selectedPostPeriod]);
   
  // Fonction pour calculer la différence de temps
  const timeAgo = (date) => {
    const now = new Date();
    const postedDate = new Date(date);
    const diffInSeconds = Math.floor((now - postedDate) / 1000);

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInSeconds / 3600);
    const diffInDays = Math.floor(diffInSeconds / (3600 * 24));

    if (diffInDays > 1) return `${diffInDays} days ago`;
    if (diffInDays === 1) return `Yesterday`;
    if (diffInHours > 1) return `${diffInHours} hours ago`;
    if (diffInHours === 1) return `1 hour ago`;
    if (diffInMinutes > 1) return `${diffInMinutes} minutes ago`;
    return `Just now`;
  };

  // Gestion de la pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="featured-job-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="count-job mb-35">
              <span>{jobs.length} Jobs found</span>
            </div>
          </div>
        </div>

        {currentJobs.map((job) => (
          <div key={job._id} className="job-item d-flex justify-content-between align-items-center p-3 border-bottom">
            <div>
              <h4>{job.name}</h4>
              <p>{job.category.name} - {job.location}</p>
              <small>
                {timeAgo(job.postedAt)} | <strong>{job.jobType}</strong>
              </small>
            </div>
            <Link to={`/job_details/${job._id}`} className="apply-button">
              Apply
            </Link>
          </div>
        ))}

        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </section>
  );
}

export default ListeJob;