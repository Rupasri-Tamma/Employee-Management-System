import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';
import EmployeeDetail from './pages/EmployeeDetail';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/"
          element={<PrivateRoute isAuthenticated={isAuthenticated} component={Dashboard} />}
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute isAuthenticated={isAuthenticated} component={Dashboard} />}
        />
        <Route
          path="/employees"
          element={<PrivateRoute isAuthenticated={isAuthenticated} component={EmployeeList} />}
        />
        <Route
          path="/employees/new"
          element={<PrivateRoute isAuthenticated={isAuthenticated} component={EmployeeForm} />}
        />
        <Route
          path="/employees/:id"
          element={<PrivateRoute isAuthenticated={isAuthenticated} component={EmployeeDetail} />}
        />
        <Route
          path="/employees/:id/edit"
          element={<PrivateRoute isAuthenticated={isAuthenticated} component={EmployeeForm} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
