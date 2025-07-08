import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { AuthModal } from '../Auth/AuthModal';
import { CartSidebar } from '../Cart/CartSidebar';
import { createClient } from '@supabase/supabase-js';

interface User {
  id: string;
  email: string;
  // Add other user properties as needed
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isTransparent, setIsTransparent] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);

  const SCROLL_THRESHOLD = 50;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsTransparent(scrollY < SCROLL_THRESHOLD); // Adjust threshold as needed
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

    const transparencyClass = isTransparent
    const transparencyClasses = isTransparent ? 'bg-transparent' : 'bg-[#447D9B] shadow-xl';
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

          <div className="flex items-center justify-center">
            <ul className="flex space-x-4 font-inter text-lg font-medium">
              <li><Link to="/collections" className={`${getTextColorClasses()} hover:text-gray-300 transition-all duration-200`}>Collections</Link></li>
              <li><Link to="/new-in" className={`${getTextColorClasses()} hover:text-gray-300 transition-all duration-200`}>New In</Link></li>
              <li><Link to="/about" className={`${getTextColorClasses()} hover:text-gray-300 transition-all duration-200`}>About</Link></li>
              <li><Link to="/contact" className={`${getTextColorClasses()} hover:text-gray-300 transition-all duration-200`}>Contact</Link></li>
            </ul>
          </div>

          <div className="flex items-center space-x-4 pr-4">
            <Search className={`h-5 w-5 ${getTextColorClasses()} cursor-pointer`} />
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
    </>
  );
};

export default Navbar;