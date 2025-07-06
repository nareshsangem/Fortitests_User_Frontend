import React from 'react';
import Navbar from '../Components/Navbar';
import LandingHeroCarousel from '../Components/CarouselHero';
import LandingTopCategories from '../Components/LandingTopCategories';
import LandingServicesAndPricing from '../Components/ServiceSection';
import Footer from '../Components/Footer';
function LandingPage() {
  return (
    <div className="bg-blue-50 min-h-screen">
       <Navbar /> 
      <LandingHeroCarousel />
      <LandingTopCategories />
      <LandingServicesAndPricing />
      <Footer />
    </div>
  );
}

export default LandingPage;
