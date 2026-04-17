import React from 'react';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
    <footer className="relative overflow-hidden border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Remus Enerji</h3>
            <p className="text-gray-600 text-sm max-w-md mb-6">
              {t('footer.slogan')}
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="https://tr.linkedin.com/company/remuselektrik" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.966 0-1.75-.79-1.75-1.75s.784-1.75 1.75-1.75 1.75.79 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.38v4.59h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/remus.enerji/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/people/Remus-Enerji/61577394556365/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 text-sm">+90 (850) 360 71 25</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 text-sm">hello@remusenerji.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 text-sm">{t('footer.address')}</span>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">{t('footer.quick_links')}</h4>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-gray-600 text-sm hover:text-primary transition-colors">
                  {t('navbar.about')}
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-600 text-sm hover:text-primary transition-colors">
                  {t('navbar.faq')}
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-600 text-sm hover:text-primary transition-colors">
                  {t('navbar.blog')}
                </a>
              </li>
              <li>
                <button
                  onClick={() => window.dispatchEvent(new Event('open-cookie-policy'))}
                  className="text-gray-600 text-sm hover:text-primary transition-colors"
                >
                  {t('footer.privacy')}
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2025 Remus Enerji. {t('footer.text')}
            </p>

            {/* Language Switcher */}
            <div className="inline-flex items-center gap-1 bg-gray-100 rounded-full px-1 py-1">
              <Globe className="w-3.5 h-3.5 text-gray-400 ml-2" />
              <button
                onClick={() => i18n.changeLanguage('tr')}
                aria-pressed={i18n.language === 'tr'}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200',
                  i18n.language === 'tr'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                TR
              </button>
              <button
                onClick={() => i18n.changeLanguage('en')}
                aria-pressed={i18n.language === 'en'}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200',
                  i18n.language === 'en'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
