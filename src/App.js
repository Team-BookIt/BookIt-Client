import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// components
import LandingPage from './pages/landingPage';
import Login from './pages/login';
import Signup from './pages/signup';
import OrganizerProfileForm from './pages/organizerProfileFrom';
import AccountVerification from './pages/accountVerification';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/organizerProfileForm" element={<OrganizerProfileForm/>} />
        <Route path="/accountVerification" element={<AccountVerification/>} />
      </Routes>
    </Router>
  );
}

export default App;
