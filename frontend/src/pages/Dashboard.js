import React, { useState, useEffect } from 'react';
import { employeeAPI } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    departments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await employeeAPI.getAll({ limit: 100 });
      const employees = response.data.data;

      setStats({
        totalEmployees: response.data.total,
        activeEmployees: employees.filter((e) => e.status === 'active').length,
        departments: new Set(employees.map((e) => e.department)).size,
      });
    } catch (err) {
      setError('Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-gray-600 text-lg mb-2">Total Employees</h2>
          <p className="text-4xl font-bold text-blue-600">{stats.totalEmployees}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-gray-600 text-lg mb-2">Active Employees</h2>
          <p className="text-4xl font-bold text-green-600">{stats.activeEmployees}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-gray-600 text-lg mb-2">Departments</h2>
          <p className="text-4xl font-bold text-purple-600">{stats.departments}</p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Welcome to Employee Management System</h2>
        <p className="text-gray-700 mb-4">
          Manage your employee records efficiently with our comprehensive system. You can:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Create and manage employee records</li>
          <li>Update employee information</li>
          <li>Search for employees</li>
          <li>Filter employees by department and status</li>
          <li>Delete employee records when needed</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
