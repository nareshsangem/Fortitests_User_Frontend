import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import Navbar from '../Components/Navbar';
import { toast } from 'react-toastify';

const LandingPageSubcategoriesByCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [subcategories, setSubcategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await api.get(`/public/subcategories/by-category/${categoryId}`);
        const subs = res.data.subcategories || [];
        setSubcategories(subs);
        setFiltered(subs);
      } catch (err) {
        console.error('Failed to fetch subcategories by category:', err);
        toast.error('Error loading subcategories');
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [categoryId]);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    setFiltered(
      subcategories.filter((sub) => sub.name.toLowerCase().includes(lower))
    );
  }, [searchTerm, subcategories]);

  const handleCardClick = () => {
    toast.info('🔒 Please login to explore more', { autoClose: 2000 });
  };

  return (
    <div className="bg-gradient-to-l from-blue-50 to-sky-100 min-h-screen font-sans">
      <Navbar />

      <div className="px-4 py-10 pt-24 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-900">Category Exams</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-sm px-4 py-2 bg-blue-300 text-blue-800 rounded hover:bg-blue-400 transition"
          >
            ← Back
          </button>
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search subcategories..."
          className="w-full mb-8 px-4 py-2 border bg-white border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {loading ? (
          <div className="flex justify-center py-10">
              <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-lg">
            😕 Yet to add Exams Please check back later "<span className="font-semibold">{searchTerm}</span>"
            
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((sub) => (
              <div
                key={sub.id}
                onClick={handleCardClick}
                className="cursor-pointer bg-blue-50 border border-blue-100 rounded-[12px] shadow-lg hover:shadow-2xl transition overflow-hidden p-4"
              >
                <div className="flex flex-col items-center h-full">
                  {sub.image_url && (
                    <img
                      src={sub.image_url}
                      alt={sub.name}
                      className="w-auto h-32 object-cover rounded-md mb-3"
                    />
                  )}
                  <h3 className="text-sm sm:text-base font-semibold text-center text-gray-800 mb-3">
                    {sub.name.toUpperCase()}
                  </h3>
                  <span className="w-full block px-3 py-1.5 text-sm font-medium text-white text-center bg-blue-600 rounded-[12px] shadow-md animate-textloop">
                    Explore Tests
                  </span>
                </div>
              </div>
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

export default LandingPageSubcategoriesByCategory;
