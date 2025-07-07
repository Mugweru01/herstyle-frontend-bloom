
import React from 'react';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSupabase } from '@/hooks/useSupabase';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  subject: z.string().min(1, { message: 'Please select a subject.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

const ContactForm = () => {
  const { toast } = useToast();
  const { insertMessage } = useSupabase();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await insertMessage(values.name, values.email, values.subject, values.message);

      if (error) {
        throw error;
      }

      toast({
        title: 'Message sent successfully!',
        description: 'Thank you for contacting us. We\'ll get back to you soon.',
      });

      form.reset();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: `Failed to send message: ${error.message}. Please try again.`,
        variant: 'destructive',
      });
    }
  };


  return (
    <div className="bg-white rounded-3xl shadow-lg border border-cream-200 p-8">
      <h2 className="text-3xl font-serif text-gray-800 mb-4">Send us a message</h2>
      <p className="text-gray-600 mb-8">We're here to assist you with any inquiries.</p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="sr-only">Full Name</label>
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            className="w-full p-4 border border-gray-200 rounded-lg focus:ring-pink-500 focus:border-pink-500 shadow-sm"
            {...form.register('name')}
          />
          {form.formState.errors.name && <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="sr-only">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            className="w-full p-4 border border-gray-200 rounded-lg focus:ring-pink-500 focus:border-pink-500 shadow-sm"
            {...form.register('email')}
          />
          {form.formState.errors.email && <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="subject" className="sr-only">Subject</label>
          <select
            id="subject"
            className="w-full p-4 border border-gray-200 rounded-lg focus:ring-pink-500 focus:border-pink-500 shadow-sm appearance-none"
            {...form.register('subject')}
          >
            <option value="">Select a Subject</option>
            <option value="Order">Order</option>
            <option value="Feedback">Feedback</option>
            <option value="Styling Help">Styling Help</option>
            <option value="Other">Other</option>
          </select>
          {form.formState.errors.subject && <p className="text-red-500 text-sm mt-1">{form.formState.errors.subject.message}</p>}
        </div>

        <div>
          <label htmlFor="message" className="sr-only">Message</label>
          <textarea
            id="message"
            rows={5}
            placeholder="Your Message"
            className="w-full p-4 border border-gray-200 rounded-lg focus:ring-pink-500 focus:border-pink-500 shadow-sm resize-none"
            {...form.register('message')}
          />
          {form.formState.errors.message && <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {form.formState.isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Send Message</span>
              <Send size={18} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
