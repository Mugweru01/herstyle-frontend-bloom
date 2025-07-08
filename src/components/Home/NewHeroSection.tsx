import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const HERO_IMAGE_URL = 'https://cbxzzudqfyilqhamztvo.storage.supabase.co/v1/object/public/hero-images//cover%20photo.jpeg';

const NewHeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${HERO_IMAGE_URL})`,
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/40"></div>

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col lg:flex-row items-start justify-center">
        {/* Content */}
        <div className="w-full lg:w-full text-center lg:text-left text-white p-8">
          {/* Optional Tag */}
          <span className="inline-block bg-pink-100 text-pink-700 text-xs px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            New Drop
          </span>

          {/* Headline */}
          <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4">
            Elegance Redefined
            <br />
            Timeless Grace
          </h1>

          {/* Subheadline */}
          <p className="font-inter text-lg sm:text-xl lg:text-2xl font-light tracking-wide mb-8 opacity-90">
            Where Sophistication Meets Style
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/collections"
              className="bg-white text-orange-800 font-semibold px-6 py-3 rounded-full shadow hover:scale-105 transition-all duration-300"
            >
              Shop Collections
            </Link>
            <Link
              to="/about"
              className="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-orange-800 transition-all duration-300"
            >
              Our Story →
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-gentle-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;