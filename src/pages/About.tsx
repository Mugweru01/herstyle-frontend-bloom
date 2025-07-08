
import React from 'react';
import { Link } from 'react-router-dom';

import { Heart, Award, Users, Sparkles, Star, ArrowRight } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Passion for Fashion',
      description: 'We live and breathe fashion, bringing you the latest trends and timeless pieces that make you feel confident and beautiful.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Quality First',
      description: 'Every piece in our collection is carefully selected for its quality, craftsmanship, and ability to elevate your wardrobe.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Focus',
      description: 'We believe in building a community of empowered women who support and inspire each other through fashion.'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Personal Style',
      description: 'Fashion is personal. We celebrate individuality and help you express your unique style with confidence.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '500+', label: 'Curated Pieces' },
    { number: '50+', label: 'Fashion Brands' },
    { number: '4.9', label: 'Customer Rating', icon: <Star className="w-4 h-4 fill-current" /> }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cream-50 via-blush-50 to-dustyrose-50 pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blush-100/30 to-dustyrose-100/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-blush-600 mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Our Story & Values
            </div>
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-playfair font-bold text-gray-900 mb-6 leading-tight">
              About 
              <span className="text-gradient bg-gradient-to-r from-blush-500 to-dustyrose-500 bg-clip-text text-transparent"> HerStyle</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Empowering women through fashion, one outfit at a time. 
              Discover the passion and dedication behind our commitment to style and elegance.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-3xl lg:text-4xl font-playfair font-bold text-blush-600">
                      {stat.number}
                    </span>
                    {stat.icon && (
                      <span className="ml-1 text-gold-500">{stat.icon}</span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blush-100 to-dustyrose-100 rounded-3xl transform rotate-2 opacity-30"></div>
              <img alt="About Us image"
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Fashion boutique interior"
                className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-lg border border-cream-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blush-500 to-dustyrose-500 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Founded 2020</p>
                    <p className="text-xs text-gray-600">With Love & Passion</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl lg:text-5xl font-playfair font-bold text-gray-900 mb-6 leading-tight">
                  Our 
                  <span className="text-gradient bg-gradient-to-r from-blush-500 to-dustyrose-500 bg-clip-text text-transparent"> Journey</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blush-500 to-dustyrose-500 rounded-full mb-8"></div>
              </div>
              
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  Founded in 2020, HerStyle began as a small boutique with a big dream: 
                  to make elegant, high-quality fashion accessible to every woman. 
                  Our founder, inspired by the diverse beauty and strength of women everywhere, 
                  set out to create a brand that celebrates individuality and empowers confidence.
                </p>
                <p>
                  What started as a passion project has grown into a beloved fashion destination, 
                  serving thousands of women who trust us to help them look and feel their best. 
                  From casual everyday wear to special occasion pieces, we curate collections 
                  that speak to the modern woman's lifestyle.
                </p>
                <p>
                  Today, HerStyle continues to evolve, always staying true to our core mission: 
                  helping women express their unique style with pieces that make them feel 
                  confident, beautiful, and authentically themselves.
                </p>
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blush-400 to-blush-500 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-dustyrose-400 to-dustyrose-500 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cream-400 to-cream-500 border-2 border-white"></div>
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Trusted by thousands of women worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-cream-25 to-blush-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-blush-600 mb-6 shadow-sm">
              <Award className="w-4 h-4 mr-2" />
              What Drives Us
            </div>
            <h2 className="text-3xl lg:text-5xl font-playfair font-bold text-gray-900 mb-6">
              Our 
              <span className="text-gradient bg-gradient-to-r from-blush-500 to-dustyrose-500 bg-clip-text text-transparent"> Values</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These core principles guide everything we do and shape the experience we create for our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group relative">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-cream-100 hover:border-blush-200 h-full">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blush-100 to-dustyrose-100 text-blush-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                        {value.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-3 group-hover:text-blush-600 transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-blush-500 via-blush-600 to-dustyrose-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white/90 mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              Our Mission
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-playfair font-bold text-white mb-8 leading-tight">
```              Empowering Women Through Fashion
            </h2>
            
            <p className="text-xl lg:text-2xl text-white/95 mb-12 leading-relaxed">
              To inspire confidence and celebrate the unique beauty of every woman through 
              carefully curated fashion that combines style, quality, and accessibility. 
              We believe that when you look good, you feel good – and when you feel good, 
              you can conquer the world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/collections"
                className="group inline-flex items-center px-8 py-4 bg-white text-blush-600 font-semibold rounded-2xl hover:bg-cream-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Shop Our Collections
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="group inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-blush-600 transition-all duration-300 hover:scale-105"
              >
                Get in Touch
                <Heart className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
