import React from "react";
import Hero from "./Homee/Hero";
import TopCateg from "./Homee/TopCateg";
import UploadCv from "./Homee/UploadCv";
import RecentJob from "./Homee/RecentJob";
import ApplyProcess from "./Homee/ApplyProcess";
import WhatWeDo from "./Homee/WhatWeDo";
import LatestBlog from "./Homee/LatestBlog";
import Footer from "./Homee/Footer";
import Header from "./Homee/Header";
import ChatBubble from "../chatboat/chatboat";





function Template() {
    return (
        <>
  <div id="preloader-active">
        <div class="preloader d-flex align-items-center justify-content-center">
            <div class="preloader-inner position-relative">
                <div class="preloader-circle"></div>
                <div class="preloader-img pere-text">
                <img src="assets/img/logo/logo.png" alt="Logo de l'entreprise" />

                </div>
            </div>
        </div>
    </div>
   
    <header>
        
       <Header/>
       
    </header>
    <main>


        <Hero/>
        
        <TopCateg/>
        <ChatBubble/>
       
         
        <UploadCv/>
       
       <RecentJob/>
       
        
        <ApplyProcess/>
      
      
    
        <WhatWeDo/>
        
      
        
        

    </main>
    <footer>
        
       <Footer/>
        
    </footer>
    

 </> 

       

    );
 }
export default Template ; 