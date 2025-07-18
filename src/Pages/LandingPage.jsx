import React from 'react';
import Navbar from '../Components/Navbar';
import LandingPageHeroSection from '../Components/LandingPageHeroSection'
import LandingPageTopCategories from '../Components/LandingPageTopCategories';
import LandingPageWhyUs from '../Components/LandingpageWhyUs';
import LandingPageBlogSection from '../Components/LandingPageBlogSection';
import LandingPageTestimonial from '../Components/LandingpageTestimonial';
import LandingpageFooter from '../Components/LandingPageFooter';
function LandingPage() {
  return (
    <div className="bg-blue-50 min-h-screen">
      <Navbar /> 
      <LandingPageHeroSection />
      <LandingPageTopCategories />
      <LandingPageWhyUs />
      <LandingPageBlogSection />
      <LandingPageTestimonial />
      <LandingpageFooter />
    </div>
  );
}

export default LandingPage;
