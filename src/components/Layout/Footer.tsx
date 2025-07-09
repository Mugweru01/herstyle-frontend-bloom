import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <img src="https://cbxzzudqfyilqhamztvo.supabase.co/storage/v1/object/public/logo/herstylelogo.png" alt="Herstyle Logo" className="h-8 w-auto" />
          <p className="text-gray-600 text-sm mb-4">
            Elegance, simplicity, and luxury for the modern woman.
          </p>
          <p className="text-gray-600 text-sm mb-1">Westgate Mall, Nairobi, Kenya</p>
          <p className="text-gray-600 text-sm mb-4">07 96 94 51 90</p>
          <div className="flex space-x-4">
            {/* Social Media Icons */}
            <a href="#" className="text-pink-400 hover:text-pink-600 rounded-full p-2 bg-pink-100 hover:bg-pink-200 transition-colors duration-300">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-pink-400 hover:text-pink-600 rounded-full p-2 bg-pink-100 hover:bg-pink-200 transition-colors duration-300">
              <i className="fab fa-tiktok"></i>
            </a>
            <a href="#" className="text-pink-400 hover:text-pink-600 rounded-full p-2 bg-pink-100 hover:bg-pink-200 transition-colors duration-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-pink-400 hover:text-pink-600 rounded-full p-2 bg-pink-100 hover:bg-pink-200 transition-colors duration-300">
              <i className="fab fa-pinterest"></i>
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Shop</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-300">Home</Link></li>
            <li><Link to="/new-in" className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-300">New In</Link></li>
            <li><Link to="/collections" className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-300">Collections</Link></li>
            <li><Link to="/beauty" className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-300">Beauty</Link></li>
            <li><Link to="/accessories" className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-300">Accessories</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-300">About Herstyle</Link></li>
            <li><Link to="/contact" className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-300">Contact Us</Link></li>
            <li><Link to="/contact-us" className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-300">Customer Service</Link></li>
            <li><Link to="/faq" className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-300">FAQs</Link></li>
            <li><Link to="/returns-policy" className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-300">Returns & Exchanges</Link></li>
            <li><Link to="/shipping-info" className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-300">Shipping Info</Link></li>
            <li><Link to="/size-guide" className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-300">Size Guide</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Stay Connected</h3>
          <p className="text-gray-600 text-sm mb-4">
            Subscribe to get special offers, free giveaways, and style inspiration.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
            />
            <button className="bg-gradient-to-r from-pink-300 to-pink-500 text-white px-5 py-3 rounded-r-lg text-sm font-medium hover:from-pink-400 hover:to-pink-600 transition-all duration-300 shadow-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Legal Links */}
      <div className="border-t border-gray-200 mt-10 pt-6 text-center">
        <p className="text-gray-500 text-xs">
          <Link to="/privacy-policy" className="hover:underline mx-2">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:underline mx-2">Terms & Conditions</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;