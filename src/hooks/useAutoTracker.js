// src/hooks/useAutoTracker.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';

const useAutoTracker = (userId = null) => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    // ⛔ Exclude specific routes from tracking to avoid duplication
    const excludedPaths = ['/home', '/test/instructions'];
    const isExcluded = excludedPaths.some(
      (base) => currentPath === base || currentPath.startsWith(base + '/')
    );

    if (isExcluded) return;

    const trackPageView = async () => {
      try {
        await api.post('/analytics/track', {
          user_id: userId || localStorage.getItem('userId') || null,
          event_type: 'page_view',
          page_path: currentPath,
          referrer: document.referrer || null,
          meta: {
            device: window.innerWidth < 768 ? 'mobile' : 'desktop',
            user_agent: navigator.userAgent
          }
        });
      } catch (error) {
        console.error('🔴 AutoTracker failed:', error.message);
      }
    };

    trackPageView();
  }, [location.pathname]);
};

export default useAutoTracker;
