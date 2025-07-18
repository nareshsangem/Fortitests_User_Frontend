import React, { useEffect, useState } from 'react';
import api from '../api';
import HomeNavbar from '../Components/HomeNavbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AllSubcategoriesPage() {
  const [subcategories, setSubcategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/category/all-subcategories', { withCredentials: true })
      .then((res) => {
        const all = res.data.subcategories || [];
        setSubcategories(all);
        setFiltered(all);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Please login to access exams');
        navigate('/login');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    setFiltered(
      subcategories.filter(sub =>
        sub.name.toLowerCase().includes(lower)
      )
    );
  }, [searchTerm, subcategories]);

  const handleExplore = (subcategoryId) => {
    navigate(`/subcategories/${subcategoryId}/tests`);
  };

  return (
    <div className="bg-gradient-to-l from-blue-50 to-sky-100 min-h-screen font-sans">
      <HomeNavbar />

      <div className="pt-16 px-4 pb-10 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">All Exams</h1>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search subcategories..."
          className="w-full mb-8 px-4 py-2 border bg-white border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {loading ? (
          <div className="text-center text-gray-500">Loading all subcategories...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-lg">
            😕 No subcategories found for "<span className="font-semibold">{searchTerm}</span>"
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
            {filtered.map((sub) => (
              <div
                key={sub.id}
                onClick={() => handleExplore(sub.id)}
                className="cursor-pointer relative bg-blue-50 border border-blue-100 rounded-[12px] shadow-lg hover:shadow-2xl transition overflow-hidden p-4"
              >
                <div className="flex flex-col items-center h-full">
                  {sub.image_url && (
                    <img
                      src={sub.image_url}
                      alt={sub.name}
                      className="w-full h-36 object-cover rounded-md mb-3"
                    />
                  )}
                  <h3 className="text-sm sm:text-base font-semibold text-center text-gray-800 mb-2">
                    {sub.name}
                  </h3>

                  <div className="mt-auto w-full">
                    <span className="w-full block px-3 py-1 text-sm font-medium text-white text-center bg-blue-600 rounded-[12px] shadow-md animate-textloop">
                      <span className="inline-block animate-textloop">Explore Tests</span>
                    </span>
                  </div>
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
            transform: scale(1.03);
          }
        }

        .animate-textloop {
          animation: textloop 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
