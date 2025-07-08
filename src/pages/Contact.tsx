
import React from 'react';

import { Mail, Phone, MapPin, Instagram, Share2 } from 'lucide-react';
import ContactForm from '@/components/Contact/ContactForm';

const Contact = () => {
  return (
    <>
      <div className="py-20 px-8 md:px-16 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Left Column: Brand Message, Contact Info, Social Links */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-6">
                We’d Love to Hear From You
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Whether you have a question, feedback, or just want to say hello — our team is here to help.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-pink-600" />
                  <p className="text-gray-700">hello@herstyle.co.ke</p>
                </div>
                {/* Optional: Phone */}
                {/* <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-pink-600" />
                  <p className="text-gray-700">+1 (555) 123-4567</p>
                </div> */}
                {/* Optional: Location */}
                {/* <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-pink-600" />
                  <p className="text-gray-700">123 Fashion Ave, New York, NY</p>
                </div> */}
              </div>

              <div className="flex space-x-4">
                <a href="#" className="p-3 rounded-full border border-pink-300 text-pink-700 hover:bg-pink-50 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="p-3 rounded-full border border-pink-300 text-pink-700 hover:bg-pink-50 transition-colors">
                  <Share2 className="w-6 h-6" />
                </a>
                <a href="#" className="p-3 rounded-full border border-pink-300 text-pink-700 hover:bg-pink-50 transition-colors">
                  <Share2 className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-3 herstyle-card p-8 md:p-12 rounded-xl shadow-lg bg-white">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
