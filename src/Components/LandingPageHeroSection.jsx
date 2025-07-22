import React from 'react';
import { useNavigate } from 'react-router-dom';
import hero_img from '../assets/hero66.png'
function HeroSection() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login'); // 🔒 protected actions redirect to login
  };

  return (
    <section className="bg-gradient-to-r from-blue-100 to-sky-100 pt-24 md:pt-30 pb-12 ">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Text Section */}
        <div className="space-y-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-800 leading-tight">
            Practice for Government Exams <br /> With Real Mock Tests
          </h1>
          <p className="text-gray-600 text-md">
            Get instant performance insights, PDF reports, and subject-wise analysis for every test you attempt.
          </p>
          <div className="mt-8 flex justify-center md:justify-start animate-fadeInUp delay-300">
            <button
              onClick={handleClick}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition scale-102 "
            >
              Start Practicing
            </button>
            <button
              onClick={handleClick}
              className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition scale-102"
            >
              Browse Exams
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="flex justify-center">
          <img
            src={hero_img}
            alt="Students preparing"
            className="w-full max-w-md h-100%"
          />
        </div>
      </div>
      
    </section>
  );
}

export default HeroSection;
