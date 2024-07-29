import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// components
import LandingPage from './pages/(onboarding)/landingPage';
import Login from './pages/(onboarding)/login';
import Signup from './pages/(onboarding)/signup';
import OrganizerProfileForm from './pages/(onboarding)/organizerProfileFrom';
import AccountVerification from './pages/(onboarding)/accountVerification';
import Home from './pages/(attendee)/home';
import Bookings from './pages/(attendee)/bookings';
import AttendeeSettings from './pages/(attendee)/settings';
import EventPage from './pages/(attendee)/eventPage';
import OrganizerProfile from './pages/(attendee)/organizerProfile';
import Dashboard from './pages/(organizer)/dashboard';
import OrganizerSettings from './pages/(organizer)/settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login onSuccess={() => {}} />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/organizerProfileForm" element={<OrganizerProfileForm/>} />
        <Route path="/accountVerification" element={<AccountVerification/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/attendeeSettings" element={<AttendeeSettings />} />
        <Route path="/eventPage" element={<EventPage />} />
        <Route path="/organizerProfile" element={<OrganizerProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendeeSettings" element={<AttendeeSettings />} />
        <Route path="/organizerSettings" element={<OrganizerSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
