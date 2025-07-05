
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const slides = [
    {
      image: '/lovable-uploads/3746c77f-5de6-4d8c-9c22-389cbaf895c4.png',
      title: 'Discover Your',
      subtitle: 'Unique Style',
      description: 'Elegant Fashion for Every Woman',
      navTheme: 'dark' // for light backgrounds
    },
    {
      image: '/lovable-uploads/4e9536b6-2f2c-4b5f-b1be-26ef12b979cb.png',
      title: 'Bold & Beautiful',
      subtitle: 'Fashion Forward',
      description: 'Express Your Personality with Confidence',
      navTheme: 'light' // for dark backgrounds
    },
    {
      image: '/lovable-uploads/9d04533c-8cf0-416c-aa67-646456f785a5.png',
      title: 'Vibrant Styles',
      subtitle: 'That Speak Volumes',
      description: 'Make Every Moment Your Runway',
      navTheme: 'light'
    },
    {
      image: '/lovable-uploads/e544a89b-821a-478e-a7b3-1138b7aee478.png',
      title: 'Elegance Redefined',
      subtitle: 'Timeless Grace',
      description: 'Where Sophistication Meets Style',
      navTheme: 'dark'
    },
    {
      image: '/lovable-uploads/167d6302-ac07-4746-83c6-f7a5a7f7f0db.png',
      title: 'Dynamic Duo',
      subtitle: 'Style Together',
      description: 'Fashion That Brings People Together',
      navTheme: 'light'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Update navbar theme based on current slide
  useEffect(() => {
    const currentTheme = slides[currentSlide].navTheme;
    document.documentElement.setAttribute('data-hero-theme', currentTheme);
  }, [currentSlide, slides]);

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images - Slideshow */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${slide.image}')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>
        </div>
      ))}

      {/* Content with smooth text transitions */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className={`transition-all duration-700 ease-out transform ${
          isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
        }`}>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-playfair font-bold mb-6 leading-tight">
            <span className="block animate-fade-in">
              {currentSlideData.title}
            </span>
            <span className="block text-gradient bg-gradient-to-r from-blush-300 to-dustyrose-300 bg-clip-text mt-2">
              {currentSlideData.subtitle}
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 font-light leading-relaxed opacity-90 animate-slide-up">
            {currentSlideData.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <Link
            to="/collections"
            className="herstyle-button text-lg px-10 py-4 hover:scale-105 transform transition-all duration-300"
          >
            Shop Collections
          </Link>
          <Link
            to="/about"
            className="herstyle-button-secondary text-lg px-10 py-4 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-all duration-300"
          >
            Our Story
          </Link>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentSlide(index);
                setIsTransitioning(false);
              }, 300);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
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
