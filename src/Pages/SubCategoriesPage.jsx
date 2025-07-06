import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';

export default function SubCategoryPage() {
  const { id } = useParams(); // category ID
  const navigate = useNavigate();
  const { user } = useUser();

  const [subcategories, setSubcategories] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Auth redirect
  useEffect(() => {
    if (!user) {
      toast.info('Please login to access subcategories');
      navigate('/login');
    }
  }, [user, navigate]);

  // 🔄 Fetch subcategories
  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const res = await api.get(`/category/${id}/subcategories`, {
          withCredentials: true,
        });
        setSubcategories(res.data || []);
        setFiltered(res.data || []);
      } catch (err) {
        console.error('Failed to fetch subcategories', err);
        toast.error('Error loading subcategories');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchSubs();
  }, [id, user]);

  // 🔍 Search logic
  useEffect(() => {
    const lower = search.toLowerCase();
    setFiltered(
      subcategories.filter(sub =>
        sub.name.toLowerCase().includes(lower)
      )
    );
  }, [search, subcategories]);

  if (!user) return null;

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Select a Subcategory</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-sm px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          ← Back
        </button>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search subcategories..."
        className="w-full mb-6 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading ? (
        <div className="text-center text-gray-500">Loading subcategories...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          😕 No subcategories found for "<span className="font-semibold">{search}</span>"
          <div className="mt-4">
            <button
              onClick={() => setSearch('')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Clear Search
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filtered.map((sub) => (
            <div
              key={sub.id}
              className="relative group border-2 border-transparent rounded-xl p-4 bg-white shadow hover:shadow-xl transform hover:-translate-y-1 transition overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute inset-0 border-2 border-transparent rounded-xl animate-spin-slow border-gradient group-hover:border-animated"></div>
              <div className="relative z-10 flex flex-col h-full items-center justify-between">
                {sub.image_url && (
                  <img
                    src={sub.image_url}
                    alt={sub.name}
                    className="w-full h-28 object-cover rounded-md mb-2"
                  />
                )}
                <h3 className="font-semibold text-gray-700 text-center text-sm sm:text-base mb-3">
                  {sub.name}
                </h3>
                <Link
                  to={`/subcategories/${sub.id}/tests`} // update route as per your structure
                  className="mt-auto bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 transition"
                >
                  Click Here
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
