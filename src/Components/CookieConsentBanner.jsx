import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    triggerHideAnimation();
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    triggerHideAnimation();
  };

  const triggerHideAnimation = () => {
    setAnimateOut(true);
    setTimeout(() => setIsVisible(false), 400); // match animation duration
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 w-full h-30 bg-gray-900 text-white px-4 py-3 z-50 shadow-lg flex flex-col md:flex-row justify-between items-center gap-2
        transition-all duration-400 ease-in-out
        ${animateOut ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
    >
      <p className="text-sm text-center md:text-left">
        We use cookies for login, test session management, and to improve your experience. See our{' '}
        <Link to="/privacy-policy" className="underline text-blue-300">Privacy Policy</Link> and{' '}
        <Link to="/terms" className="underline text-blue-300">Terms</Link>.
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleAccept}
          className="bg-green-500 hover:bg-green-600 px-3 py-1 text-sm rounded"
        >
          Accept
        </button>
        <button
          onClick={handleDecline}
          className="bg-gray-700 hover:bg-gray-800 px-3 py-1 text-sm rounded"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
