import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/Landing';
import SpacesSection from './components/CreateSpaceSection/SpacesSection';
import Spaces from './components/SpacesPage/Spaces';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/spaces" element={<SpacesSection />} />
        <Route path="/spaces/:spaceId" element={<Spaces />} />
      </Routes>
    </Router>
  );
};

export default App;
