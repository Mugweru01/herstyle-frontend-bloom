
-- Create a table for customer testimonials
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_location TEXT,
  customer_image_url TEXT,
  testimonial_text TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read active testimonials
CREATE POLICY "Anyone can view active testimonials" 
  ON public.testimonials 
  FOR SELECT 
  USING (is_active = true);

-- Allow admins to manage testimonials
CREATE POLICY "Admins can manage testimonials" 
  ON public.testimonials 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.is_admin = true
  ));

-- Insert some sample testimonials
INSERT INTO public.testimonials (customer_name, customer_location, customer_image_url, testimonial_text, rating, is_featured, is_active) VALUES
('Sarah Mitchell', 'New York', 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=120&h=120&fit=crop&crop=face', 'Herstyle isn''t just fashion—it''s confidence. Every piece I''ve purchased has become a staple in my wardrobe.', 5, true, true),
('Emma Rodriguez', 'Los Angeles', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=120&h=120&fit=crop&crop=face', 'The quality is exceptional and the style is timeless. I always receive compliments when wearing Herstyle pieces.', 5, true, true),
('Jessica Chen', 'Chicago', 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=120&h=120&fit=crop&crop=face', 'Finally, a brand that understands what modern women want. Elegant, comfortable, and beautifully crafted.', 5, true, true),
('Priya Patel', 'Miami', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face', 'I love how versatile the pieces are. From office to evening, Herstyle has me covered with style and sophistication.', 5, false, true),
('Maria Santos', 'Dallas', 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=120&h=120&fit=crop&crop=face', 'The attention to detail is incredible. Each piece feels like it was made just for me. Absolutely obsessed!', 5, false, true),
('Rachel Kim', 'Seattle', 'https://images.unsplash.com/photo-1618835962148-cf177563c6c0?w=120&h=120&fit=crop&crop=face', 'Shopping with Herstyle has transformed my wardrobe. I feel more confident and put-together than ever before.', 5, false, true);

-- Create an updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_testimonials_updated_at 
    BEFORE UPDATE ON public.testimonials 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
