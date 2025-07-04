
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, Facebook, Linkedin, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-cream-50 to-blush-50 border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="https://cbxzzudqfyilqhamztvo.supabase.co/storage/v1/object/public/logo/herstylelogo.png" 
                alt="Herstyle Logo" 
                className="h-8 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h2 className="text-2xl font-playfair font-bold text-gradient">
                Herstyle
              </h2>
            </div>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Discover your unique style with our curated collection of elegant fashion, 
              beauty, and accessories designed for the modern woman.
            </p>
            
            {/* Location */}
            <div className="flex items-start space-x-2 mb-4">
              <MapPin size={16} className="text-blush-500 mt-1 flex-shrink-0" />
              <div className="text-sm text-gray-600">
                <p className="font-medium">Westgate Mall</p>
                <p>Nairobi, Kenya</p>
              </div>
            </div>
            
            {/* Contact */}
            <div className="flex items-center space-x-2 mb-6">
              <Phone size={16} className="text-blush-500" />
              <span className="text-sm text-gray-600">+254 700 123 456</span>
            </div>

            {/* Social Media */}
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="p-2 rounded-full bg-white hover:bg-blush-50 transition-colors shadow-sm border border-cream-200" 
                aria-label="Instagram"
              >
                <Instagram size={18} className="text-blush-500" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-full bg-white hover:bg-blush-50 transition-colors shadow-sm border border-cream-200" 
                aria-label="Facebook"
              >
                <Facebook size={18} className="text-blush-500" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-full bg-white hover:bg-blush-50 transition-colors shadow-sm border border-cream-200" 
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="text-blush-500" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-playfair font-semibold text-gray-900 text-lg mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-blush-500 transition-colors text-sm">Home</Link></li>
              <li><Link to="/new-in" className="text-gray-600 hover:text-blush-500 transition-colors text-sm">New Arrivals</Link></li>
              <li><Link to="/collections" className="text-gray-600 hover:text-blush-500 transition-colors text-sm">Collections</Link></li>
              <li><Link to="/beauty" className="text-gray-600 hover:text-blush-500 transition-colors text-sm">Beauty</Link></li>
              <li><Link to="/accessories" className="text-gray-600 hover:text-blush-500 transition-colors text-sm">Accessories</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-playfair font-semibold text-gray-900 text-lg mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li><Link to="/contact-us" className="text-gray-600 hover:text-blush-500 transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="/shipping-info" className="text-gray-600 hover:text-blush-500 transition-colors text-sm">Shipping Info</Link></li>
              <li><Link to="/returns-policy" className="text-gray-600 hover:text-blush-500 transition-colors text-sm">Returns</Link></li>
              <li><Link to="/size-guide" className="text-gray-600 hover:text-blush-500 transition-colors text-sm">Size Guide</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-blush-500 transition-colors text-sm">FAQ</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-playfair font-semibold text-gray-900 text-lg mb-4">
              Stay Connected
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to get special offers, free giveaways, and style inspiration.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-2xl border border-cream-300 focus:border-blush-500 focus:ring-2 focus:ring-blush-100 outline-none transition-colors text-sm bg-white"
                  required
                />
                <Mail size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blush-500 to-blush-600 text-white py-3 px-4 rounded-2xl hover:from-blush-600 hover:to-blush-700 transition-all duration-200 text-sm font-medium shadow-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-cream-200">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className="text-gray-500 text-sm">
              © 2024 Herstyle. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link to="/privacy-policy" className="text-gray-500 hover:text-blush-500 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-500 hover:text-blush-500 transition-colors text-sm">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-gray-500 hover:text-blush-500 transition-colors text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
