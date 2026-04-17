import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Faq from "./pages/Faq";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Payment from "./pages/Payment";
import PaymentPending from "./pages/PaymentPending";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFail from "./pages/PaymentFail";
import MesafeliSatis from "./pages/legal/MesafeliSatis";
import OnBilgilendirme from "./pages/legal/OnBilgilendirme";
import IadeIptal from "./pages/legal/IadeIptal";
import Teslimat from "./pages/legal/Teslimat";
import NotFound from "./pages/NotFound";
import { useTranslation } from 'react-i18next';

const queryClient = new QueryClient();

const App = () => {
  const { i18n } = useTranslation();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/odeme" element={<Payment />} />
            <Route path="/odeme/beklemede" element={<PaymentPending />} />
            <Route path="/odeme/sonuc" element={<PaymentSuccess />} />
            <Route path="/odeme/hata" element={<PaymentFail />} />
            <Route path="/mesafeli-satis" element={<MesafeliSatis />} />
            <Route path="/on-bilgilendirme" element={<OnBilgilendirme />} />
            <Route path="/iade-iptal" element={<IadeIptal />} />
            <Route path="/teslimat" element={<Teslimat />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
