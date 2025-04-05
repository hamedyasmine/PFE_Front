import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Template from './screens/Home/templates.js';
import About from './screens/Home/About.js';
import Contact from './screens/Home/Contact.js';
import './App.css';
import FindJob from './screens/Home/FindJob.js';
import Login from './screens/Login/Login.js';
import Register from './screens/Login/Register.js';

import HomeAd from './screens/Dashboard/HomeAd.js';
import NumberPage from './screens/Dashboard/screens/CounterPage.js';
import MapPage from './screens/Dashboard/screens/MapPage.js';
import MessagePage from './screens/Dashboard/screens/MessagePage.js';
import CategoriesPage from './screens/Dashboard/screens/CategoriesPage.js';
import SimplifiedApplication from './screens/Home/Homee/simplified-application.js';
import Postuler from './screens/Home/Homee/Postuler.js';
import Chatbot from './screens/Chatbot/Chatbot.js';
import DashboardUser from './screens/DashboardUser/DashboardUser.js';
import MyAccount from './screens/DashboardUser/MyAccount.js';
import ChangePassword from './screens/DashboardUser/ChangePassword.js';
import ForgotPassword from './screens/Login/ForgotPassword.js';
import ShowMoreJob from './screens/Home/Homee/ShowMoreJob.js';
import TestAPI from './components/TestAPI.js';
import UserApplication from './screens/DashboardUser/UserApplication.js';
import JobDetails from './screens/Home/FindJobb/JobDetails.js';
import LoginJob from './screens/Home/FindJobb/LoginJob.js';
import AccountPost from './screens/Home/FindJobb/AccountPost.js';
import JobsPage from './screens/Dashboard/screens/JobsPage.js';
import ApplicationsList from './screens/Dashboard/screens/CandidatureSimplifier.js';
import JobApplicationsPage from './screens/Dashboard/screens/JobApplicationsPage.js';
import ManageQuestionsPage from './screens/Dashboard/screens/ManageQuestionsPage.js';
import InterviewQuestionsPage from './screens/DashboardUser/InterviewQuestionPage.js';
import ApplicationDetails from './screens/DashboardUser/ApplicationDetails.js';



function App() {
  return (
    <Router>
      <Routes>
        
      <Route path="/" element={<Template />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/findjob" element={<FindJob />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Dashboard" element={<HomeAd />} />
      <Route path="/number" element={<NumberPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/message" element={<MessagePage />} />
      <Route path="/categories" element={<CategoriesPage/>} />
      <Route path="/simplified-application" element={<SimplifiedApplication/>} />
      <Route path="/postuler" element={<Postuler/>} />
      <Route path="/Chatbot" element={<Chatbot/>} />
      <Route path="/dashboarduser" element={<DashboardUser/>} />
      <Route path="/my-account" element={<MyAccount />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/modify-password" element={<ChangePassword />} />
      <Route path="/showmore/:jobId" element={<ShowMoreJob />} />
      <Route path="/test-api" element={<TestAPI />} />
      <Route path="/joblogin" element={<LoginJob />} />
      <Route path="/accountpost" element={<AccountPost />} />
      <Route path="/userapplication" element={<UserApplication />} />
      <Route path="/job_details/:id" element={<JobDetails/>} />
      <Route path="/jobs/:categoryId" element={<JobsPage />} />
      <Route path="/candidaturesimplifier" element={<ApplicationsList />} />
      <Route path="/job/:jobId/applications" element={<JobApplicationsPage />} />
      <Route path="/manage-questions/:jobId" element={<ManageQuestionsPage/>} />
      <Route path="/questions/:applicationId" element={<InterviewQuestionsPage />} />
      <Route path="/ApplicationDetails/:id" element={<ApplicationDetails />} />
      
      
    
      </Routes>
    </Router>
  );
}

export default App;
