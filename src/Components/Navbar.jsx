import React, { useState } from 'react';
import {  Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import  logo from '../assets/awm1.png'
function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const isActive = (path, exact = false) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <nav className="bg-blue-600 shadow-md fixed top-0 w-full z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center gap-2 p-1">
          <img src={logo} alt="Ace With Mock" className='w-auto h-12'/>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link
            to="/"
            className={`font-medium px-2 py-1 rounded transition-colors duration-300 ${
              isActive('/', true) ? 'text-yellow-300' : 'hover:text-yellow-300'
            }`}
          >
            Home
          </Link>
          <Link
            to="/all-categories"
            className={`font-medium px-2 py-1 rounded transition-colors duration-300 ${
              isActive('/all-categories') ? 'text-yellow-300' : 'hover:text-yellow-300'
            }`}
          >
            All Categories
          </Link>
          <Link
            to="/all-exams"
            className={`font-medium px-2 py-1 rounded transition-colors duration-300 ${
              isActive('/all-exams') ? 'text-yellow-300' : 'hover:text-yellow-300'
            }`}
          >
            All Exams
          </Link>
          <Link
            to="/landing-about"
            className={`font-medium px-2 py-1 rounded transition-colors duration-300 ${
              isActive('/landing-about') ? 'text-yellow-300' : 'hover:text-yellow-300'
            }`}
          >
            About Us
          </Link>
          <Link
            to="/blogs"
            className={`font-medium px-2 py-1 rounded transition-colors duration-300 ${
              isActive('/blogs') ? 'text-yellow-300' : 'hover:text-yellow-300'
            }`}
          >
            Blogs
          </Link>

          <button
            onClick={() => navigate('/login')}
            className="bg-yellow-400 text-blue-800 font-semibold px-4 py-1 rounded hover:bg-yellow-300"
          >
            Login / Register
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden bg-blue-700 text-white px-4 py-4 space-y-2 transition-all duration-300 ease-in-out ${
          menuOpen ? 'block' : 'hidden'
        }`}
      >
        <Link
          to="/"
          onClick={toggleMenu}
          className={`block w-full text-left font-medium px-2 py-1 rounded transition-colors duration-300 ${
            isActive('/', true) ? 'text-yellow-300' : 'hover:text-yellow-300'
          }`}
        >
          Home
        </Link>
        <Link
          to="/all-categories"
          onClick={toggleMenu}
          className={`block w-full text-left font-medium px-2 py-1 rounded transition-colors duration-300 ${
            isActive('/all-categories') ? 'text-yellow-300' : 'hover:text-yellow-300'
          }`}
        >
          All Categories
        </Link>
        <Link
          to="/all-exams"
          onClick={toggleMenu}
          className={`block w-full text-left font-medium px-2 py-1 rounded transition-colors duration-300 ${
            isActive('/all-exams') ? 'text-yellow-300' : 'hover:text-yellow-300'
          }`}
        >
          All Exams
        </Link>
        <Link
          to="/landing-about"
          onClick={toggleMenu}
          className={`block w-full text-left font-medium px-2 py-1 rounded transition-colors duration-300 ${
            isActive('/landing-about') ? 'text-yellow-300' : 'hover:text-yellow-300'
          }`}
        >
          About Us
        </Link>
        <Link
          to="/blogs"
          onClick={toggleMenu}
          className={`block w-full text-left font-medium px-2 py-1 rounded transition-colors duration-300 ${
            isActive('/blogs') ? 'text-yellow-300' : 'hover:text-yellow-300'
          }`}
        >
          Blogs
        </Link>

        <button
          onClick={() => {
            navigate('/login');
            setMenuOpen(false);
          }}
          className="block w-full text-left bg-yellow-400 text-blue-800 px-4 py-2 mt-2 rounded hover:bg-yellow-300 font-semibold"
        >
          Login / Register
        </button>
      </div>
    </nav>
  );
}

export default LandingNavbar;
