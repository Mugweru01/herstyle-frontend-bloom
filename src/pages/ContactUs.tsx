
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactUs = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-blush-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We'd love to hear from you. Visit us at our store or send us a message!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl shadow-lg border border-cream-200 p-8">
                <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-6">
                  Visit Our Store
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blush-50 rounded-2xl flex-shrink-0">
                      <MapPin size={20} className="text-blush-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                      <p className="text-gray-600">
                        Westgate Mall<br />
                        Nairobi, Kenya
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blush-50 rounded-2xl flex-shrink-0">
                      <Phone size={20} className="text-blush-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                      <p className="text-gray-600">+254 700 123 456</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blush-50 rounded-2xl flex-shrink-0">
                      <Mail size={20} className="text-blush-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">hello@herstyle.co.ke</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blush-50 rounded-2xl flex-shrink-0">
                      <Clock size={20} className="text-blush-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                      <div className="text-gray-600 text-sm">
                        <p>Monday - Saturday: 10:00 AM - 8:00 PM</p>
                        <p>Sunday: 11:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-white rounded-3xl shadow-lg border border-cream-200 p-8">
                <div className="aspect-video bg-gradient-to-br from-cream-100 to-blush-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={48} className="text-blush-500 mx-auto mb-4" />
                    <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-2">
                      Find Us at Westgate Mall
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Interactive map coming soon
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
