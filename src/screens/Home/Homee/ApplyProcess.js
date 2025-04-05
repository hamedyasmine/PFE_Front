import React, { useState, useEffect } from "react";
import ApplyProcessItem from "../../../components/HomeItem/ApplyProcessItem";

function ApplyProcess() {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    // Simulation des étapes du processus
    setSteps([
      {
        id: 1,
        title: "Search a job",
        icon: "flaticon-search",
        description: "Find the right job that matches your skills and passion."
      },
      {
        id: 2,
        title: "Apply for job",
        icon: "flaticon-curriculum-vitae",
        description: "Submit your application and impress the recruiters."
      },
      {
        id: 3,
        title: "Get your job",
        icon: "flaticon-tour",
        description: "Receive your job offer and start your new journey."
      }
    ]);
  }, []);

  return (
    <div 
      className="apply-process-area apply-bg pt-150 pb-150"
      style={{ 
        backgroundImage: "url('/assets/img/gallery/how-applybg.png')", 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat" 
      }}
    >
      <div className="container">
        {/* Titre de la section */}
        <div className="row">
          <div className="col-lg-12">
            <div className="section-tittle white-text text-center">
              <span>Apply Process</span>
              <h2>How it works</h2>
            </div>
          </div>
        </div>

        {/* Étapes du processus */}
        <div className="row">
          {steps.map((step) => (
            <ApplyProcessItem key={step.id} {...step} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ApplyProcess;
