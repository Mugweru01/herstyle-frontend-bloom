
import React from 'react';
import Layout from '../components/Layout/Layout';

const About = () => {
  return (
    <Layout>
      <div className="pt-20">
        {/* Hero Section */}
        <div className="relative h-96 flex items-center justify-center overflow-hidden bg-gradient-to-r from-blush-100 to-dustyrose-100">
          <div className="text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-gray-900 mb-4">
              About Herstyle
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empowering women through elegant, timeless fashion that celebrates individuality
            </p>
          </div>
        </div>

        {/* Story Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Herstyle was born from a simple belief: every woman deserves to feel confident, 
                elegant, and authentically herself. Founded by women, for women, we understand 
                that style is more than just clothing—it's a form of self-expression, empowerment, 
                and identity.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop"
                alt="Herstyle founder"
                className="rounded-2xl shadow-lg"
              />
              <div>
                <h3 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
                  Founded on Values
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We believe in slow fashion, ethical sourcing, and creating pieces that stand 
                  the test of time—both in style and quality. Each item in our collection is 
                  carefully curated or designed with the modern woman in mind, balancing elegance 
                  with comfort, sophistication with accessibility.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  From our signature silk blouses to our handcrafted accessories, every piece 
                  tells a story of craftsmanship, attention to detail, and respect for both 
                  the wearer and the makers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-gray-900 mb-6">
                What We Stand For
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center herstyle-card p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blush-500 to-dustyrose-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-4">
                  Quality Craftsmanship
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Every piece is crafted with attention to detail, using premium materials 
                  and ethical manufacturing practices that honor both artisans and the environment.
                </p>
              </div>

              <div className="text-center herstyle-card p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-sage-500 to-sage-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">🌱</span>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-4">
                  Sustainable Fashion
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We're committed to slow fashion principles, creating timeless pieces that 
                  reduce waste and promote conscious consumption in the fashion industry.
                </p>
              </div>

              <div className="text-center herstyle-card p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-gold-500 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">💫</span>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-4">
                  Women's Empowerment
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Fashion is a powerful tool for self-expression. We create pieces that help 
                  women feel confident, empowered, and authentically themselves in every situation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-gray-900 mb-8">
              Our Mission
            </h2>
            <blockquote className="text-2xl lg:text-3xl font-playfair text-gray-700 italic leading-relaxed mb-8">
              "To create a world where every woman feels empowered to express her unique style, 
              confident in her choices, and beautiful in her own skin."
            </blockquote>
            <p className="text-lg text-gray-600 leading-relaxed">
              Herstyle is more than a fashion brand—we're a community of women supporting women, 
              celebrating individuality, and redefining what it means to dress with purpose and pride.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
