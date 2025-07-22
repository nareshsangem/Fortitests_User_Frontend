import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowRight } from 'react-icons/fa';

function LandingTopCategories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/category/top')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  const handleViewClick = (id) => {
    api.get('/user/profile', { withCredentials: true })
      .then(() => navigate(`/categories/${id}`))
      .catch(() => toast.info('Please login to Explore'));
  };

  const handleExploreMore = () => {
    api.get('/user/profile', { withCredentials: true })
      .then(() => navigate('/categories'))
      .catch(() => toast.info('Please login to Explore more categories'));
  };

  return (
    <div className="from-sky-100 to-blue-200 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Top Categories</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer transition hover:scale-105"
              onClick={() => handleViewClick(cat.id)}
            >
              <img
                src={cat.image_url}
                alt={cat.name}
                className="h-32 w-auto object-cover"
              />
              <div className="p-4 flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-800 text-center">{cat.name}</h3>
                <button
                  className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  View Tests
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Explore More Button */}
        <div className="mt-10 text-center">
          <button
            onClick={handleExploreMore}
            className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-900 transition"
          >
            Explore More Categories <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingTopCategories;
