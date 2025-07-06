import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import api from '../api';
import { toast } from 'react-toastify';
import { useUser } from '../context/UserContext';

function HomeNavbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleLogout = async () => {
    try {
      await api.post('/user/logout', {}, { withCredentials: true });
      setUser(null);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
      toast.error('Logout failed');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${search}`);
      setSearch('');
      setMenuOpen(false);
    }
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow-md px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:flex-nowrap">
        {/* Left: Logo */}
        <Link to="/" className="text-xl font-bold text-blue-700 whitespace-nowrap mr-2">FortiTests</Link>

        {/* Center: Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-grow flex items-center gap-2 min-w-0 max-w-md"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full px-2 py-1 border rounded-md text-sm focus:outline-none"
          />
          <button type="submit" className="text-blue-600 hover:text-blue-800">
            <FaSearch />
          </button>
        </form>

        {/* Right: Nav Links + Profile */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-4 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/exams" className="hover:text-blue-600">All Exams</Link>
            <Link to="/my-tests" className="hover:text-blue-600">My Tests</Link>
            <Link to="/my-results" className="hover:text-blue-600">My Results</Link>
            <Link to="/upgrade" className="text-blue-600 hover:text-blue-800 font-semibold">Upgrade</Link>
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
                <div className="md:hidden flex flex-col">
                  <Link to="/" className="px-4 py-2 hover:bg-gray-100">Home</Link>
                  <Link to="/exams" className="px-4 py-2 hover:bg-gray-100">All Exams</Link>
                  <Link to="/my-tests" className="px-4 py-2 hover:bg-gray-100">My Tests</Link>
                  <Link to="/my-results" className="px-4 py-2 hover:bg-gray-100">My Results</Link>
                  <Link to="/upgrade" className="px-4 py-2 hover:bg-gray-100">Upgrade</Link>
                </div>

                <div className="px-4 py-2 border-t text-sm text-gray-700">
                  {user.username}<br />
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>

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
