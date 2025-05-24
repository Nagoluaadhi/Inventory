import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import StockIn from './components/StockIn';
import Outward from './components/Outward';
import Services from './components/Services';
import Report from './components/Report';
import LoginPage from './components/LoginPage';
import UserManagement from './components/UserManagement';
import UserClientDashboard from './components/UserClientDashboard'




function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public login route */}
        <Route path="/" element={<LoginPage setUser={setUser} />} />

        {/* Protected application routes */}
        <Route
          path="/app"
          element={user ? <Layout user={user} /> : <Navigate to="/" />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="stockin" element={<StockIn />} />
          <Route path="outward" element={<Outward />} />
          <Route path="services" element={<Services />} />
          <Route path="report" element={<Report />} />
          <Route path="dashboard" element={<UserClientDashboard />} />

          {/* Admin-only routes */}
          {user?.role === 'admin' && (
            <>
              <Route path="user-management" element={<UserManagement />} />


            </>
          )}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
