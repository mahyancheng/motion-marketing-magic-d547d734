
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Index } from "./pages/Index";
import NotFound from "./pages/NotFound";
import SEM from "./pages/SEM";
import PayPerClick from "./pages/PayPerClick";
import SocialMediaAds from "./pages/SocialMediaAds";
import OrderManagement from "./pages/OrderManagement";
import Contact from "./pages/Contact";
import CustomerSoftware from "./pages/CustomerSoftware";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminDashboard from "./pages/AdminDashboard";
import ScrollToTop from "@/components/ScrollToTop";
import { ContentProvider } from "@/contexts/ContentContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ContentProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sem" element={<SEM />} />
            <Route path="/pay-per-click" element={<PayPerClick />} />
            <Route path="/social-media-ads" element={<SocialMediaAds />} />
            <Route path="/custom-software" element={<CustomerSoftware/>} />
            <Route path="/customer-software-demo" element={<CustomerSoftware/>} />
            <Route path="/order-management" element={<OrderManagement />} />
            <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
      </ContentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
