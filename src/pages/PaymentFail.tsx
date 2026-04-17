import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { XCircle, RotateCw, Home, Phone } from 'lucide-react';
import remusLogo from '@/assets/remus-logo-2.svg';

type Reason = 'insufficient_funds' | 'declined' | '3ds_failed' | 'connection' | 'unknown';

const PaymentFail: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const t = (tr: string, en: string) => (isEn ? en : tr);

  const [reason, setReason] = useState<Reason>('unknown');

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const search = new URLSearchParams(window.location.search);
    const r = (search.get('reason') as Reason) || 'unknown';
    setReason(r);
  }, []);

  const reasonText = useMemo<Record<Reason, { title: string; detail: string }>>(
    () => ({
      insufficient_funds: {
        title: t('Yetersiz Bakiye', 'Insufficient Funds'),
        detail: t(
          "Kartınızda yeterli bakiye bulunamadı. Lütfen farklı bir kart ile tekrar deneyin.",
          'The card has insufficient funds. Please try a different card.'
        ),
      },
      declined: {
        title: t('İşlem Reddedildi', 'Transaction Declined'),
        detail: t(
          'Kart bankanız tarafından işlem reddedildi. Bilgileri kontrol edip tekrar deneyebilir veya bankanızla iletişime geçebilirsiniz.',
          'Your card issuer declined the transaction. Please verify the details or contact your bank.'
        ),
      },
      '3ds_failed': {
        title: t('3D Secure Doğrulaması Başarısız', '3D Secure Verification Failed'),
        detail: t(
          'SMS / mobil onay adımı tamamlanamadı. Lütfen tekrar deneyin.',
          'The SMS / mobile approval step could not be completed. Please try again.'
        ),
      },
      connection: {
        title: t('Bağlantı Hatası', 'Connection Error'),
        detail: t(
          'Ödeme sunucusuna ulaşılamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.',
          'Could not reach the payment server. Please check your connection and retry.'
        ),
      },
      unknown: {
        title: t('Ödeme Alınamadı', 'Payment Failed'),
        detail: t(
          'Ödeme tamamlanamadı. Lütfen tekrar deneyin. Sorun devam ederse müşteri hizmetlerimizle iletişime geçin.',
          'The payment could not be completed. Please try again or contact support if the issue persists.'
        ),
      },
    }),
    [isEn] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const current = reasonText[reason];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-red-50/60 via-white to-white px-4 py-10">
      <div className="w-full max-w-xl">
        <div className="rounded-2xl border border-gray-100 bg-white shadow-[0_8px_32px_-8px_rgba(239,68,68,0.2)] p-6 md:p-8">
          <div className="flex items-center justify-center mb-6 pb-5 border-b border-gray-100">
            <img src={remusLogo} alt="Remus Enerji" className="h-11 w-auto" />
          </div>

          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-red-50 mx-auto flex items-center justify-center mb-5">
              <XCircle className="w-10 h-10 text-red-500" strokeWidth={2.2} />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {current.title}
            </h1>
            <p className="text-sm text-gray-600 mb-7 leading-relaxed max-w-md mx-auto">
              {current.detail}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <a
                href="/"
                className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Home className="w-4 h-4" />
                {t('Ana Sayfa', 'Home')}
              </a>
              <a
                href="/odeme"
                className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-sm shadow-[0_4px_14px_rgba(16,185,129,0.3)]"
              >
                <RotateCw className="w-4 h-4" />
                {t('Tekrar Dene', 'Try Again')}
              </a>
            </div>

            <div className="mt-7 pt-5 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              {t('Destek:', 'Support:')} +90 (850) 360 71 25
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;
