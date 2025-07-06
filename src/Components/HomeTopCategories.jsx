import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function TopCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopCategories = async () => {
      try {
        const res = await api.get('/category/top');
        setCategories(res.data || []);
      } catch (err) {
        console.error('Failed to fetch top categories', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopCategories();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading top categories...</div>;
  }

  return (
    <section className="px-4 py-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Top Exam Categories</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            to={`/category/${cat.id}`} // ✅ Updated route
            key={cat.id}
            className="relative group border-2 border-transparent rounded-xl p-4 bg-white shadow-lg hover:shadow-xl transition overflow-hidden"
          >
            <div className="absolute inset-0 border-2 border-transparent rounded-xl animate-spin-slow border-gradient group-hover:border-animated"></div>
            <div className="relative z-10">
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

      <div className="flex justify-center mt-8">
        <Link
          to="/exams"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Explore More Exams
        </Link>
      </div>
    </section>
  );
}
