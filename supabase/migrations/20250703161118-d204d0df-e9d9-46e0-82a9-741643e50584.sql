
-- Fix the products table to add missing columns
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS sale_price numeric,
ADD COLUMN IF NOT EXISTS status boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS slug text,
ADD COLUMN IF NOT EXISTS stock integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS category text;

-- Update existing products to have slugs if they don't have them
UPDATE products 
SET slug = lower(regexp_replace(name, '[^a-zA-Z0-9\s-]', '', 'g'))
WHERE slug IS NULL OR slug = '';

-- Fix the categories table to add missing columns
ALTER TABLE categories 
ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS description text;

-- Create wishlist table for users
CREATE TABLE IF NOT EXISTS wishlists (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS on wishlist table
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for wishlist
CREATE POLICY "Users can manage their own wishlist items" 
ON wishlists FOR ALL 
USING (auth.uid() = user_id);

-- Update products table to use images instead of image_urls for consistency
UPDATE products 
SET images = COALESCE(image_urls, '{}')
WHERE images IS NULL OR array_length(images, 1) IS NULL;
