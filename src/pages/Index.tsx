import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import DashboardShowcase from '@/components/DashboardShowcase';
import FeaturesSection from '@/components/FeaturesSection';
import MobileAppSection from '@/components/MobileAppSection';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

const Index = () => {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash?.replace('#', '');
      if (!hash) return;
      const element = document.getElementById(hash);
      if (!element) return;
      const header = document.querySelector('header') as HTMLElement | null;
      const headerHeight = header?.offsetHeight ?? 0;
      const y = element.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
      window.scrollTo({ top: y, behavior: 'smooth' });
    };

    // run after initial render to ensure sections are in the DOM
    const timeoutId = window.setTimeout(scrollToHash, 50);
    window.addEventListener('hashchange', scrollToHash);
    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <DashboardShowcase />
      <FeaturesSection />
      <MobileAppSection />
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;
