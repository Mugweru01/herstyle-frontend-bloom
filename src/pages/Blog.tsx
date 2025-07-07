
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/Layout/Layout';
import { fetchBlogPosts } from '../services/blogService';

import { Database } from '@/types/supabase';

type BlogPost = Database['public']['Tables']['blogs']['Row'];

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const postsPerPage = 6; // Number of posts per page

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const { data, count } = await fetchBlogPosts(currentPage, postsPerPage);
        setPosts(data || []);
        setTotalPages(Math.ceil((count || 0) / postsPerPage));
      } catch (err) {
        setError('Failed to fetch posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const calculateReadingTime = (text: string): number => {
    const wordsPerMinute = 200;
    const noOfWords = text.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    return Math.ceil(minutes);
  };

  const generateExcerpt = (content: string, wordLimit: number): string => {
    const words = content.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return content;
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Our Blog</h1>
          <p className="text-center text-gray-600">Loading posts...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Our Blog</h1>
          <p className="text-center text-red-500">Error: {error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
<h1 className="text-5xl font-serif text-pink-600 underline decoration-green-500 decoration-2 underline-offset-4">Herstyle Journal</h1>
        <p className="text-lg text-black italic">Stories, styling tips, and behind the seams.</p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out group">
              <Link to={`/blog/${post.slug}`}>
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-2xl transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  loading="lazy"
                  srcSet={`${post.image_url}?w=400 400w, ${post.image_url}?w=800 800w, ${post.image_url}?w=1200 1200w`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </Link>
              <CardContent className="p-6">
                <p className="text-sm text-pink-600 mb-2">
                  {format(new Date(post.created_at), 'MMMM dd, yyyy')} • {calculateReadingTime(post.content)} min read
                </p>
                <Link to={`/blog/${post.slug}`}>
                  <h2 className="text-3xl font-serif text-gray-800 group-hover:text-pink-600 transition-colors duration-300 ease-in-out mb-2 relative inline-block">
                    {post.title}
                    <span className="absolute left-0 bottom-0 h-1 bg-pink-300 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
                  </h2>
                </Link>
                <p className="text-gray-700 text-base mb-4">
                  {generateExcerpt(post.content, 25)}
                </p>
                <Link to={`/blog/${post.slug}`} className="text-pink-600 hover:text-pink-800 font-semibold flex items-center group relative">
                  Read More →
                  <span className="absolute left-0 bottom-0 h-0.5 bg-pink-600 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </CardContent>
            </Card>
          ))}

          {posts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No blog posts yet</h3>
              <p className="text-gray-600">Check back soon for the latest updates!</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center space-x-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 border rounded-md ${currentPage === index + 1 ? 'bg-pink-600 text-white' : 'text-gray-700 bg-white hover:bg-gray-100'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Blog;
