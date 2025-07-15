// src/hooks/usePageTracker.js
import { useEffect } from 'react';
import api from '../api';

const usePageTracker = ({ userId, category_id = null, test_id = null }) => {
  useEffect(() => {
    const finalUserId = userId || localStorage.getItem('userId') || null;

    const track = async () => {
      try {
        await api.post('/analytics/track', {
          user_id: finalUserId,
          event_type: 'page_view',
          page_path: window.location.pathname,
          referrer: document.referrer || null,
          category_id,
          test_id,
          meta: {
            device: window.innerWidth < 768 ? 'mobile' : 'desktop',
            user_agent: navigator.userAgent
          }
        });
      } catch (err) {
        console.error('Failed to track page:', err);
      }
    };

    track();
  }, [window.location.pathname]);
};


export default usePageTracker;
