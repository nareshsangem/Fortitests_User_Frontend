import React from 'react';

const TopBannerRow = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-6">
      <div className="w-[300px] h-[100px] bg-gray-200 rounded shadow animate-pulse" />
      <div className="w-[300px] h-[100px] bg-gray-200 rounded shadow animate-pulse" />
    </div>
  );
};

export default TopBannerRow;
