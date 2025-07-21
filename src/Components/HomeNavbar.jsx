import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import api from '../api';
import { toast } from 'react-toastify';
import { useUser } from '../context/UserContext';

function HomeNavbar() {
  const { user, setUser, loading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await api.post('/user/logout', {}, { withCredentials: true });
      setUser(null);
      localStorage.removeItem('fortitests_user');
      toast.success('Logged out successfully');
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
      toast.error('Logout failed');
    }
  };

  const isActive = (path, exact = false) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  // ✅ Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading || !user) return null;

  return (
    <nav className="bg-blue-700 font-sans text-white shadow-md px-4 py-3 sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:flex-nowrap">

        {/* Left: Logo */}
        <Link to="/home" className="flex items-center gap-2 p-1 text-4xl text-white font-bold">
          <img src="/logo3.png" alt="Ace With Mock" className='w-auto h-12'/>
          <span className="hidden sm:inline hover:text-amber-300">ACE With Mock</span>
        </Link>

        {/* Right: Nav Links + Profile */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-6 text-white font-medium text-1xl">
            <Link
              to="/home"
              className={`transition-colors duration-300 ${
                isActive('/home', true) ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-300'
              }`}
            >
              Home
            </Link>
            <Link
              to="/categories"
              className={`transition-colors duration-300 ${
                isActive('/categories') ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-300'
              }`}
            >
              All Categories
            </Link>
            <Link
              to="/exams"
              className={`transition-colors duration-300 ${
                isActive('/exams') ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-300'
              }`}
            >
              All Exams
            </Link>
            <Link
              to="/my-tests"
              className={`transition-colors duration-300 ${
                isActive('/my-tests', true) ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-300'
              }`}
            >
              My Tests
            </Link>
            <Link
              to="/about"
              className={`transition-colors duration-300 ${
                isActive('/about', true) ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-300'
              }`}
            >
              About Us
            </Link>
          </div>

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 focus:outline-none text-white hover:text-yellow-300 transition-all duration-300"
            >
              <FaUserCircle className="text-2xl" />
              <span className="hidden md:inline font-semibold text-sm">
                {user.username || user.email}
              </span>
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-blue-50 border-1 border-black rounded-xl shadow-lg py-3 z-50 text-blue-800">
                {/* Mobile Nav Links */}
                <div className="md:hidden flex flex-col text-sm font-medium">
                  <Link
                    to="/home"
                    className={`px-4 py-2 hover:bg-blue-100 ${
                      isActive('/home', true) ? 'text-blue-700 font-semibold bg-blue-100' : ''
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/categories"
                    className={`px-4 py-2 hover:bg-blue-100 ${
                      isActive('/categories') ? 'text-blue-700 font-semibold bg-blue-100' : ''
                    }`}
                  >
                    All Categories
                  </Link>

                  <Link
                    to="/exams"
                    className={`px-4 py-2 hover:bg-blue-100 ${
                      isActive('/exams', true) ? 'text-blue-700 font-semibold bg-blue-100' : ''
                    }`}
                  >
                    All Exams
                  </Link>

                  <Link
                    to="/my-tests"
                    className={`px-4 py-2 hover:bg-blue-100 ${
                      isActive('/my-tests', true) ? 'text-blue-700 font-semibold bg-blue-100' : ''
                    }`}
                  >
                    My Tests
                  </Link>
                  <Link
                    to="/about"
                    className={`px-4 py-2 hover:bg-blue-100 ${
                      isActive('/about', true) ? 'text-blue-700 font-semibold bg-blue-100' : ''
                    }`}
                  >
                    About Us
                  </Link>
                </div>
                      <hr className='border-blue-900 my-2 border-1' />
                {/* User Info */}
                <div className="px-4 pt-3 pb-2 text-sm font-semibold text-blue-800">
                  {user.username}
                  <br />
                  <span className="text-xs font-semibold text-blue-600">{user.email}</span>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-500 font-semibold hover:bg-red-200 transition-colors mt-1 rounded-b-xl"
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
