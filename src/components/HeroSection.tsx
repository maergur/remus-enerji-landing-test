import React from 'react';
import { ArrowRight, Zap, Leaf, Shield, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Logo imports
import a101LogoPath from '../assets/logo/A101-logo.png';
import dhlLogoPath from '../assets/logo/dhl-logo.svg';
import arvatoLogoPath from '../assets/logo/arvato-logo.png';
import balormanLogoPath from '../assets/logo/balorman-logo.png';
import paletGlobalLogoPath from '../assets/logo/palet-logo.png';
import istanbulEnerjiLogoPath from '../assets/logo/ist-enerji-logo.png';
import ibbLogoPath from '../assets/logo/ibb-logo.png';
import sodexoLogoPath from '../assets/logo/sodexo-logo.png';
import polmarLogoPath from '../assets/logo/polmar-logo.png';
import genclerLogoPath from '../assets/logo/gencler-logo.png';
import cevreBakanligiLogoPath from '../assets/logo/cevre-sehircilik-logo.png';
import basogluLogoPath from '../assets/logo/basoglu-logo.png';
import enoferLogoPath from '../assets/logo/enofer-logo.png';

const logos = [
  { name: 'A101', src: a101LogoPath, alt: 'A101 Logo', customClassName: 'scale-100' }, 
  { name: 'Istanbul Enerji', src: istanbulEnerjiLogoPath, alt: 'Istanbul Enerji Logo', customClassName: 'scale-110' }, 
  { name: 'IBB', src: ibbLogoPath, alt: 'IBB Logo', customClassName: 'scale-145' }, 
  { name: 'Çevre ve Şehircilik Bakanligi', src: cevreBakanligiLogoPath, alt: 'Cevre Bakanligi Logo', customClassName: 'scale-150' },
  { name: 'Enofer', src: enoferLogoPath, alt: 'Enofer Logo', customClassName: 'scale-125' },
  { name: 'DHL', src: dhlLogoPath, alt: 'DHL Logo', customClassName: 'scale-110' },      
  { name: 'Arvato', src: arvatoLogoPath, alt: 'Arvato Logo' },
  { name: 'Sodexo', src: sodexoLogoPath, alt: 'Sodexo Logo', customClassName: 'scale-110 pb-[8px]'},
  { name: 'Basoglu', src: basogluLogoPath, alt: 'Basoglu Logo', customClassName: 'scale-125' },
  { name: 'Balorman', src: balormanLogoPath, alt: 'Balorman Logo' },
  { name: 'Palet Global', src: paletGlobalLogoPath, alt: 'Palet Global Logo', customClassName: 'scale-150' }, 
  { name: 'Polmar', src: polmarLogoPath, alt: 'Polmar Logo', customClassName: 'scale-100' },
  { name: 'Gencler', src: genclerLogoPath, alt: 'Gencler Logo', customClassName: 'scale-100' },
];

// Logo items for carousel
const logoItems = logos;

const CUSTOMER_PORTAL_URL = 'https://remus-customerportal.lovable.app/';

const HeroSection = () => {
  const goToCustomerPortal = () => {
    window.open(CUSTOMER_PORTAL_URL, '_blank');
  };

  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language?.startsWith('en');

  return (
    <section 
      id="home" 
      className="relative flex flex-col overflow-hidden pt-20 bg-white"
    >
      {/* Background Effects - subtle for light theme */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute inset-0 bg-radial-gradient" />
      
      {/* Animated glow orbs - softer for light theme */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-[100px] animate-pulse-glow delay-500" />
      
      {/* Main Hero Content */}
      <div className="flex-1 flex items-center min-h-[calc(100vh-380px)]">
        <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-gradient font-semibold">{t('hero.badge')}</span>
            </div>
            
            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
              <span className="text-gradient">{t('hero.title')}</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 mb-14 max-w-2xl mx-auto animate-slide-up delay-200">
              {t('hero.description')}
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up delay-300">
              <div className="glass-badge">
                <Leaf className="w-4 h-4" />
                <span>{t('hero.greenEnergy')}</span>
              </div>
              <div className="glass-badge">
                <Zap className="w-4 h-4" />
                <span>{t('hero.savingsOpportunity')}</span>
              </div>
              <div className="glass-badge">
                <Shield className="w-4 h-4" />
                <span>{t('hero.freeSoftware')}</span>
              </div>
              <div className="glass-badge">
                <Sparkles className="w-4 h-4" />
                <span>{t('hero.noContract')}</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-400">
              <button 
                onClick={goToCustomerPortal}
                className="cta-button group flex items-center gap-2 text-lg"
              >
                {t('hero.cta')}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('features');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="cta-button-outline flex items-center gap-2 text-lg"
              >
                {t('hero.learnMore')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Integrated Trusted By Section */}
      <div className="relative z-10 mt-0 pb-12">
        {/* Stats Row - compact, above trusted by */}
        <div className="flex justify-center gap-6 md:gap-12 mb-10 animate-slide-up delay-500">
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-gradient">500+</div>
            <div className="text-[10px] text-gray-400">{t('hero.stats.customers')}</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-gradient">%100</div>
            <div className="text-[10px] text-gray-400">{t('hero.stats.green')}</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-gradient">7/24</div>
            <div className="text-[10px] text-gray-400">{t('hero.stats.support')}</div>
          </div>
        </div>

        {/* Trusted By Title */}
        <p className="text-sm text-gray-400 text-center mb-6 uppercase tracking-wider font-medium animate-slide-up delay-600">
          {t('trusted_by')}
        </p>
        
        {/* Logo Carousel - Dual container approach for seamless loop */}
        <div className="relative animate-slide-up delay-600">
          {/* Gradient fade edges - matches hero bg */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="overflow-hidden">
            <div className="flex w-max animate-marquee">
              {/* First set */}
              {logoItems.map((logo, index) => (
                <div 
                  key={`a-${index}`} 
                  className="flex-shrink-0 mx-6 w-28 h-14 flex items-center justify-center"
                >
                  <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    className={`max-h-10 w-20 object-contain grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-300 ${logo.customClassName || ''}`} 
                  />
                </div>
              ))}
              {/* Second set (duplicate for seamless loop) */}
              {logoItems.map((logo, index) => (
                <div 
                  key={`b-${index}`} 
                  className="flex-shrink-0 mx-6 w-28 h-14 flex items-center justify-center"
                >
                  <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    className={`max-h-10 w-20 object-contain grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-300 ${logo.customClassName || ''}`} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
