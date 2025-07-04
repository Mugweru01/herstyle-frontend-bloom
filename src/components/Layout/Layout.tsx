
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsent from '@/components/CookieConsent/CookieConsent';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Layout;
