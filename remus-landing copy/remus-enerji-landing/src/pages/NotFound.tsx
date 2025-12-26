import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Home, ArrowRight } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center pt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            {/* 404 Number */}
            <div className="relative mb-8">
              <h1 className="text-[150px] md:text-[200px] font-bold text-gray-100 leading-none select-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="icon-container w-20 h-20">
                  <Home className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            
            {/* Message */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {t('notFound.message')}
            </h2>
            <p className="text-gray-600 mb-8">
              {t('notFound.description')}
            </p>
            
            {/* CTA Button */}
            <a 
              href="/" 
              className="cta-button inline-flex items-center gap-2 group"
            >
              {t('notFound.returnHome')}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
