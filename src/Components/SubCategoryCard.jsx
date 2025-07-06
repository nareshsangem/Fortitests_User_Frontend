import React from 'react';
import { Link } from 'react-router-dom';

function SubCategoryCard ({ subcategory }) {
  return (
    <Link
      to={`/subcategories/${subcategory.id}/tests`} 
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 overflow-hidden"
    >
      <img
        src={subcategory.image_url}
        alt={subcategory.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{subcategory.name}</h3>
        <p className="mt-2 text-gray-600 text-sm line-clamp-3">{subcategory.description}</p>
      </div>
    </Link>
  );
};

export default SubCategoryCard;
