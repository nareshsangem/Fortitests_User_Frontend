import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const LandingPageAllCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/public/categories/all')
      .then(res => {
        setCategories(res.data.categories || []);
        setFiltered(res.data.categories || []);
      })
      .catch(err => console.error('Error loading all categories', err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    setFiltered(
      categories.filter(cat =>
        cat.name.toLowerCase().includes(lower)
      )
    );
  }, [searchTerm, categories]);

  return (
   
    <div className="bg-gradient-to-l from-blue-50 to-sky-100 min-h-screen font-sans">
       
        <Navbar />
      
      <div className="pt-24 px-4 pb-10 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold  mb-6 text-blue-900">All Exam Categories</h1>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search categories..."
          className="w-full mb-8 px-4 py-2 border bg-white border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {loading ? (
          <div className="flex justify-center py-10">
              <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-lg">
            😕 No categories found for "<span className="font-semibold">{searchTerm}</span>"
            <div className="mt-4">
              <button
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Clear Search
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((cat) => (
              <Link
                to={`/category/${cat.id}/exams`}
                key={cat.id}
                className="relative bg-blue-50 border border-blue-100 rounded-[12px] shadow-lg hover:shadow-2xl transition overflow-hidden p-4"
              >
                <div className="flex flex-col items-center h-full">
                  {cat.image_url && (
                    <img
                      src={cat.image_url}
                      alt={cat.name}
                      className="w-auto h-32 object-cover rounded-md mb-3"
                    />
                  )}
                  <h3 className="text-sm sm:text-base font-semibold text-center text-gray-800 mb-2">
                    {cat.name.toUpperCase()}
                  </h3>

                  <div className="mt-auto w-full">
                    <span className="w-full block px-3 py-1 text-sm font-medium text-white text-center bg-blue-600 rounded-[12px] shadow-md animate-textloop">
                      <span className="inline-block animate-textloop">Explore More</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

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
    </div>
  );
};

export default LandingPageAllCategoriesPage;
