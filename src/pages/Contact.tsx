
import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const faqs = [
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for unworn items in original condition with tags attached.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to over 50 countries worldwide. International shipping rates apply.'
    },
    {
      question: 'How do I care for my Herstyle pieces?',
      answer: 'Each item comes with specific care instructions. Generally, we recommend gentle washing and air drying.'
    },
    {
      question: 'Can I track my order?',
      answer: 'Yes, you\'ll receive a tracking number via email once your order ships.'
    }
  ];

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
            <div>
              <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-8">
                Get in Touch
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="herstyle-input"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="herstyle-input"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="herstyle-input"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Support</option>
                    <option value="returns">Returns & Exchanges</option>
                    <option value="product">Product Information</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="press">Press & Media</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="herstyle-input resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full herstyle-button text-lg py-4"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? 'Message Sent!' : 'Send Message'}
                </button>

                {isSubmitted && (
                  <div className="p-4 bg-sage-50 border border-sage-200 rounded-2xl animate-fade-in">
                    <p className="text-sage-700 font-medium text-center">
                      Thank you for your message! We'll get back to you within 24 hours.
                    </p>
                  </div>
                )}
              </form>
            </div>

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

              {/* FAQ Section */}
              <div>
                <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="herstyle-card p-6">
                      <h4 className="font-playfair font-semibold text-gray-900 mb-2">
                        {faq.question}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
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
