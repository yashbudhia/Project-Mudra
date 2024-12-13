// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Learning from './pages/Learning';
import Jobs from './pages/Jobs';
import Community from './pages/Community';
import Rewards from './pages/Rewards';
import Support from './pages/Support';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Confirmation from './pages/Confirmation';
import { PointsProvider } from './pages/PointsContext';

const App: React.FC = () => {
  return (
    <PointsProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/learning" element={<Learning />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/community" element={<Community />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/support" element={<Support />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </PointsProvider>
  );
};

export default App;
