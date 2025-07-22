import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';
import HomeNavbar from '../Components/HomeNavbar';

export default function SubCategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [subcategories, setSubcategories] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      toast.info('Please login to access subcategories');
      navigate('/login');
    }
  }, [user, navigate]);

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
    <div className="bg-gradient-to-l from-blue-50 to-sky-100 min-h-screen">
      <HomeNavbar />

      <div className="px-4 py-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-900">Select a Subcategory</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-sm px-4 py-2 bg-blue-300 text-blue-800 rounded hover:bg-blue-400 transition"
          >
            ← Back
          </button>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search subcategories..."
          className="w-full mb-6 px-4 py-2 border bg-white border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {loading ? (
          <div className="flex justify-center py-10">
              <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((sub) => (
              <div
                key={sub.id}
                className="relative bg-blue-50 border border-blue-100 rounded-[12px] shadow-lg hover:shadow-2xl transition overflow-hidden p-4"
              >
                <div className="flex flex-col items-center">
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
                  <Link
                    to={`/subcategories/${sub.id}/tests`}
                    className="w-full block text-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-[12px] shadow-md hover:bg-blue-700 transition"
                  >
                    Explore Tests
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
