
import React from 'react';
import { useLocation } from 'react-router-dom';

import { HERO_IMAGE_URL } from '../Home/NewHeroSection';
import Footer from './Footer';
import CookieConsent from '@/components/CookieConsent/CookieConsent';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isHomePage = location.pathname === '/';
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Layout;
