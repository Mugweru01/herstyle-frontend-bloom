import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Auth/AuthProvider";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Collections from "./pages/Collections";
import CategoryPage from "./pages/CategoryPage";
import Beauty from "./pages/Beauty";
import Accessories from "./pages/Accessories";
import NewIn from "./pages/NewIn";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";
import ContactUs from "./pages/ContactUs";
import StaticPage from "./pages/StaticPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <ScrollToTop />
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
              <Route path="/blog" element={<Blog />} />
              <Route path="/wishlist" element={<Wishlist />} />
              
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
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
