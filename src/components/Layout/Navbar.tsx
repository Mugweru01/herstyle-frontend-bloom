import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';
import SearchModal from '../SearchModal';
import { AuthModal } from '../Auth/AuthModal';
import { CartSidebar } from '../Cart/CartSidebar';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  email: string;
  // Add other user properties as needed
}



interface NavbarProps {
  isTransparent: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isTransparent }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);



  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const logoUrl = 'https://cbxzzudqfyilqhamztvo.supabase.co/storage/v1/object/public/logo/herstylelogo.png';

  const getNavbarClasses = () => {
    const baseClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out py-4`;


    const transparencyClasses = isTransparent ? 'bg-transparent' : 'bg-[#387478] shadow-xl';
    return `${baseClasses} ${transparencyClasses}`;
  };

  const getTextColorClasses = () => {
    return isTransparent ? 'text-black' : 'text-white';
  };

  return (
    <>
      <nav className={getNavbarClasses()}>
        <div className="px-4 py-2 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logoUrl} alt="HerStyle Logo" className="h-8 w-auto" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <span className={`font-playfair text-2xl font-bold ${getTextColorClasses()}`}>HerStyle</span>
          </Link>

          <div className="hidden md:flex items-center justify-center">
            <ul className="flex space-x-4 font-playfair text-xl font-semibold">
              <li><Link to="/collections" className={`${getTextColorClasses()} hover:text-gray-300 transition-all duration-200`}>Collections</Link></li>
              <li><Link to="/new-in" className={`${getTextColorClasses()} hover:text-gray-300 transition-all duration-200`}>New In</Link></li>
              <li><Link to="/about" className={`${getTextColorClasses()} hover:text-gray-300 transition-all duration-200`}>About</Link></li>
              <li><Link to="/contact" className={`${getTextColorClasses()} hover:text-gray-300 transition-all duration-200`}>Contact</Link></li>
              <li><Link to="/blog" className={`${getTextColorClasses()} hover:text-gray-300 transition-all duration-200`}>Blog</Link></li>
            </ul>
          </div>

          <div className="flex items-center space-x-4 pr-4">
            <div className="md:hidden">
              <Menu className={`h-6 w-6 ${getTextColorClasses()} cursor-pointer`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
            </div>
            <button onClick={() => setIsSearchModalOpen(true)}>
              <Search className={`h-5 w-5 ${getTextColorClasses()} cursor-pointer`} />
            </button>
            {user ? (
              <button onClick={handleLogout} className={`${getTextColorClasses()} hover:text-gray-300 transition-all duration-200`}>Logout</button>
            ) : (
              <button onClick={() => setIsAuthModalOpen(true)} className={`${getTextColorClasses()} hover:text-gray-300 transition-all duration-200`}>Login / Account</button>
            )}
            {/* Add any additional right-aligned elements here if needed */}
          </div>
        </div>
      </nav>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <CartSidebar isOpen={isCartSidebarOpen} onClose={() => setIsCartSidebarOpen(false)} />
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-[#447D9B] shadow-xl transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 md:hidden`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-white text-2xl">&times;</button>
        </div>
        <ul className="flex flex-col items-center space-y-4 font-playfair text-xl font-semibold text-white">
          <li><Link to="/collections" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gray-300 transition-all duration-200">Collections</Link></li>
          <li><Link to="/new-in" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gray-300 transition-all duration-200">New In</Link></li>
          <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gray-300 transition-all duration-200">About</Link></li>
          <li><Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gray-300 transition-all duration-200">Contact</Link></li>
          <li><Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gray-300 transition-all duration-200">Blog</Link></li>
          {user ? (
            <li><button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="hover:text-gray-300 transition-all duration-200">Logout</button></li>
          ) : (
            <li><button onClick={() => { setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }} className="hover:text-gray-300 transition-all duration-200">Login / Account</button></li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;