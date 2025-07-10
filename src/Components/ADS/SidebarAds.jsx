import React from 'react';

const SidebarAds = () => {
  return (
    <div className="hidden lg:flex flex-col gap-4 w-64 sticky top-24">
      <div className="w-full h-40 bg-gray-200 rounded shadow animate-pulse" />
      <div className="w-full h-40 bg-gray-200 rounded shadow animate-pulse" />
      <div className="w-full h-40 bg-gray-200 rounded shadow animate-pulse" />
    </div>
  );
};

export default SidebarAds;
