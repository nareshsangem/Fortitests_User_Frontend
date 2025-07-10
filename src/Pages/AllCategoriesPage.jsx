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

  // 🔐 Redirect unauthenticated users
  useEffect(() => {
    if (!user) {
      toast.info('Please login to access exam categories');
      navigate('/login');
    }
  }, [user, navigate]);

  // 🔄 Fetch categories
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

  // If URL has ?category=123, prefill search
  useEffect(() => {
    const query = params.get('category');
    if (query) {
      const match = categories.find(cat => cat.id === query);
      if (match) setSearchTerm(match.name);
    }
  }, [params, categories]);

  // 🔍 Filter categories by search
  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    setFiltered(
      categories.filter(cat =>
        cat.name.toLowerCase().includes(lower)
      )
    );
  }, [searchTerm, categories]);

  if (!user) return null;

  return (
    <div className="bg-gray-100 min-h-screen">
      <HomeNavbar />
    <div className="px-4 py-8 max-w-7xl mx-auto">
      
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Explore All Exam Categories</h1>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search categories..."
        className="w-full mb-6 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              to={`/category/${cat.id}`}
              key={cat.id}
              className="relative group border-2 border-transparent rounded-xl p-4 bg-white shadow hover:shadow-xl transform hover:-translate-y-1 transition overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute inset-0 border-2 border-transparent rounded-xl animate-spin-slow border-gradient group-hover:border-animated"></div>
              <div className="relative z-10 flex flex-col h-full items-center justify-between">
                {cat.image_url && (
                  <img
                    src={cat.image_url}
                    alt={cat.name}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                )}
                <h3 className="font-semibold text-gray-700 text-center text-sm sm:text-base">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
