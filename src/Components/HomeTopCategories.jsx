import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
    return (<div className="flex justify-center py-10">
              <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>);
  }

  return (
    <section className="px-4 py-10 bg-gradient-to-l from-blue-100 to-sky-100">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-3xl font-bold text-blue-900">POPULAR CATEGORIES</h2>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {categories.map((cat) => (
            <Link
              to={`/exams/${cat.id}`}
              key={cat.id}
              className="relative bg-blue-50 border border-blue-100 rounded-xl shadow-lg hover:shadow-2xl scale-3d transition overflow-hidden p-4 "
            >
              <div className="flex flex-col items-center ">
                {cat.image_url && (
                  <img
                    src={cat.image_url}
                    alt={cat.name}
                    className="w-auto h-32 rounded-md mb-3"
                  />
                )}
                <h3 className="text-sm sm:text-base font-semibold text-center text-gray-800 mb-2">
                  {cat.name.toUpperCase()}
                </h3>

                {/* Explore button with glow loop animation */}
                <div className="mt-auto w-full">
                  <span className="w-full block px-3 py-1 text-sm font-medium text-white text-center bg-blue-600 rounded-[12px] shadow-md animate-textloop">
                        <span className="inline-block animate-textloop">Explore More</span>
                      </span>

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
              </div>
            </Link>
          ))}
        </div>

        {/* Explore More Button */}
        <div className="flex justify-center mt-10">
          <Link
            to="/categories"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-md animate-bounce transition"
          >
            Explore More Categories <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
