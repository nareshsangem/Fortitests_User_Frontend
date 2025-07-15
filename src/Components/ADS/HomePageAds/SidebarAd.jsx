import React from 'react';

const SidebarAd = () => {
  return (
    <div className="space-y-4">
      {/* Static Video Ad (Google Video Ad) */}
      <div className="bg-white shadow rounded overflow-hidden">
        <iframe
          className="w-full aspect-video"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Video Ad"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Banner Ads */}
      <div className="bg-gray-200 h-40 rounded shadow flex items-center justify-center">
        Banner Ad 1 (300x250)
      </div>
      <div className="bg-gray-200 h-40 rounded shadow flex items-center justify-center">
        Banner Ad 2 (300x250)
      </div>
    </div>
  );
};

export default SidebarAd;