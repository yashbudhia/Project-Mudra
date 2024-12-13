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
import { AuthProvider } from './context/AuthContext';
import { PointsProvider } from './context/PointsContext';
import ProtectedRoute from './routes/ProtectedRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <PointsProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/learning" element={<Learning />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/rewards" element={<Rewards />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/confirmation" element={<Confirmation />} />
                </Route>

                {/* Catch-all Route (Optional) */}
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </PointsProvider>
    </AuthProvider>
  );
};

export default App;
