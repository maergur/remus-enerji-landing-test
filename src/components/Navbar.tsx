import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import remusLogo from '../assets/remus-logo-2.svg';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { LogIn, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, X, CreditCard } from 'lucide-react';

const CUSTOMER_PORTAL_URL = 'https://remus-customerportal.lovable.app/';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const onHome = window.location.pathname === '/';
    const element = document.getElementById(sectionId);
    if (!onHome || !element) {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const header = document.querySelector('header') as HTMLElement | null;
    const headerHeight = header?.offsetHeight ?? 0;
    const y = element.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const navigateTo = (path: string) => {
    setIsMobileMenuOpen(false);
    window.location.href = path;
  };

  const openLoginDialog = () => {
    setIsMobileMenuOpen(false);
    setIsLoginOpen(true);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Redirect to customer portal for actual login
    setTimeout(() => {
      setIsLoading(false);
      window.open(CUSTOMER_PORTAL_URL, '_blank');
      setIsLoginOpen(false);
      setEmailOrPhone('');
      setPassword('');
    }, 500);
  };

  return (
    <header 
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        
        <a href="/" className="flex items-center p-0">
          <img 
            src={remusLogo} 
            alt="Remus Enerji Logo" 
            className="h-12 w-auto"
          />
        </a>
        
        {/* Desktop Navigation */}
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="nav-link"
            >
              {t('navbar.home')}
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="nav-link"
            >
              {t('navbar.features')}
            </button>
            <button 
              onClick={() => navigateTo('/about')} 
              className="nav-link"
            >
              {t('navbar.about')}
            </button>
            <button 
              onClick={() => navigateTo('/faq')} 
              className="nav-link"
            >
              {t('navbar.faq')}
            </button>
            <button 
              onClick={() => navigateTo('/blog')} 
              className="nav-link"
            >
              {t('navbar.blog')}
            </button>
            <div className="flex items-center gap-1.5 pl-4 ml-2 border-l border-gray-200">
              <button
                onClick={openLoginDialog}
                className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                {t('navbar.join_us')}
              </button>
              <button
                onClick={() => navigateTo('/odeme')}
                className="cta-button group flex items-center gap-2 text-sm py-2 px-5"
              >
                {t('navbar.pay_bill')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </nav>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-lg">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-left py-3 text-gray-600 hover:text-primary transition-colors border-b border-gray-100"
            >
              {t('navbar.home')}
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-left py-3 text-gray-600 hover:text-primary transition-colors border-b border-gray-100"
            >
              {t('navbar.features')}
            </button>
            <button 
              onClick={() => navigateTo('/about')} 
              className="text-left py-3 text-gray-600 hover:text-primary transition-colors border-b border-gray-100"
            >
              {t('navbar.about')}
            </button>
            <button 
              onClick={() => navigateTo('/faq')} 
              className="text-left py-3 text-gray-600 hover:text-primary transition-colors border-b border-gray-100"
            >
              {t('navbar.faq')}
            </button>
            <button 
              onClick={() => navigateTo('/blog')} 
              className="text-left py-3 text-gray-600 hover:text-primary transition-colors border-b border-gray-100"
            >
              {t('navbar.blog')}
            </button>
            <button
              onClick={() => navigateTo('/odeme')}
              className="text-center mt-4 py-3 px-6 bg-primary text-white font-semibold rounded-full flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(16,185,129,0.3)]"
            >
              <CreditCard className="w-4 h-4" />
              {t('navbar.pay_bill')}
            </button>
            <button
              onClick={openLoginDialog}
              className="text-center py-3 px-6 text-gray-700 hover:text-primary transition-all flex items-center justify-center gap-2 font-medium rounded-full border border-gray-200 hover:border-primary/30 hover:bg-primary/5"
            >
              <LogIn className="w-4 h-4" />
              {t('navbar.join_us')}
            </button>
            
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-center space-x-2 pt-4">
              <button
                onClick={() => i18n.changeLanguage('tr')}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  i18n.language === 'tr' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 bg-gray-100'
                )}
              >
                Türkçe
              </button>
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  i18n.language === 'en' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 bg-gray-100'
                )}
              >
                English
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Dialog */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="bg-white border-gray-200 text-gray-900 sm:max-w-md p-0 overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-br from-primary/10 via-blue-50 to-white px-6 py-8 text-center relative">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-20" />
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/15 to-blue-400/15 border border-primary/20 flex items-center justify-center">
                <LogIn className="w-8 h-8 text-primary" />
              </div>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900 text-center">
                  {t('login.title')}
                </DialogTitle>
                <DialogDescription className="text-gray-600 text-center mt-2">
                  {t('login.subtitle')}
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>

          {/* Form */}
          <div className="px-6 pb-6 pt-4">
            {/* Login Method Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  loginMethod === 'email'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                <Mail className="w-4 h-4" />
                {t('login.email_tab')}
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('phone')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  loginMethod === 'phone'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                <Phone className="w-4 h-4" />
                {t('login.phone_tab')}
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email/Phone Input */}
              <div>
                <label htmlFor="emailOrPhone" className="block text-gray-700 font-medium mb-2 text-sm">
                  {loginMethod === 'email' ? t('login.email_label') : t('login.phone_label')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    {loginMethod === 'email' ? (
                      <Mail className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Phone className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <input
                    type={loginMethod === 'email' ? 'email' : 'tel'}
                    id="emailOrPhone"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder={loginMethod === 'email' ? t('login.email_placeholder') : t('login.phone_placeholder')}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2 text-sm">
                  {t('login.password_label')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('login.password_placeholder')}
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-gray-900 placeholder-gray-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <a 
                  href={CUSTOMER_PORTAL_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  {t('login.forgot_password')}
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full cta-button py-3.5 text-base flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    {t('login.submit')}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">{t('login.or')}</span>
              </div>
            </div>

            {/* Register CTA */}
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-3">{t('login.no_account')}</p>
              <a
                href={CUSTOMER_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
              >
                {t('login.register')}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;
