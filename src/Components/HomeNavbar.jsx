import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import api from '../api';
import { toast } from 'react-toastify';
import { useUser } from '../context/UserContext';


function HomeNavbar() {
  const { user, setUser,loading } = useUser();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ GET CURRENT PATH
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
  try {
    await api.post('/user/logout', {}, { withCredentials: true });
    setUser(null);
    localStorage.removeItem('fortitests_user'); // ✅ clear on logout
    toast.success('Logged out successfully');
    navigate('/');
  } catch (err) {
    console.error('Logout error:', err);
    toast.error('Logout failed');
  }
};


  // ✅ HELPER FUNCTION TO CHECK ACTIVE LINKS
  const isActive = (path, exact = false) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);


if (loading) return null; // wait until session check finishes

if (!user) return null; 

  return (
    <nav className="bg-white shadow-md px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:flex-nowrap">
        {/* Left: Logo */}
        <Link to="/home" className="text-xl font-bold text-blue-700 whitespace-nowrap mr-2">
          FortiTests
        </Link>

        {/* Right: Nav Links + Profile */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-4 text-gray-700 font-medium">
            <Link
              to="/home"
              className={`hover:text-blue-600 ${
                isActive('/home', true) ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/exams"
              className={`hover:text-blue-600 ${
                isActive('/exams') ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              All Exams
            </Link>
            <Link
              to="/my-tests"
              className={`hover:text-blue-600 ${
                isActive('/my-tests', true) ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              My Tests
            </Link>
            <Link
              to="/about"
              className={`hover:text-blue-600 ${
                isActive('/about', true) ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              About Us
            </Link>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 text-blue-600 focus:outline-none"
            >
              <FaUserCircle className="text-2xl" />
              <span className="hidden md:inline text-sm text-gray-800">
                {user.username || user.email}
              </span>
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded-xl shadow-lg py-2 z-50">
                {/* Mobile Nav Links */}
                <div className="md:hidden flex flex-col">
                  <Link
                    to="/home"
                    className={`px-4 py-2 hover:bg-gray-100 ${
                      isActive('/home', true) ? 'text-blue-600 font-semibold bg-gray-50' : ''
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/exams"
                    className={`px-4 py-2 hover:bg-gray-100 ${
                      isActive('/exams') ? 'text-blue-600 font-semibold bg-gray-50' : ''
                    }`}
                  >
                    All Exams
                  </Link>
                  <Link
                    to="/my-tests"
                    className={`px-4 py-2 hover:bg-gray-100 ${
                      isActive('/my-tests', true) ? 'text-blue-600 font-semibold bg-gray-50' : ''
                    }`}
                  >
                    My Tests
                  </Link>
                  <Link
                    to="/about"
                    className={`px-4 py-2 hover:bg-gray-100 ${
                      isActive('/about', true) ? 'text-blue-600 font-semibold bg-gray-50' : ''
                    }`}
                  >
                    About Us
                  </Link>
                </div>

                {/* User Info */}
                <div className="px-4 py-2 border-t text-sm text-gray-700">
                  {user.username}
                  <br />
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 border-t"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HomeNavbar;
