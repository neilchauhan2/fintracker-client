import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/Landing';
import SpacesList from './components/SpacesList';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/spaces" element={<SpacesList />} />
      </Routes>
    </Router>
  );
};

export default App;
