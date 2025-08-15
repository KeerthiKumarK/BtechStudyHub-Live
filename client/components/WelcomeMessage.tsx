import React, { useState, useEffect } from 'react';
import { User, CheckCircle } from 'lucide-react';
import { useFirebase } from '@/contexts/FirebaseContext';

interface WelcomeMessageProps {
  onClose?: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onClose }) => {
  const { user } = useFirebase();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (user) {
      // Check if this is a fresh login (not a page refresh)
      const hasShownWelcome = sessionStorage.getItem('welcomeShown');
      
      if (!hasShownWelcome) {
        setShouldRender(true);
        setIsVisible(true);
        sessionStorage.setItem('welcomeShown', 'true');

        // Hide after 5 seconds
        const timer = setTimeout(() => {
          setIsVisible(false);
          // Remove from DOM after animation
          setTimeout(() => {
            setShouldRender(false);
            onClose?.();
          }, 300);
        }, 5000);

        return () => clearTimeout(timer);
      }
    } else {
      // Clear the welcome flag when user logs out
      sessionStorage.removeItem('welcomeShown');
      setShouldRender(false);
      setIsVisible(false);
    }
  }, [user, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShouldRender(false);
      onClose?.();
    }, 300);
  };

  if (!shouldRender || !user) return null;

  const displayName = user.displayName || user.email?.split('@')[0] || 'Student';

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ease-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
    }`}>
      <div className="bg-white border border-green-200 rounded-lg shadow-xl p-4 max-w-sm">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-500" />
              <p className="text-sm font-medium text-gray-900 truncate">
                Welcome back, {displayName}!
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Successfully logged into BTech Study Hub
            </p>
          </div>
          
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close welcome message"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="mt-3 bg-gray-200 rounded-full h-1 overflow-hidden">
          <div 
            className="h-full bg-green-500 rounded-full transition-all duration-5000 ease-linear"
            style={{
              width: isVisible ? '0%' : '100%',
              transition: isVisible ? 'width 5s linear' : 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
