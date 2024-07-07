import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// components
import LandingPage from './pages/(onboarding)/landingPage';
import Login from './pages/(onboarding)/login';
import Signup from './pages/(onboarding)/signup';
import OrganizerProfileForm from './pages/(onboarding)/organizerProfileFrom';
import AccountVerification from './pages/(onboarding)/accountVerification';
import Main from './pages/(attendee)/index';
import EventPage from './pages/(attendee)/eventPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/organizerProfileForm" element={<OrganizerProfileForm/>} />
        <Route path="/accountVerification" element={<AccountVerification/>} />
        <Route path="/mainPage" element={<Main />} />
        <Route path="/eventPage" element={<EventPage />} />
      </Routes>
    </Router>
  );
}

export default App;
