import { supabase } from '../integrations/supabase/client';

export async function fetchBlogPosts() {
  const { data, error } = await supabase
    .from('blogs')
    .select('id, created_at, title, slug, image_url, content');

  if (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
  return data;
}

export async function fetchBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blogs')
    .select('id, created_at, title, slug, image_url, content')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    throw error;
  }
  return data;
}