import { Toaster } from './components/ui/toaster';
import { useLocation } from 'react-router-dom';
import { pageview } from './lib/analytics';
import { useEffect } from 'react';
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Auth/AuthProvider";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout/Layout";
import Index from "./pages/Index";
import Collections from "./pages/Collections";
import CategoryPage from "./pages/CategoryPage";
import Beauty from "./pages/Beauty";
import Accessories from "./pages/Accessories";
import NewIn from "./pages/NewIn";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import React, { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ui/ErrorBoundary';
const Blog = lazy(() => import('./pages/Blog'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));


import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";
import ContactUs from "./pages/ContactUs";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import StaticPage from "./pages/StaticPage";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    pageview(new URL(window.location.origin + location.pathname + location.search));
  }, [location]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <ErrorBoundary>
            <ScrollToTop />
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/collections/:category" element={<CategoryPage />} />
                <Route path="/beauty" element={<Beauty />} />
                <Route path="/accessories" element={<Accessories />} />
                <Route path="/new-in" element={<NewIn />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/blog" element={
                  <Suspense fallback={<div>Loading Blog...</div>}>
                    <Blog />
                  </Suspense>
                } />
                <Route path="/blog/:slug" element={
                  <Suspense fallback={<div>Loading Blog Post...</div>}>
                    <BlogPostPage />
                  </Suspense>
                } />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                
                
                {/* Static Pages */}
                <Route path="/shipping-info" element={<StaticPage />} />
                <Route path="/returns-policy" element={<StaticPage />} />
                <Route path="/size-guide" element={<StaticPage />} />
                <Route path="/faq" element={<StaticPage />} />
                <Route path="/terms-of-service" element={<StaticPage />} />
                <Route path="/privacy-policy" element={<StaticPage />} />
                <Route path="/cookie-policy" element={<StaticPage />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </ErrorBoundary>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
