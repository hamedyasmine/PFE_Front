import { Link } from "react-router-dom";
import Footer from "./Homee/Footer";
import Header from "./Homee/Header";
import JobCategorie from "./FindJobb/JobCategorie";
import ListeJob from "./FindJobb/ListeJob";
import Pagination from "./FindJobb/Pagination";
import JobType from "./FindJobb/JobType";
import JobPost from "./FindJobb/JobPost";
import JobPlace from "./FindJobb/JobPlace";

function FindJob(){
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
                  <div className="ion"> <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="20px" height="12px">
                      <path fillRule="evenodd" fill="rgb(27, 207, 107)" d="M7.778,12.000 L12.222,12.000 L12.222,10.000 L7.778,10.000 L7.778,12.000 ZM-0.000,-0.000 L-0.000,2.000 L20.000,2.000 L20.000,-0.000 L-0.000,-0.000 ZM3.333,7.000 L16.667,7.000 L16.667,5.000 L3.333,5.000 L3.333,7.000 Z" />
                    </svg>
                  </div>
                  <h4>Filter Jobs</h4>
                </div>
              </div>
            </div>
            <div className="job-category-listing mb-50">
            {/* Job Category Listing start */}
              <JobCategorie/>
            {/* Job Category Listing End */}
            {/* select-Categories start */}
            <JobType />
            <JobPlace />
            <JobPost />
            
            {/* select-Categories end */}
          </div>
          </div>
          {/* Right content */}
          <div className="col-xl-9 col-lg-9 col-md-8">
            {/* Featured_job_start */}
            <ListeJob/>
            
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

    )
}
export default FindJob;