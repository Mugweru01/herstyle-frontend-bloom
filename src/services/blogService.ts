import { supabase } from '../integrations/supabase/client';

export async function fetchBlogPosts(page: number = 1, pageSize: number = 10) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  const { data, error, count } = await supabase
    .from('blogs')
    .select('id, created_at, title, slug, image_url, content', { count: 'exact' })
    .range(start, end);

  if (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
  return { data, count };
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