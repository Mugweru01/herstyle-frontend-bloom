
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StaticPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
  created_at?: string;
  updated_at?: string;
}

const StaticPageContent = () => {
  const location = useLocation();
  const slug = location.pathname.substring(1); // Remove leading slash
  const [page, setPage] = useState<StaticPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      fetchPage();
    }
  }, [slug]);

  const fetchPage = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('static_pages')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Supabase fetch error:', error.message, error.details);
        throw error;
      }
      
      setPage(data);

      // Update document meta tags
      if (data.meta_title) {
        document.title = data.meta_title;
      } else {
        document.title = `${data.title} - Herstyle`;
      }
      
      if (data.meta_description) {
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', data.meta_description);
        } else {
          const newMeta = document.createElement('meta');
          newMeta.name = 'description';
          newMeta.content = data.meta_description;
          document.head.appendChild(newMeta);
        }
      }
    } catch (error) {
      console.error('Error fetching page:', error); // This error is a generic JS error, not necessarily a Supabase error object
      setError('Failed to load page content');
      toast({
        title: 'Error',
        description: 'Failed to load page content. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-blush-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="animate-pulse">
            {/* Back button skeleton */}
            <div className="h-10 w-32 bg-cream-200 rounded-full mb-8"></div>
            
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-10">
                {/* Title skeleton */}
                <div className="h-8 bg-cream-200 rounded-lg w-2/3 mb-6"></div>
                
                {/* Content skeleton */}
                <div className="space-y-4">
                  <div className="h-4 bg-cream-200 rounded w-full"></div>
                  <div className="h-4 bg-cream-200 rounded w-5/6"></div>
                  <div className="h-4 bg-cream-200 rounded w-4/5"></div>
                  <div className="h-4 bg-cream-200 rounded w-full"></div>
                  <div className="h-4 bg-cream-200 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-blush-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back button */}
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-blush-600 hover:text-blush-700 transition-colors mb-8 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </Link>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-10 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-cream-100 rounded-full">
                  <FileText size={48} className="text-cream-500" />
                </div>
              </div>
              
              <h1 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
                Page Not Found
              </h1>
              
              <p className="text-base leading-relaxed text-gray-600 mb-8 max-w-md mx-auto">
                Sorry, this page is currently unavailable. The content you're looking for might have been moved or doesn't exist.
              </p>
              
              <Link 
                to="/" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blush-500 to-blush-600 text-white font-medium rounded-2xl hover:from-blush-600 hover:to-blush-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Return Home
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-blush-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back button */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-blush-600 hover:text-blush-700 transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </Link>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-10">
            {/* Page title */}
            <h1 className="text-2xl font-playfair font-semibold text-gray-900 mb-6 border-b border-cream-200 pb-4">
              {page.title}
            </h1>
            
            {/* Page content */}
            <div 
              className="prose prose-lg max-w-none 
                prose-headings:font-playfair prose-headings:text-gray-900 prose-headings:mb-4
                prose-p:text-base prose-p:leading-relaxed prose-p:text-gray-700 prose-p:mb-4
                prose-a:text-blush-600 prose-a:no-underline hover:prose-a:underline prose-a:transition-all prose-a:duration-200
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:text-gray-700 prose-ul:space-y-2 prose-li:leading-relaxed
                prose-ol:text-gray-700 prose-ol:space-y-2
                prose-table:w-full prose-table:border-collapse prose-table:bg-white prose-table:shadow-sm prose-table:rounded-lg prose-table:overflow-hidden
                prose-th:bg-cream-50 prose-th:text-gray-900 prose-th:font-semibold prose-th:p-4 prose-th:text-left prose-th:border-b prose-th:border-cream-200
                prose-td:p-4 prose-td:border-b prose-td:border-cream-100 prose-td:text-gray-700
                prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-gray-900
                prose-h3:text-lg prose-h3:font-medium prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-gray-800
                prose-blockquote:border-l-4 prose-blockquote:border-blush-300 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
                prose-code:bg-cream-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:text-gray-800"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </CardContent>
        </Card>

        {/* Last updated info */}
        {page.updated_at && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Last updated: {new Date(page.updated_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaticPageContent;
