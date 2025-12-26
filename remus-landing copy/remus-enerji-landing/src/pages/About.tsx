import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { useTranslation, Trans } from 'react-i18next';
import AboutBanner from '@/assets/about-us-banner.jpg';
import ISO45001 from '@/assets/license-certificates/ISO45001-2018.pdf';
import ISO27001 from '@/assets/license-certificates/ISO27001-2022.pdf';
import ISO14001 from '@/assets/license-certificates/ISO14001-2015.pdf';
import ISO10002 from '@/assets/license-certificates/ISO10002-2018.pdf';
import ISO9001 from '@/assets/license-certificates/ISO9001-2015.pdf';
import EPDKLicense from '@/assets/license-certificates/Remus-Elektrik-Tedarik-Lisansi-EPDK.pdf';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText, Eye, Target, Sparkles, Users, Leaf, Award, Building2 } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();

  const missionIcons = [
    <Users className="w-6 h-6" />,
    <Leaf className="w-6 h-6" />,
    <Target className="w-6 h-6" />,
    <Sparkles className="w-6 h-6" />,
    <Award className="w-6 h-6" />
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <Navbar />
      
      {/* Hero Header - Subtle background image */}
      <section className="pt-12 pb-12 relative overflow-hidden mt-20">
        {/* Background image */}
        <div className="absolute inset-0">
          <img 
            src={AboutBanner} 
            alt="" 
            className="w-full h-full object-cover object-[60%_42%]" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/70 to-white" />
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-primary/70 rounded-full text-primary font-medium text-sm shadow-sm mb-6 animate-fade-in">
              <Building2 className="w-4 h-4" />
              <span>{t('about.badge')}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 animate-slide-up">
              {t('about.title')}
            </h1>
            <p className="text-gray-600 text-lg animate-slide-up delay-100">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>
      
      <main id="about-main" className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 pt-12 pb-24">
        {/* Description */}
        <section className="w-full animate-slide-up delay-100">
          <div className="glass-card p-8 md:p-10">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              <Trans i18nKey="about.description" components={{ bold: <strong className="font-semibold text-gray-900" /> }} />
            </p>
          </div>
        </section>

        {/* Vision */}
        <section className="mt-12 animate-slide-up delay-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="icon-container">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">{t('about.vision.title')}</h2>
          </div>
          <div className="glass-card p-8">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">{t('about.vision.body')}</p>
          </div>
        </section>

        {/* Mission */}
        <section className="mt-12 animate-slide-up delay-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="icon-container">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">{t('about.mission.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="feature-card card-hover" style={{ animationDelay: `${0.1 * index}s` }}>
                <div className="flex items-start gap-4">
                  <div className="icon-container-outline flex-shrink-0">
                    {missionIcons[index]}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">{t(`about.mission.items.${index}.title`)}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{t(`about.mission.items.${index}.body`)}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="feature-card card-hover md:col-span-2">
              <div className="flex items-start gap-4">
                <div className="icon-container-outline flex-shrink-0">
                  {missionIcons[4]}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{t('about.mission.items.4.title')}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{t('about.mission.items.4.body')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certificates */}
        <section className="mt-12 animate-slide-up delay-400">
          <div className="flex items-center gap-3 mb-6">
            <div className="icon-container">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">{t('about.certificates.title')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Dialog>
              <DialogTrigger className="feature-card card-hover text-left w-full group">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-gray-900 font-medium">{t('about.certificates.epdk')}</span>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl w-[95vw] bg-white border-gray-200">
                <DialogHeader>
                  <DialogTitle className="text-gray-900">{t('about.certificates.epdk')}</DialogTitle>
                </DialogHeader>
                <embed src={EPDKLicense} type="application/pdf" className="w-full h-[80vh] rounded-lg" />
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger className="feature-card card-hover text-left w-full group">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-gray-900 font-medium">{t('about.certificates.iso9001')}</span>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl w-[95vw] bg-white border-gray-200">
                <DialogHeader>
                  <DialogTitle className="text-gray-900">{t('about.certificates.iso9001')}</DialogTitle>
                </DialogHeader>
                <embed src={ISO9001} type="application/pdf" className="w-full h-[80vh] rounded-lg" />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger className="feature-card card-hover text-left w-full group">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-gray-900 font-medium">{t('about.certificates.iso14001')}</span>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl w-[95vw] bg-white border-gray-200">
                <DialogHeader>
                  <DialogTitle className="text-gray-900">{t('about.certificates.iso14001')}</DialogTitle>
                </DialogHeader>
                <embed src={ISO14001} type="application/pdf" className="w-full h-[80vh] rounded-lg" />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger className="feature-card card-hover text-left w-full group">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-gray-900 font-medium">{t('about.certificates.iso45001')}</span>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl w-[95vw] bg-white border-gray-200">
                <DialogHeader>
                  <DialogTitle className="text-gray-900">{t('about.certificates.iso45001')}</DialogTitle>
                </DialogHeader>
                <embed src={ISO45001} type="application/pdf" className="w-full h-[80vh] rounded-lg" />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger className="feature-card card-hover text-left w-full group">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-gray-900 font-medium">{t('about.certificates.iso27001')}</span>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl w-[95vw] bg-white border-gray-200">
                <DialogHeader>
                  <DialogTitle className="text-gray-900">{t('about.certificates.iso27001')}</DialogTitle>
                </DialogHeader>
                <embed src={ISO27001} type="application/pdf" className="w-full h-[80vh] rounded-lg" />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger className="feature-card card-hover text-left w-full group">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-gray-900 font-medium">{t('about.certificates.iso10002')}</span>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl w-[95vw] bg-white border-gray-200">
                <DialogHeader>
                  <DialogTitle className="text-gray-900">{t('about.certificates.iso10002')}</DialogTitle>
                </DialogHeader>
                <embed src={ISO10002} type="application/pdf" className="w-full h-[80vh] rounded-lg" />
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default About;
