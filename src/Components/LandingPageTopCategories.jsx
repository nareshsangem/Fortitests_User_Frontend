import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import api from '../api';

const LandingPageTopCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/public/categories/top')
      .then((res) => setCategories(res.data.categories || []))
      .catch((err) => console.error('Failed to fetch top categories', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (<div className="flex justify-center py-10">
              <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>);
  }

  return (
    <section className="px-4 py-10 bg-gradient-to-l from-indigo-100 via-blue-200 to-purple-100">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900">POPULAR CATEGORIES</h2>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              to={`/category/${cat.id}/exams`}
              key={cat.id}
              className="relative bg-blue-50 border border-blue-100 rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden p-4"
            >
              <div className="flex flex-col items-center">
                {cat.image_url && (
                  <img
                    src={cat.image_url}
                    alt={cat.name}
                    className="w-full h-36 object-cover rounded-md mb-3"
                  />
                )}
                <h3 className="text-sm sm:text-base font-semibold text-center text-gray-800 mb-2">
                  {cat.name}
                </h3>

                {/* Explore More Animation */}
                <div className="mt-auto w-full">
                  <span className="w-full block px-3 py-1 text-sm font-medium text-white text-center bg-blue-600 rounded-[12px] shadow-md ">
                    <span className="inline-block animate-textloop">Explore More</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Explore More Button */}
        <div className="flex justify-center mt-10">
          <Link
            to="/all-categories"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-md animate-bounce transition"
          >
            Explore More Categories <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes textloop {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.05);
          }
        }

        .animate-textloop {
          animation: textloop 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default LandingPageTopCategories;
