
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { HERO_IMAGE_URL } from '../Home/NewHeroSection';

import CookieConsent from '@/components/CookieConsent/CookieConsent';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [isTransparent, setIsTransparent] = useState(false);

  useEffect(() => {
    setIsTransparent(location.pathname === '/');
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isTransparent={isTransparent} />
      <main className={`flex-1 ${isTransparent ? '' : 'pt-16'}`}>
         {children}
       </main>


      <CookieConsent />
    </div>
  );
};

export default Layout;
