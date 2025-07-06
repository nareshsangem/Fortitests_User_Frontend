import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoriesPage from '../Pages/CategoriesPage';

 function CategoryCard({ category }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/categories/${category.id}`)}
      className="bg-white rounded-lg shadow hover:shadow-xl cursor-pointer transition p-4 text-center border-2"
      style={{ borderColor: category.color || '#2874F0' }}
    >
      <img
        src={category.imageUrl}
        alt={category.name}
        className="w-full h-32 object-cover rounded mb-3"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/150?text=No+Image';
        }}
      />
      <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
    </div>
  );
}

export default CategoryCard;