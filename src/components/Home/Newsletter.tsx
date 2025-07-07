
import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('newsletter_subscriptions').insert([{ email }]);

      if (error) {
        throw error;
      }

      toast({
        title: 'Subscribed successfully!',
        description: 'Thank you for subscribing to our newsletter.',
      });

      setEmail('');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: `Failed to subscribe: ${error.message}. Please try again.`, 
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-sage-500 to-sage-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <Mail size={48} className="mx-auto mb-6 text-sage-200" />
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-4">
            Stay In Style
          </h2>
          <p className="text-xl text-sage-100 leading-relaxed">
            Be the first to know about new arrivals, exclusive offers, and style inspiration. 
            Join our community of empowered women.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-4 mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-sage-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-sage-600 rounded-2xl font-medium hover:bg-sage-50 transition-colors transform hover:scale-105 active:scale-95"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-sage-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                'Subscribe'
              )}
            </button>
          </div>
          
          <p className="text-sm text-sage-200">
            By subscribing, you agree to receive marketing emails from Herstyle. 
            You can unsubscribe at any time.
          </p>
        </form>


      </div>
    </section>
  );
};

export default Newsletter;
