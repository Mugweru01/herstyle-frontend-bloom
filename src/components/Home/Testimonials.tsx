
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
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
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
        className={`w-3 h-3 ${
          i < rating ? 'text-blush-400 fill-blush-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blush-50 rounded-full text-sm font-medium text-blush-600 mb-6 shadow-sm">
            <Quote className="w-4 h-4 mr-2" />
            Customer Love
          </div>
          <h2 className="text-4xl lg:text-6xl font-sans font-bold text-gray-900 mb-6 leading-tight">
            What Our
            <span className="text-gradient bg-gradient-to-r from-blush-500 to-dustyrose-500 bg-clip-text text-transparent"> Community</span>
            <br />Says
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of women who have discovered their unique style and confidence with Herstyle.
          </p>
        </div>


                    {/* Testimonials Grid/Carousel */}
          {testimonials.length > 0 && (
            <div className="mt-12">
              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.slice(0, showAllTestimonials ? testimonials.length : 3).map((testimonial) => (
                  <div key={testimonial.id} className="bg-white rounded-xl shadow-md p-8 border border-gray-100 flex flex-col items-center text-center">
                    <Quote className="w-8 h-8 text-blush-400 mb-4 opacity-60" />
                    <blockquote className="text-lg text-gray-700 leading-relaxed mb-4">
                      "{testimonial.testimonial_text}"
                    </blockquote>
                    <div className="flex justify-center mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    <div className="flex items-center justify-center space-x-3 mt-auto">
                      <img
                        src={testimonial.customer_image_url}
                        alt={testimonial.customer_name}
                        className="w-12 h-12 rounded-full object-cover shadow-sm"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.customer_name)}&background=f8fafc&color=374151`;
                        }}
                      />
                      <div className="text-left">
                        <h4 className="font-sans font-semibold text-gray-800 text-base">
                          {testimonial.customer_name}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {testimonial.customer_location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Carousel */}
              <div className="md:hidden overflow-x-auto hide-scrollbar pb-4">
                <div className="flex space-x-6 px-4 sm:px-6 lg:px-8">
                  {testimonials.slice(0, showAllTestimonials ? testimonials.length : 3).map((testimonial) => (
                    <div key={testimonial.id} className="flex-shrink-0 w-80 bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col items-center text-center">
                      <Quote className="w-8 h-8 text-blush-400 mb-4 opacity-60" />
                      <blockquote className="text-base text-gray-700 leading-relaxed mb-3">
                        "{testimonial.testimonial_text}"
                      </blockquote>
                      <div className="flex justify-center mb-3">
                        {renderStars(testimonial.rating)}
                      </div>
                      <div className="flex items-center justify-center space-x-3 mt-auto">
                        <img
                          src={testimonial.customer_image_url}
                          alt={testimonial.customer_name}
                          className="w-10 h-10 rounded-full object-cover shadow-sm"
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.customer_name)}&background=f8fafc&color=374151`;
                          }}
                        />
                        <div className="text-left">
                          <h4 className="font-sans font-semibold text-gray-800 text-sm">
                            {testimonial.customer_name}
                          </h4>
                          <p className="text-gray-600 text-xs">
                            {testimonial.customer_location}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {testimonials.length > 3 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllTestimonials(!showAllTestimonials)}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blush-500 hover:bg-blush-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blush-500 transition-colors duration-300"
              >
                {showAllTestimonials ? 'Show Less' : 'View More'}
              </button>
            </div>
          )}
        </div>
      </section>
  );
};

export default Testimonials;
