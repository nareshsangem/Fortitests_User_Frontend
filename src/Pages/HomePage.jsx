import React from 'react';
import HomeNavbar from '../Components/HomeNavbar';
import ScrollingRibbon from '../Components/ScrollingRibbon';
import HomeCarousel from '../Components/HomeCarousel';
import HomeTopCategories from '../Components/HomeTopCategories';
import HomeWhyFortiTests from '../Components/HomeWhyFortiTests';
import HomeFooter from '../Components/HomeFooter';
import usePageTracker from '../hooks/usePageTracker';
import { useUser} from '../context/UserContext';
function HomePage() {
  const { user } = useUser(); // get logged-in user
  usePageTracker({ userId: user?.id });
  return (
    <div className="bg-gray-50 min-h-screen">
      <HomeNavbar />
      <ScrollingRibbon />
      <HomeCarousel />
      <HomeTopCategories />
      <HomeWhyFortiTests />

      <HomeFooter />
    </div>
  );
}

export default HomePage;
