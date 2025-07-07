import React from 'react';

const HerstyleEnhancementSection: React.FC = () => {
  return (
    <section className="py-8 bg-cream-50 text-gray-800">
      <div className="container mx-auto px-4">
        {/* Inspirational Quote Block */}
        <div className="text-center mb-8">
          <p className="font-serif italic text-2xl lg:text-3xl text-blush-700 mb-4 animate-fade-in animate-delay-100">
            "Style is a way to say who you are without having to speak."
          </p>
          <div className="w-24 h-1 bg-blush-300 mx-auto rounded-full animate-fade-in animate-delay-200"></div>
        </div>

        {/* "Shop by Mood" Cards */}
        <div className="mb-8">
          <h2 className="text-center font-playfair text-4xl font-extrabold text-dustyrose-900 mb-6 animate-fade-in animate-delay-300">Shop by Mood</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Romantic Mood */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform transition-transform duration-300 hover:scale-105 animate-fade-in animate-delay-400">
              <h3 className="font-semibold text-xl text-blush-600 mb-4">Romantic Mood</h3>
              <p className="text-gray-700 mb-6">Embrace soft pastels and flowing silhouettes for an ethereal charm.</p>
              <button className="bg-blush-500 text-white px-6 py-3 rounded-full hover:bg-blush-600 transition-colors duration-300">Explore</button>
            </div>
            {/* Card 2: City Chic */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform transition-transform duration-300 hover:scale-105 animate-fade-in animate-delay-500">
              <h3 className="font-semibold text-xl text-lavender-600 mb-4">City Chic</h3>
              <p className="text-gray-700 mb-6">Structured styles and bold statements for the urban sophisticate.</p>
              <button className="bg-lavender-500 text-white px-6 py-3 rounded-full hover:bg-lavender-600 transition-colors duration-300">Explore</button>
            </div>
            {/* Card 3: Soft Girl Era */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform transition-transform duration-300 hover:scale-105 animate-fade-in animate-delay-600">
              <h3 className="font-semibold text-xl text-rose-600 mb-4">Soft Girl Era</h3>
              <p className="text-gray-700 mb-6">Delicate fabrics, gentle hues, and comfortable elegance.</p>
              <button className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition-colors duration-300">Explore</button>
            </div>
          </div>
        </div>

        {/* Herstyle Manifesto or Brand Statement */}
        <div className="text-center mb-8 animate-fade-in animate-delay-700">
          <h2 className="font-playfair text-3xl lg:text-4xl font-extrabold text-dustyrose-900 mb-6">Our Philosophy</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Herstyle is more than fashion — it's confidence stitched in silk, and identity worn out loud.
            We believe every woman deserves to feel beautiful, empowered, and authentically herself.
          </p>
        </div>

        {/* Call to Action: Join the Herstyle Club */}
        <div className="bg-gradient-to-r from-blush-100 to-lavender-100 rounded-xl shadow-xl p-10 text-center max-w-2xl mx-auto animate-fade-in animate-delay-800">
          <h2 className="font-playfair text-3xl font-extrabold text-dustyrose-900 mb-4">Join the Herstyle Club</h2>
          <p className="text-gray-700 mb-6">Subscribe to our newsletter for exclusive offers, new arrivals, and style inspiration.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full sm:w-auto flex-grow px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blush-300 transition-all duration-300"
            />
            <button className="bg-blush-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blush-700 transition-colors duration-300 shadow-md">
              Subscribe Now
            </button>
          </div>
          <div className="mt-6 text-gray-600 text-sm">
            Follow us on social media:
            <div className="flex justify-center space-x-4 mt-2">
              <a href="#" className="text-gray-600 hover:text-blush-500 transition-colors duration-300"><i className="fab fa-instagram text-2xl"></i></a>
              <a href="#" className="text-gray-600 hover:text-blush-500 transition-colors duration-300"><i className="fab fa-facebook-f text-2xl"></i></a>
              <a href="#" className="text-gray-600 hover:text-blush-500 transition-colors duration-300"><i className="fab fa-pinterest-p text-2xl"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HerstyleEnhancementSection;