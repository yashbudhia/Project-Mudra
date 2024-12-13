// src/components/Navbar.tsx

import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-white font-bold text-xl">
            Project Mudra
          </Link>
          <div className="flex space-x-4">
            <Link to="/learning" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
              Learning
            </Link>
            <Link to="/jobs" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
              Jobs
            </Link>
            <Link to="/community" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
              Community
            </Link>
            <Link to="/rewards" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
              Rewards
            </Link>
            <Link to="/support" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
              Support
            </Link>

            {/* Authentication Buttons */}
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
                  Sign In
                </Link>
                <Link to="/signup" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
