import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProfileSidebar from './ProfileSidebar';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tests', href: '/tests' },
    { name: 'My Results', href: '/results' },
    { name: 'Leader Board', href: '/leaderboard' },
  ];

  useEffect(() => {
    axios
      .get('/user/profile', { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold text-blue-600">FortiTests</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.href} className="text-gray-700 hover:text-blue-600 font-medium">
              {link.name}
            </Link>
          ))}

          {user ? (
            <ProfileSidebar user={user} />
          ) : (
            <>
              <Link to="/login" className="text-blue-600 font-medium hover:underline">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Register</Link>
            </>
          )}
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="block text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-2 mt-3">
              <ProfileSidebar user={user} />
            </div>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-blue-600 font-medium">Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
