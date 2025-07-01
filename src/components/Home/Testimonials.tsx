
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      location: 'New York',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=120&h=120&fit=crop&crop=face',
      quote: "Herstyle isn't just fashion—it's confidence. Every piece I've purchased has become a staple in my wardrobe.",
      rating: 5
    },
    {
      id: 2,
      name: 'Emma Rodriguez',
      location: 'Los Angeles',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=120&h=120&fit=crop&crop=face',
      quote: "The quality is exceptional and the style is timeless. I always receive compliments when wearing Herstyle pieces.",
      rating: 5
    },
    {
      id: 3,
      name: 'Jessica Chen',
      location: 'Chicago',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=120&h=120&fit=crop&crop=face',
      quote: "Finally, a brand that understands what modern women want. Elegant, comfortable, and beautifully crafted.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blush-50 to-dustyrose-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
            What Our Community Says
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of women who have discovered their unique style with Herstyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="herstyle-card p-8 text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mx-auto mb-6 object-cover shadow-lg"
              />
              
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-gold-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-gray-700 text-lg mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              <div>
                <h4 className="font-playfair font-semibold text-gray-900 text-lg">
                  {testimonial.name}
                </h4>
                <p className="text-gray-500 text-sm">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
