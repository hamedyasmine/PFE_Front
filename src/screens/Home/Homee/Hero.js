import React from "react";

function Hero() {
  

  

  return (
    <div className="slider-area">
      <div className="slider-active">
        <div
          className="single-slider slider-height d-flex align-items-center"
          style={{
            backgroundImage: "url('/assets/img/hero/h1_hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-9 col-md-10">
                <div className="hero__caption">
                  <h1>Explore Exciting Career Opportunities at LEONI</h1>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
