import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { employeeAPI } from '../services/api';

function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const response = await employeeAPI.getById(id);
      setEmployee(response.data.data);
    } catch (err) {
      setError('Failed to load employee');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeAPI.delete(id);
        navigate('/employees');
      } catch (err) {
        setError('Failed to delete employee');
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!employee) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Employee not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          {`${employee.firstName} ${employee.lastName}`}
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/employees/${id}/edit`)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={() => navigate('/employees')}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Back
          </button>
        </div>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-semibold">{employee.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Phone</p>
              <p className="font-semibold">{employee.phone}</p>
            </div>
            <div>
              <p className="text-gray-600">Status</p>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  employee.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : employee.status === 'inactive'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {employee.status}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Professional Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Position</p>
              <p className="font-semibold">{employee.position}</p>
            </div>
            <div>
              <p className="text-gray-600">Department</p>
              <p className="font-semibold">{employee.department}</p>
            </div>
            <div>
              <p className="text-gray-600">Salary</p>
              <p className="font-semibold">${employee.salary.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Employment Details</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Join Date</p>
              <p className="font-semibold">
                {new Date(employee.joinDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Created</p>
              <p className="font-semibold">
                {new Date(employee.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Last Updated</p>
              <p className="font-semibold">
                {new Date(employee.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {employee.address && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Address</h2>
            <div className="space-y-2">
              {employee.address.street && <p>{employee.address.street}</p>}
              {employee.address.city && (
                <p>
                  {employee.address.city}, {employee.address.state} {employee.address.zipCode}
                </p>
              )}
              {employee.address.country && <p>{employee.address.country}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeDetail;
