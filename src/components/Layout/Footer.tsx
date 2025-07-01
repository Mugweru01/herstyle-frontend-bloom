
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-cream-50 to-cream-100 border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-playfair font-bold text-gradient mb-4">
              Herstyle
            </h2>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Discover your unique style with our curated collection of elegant fashion, 
              beauty, and accessories designed for the modern woman.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-2xl bg-white hover:bg-blush-50 transition-colors shadow-sm" aria-label="Instagram">
                <Instagram size={20} className="text-blush-500" />
              </a>
              <a href="#" className="p-2 rounded-2xl bg-white hover:bg-blush-50 transition-colors shadow-sm" aria-label="Facebook">
                <Facebook size={20} className="text-blush-500" />
              </a>
              <a href="#" className="p-2 rounded-2xl bg-white hover:bg-blush-50 transition-colors shadow-sm" aria-label="Twitter">
                <Twitter size={20} className="text-blush-500" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-playfair font-semibold text-gray-900 text-lg mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              <li><Link to="/new-in" className="text-gray-600 hover:text-blush-500 transition-colors text-sm">New Arrivals</Link></li>
              <li><Link to="/collections" className="text-gray-600 hover:text-blush-500 transition-colors text-sm">Collections</Link></li>
              <li><Link to="/beauty" className="text-gray-600 hover:text-blush-500 transition-colors text-sm">Beauty</Link></li>
              <li><Link to="/accessories" className="text-gray-600 hover:text-blush-500 transition-colors text-sm">Accessories</Link></li>
              <li><Link to="/sale" className="text-gray-600 hover:text-blush-500 transition-colors text-sm">Sale</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-playfair font-semibold text-gray-900 text-lg mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-gray-600 hover:text-blush-500 transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-gray-600 hover:text-blush-500 transition-colors text-sm">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-gray-600 hover:text-blush-500 transition-colors text-sm">Returns</Link></li>
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
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="herstyle-input text-sm"
                required
              />
              <button
                type="submit"
                className="w-full herstyle-button text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-cream-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2024 Herstyle. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-500 hover:text-blush-500 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-blush-500 transition-colors text-sm">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-500 hover:text-blush-500 transition-colors text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
