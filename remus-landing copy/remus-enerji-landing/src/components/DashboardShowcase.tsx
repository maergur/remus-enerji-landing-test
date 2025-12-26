import React from 'react';
import proDashboard from '../assets/remus-pro-dashboard.png';
import proDashboardEn from '../assets/remus-pro-dashboard-en.png';
import { useTranslation } from 'react-i18next';
import { BoltIcon, ShieldCheck, CloudLightning, DynamicPricingIcon } from './icons/EnergizeIcons';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, delay }) => (
  <div 
    className="feature-card card-hover animate-slide-up" 
    style={{ animationDelay: delay }}
  >
    <div className="icon-container mb-6 mx-auto">
      <div className="text-white">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{title}</h3>
    <p className="text-gray-600 text-center text-sm">{description}</p>
  </div>
);

const DashboardShowcase = () => {
  const { t, i18n } = useTranslation();
  const dashboardImage = i18n.language === 'en' ? proDashboardEn : proDashboard;

  return (
    <section id="features" className="relative py-16 overflow-hidden bg-gray-50 scroll-mt-24">
      {/* Background glow effects - subtle for light theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/8 rounded-full blur-[150px] -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Features Title - at top */}
        <div className="text-center mb-12">
          <h2 className="section-title-gradient animate-slide-up">{t('features.title')}</h2>
          <p className="section-subtitle mx-auto animate-slide-up delay-100">{t('features.subtitle')}</p>
        </div>

        {/* Dashboard Image - 80% width (20% smaller) */}
        <div className="relative max-w-[80%] mx-auto animate-slide-up delay-200">
          {/* Floating glow behind the image - subtle for light theme */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-blue-400/10 to-primary/15 rounded-3xl blur-3xl transform scale-105 animate-pulse-glow" />
          
          {/* Dashboard Image Container */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl shadow-gray-300/50 bg-white">
            {/* Top bar mockup */}
            <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white rounded-lg px-4 py-1 text-xs text-gray-500 border border-gray-200">
                  app.remusenerji.com
                </div>
              </div>
            </div>
            
            {/* Dashboard Image */}
            <img 
              src={dashboardImage}
              alt="Remus Enerji Dashboard" 
              className="w-full h-auto"
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-8 -left-8 w-16 h-16 border-2 border-primary/20 rounded-2xl rotate-12 animate-float" />
          <div className="absolute -bottom-8 -right-8 w-14 h-14 border-2 border-blue-400/20 rounded-xl -rotate-12 animate-float delay-300" />
          
          {/* Side glow accents */}
          <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-32 h-64 bg-primary/5 rounded-full blur-[80px]" />
          <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-32 h-64 bg-blue-400/5 rounded-full blur-[80px]" />
        </div>

        {/* Feature Cards */}
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              title={t('features.cards.0.title')}
              description={t('features.cards.0.description')}
              icon={<DynamicPricingIcon />}
              delay="0.1s"
            />
            <FeatureCard
              title={t('features.cards.1.title')}
              description={t('features.cards.1.description')}
              icon={<BoltIcon />}
              delay="0.2s"
            />
            <FeatureCard
              title={t('features.cards.2.title')}
              description={t('features.cards.2.description')}
              icon={<ShieldCheck />}
              delay="0.3s"
            />
            <FeatureCard
              title={t('features.cards.3.title')}
              description={t('features.cards.3.description')}
              icon={<CloudLightning />}
              delay="0.4s"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardShowcase;
