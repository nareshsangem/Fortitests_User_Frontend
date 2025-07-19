import React from 'react';
import Navbar from '../Components/Navbar';
import LandingPageHeroSection from '../Components/LandingPageHeroSection'
import LandingPageTopCategories from '../Components/LandingPageTopCategories';
import LandingPageWhyUs from '../Components/LandingpageWhyUs';
import LandingPageBlogSection from '../Components/LandingPageBlogSection';
import LandingPageTestimonial from '../Components/LandingpageTestimonial';
import LandingpageFooter from '../Components/LandingPageFooter';
import { useUser } from '../context/UserContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const { user, loading } = useUser(); // ✅ loading from context
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/home');
    }
  }, [user, loading, navigate]);

  // ✅ Prevent premature rendering during auth check
  if (loading) return null;
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
