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
import AddJobPage from './screens/Dashboard/screens/AddJobPage.js';
import GererLocations from './screens/Dashboard/screens/GererLocations.js';
import ResetPassword from './screens/Login/ResetPassword.js';
import InterviewAnswersPage from './screens/Dashboard/screens/InterviewAnswersPage.js';
import QuestionsAnswersPage from './screens/Dashboard/screens/InterviewAnswersPage.js';
import AdminRoute from './screens/Dashboard/components/Protected.js';
import ModifyAccountAdmin from './screens/Dashboard/screens/ShowAccountAdmin.js';


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
      <Route path="/ShowAccountAdmin" element={<ModifyAccountAdmin />} />
      
      <Route 
          path="/number" 
          element={
            <AdminRoute>
              <NumberPage />
            </AdminRoute>
          } 
        />
      <Route path="/map" element={<AdminRoute><MapPage /></AdminRoute>} />
      <Route path="/message" element={<AdminRoute><MessagePage /></AdminRoute>} />
      <Route path="/categories" element={<AdminRoute><CategoriesPage/></AdminRoute>}  />
      <Route path="/simplified-application" element={<SimplifiedApplication/>} />
      <Route path="/postuler" element={<Postuler/>} />
      <Route path="/interview-answers/:applicationId" element={<InterviewAnswersPage />} />
      <Route path="/applications/:idjob/questions-answers" element={<QuestionsAnswersPage />} />
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
      <Route path="/candidaturesimplifier" element={<AdminRoute><ApplicationsList /></AdminRoute>} />
      <Route path="/job/:jobId/applications" element={<JobApplicationsPage />} />
      <Route path="/manage-questions/:jobId" element={<AdminRoute><ManageQuestionsPage/></AdminRoute>} />
      <Route path="/questions/:applicationId" element={<InterviewQuestionsPage />} />
      <Route path="/ApplicationDetails/:id" element={<ApplicationDetails />} />
      
      <Route path="/category/:categoryId/jobs" element={<AdminRoute><JobsPage /></AdminRoute>} />
      <Route path="/category/:categoryId/add-job" element={<AdminRoute><AddJobPage /></AdminRoute>} />
      
      <Route path="/gerer-locations" element={<AdminRoute><GererLocations /></AdminRoute>} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/Dashboard"
        element={
          <AdminRoute>
            <HomeAd />
          </AdminRoute>
        }
      />
</Routes>
    
      
    </Router>
  );
}

export default App;
