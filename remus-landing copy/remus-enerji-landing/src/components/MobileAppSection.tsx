import React, { useRef, useState } from 'react';
import { Smartphone, Zap, Shield, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import mobileGoals from '../assets/remus-mobile-goals.svg';
import mobileGoalsTr from '../assets/remus-mobile-goals-tr.svg';
import mobileAnalytics from '../assets/remus-mobile-analytics.svg';
import mobileAnalyticsTr from '../assets/remus-mobile-analytics-tr.svg';
import mobileSettings from '../assets/remus-mobile-settings.svg';
import mobileSettingsTr from '../assets/remus-mobile-settings-tr.svg';
import mobileDashboard from '../assets/remus-mobile-dashboard.svg';
import mobileDashboardTr from '../assets/remus-mobile-dashboard-tr.svg';
import mobileBill from '../assets/remus-mobile-bill.svg';
import mobileBillTr from '../assets/remus-mobile-bill-tr.svg';
import appStoreBadge from '@/assets/Download_on_the_App_Store_Badge_US-UK.svg';
import googlePlayBadge from '@/assets/GetItOnGooglePlay.png';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from './ui/dialog';


interface AppFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

const AppFeature: React.FC<AppFeatureProps> = ({ icon, title, description, delay }) => (
  <div
    className="flex items-center gap-4 animate-slide-up"
    style={{ animationDelay: delay }}
  >
    <div className="flex-shrink-0 icon-container">
      <div className="text-white">
        {icon}
      </div>
    </div>
    <div className="leading-snug">
      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

const MobileAppSection = () => {
  const { t, i18n } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<null | 'ios' | 'android'>(null);
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);

  // Array of mobile app screenshots (switch to TR images when language is 'tr')
  const isTR = i18n.language === 'tr';
  const appScreenshots = [
    {
      src: isTR ? mobileDashboardTr : mobileDashboard,
      alt: "Remus Energy Mobile App - Dashboard",
      title: t('mobileApp.carousel.dashboard')
    },
    {
      src: isTR ? mobileAnalyticsTr : mobileAnalytics,
      alt: "Remus Energy Mobile App - Analytics",
      title: t('mobileApp.carousel.analytics')
    },
    {
      src: isTR ? mobileGoalsTr : mobileGoals,
      alt: "Remus Energy Mobile App - Daily Energy Goal",
      title: t('mobileApp.carousel.goals')
    },
    {
      src: isTR ? mobileBillTr : mobileBill,
      alt: "Remus Energy Mobile App - Current Bill",
      title: t('mobileApp.carousel.bill')
    },
    {
      src: isTR ? mobileSettingsTr : mobileSettings,
      alt: "Remus Energy Mobile App - Settings",
      title: t('mobileApp.carousel.settings')
    }
  ];

  const nextImage = () => {
    setDirection('next');
    setCurrentImageIndex((prevIndex) => 
      prevIndex === appScreenshots.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setDirection('prev');
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? appScreenshots.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    if (mobileScrollRef.current) {
      const container = mobileScrollRef.current;
      const slideWidth = container.clientWidth;
      container.scrollTo({ left: index * slideWidth, behavior: 'smooth' });
    }
  };

  const handleDownload = (platform: 'ios' | 'android') => {
    setSelectedPlatform(platform);
    setIsModalOpen(true);
  };

  return (
    <section id="mobile-app" className="py-24 relative overflow-hidden scroll-mt-28 md:scroll-mt-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-[120px] -translate-y-1/2" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 px-2 md:px-4">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-primary/20 border border-primary/30 text-primary animate-fade-in">
                <Smartphone className="w-4 h-4" />
                <span>{t('mobileApp.badge')}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white animate-slide-up">
                {t('mobileApp.title')}
              </h2>
              
              <p className="text-lg text-gray-300 leading-relaxed animate-slide-up delay-100">
                {t('mobileApp.subtitle')}
              </p>
            </div>

            {/* App Features */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div className="leading-snug">
                  <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">{t('mobileApp.features.realTime.title')}</h3>
                  <p className="text-gray-400 text-sm">{t('mobileApp.features.realTime.description')}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div className="leading-snug">
                  <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">{t('mobileApp.features.savings.title')}</h3>
                  <p className="text-gray-400 text-sm">{t('mobileApp.features.savings.description')}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div className="leading-snug">
                  <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">{t('mobileApp.features.secure.title')}</h3>
                  <p className="text-gray-400 text-sm">{t('mobileApp.features.secure.description')}</p>
                </div>
              </div>
            </div>

            {/* Download Buttons (desktop/tablet only) */}
            <div className="hidden md:flex flex-col sm:flex-row gap-4 pt-4 animate-slide-up delay-500">
              <button
                onClick={() => handleDownload('ios')}
                className="flex items-center justify-center rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
              >
                <img src={appStoreBadge} alt="Download on the App Store" className="h-12 w-auto" />
              </button>
              
              <button
                onClick={() => handleDownload('android')}
                className="flex items-center justify-center rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
              >
                <img src={googlePlayBadge} alt="Get it on Google Play" className="h-12 w-auto" />
              </button>
            </div>

            {/* Coming Soon Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="bg-white border-gray-200 text-gray-900">
                <DialogHeader>
                  <DialogTitle className="text-gray-900">{t('mobileApp.comingSoonTitle')}</DialogTitle>
                  <DialogDescription>
                    <div className="space-y-3 text-left">
                      <p className="text-gray-600">{t('mobileApp.comingSoonBody1')}</p>
                      <p className="text-gray-600 font-medium">{t('mobileApp.comingSoonBody2')}</p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600">
                        <li>{t('mobileApp.comingSoonBullet1')}</li>
                        <li>{t('mobileApp.comingSoonBullet2')}</li>
                        <li>{t('mobileApp.comingSoonBullet3')}</li>
                      </ul>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <button className="cta-button">
                      {t('join.close')}
                    </button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

          </div>

          {/* Mobile Carousel: native scroll-snap */}
          <div className="md:hidden w-full">
            <div
              ref={mobileScrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
              onScroll={(e) => {
                const container = e.currentTarget;
                const slideWidth = container.clientWidth;
                const idx = Math.round(container.scrollLeft / slideWidth);
                if (idx !== currentImageIndex) setCurrentImageIndex(idx);
              }}
            >
              {appScreenshots.map((img, idx) => (
                <div key={idx} className="min-w-full snap-start px-6">
                  <div className="mx-auto max-w-[320px] aspect-[9/16]">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-contain rounded-2xl" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {appScreenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-200 ${index === currentImageIndex ? 'bg-primary w-8' : 'bg-white/30 w-2'}`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-400 font-medium text-center mt-2">
              {appScreenshots[currentImageIndex].title}
            </p>
            {/* Download Buttons (mobile only at bottom) */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <button
                onClick={() => handleDownload('ios')}
                className="flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-105"
              >
                <img src={appStoreBadge} alt="Download on the App Store" className="h-10 w-auto" />
              </button>
              <button
                onClick={() => handleDownload('android')}
                className="flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-105"
              >
                <img src={googlePlayBadge} alt="Get it on Google Play" className="h-10 w-auto" />
              </button>
            </div>
          </div>

          {/* Desktop/Tablet Carousel: button controlled */}
          <div
            className="hidden md:flex relative flex-col items-center px-5 min-h-[500px] animate-slide-up delay-300"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') prevImage();
              if (e.key === 'ArrowRight') nextImage();
            }}
          >
            {/* Phone mockup glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-[500px] bg-primary/20 rounded-[60px] blur-[60px]" />
            </div>
            
            <div className="w-full flex items-center justify-center gap-6 relative z-10">
              <button
                onClick={prevImage}
                className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-200 flex items-center justify-center hover:bg-white/20 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <div className="w-[55%] max-w-xs">
                <img
                  key={currentImageIndex}
                  src={appScreenshots[currentImageIndex].src}
                  alt={appScreenshots[currentImageIndex].alt}
                  className="w-full h-auto rounded-3xl shadow-2xl shadow-black/40"
                />
              </div>
              <button
                onClick={nextImage}
                className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-200 flex items-center justify-center hover:bg-white/20 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="w-[55%] max-w-xs flex flex-col items-center gap-3 mt-6">
              <div className="flex gap-2">
                {appScreenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      index === currentImageIndex ? 'bg-primary w-8' : 'bg-white/30 w-2 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-400 font-medium">
                {appScreenshots[currentImageIndex].title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;
