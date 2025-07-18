import React, { useState, } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);


  const isActive = (path) => location.pathname.startsWith(path);

  const linkClass = (path) =>
    `font-medium px-2 py-1 rounded transition ${
      isActive(path)
        ? 'text-yellow-300 '
        : 'hover:text-yellow-300'
    }`;

  return (
    <nav className="bg-blue-600 shadow-md fixed top-0 w-full z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-yellow-300" />
          <span className="text-xl font-bold text-white">Government Exams</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link to="/" >Home</Link>
          <Link to="/all-categories" className={linkClass('/all-categories')}>All Categories</Link>
          <Link to="/all-exams" className={linkClass('/all-exams')}>All Exams</Link>
          <Link to="/landing-about" className={linkClass('/landing-about')}>About Us</Link>
          <Link to="/blogs" className={linkClass('/blogs')}>Blogs</Link>

          
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
        <Link to="/" onClick={toggleMenu} className={`${linkClass('/')} block w-full text-left`}>
          Home
        </Link>
        <Link to="/all-categories" onClick={toggleMenu} className={`${linkClass('/all-categories')} block w-full text-left`}>
          All Categories
        </Link>
        <Link to="/all-exams" onClick={toggleMenu} className={`${linkClass('/all-exams')} block w-full text-left`}>
          All Exams
        </Link>
        <Link to="/landing-about" onClick={toggleMenu} className={`${linkClass('/landing-about')} block w-full text-left`}>
          About Us
        </Link>
        <Link to="/blogs" onClick={toggleMenu} className={`${linkClass('/blogs')} block w-full text-left`}>
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
