import React from 'react';
import HomeNavbar from '../Components/HomeNavbar';
import ScrollingRibbon from '../Components/ScrollingRibbon';
import HomeCarousel from '../Components/HomeCarousel';
import HomeTopCategories from '../Components/HomeTopCategories';
import HomeWhyFortiTests from '../Components/HomeWhyFortiTests';
import HomeFooter from '../Components/HomeFooter';
import SidebarAds from '../Components/ADS/SidebarAds'; // ✅ import sidebar ads

function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <HomeNavbar />
      <ScrollingRibbon />
      <HomeCarousel />
      {/* ✅ Main Content + Sidebar Layout */}
      <div className="flex flex-col lg:flex-row px-4 lg:px-8 py-6 gap-6">
        {/* Main Content */}
        <div className="flex-1">
          
          <HomeTopCategories />
          <HomeWhyFortiTests />
        </div>

        {/* Sidebar Ads - only shown on large screens */}
        <SidebarAds />
      </div>

      <HomeFooter />
    </div>
  );
}

export default HomePage;
