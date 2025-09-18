import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import SuperAdminDashboard from './SuperAdminDashboard';
import CompanyAdminDashboard from './CompanyAdminDashboard';

const App: React.FC = () => {
  // State to hold the current user's role and email
  // CHANGE #1: Updated role names to include underscores
  const [userRole, setUserRole] = useState<'super_admin' | 'company_admin' | 'user' | null>(null);
  const [userEmail, setUserEmail] = useState('');

  /**
   * Callback function passed to Login component.
   * Updates the state when a user successfully logs in.
   */
  // CHANGE #2: Updated role names in the function's type definition
  const handleLogin = (role: 'super_admin' | 'company_admin' | 'user', email: string) => {
    setUserRole(role);
    setUserEmail(email);
  };

  /**
   * Clears user state on logout.
   */
  const handleLogout = () => {
    setUserRole(null);
    setUserEmail('');
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route: If user is already logged in, redirect to dashboard */}
        <Route 
          path="/login" 
          element={userRole ? <Navigate to="/" /> : <Login onLoginSuccess={handleLogin} />} 
        />

        {/* Protected Dashboard Route */}
        <Route 
          path="/"
          element={
            userRole ? (
              // If logged in, show the correct dashboard based on role
              // CHANGE #3: Updated the check to use "super_admin"
              userRole === 'super_admin' ? (
                <SuperAdminDashboard email={userEmail} onLogout={handleLogout} />
              // CHANGE #4: Updated the check to use "company_admin"
              ) : userRole === 'company_admin' ? (
                <CompanyAdminDashboard email={userEmail} onLogout={handleLogout} />
              ) : (
                // A simple view for the 'user' role
                <div className="flex items-center justify-center min-h-screen bg-purple-200">
                  <div className="p-8 text-center bg-white rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome, User!</h1>
                    <p className="mt-2 text-gray-600">{userEmail}</p>
                    <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg">Logout</button>
                  </div>
                </div>
              )
            ) : (
              // If not logged in, redirect to the login page
              <Navigate to="/login" />
            )
          }
        />

        {/* Fallback route: Redirect any other path to the main page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
