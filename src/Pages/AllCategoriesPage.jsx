import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';
import HomeNavbar from '../Components/HomeNavbar';

export default function AllCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();

  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.info('Please login to access exam categories');
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/category/all', { withCredentials: true });
        const all = res.data || [];
        setCategories(all);
        setFiltered(all);
      } catch (err) {
        console.error('Failed to fetch all categories', err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchCategories();
  }, [user]);

  useEffect(() => {
    const query = params.get('category');
    if (query) {
      const match = categories.find(cat => cat.id === query);
      if (match) setSearchTerm(match.name);
    }
  }, [params, categories]);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    setFiltered(categories.filter(cat => cat.name.toLowerCase().includes(lower)));
  }, [searchTerm, categories]);

  if (!user) return null;

  return (
    <div className="bg-gradient-to-l from-blue-50 to-sky-100 min-h-screen font-sans">
      <HomeNavbar />

      <div className="px-4 py-10 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">Explore All Exam Categories</h1>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search categories..."
          className="w-full mb-8 px-4 py-2 border bg-white border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {loading ? (
          <div className="text-center text-gray-500">Loading all categories...</div>
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
      to={`/exams/${cat.id}`}
      key={cat.id}
      className="relative bg-blue-50 border border-blue-100 rounded-[12px] shadow-lg hover:shadow-2xl transition overflow-hidden p-4"
    >
      <div className="flex flex-col items-center h-full">
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

        {/* Explore More button full-width and animated */}
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
        @keyframes fadeLoop {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.03);
          }
        }

        .animate-fadeLoop {
          animation: fadeLoop 2s ease-in-out infinite;
        }

        @keyframes border-animated {
          0% { border-color: #3b82f6; }
          100% { border-color: #60a5fa; }
        }

        .border-gradient {
          border-image: linear-gradient(to right, #3b82f6, #60a5fa) 1;
        }
      `}</style>
    </div>
  );
}
