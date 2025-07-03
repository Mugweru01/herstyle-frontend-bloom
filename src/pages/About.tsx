
import React from 'react';
import Layout from '../components/Layout/Layout';
import { Heart, Award, Users, Sparkles } from 'lucide-react';

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

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blush-50 to-dustyrose-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-gray-900 mb-6">
              About HerStyle
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Empowering women through fashion, one outfit at a time. 
              Discover the story behind our passion for style and elegance.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
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
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Fashion boutique"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-b from-cream-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and shape the experience we create for our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blush-100 text-blush-600 rounded-full mb-4 group-hover:bg-blush-500 group-hover:text-white transition-colors duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-r from-blush-500 to-dustyrose-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-white mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              To inspire confidence and celebrate the unique beauty of every woman through 
              carefully curated fashion that combines style, quality, and accessibility. 
              We believe that when you look good, you feel good – and when you feel good, 
              you can conquer the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/collections"
                className="bg-white text-blush-600 font-semibold px-8 py-4 rounded-2xl hover:bg-cream-50 transition-colors"
              >
                Shop Our Collections
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white hover:text-blush-600 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
