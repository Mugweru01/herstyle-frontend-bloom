
import React from 'react';
import Layout from '../components/Layout/Layout';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

import ContactForm from '@/components/Contact/ContactForm';

const Contact = () => {



  return (
    <Layout>
      <div className="pt-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-cream-50 to-blush-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <ContactForm />

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blush-100 rounded-2xl">
                    <Mail className="w-6 h-6 text-blush-600" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-semibold text-lg text-gray-900 mb-1">
                      Email Us
                    </h3>
                    <p className="text-gray-600">hello@herstyle.com</p>
                    <p className="text-gray-600">support@herstyle.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-sage-100 rounded-2xl">
                    <Phone className="w-6 h-6 text-sage-600" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-semibold text-lg text-gray-900 mb-1">
                      Call Us
                    </h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri: 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-dustyrose-100 rounded-2xl">
                    <MapPin className="w-6 h-6 text-dustyrose-600" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-semibold text-lg text-gray-900 mb-1">
                      Visit Our Showroom
                    </h3>
                    <p className="text-gray-600">123 Fashion Avenue</p>
                    <p className="text-gray-600">New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gold-100 rounded-2xl">
                    <Clock className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-semibold text-lg text-gray-900 mb-1">
                      Business Hours
                    </h3>
                    <p className="text-gray-600">Monday - Friday: 9AM - 6PM</p>
                    <p className="text-gray-600">Saturday: 10AM - 4PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>



            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
