import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { UserMenu } from './UserMenu';
import { CartSidebar } from '@/components/Cart/CartSidebar';
import { useCart } from '@/hooks/useCart';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [heroTheme, setHeroTheme] = useState('dark');
  const location = useLocation();
  const { getTotalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Listen for hero theme changes
    const handleThemeChange = () => {
      const theme = document.documentElement.getAttribute('data-hero-theme') || 'dark';
      setHeroTheme(theme);
    };

    // Initial theme check
    handleThemeChange();

    // Set up observers
    window.addEventListener('scroll', handleScroll);
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-hero-theme'] 
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const navigationItems = [
    { name: 'New In', href: '/new-in' },
    { name: 'Collections', href: '/collections' },
    { name: 'Beauty', href: '/beauty' },
    { name: 'Accessories', href: '/accessories' },
    { name: 'Blog', href: '/blog' },
  ];

  const isActiveLink = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const totalItems = getTotalItems();
  const isHomePage = location.pathname === '/';

  // Dynamic navbar background styles
  const getNavbarStyles = () => {
    if (isScrolled || !isHomePage) {
      return 'bg-white/95 backdrop-blur-md shadow-sm';
    }
    // Keep transparent on hero
    return 'bg-transparent';
  };

  // Dynamic text styles based on hero theme and scroll state
  const getTextStyles = () => {
    if (isScrolled || !isHomePage) {
      return 'text-gray-700';
    }
    // Change text color based on hero theme for visibility
    return heroTheme === 'light' ? 'text-gray-900' : 'text-white';
  };

  // Dynamic logo styles
  const getLogoStyles = () => {
    if (isScrolled || !isHomePage) {
      return 'text-gradient'; // Use gradient when scrolled or not on home
    }
    // Change logo color based on hero theme
    return heroTheme === 'light' ? 'text-gray-900' : 'text-white';
  };

  // Dynamic icon hover styles
  const getIconStyles = () => {
    const baseStyles = "p-2 rounded-2xl transition-all duration-300";
    if (isScrolled || !isHomePage) {
      return `${baseStyles} hover:bg-cream-100`;
    }
    // Transparent hover effect on hero
    return `${baseStyles} hover:bg-white/20 hover:backdrop-blur-sm`;
  };

  // Dynamic active link styles
  const getActiveLinkColor = () => {
    if (isScrolled || !isHomePage) {
      return 'text-blush-500';
    }
    return heroTheme === 'light' ? 'text-blush-600' : 'text-blush-300';
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getNavbarStyles()}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden ${getIconStyles()} ${getTextStyles()}`}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center space-x-3">
              <img 
                src="https://cbxzzudqfyilqhamztvo.supabase.co/storage/v1/object/public/logo/herstylelogo.png" 
                alt="Herstyle Logo" 
                className="h-8 lg:h-10 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h1 className={`text-2xl lg:text-3xl font-playfair font-bold transition-colors duration-300 ${getLogoStyles()}`}>
                Herstyle
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-inter text-sm font-medium transition-all duration-300 ${
                    isActiveLink(item.href) 
                      ? getActiveLinkColor()
                      : `${getTextStyles()} hover:text-blush-400`
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <button
                className={`${getIconStyles()} ${getTextStyles()}`}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link
                to="/wishlist"
                className={`${getIconStyles()} ${getTextStyles()}`}
                aria-label="Wishlist"
              >
                <Heart size={20} />
              </Link>
              <button
                className={`${getIconStyles()} ${getTextStyles()} relative`}
                aria-label="Shopping bag"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blush-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <div className="hidden lg:flex">
                <UserMenu />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-cream-200">
            <div className="px-4 py-4 space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block font-inter text-base font-medium transition-colors hover:text-blush-500 ${
                    isActiveLink(item.href) ? 'text-blush-500' : 'text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-cream-200">
                <UserMenu />
              </div>
            </div>
          </div>
        )}
      </nav>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
