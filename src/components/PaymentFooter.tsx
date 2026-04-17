import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone } from 'lucide-react';
import CardBrands from '@/components/CardBrands';

type PaymentFooterProps = {
  className?: string;
  showCards?: boolean;
};

const SUPPORT = {
  phone: '+90 (850) 360 71 25',
  email: 'hello@remusenerji.com',
};

const PaymentFooter: React.FC<PaymentFooterProps> = ({
  className = '',
  showCards = true,
}) => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const t = (tr: string, en: string) => (isEn ? en : tr);

  return (
    <div
      className={`max-w-xl mx-auto text-xs text-gray-500 space-y-3 text-center ${className}`}
    >
      {showCards && (
        <div className="flex items-center justify-center pb-1">
          <CardBrands />
        </div>
      )}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <a href="/mesafeli-satis" className="hover:text-primary transition-colors">
          {t('Mesafeli Satış', 'Distance Sales')}
        </a>
        <span className="text-gray-300">•</span>
        <a href="/on-bilgilendirme" className="hover:text-primary transition-colors">
          {t('Ön Bilgilendirme', 'Preliminary Info')}
        </a>
        <span className="text-gray-300">•</span>
        <a href="/iade-iptal" className="hover:text-primary transition-colors">
          {t('İade / İptal', 'Refund / Cancellation')}
        </a>
        <span className="text-gray-300">•</span>
        <a href="/teslimat" className="hover:text-primary transition-colors">
          {t('Teslimat', 'Delivery')}
        </a>
        <span className="text-gray-300">•</span>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event('open-cookie-policy'))}
          className="hover:text-primary transition-colors"
        >
          {t('Gizlilik', 'Privacy')}
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        <span>
          <Phone className="inline w-3 h-3 mr-1 -mt-0.5" />
          {SUPPORT.phone}
        </span>
        <span>
          <Mail className="inline w-3 h-3 mr-1 -mt-0.5" />
          {SUPPORT.email}
        </span>
      </div>
      <div className="text-gray-400">
        © {new Date().getFullYear()} Remus Enerji.{' '}
        {t('Tüm hakları saklıdır.', 'All rights reserved.')}
      </div>
    </div>
  );
};

export default PaymentFooter;
