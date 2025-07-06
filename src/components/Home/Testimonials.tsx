
import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Testimonial {
  id: string;
  customer_name: string;
  customer_location: string;
  customer_image_url: string;
  testimonial_text: string;
  rating: number;
  is_featured: boolean;
  created_at: string;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [featuredTestimonials, setFeaturedTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setTestimonials(data);
        // Separate featured testimonials for the carousel
        const featured = data.filter(t => t.is_featured);
        setFeaturedTestimonials(featured.length > 0 ? featured : data.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length);
  };

  // Auto-advance carousel
  useEffect(() => {
    if (featuredTestimonials.length > 1) {
      const interval = setInterval(nextTestimonial, 5000);
      return () => clearInterval(interval);
    }
  }, [featuredTestimonials.length]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-gold-400 fill-gold-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cream-25 via-blush-25 to-dustyrose-25">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-lg w-64 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cream-25 via-blush-25 to-dustyrose-25 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blush-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-dustyrose-100 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-cream-200 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-blush-600 mb-6 shadow-sm">
            <Quote className="w-4 h-4 mr-2" />
            Customer Love
          </div>
          <h2 className="text-4xl lg:text-6xl font-playfair font-bold text-gray-900 mb-6 leading-tight">
            What Our
            <span className="text-gradient bg-gradient-to-r from-blush-500 to-dustyrose-500 bg-clip-text text-transparent"> Community</span>
            <br />Says
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of women who have discovered their unique style and confidence with Herstyle.
          </p>
        </div>

        {/* Featured Testimonials Carousel */}
        {featuredTestimonials.length > 0 && (
          <div className="mb-20">
            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden rounded-3xl bg-white/90 backdrop-blur-sm shadow-2xl border border-cream-100">
                <div 
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {featuredTestimonials.map((testimonial, index) => (
                    <div key={testimonial.id} className="w-full flex-shrink-0 p-12 text-center">
                      <div className="max-w-3xl mx-auto">
                        <Quote className="w-12 h-12 text-blush-400 mx-auto mb-6 opacity-60" />
                        
                        <blockquote className="text-2xl lg:text-3xl font-playfair text-gray-800 leading-relaxed mb-8 italic">
                          "{testimonial.testimonial_text}"
                        </blockquote>

                        <div className="flex justify-center mb-6">
                          {renderStars(testimonial.rating)}
                        </div>

                        <div className="flex items-center justify-center space-x-4">
                          <div className="relative">
                            <img
                              src={testimonial.customer_image_url}
                              alt={testimonial.customer_name}
                              className="w-16 h-16 rounded-full object-cover shadow-lg ring-4 ring-white"
                              onError={(e) => {
                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.customer_name)}&background=f8fafc&color=374151`;
                              }}
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blush-500 rounded-full flex items-center justify-center">
                              <Star className="w-3 h-3 text-white fill-white" />
                            </div>
                          </div>
                          <div className="text-left">
                            <h4 className="font-playfair font-semibold text-gray-900 text-lg">
                              {testimonial.customer_name}
                            </h4>
                            <p className="text-gray-500 text-sm">
                              {testimonial.customer_location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation buttons */}
              {featuredTestimonials.length > 1 && (
                <>
                  <button
                    onClick={prevTestimonial}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-cream-100 flex items-center justify-center text-gray-600 hover:text-blush-600 hover:bg-white transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-cream-100 flex items-center justify-center text-gray-600 hover:text-blush-600 hover:bg-white transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Dots indicator */}
              {featuredTestimonials.length > 1 && (
                <div className="flex justify-center mt-8 space-x-3">
                  {featuredTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-blush-500 w-8'
                          : 'bg-gray-300 hover:bg-blush-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* All Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-cream-100 hover:border-blush-200 transform hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Floating quote icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-gradient-to-r from-blush-500 to-dustyrose-500 rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="pt-4">
                <div className="flex justify-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                <blockquote className="text-gray-700 text-base leading-relaxed mb-6 italic">
                  "{testimonial.testimonial_text}"
                </blockquote>

                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.customer_image_url}
                    alt={testimonial.customer_name}
                    className="w-12 h-12 rounded-full object-cover shadow-md ring-2 ring-cream-100 group-hover:ring-blush-200 transition-all duration-300"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.customer_name)}&background=f8fafc&color=374151`;
                    }}
                  />
                  <div>
                    <h4 className="font-playfair font-semibold text-gray-900">
                      {testimonial.customer_name}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {testimonial.customer_location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blush-50/0 to-dustyrose-50/0 group-hover:from-blush-50/30 group-hover:to-dustyrose-50/30 rounded-2xl transition-all duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 px-8 py-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-cream-100">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 4).map((testimonial, index) => (
                <img
                  key={testimonial.id}
                  src={testimonial.customer_image_url}
                  alt={testimonial.customer_name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.customer_name)}&background=f8fafc&color=374151`;
                  }}
                />
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900">
                {testimonials.length}+ Happy Customers
              </p>
              <p className="text-xs text-gray-600">
                Join our community of style enthusiasts
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
