
import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consentGiven = localStorage.getItem('cookie-consent');
    if (!consentGiven) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto lg:max-w-lg lg:left-auto lg:right-4 lg:mx-0">
      <div className="bg-white rounded-3xl shadow-2xl border border-cream-200 p-6 animate-slide-in-right">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blush-50 rounded-2xl flex-shrink-0">
            <Cookie size={20} className="text-blush-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-playfair font-semibold text-gray-900 mb-2">
              We use cookies
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              This site uses cookies to enhance your experience. By continuing to browse, 
              you agree to our use of cookies.{' '}
              <Link to="/cookie-policy" className="text-blush-500 hover:text-blush-600 underline">
                Learn more
              </Link>
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleAccept}
                className="flex-1 bg-gradient-to-r from-blush-500 to-blush-600 text-white py-2 px-4 rounded-xl hover:from-blush-600 hover:to-blush-700 transition-all duration-200 text-sm font-medium"
              >
                Accept
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Decline
              </button>
            </div>
          </div>
          <button
            onClick={handleDecline}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
