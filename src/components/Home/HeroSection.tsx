
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1920&h=1080&fit=crop&crop=center')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-playfair font-bold mb-6 animate-fade-in">
          Discover Your
          <span className="block text-gradient bg-gradient-to-r from-blush-300 to-dustyrose-300 bg-clip-text">
            Unique Style
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl lg:text-2xl mb-8 font-light leading-relaxed animate-slide-up opacity-90">
          Elegant fashion, curated beauty, and timeless accessories for the modern woman who defines her own path.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <Link
            to="/collections"
            className="herstyle-button text-lg px-10 py-4 hover:scale-105 transform transition-all"
          >
            Shop Collections
          </Link>
          <Link
            to="/about"
            className="herstyle-button-secondary text-lg px-10 py-4 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
          >
            Our Story
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-gentle-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
