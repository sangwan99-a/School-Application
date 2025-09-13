import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Events from './Events';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiBook, FiClipboard, FiUserPlus, FiSettings } from 'react-icons/fi';


const AdminDashboard = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  // Fetch admissions data from API
  const fetchAdmissions = async () => {
    setLoading(true);
    setError(null);
    try {
  const response = await axios.get('https://school-application-zs1l.onrender.com/api/admissions');
      setAdmissions(response.data);
      setSuccess('Admissions loaded successfully');
    } catch (err) {
      setError('Failed to load admissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  // ...rest of the component logic...

  const location = useLocation();
  const menu = [
    { name: 'Dashboard', icon: <FiHome size={20} />, path: '/admin-dashboard' },
    { name: 'Students', icon: <FiUsers size={20} />, path: '/students' },
    { name: 'Classes', icon: <FiBook size={20} />, path: '/classes' },
    { name: 'Exams', icon: <FiClipboard size={20} />, path: '/exams' },
    { name: 'Admission', icon: <FiUserPlus size={20} />, path: '/admission' },
    { name: 'Settings', icon: <FiSettings size={20} />, path: '/settings' },
  ];

  return (
    <div className="flex min-h-screen font-sans bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-100 text-gray-700 fixed h-full shadow-lg z-30">
        <div className="flex items-center h-20 px-8 border-b border-gray-200">
          <span className="text-2xl font-bold tracking-wide" style={{ fontFamily: 'Poppins, Inter, Helvetica, Arial, sans-serif' }}>Admin Hub</span>
        </div>
        <nav className="flex-1 py-8 px-2 space-y-1">
          {menu.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center gap-3 px-6 py-3 rounded-lg font-semibold text-base transition-all duration-150 relative
                  ${active ? 'bg-blue-500 text-white font-bold shadow-md' : 'hover:bg-gray-200 text-gray-700'}
                  `}
                style={{ fontFamily: 'Poppins, Inter, Helvetica, Arial, sans-serif', letterSpacing: '0.01em' }}
              >
                {/* Accent line for active */}
                <span className={`absolute left-0 top-2 bottom-2 w-1 rounded-full transition-all duration-150 ${active ? 'bg-blue-600' : 'bg-transparent'}`}></span>
                <span className={`flex-shrink-0`}>{item.icon}</span>
                <span className="ml-2 whitespace-nowrap">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto py-6 px-8 text-xs text-gray-400 border-t border-gray-200 text-center">
          &copy; {new Date().getFullYear()} School Admin
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Poppins, Inter, Helvetica, Arial, sans-serif' }}>Admin Dashboard</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        <ul className="mb-8">
          {admissions.map((admission, idx) => (
            <li key={admission.id || idx} className="bg-white rounded shadow p-4 mb-2 text-gray-800">
              {JSON.stringify(admission)}
            </li>
          ))}
        </ul>
        <Events />
      </main>
    </div>
  );
};

export default AdminDashboard;