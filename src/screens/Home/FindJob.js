import { Link } from "react-router-dom";
import Footer from "./Homee/Footer";
import Header from "./Homee/Header";
import JobCategorie from "./FindJobb/JobCategorie";
import ListeJob from "./FindJobb/ListeJob";
import Pagination from "./FindJobb/Pagination";
import JobType from "./FindJobb/JobType";
import JobPost from "./FindJobb/JobPost";
import JobPlace from "./FindJobb/JobPlace";
import { useState } from "react";

function FindJob(){
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);  // Nouvel état pour les types d'emploi
  const [selectedLocation, setSelectedLocation] = useState("");  // Ajoutez ceci si vous voulez aussi le filtre de lieu
  const [selectedPostPeriod, setSelectedPostPeriod] = useState([]);  // Ajoutez ceci si vous voulez aussi le filtre de période
  
  const handleCategoryChange = (value) => {
    console.log("Catégorie sélectionnée :", value);
    setSelectedCategory(value);
  };

  const handleJobTypeChange = (selectedTypes) => {
    console.log("Types d'emploi sélectionnés:", selectedTypes);
    setSelectedJobTypes(selectedTypes);
  };

  const handleLocationChange = (locationName) => {
    setSelectedLocation(locationName); // ← on passe "Tunis", "Sfax", etc.
  };
  

  const handlePostPeriodChange = (selectedPeriods) => {  // Ajoutez cette fonction si vous utilisez le filtre de période
    console.log("Périodes sélectionnées:", selectedPeriods);
    setSelectedPostPeriod(selectedPeriods);
  };

  return(
    <>
      <Header/>
      {/* Header End */}
      <main>
        {/* Hero Area Start*/}
        <div className="slider-area ">
          <div 
            className="single-slider section-overly slider-height2 d-flex align-items-center" 
            style={{ 
              backgroundImage: "url('/assets/img/hero/about.jpg')", 
              backgroundSize: "cover", 
              backgroundPosition: "center", 
              backgroundRepeat: "no-repeat" 
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="hero-cap text-center">
                    <h2>Get your job</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Hero Area End */}
        {/* Job List Area Start */}
        <div className="job-listing-area pt-120 pb-120">
          <div className="container">
            <div className="row">
              {/* Left content */}
              <div className="col-xl-3 col-lg-3 col-md-4">
                <div className="row">
                  <div className="col-12">
                    <div className="small-section-tittle2 mb-45">
                      <div className="ion"> 
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="20px" height="12px">
                          <path fillRule="evenodd" fill="rgb(27, 207, 107)" d="M7.778,12.000 L12.222,12.000 L12.222,10.000 L7.778,10.000 L7.778,12.000 ZM-0.000,-0.000 L-0.000,2.000 L20.000,2.000 L20.000,-0.000 L-0.000,-0.000 ZM3.333,7.000 L16.667,7.000 L16.667,5.000 L3.333,5.000 L3.333,7.000 Z" />
                        </svg>
                      </div>
                      <h4>Filter Jobs</h4>
                    </div>
                  </div>
                </div>
                <div className="job-category-listing mb-50">
                  {/* Job Category Listing start */}
                  <JobCategorie onCategoryChange={handleCategoryChange} />
                  {/* Job Category Listing End */}
                  {/* select-Categories start */}
                  <JobType onSelectionChange={handleJobTypeChange} />
                  <JobPlace onLocationChange={handleLocationChange} />
                  <JobPost onPostPeriodChange={handlePostPeriodChange} />
                  {/* select-Categories end */}
                </div>
              </div>
              {/* Right content */}
              <div className="col-xl-9 col-lg-9 col-md-8">
                {/* Featured_job_start */}
                <ListeJob 
                  selectedCategory={selectedCategory}
                  selectedJobTypes={selectedJobTypes}
                  selectedLocation={selectedLocation}
                  selectedPostPeriod={selectedPostPeriod}
                />
                {/* Featured_job_end */}
              </div>
            </div>
          </div>
        </div>
        <div/>
        
        {/* Job List Area End */}
        {/*Pagination Start  */}
        <Pagination/>
        {/*Pagination End  */}
      </main>
      <footer>
        {/* Footer Start*/}
        <Footer/> {/* Footer End*/}
      </footer>
    </>
  );
}

export default FindJob;