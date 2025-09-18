/*import React, { useState } from 'react';
import Login from './Login';
import SuperAdminDashboard from './SuperAdminDashboard';
import CompanyAdminDashboard from './CompanyAdminDashboard';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<'superadmin' | 'companyadmin' | 'user' | null>(null);
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (role: 'superadmin' | 'companyadmin' | 'user', email: string) => {
    setUserRole(role);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserEmail('');
  };

  const renderDashboard = () => {
    if (userRole === 'superadmin') {
      return <SuperAdminDashboard email={userEmail} onLogout={handleLogout} />;
    } else if (userRole === 'companyadmin') {
      return <CompanyAdminDashboard email={userEmail} onLogout={handleLogout} />;
    } else if (userRole === 'user') {
      return (
        <div className="flex items-center justify-center min-h-screen bg-purple-200">
          <div className="p-8 text-center bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800">Welcome, User!</h1>
            <p className="mt-2 text-gray-600">Your standard dashboard is ready.</p>
            <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg">Logout</button>
          </div>
        </div>
      );
    }
    return null; // Should not happen
  };

  return (
    <>
      {userRole ? renderDashboard() : <Login onLoginSuccess={handleLogin} />}
    </>
  );
};

export default App;*/

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import SuperAdminDashboard from './SuperAdminDashboard';
import CompanyAdminDashboard from './CompanyAdminDashboard';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<'superadmin' | 'companyadmin' | 'user' | null>(null);
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (role: 'superadmin' | 'companyadmin' | 'user', email: string) => {
    setUserRole(role);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserEmail('');
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route 
          path="/login" 
          element={userRole ? <Navigate to="/" /> : <Login onLoginSuccess={handleLogin} />} 
        />

        {/* Protected Dashboard Routes */}
        <Route 
          path="/"
          element={
            userRole ? (
              userRole === 'superadmin' ? (
                <SuperAdminDashboard email={userEmail} onLogout={handleLogout} />
              ) : userRole === 'companyadmin' ? (
                <CompanyAdminDashboard email={userEmail} onLogout={handleLogout} />
              ) : (
                 // Simple User View
                <div className="flex items-center justify-center min-h-screen bg-purple-200">
                  <div className="p-8 text-center bg-white rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome, User!</h1>
                    <p className="mt-2 text-gray-600">Your standard dashboard is ready.</p>
                    <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg">Logout</button>
                  </div>
                </div>
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Redirect any other path to the main page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
