import React from 'react';
import HomeNavbar from '../Components/HomeNavbar';
import ScrollingRibbon from '../Components/ScrollingRibbon';
import HomeCarousel from '../Components/HomeCarousel';
import HomeTopCategories from '../Components/HomeTopCategories';
import HomeWhyFortiTests from '../Components/HomeWhyFortiTests';
import HomeFooter from '../Components/HomeFooter';



function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <HomeNavbar />
      <ScrollingRibbon/>
      <HomeCarousel/> 
      <HomeTopCategories/>
      <HomeWhyFortiTests/> 
      <HomeFooter/>
      
      {/* <HomeHero /> */}
      {/* <HomeTopCategories /> */}
      {/* <HomeTestsSection /> */}
      {/* <HomeResultsSection /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default HomePage;
