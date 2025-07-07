import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { fetchBlogPostBySlug } from '../services/blogService';

import { Database } from '@/types/supabase';

type BlogPost = Database['public']['Tables']['blogs']['Row'];

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPost = async () => {
      if (!slug) {
        setError('No slug provided.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await fetchBlogPostBySlug(slug);
        setPost(data);
      } catch (err) {
        setError('Failed to fetch post.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-600">Loading post...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-red-500">Error: {error}</p>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p className="text-center">Blog post not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative">
        <Link to="/blog" className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 flex items-center z-10">
          ← Back to blog
        </Link>
        <div className="relative h-96 overflow-hidden">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover rounded-b-2xl shadow-lg"
            loading="lazy"
            srcSet={`${post.image_url}?w=600 600w, ${post.image_url}?w=1200 1200w, ${post.image_url}?w=1800 1800w`}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <h1 className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-5xl md:text-6xl font-serif font-bold text-white z-10 max-w-4xl leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="prose lg:prose-xl font-sans leading-relaxed text-gray-700">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => <h1 className="font-serif text-gray-800" {...props} />,
h2: ({ node, ...props }) => <h2 className="font-serif text-gray-800" {...props} />,
h3: ({ node, ...props }) => <h3 className="font-serif text-gray-800" {...props} />,
h4: ({ node, ...props }) => <h4 className="font-serif text-gray-800" {...props} />,
h5: ({ node, ...props }) => <h5 className="font-serif text-gray-800" {...props} />,
h6: ({ node, ...props }) => <h6 className="font-serif text-gray-800" {...props} />,
blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-pink-400 pl-4 italic text-gray-600" {...props} />
                ),
                img: ({ node, ...props }) => (
                  <img
                  className="rounded-lg shadow-md my-4"
                  {...props}
                  loading="lazy"
                  srcSet={`${props.src}?w=400 400w, ${props.src}?w=800 800w`}
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPostPage;