import React from 'react';

const StickyMobileAd = () => {
  return (
    <div className="md:hidden px-4 mt-6 space-y-4">
      <div className="bg-white shadow rounded overflow-hidden">
        <iframe
          className="w-full aspect-video"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Mobile Video Ad"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="flex justify-between gap-2">
        <div className="bg-gray-200 w-1/2 h-16 rounded shadow flex items-center justify-center">
          Ad 1
        </div>
        <div className="bg-gray-200 w-1/2 h-16 rounded shadow flex items-center justify-center">
          Ad 2
        </div>
      </div>
    </div>
  );
};

export default StickyMobileAd;