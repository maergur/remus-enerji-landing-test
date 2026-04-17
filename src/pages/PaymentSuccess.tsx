import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Download, Home, Hash, Calendar, Receipt, User } from 'lucide-react';
import remusLogo from '@/assets/remus-logo-2.svg';

const PaymentSuccess: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const t = (tr: string, en: string) => (isEn ? en : tr);

  const [params, setParams] = useState<{
    amount: string;
    subscriberNo: string;
    fullName: string;
    period: string;
    invoiceId: string;
    txnId: string;
    paidAt: string;
  } | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const search = new URLSearchParams(window.location.search);
    const txnId =
      search.get('txnId') ||
      'RMS-' + Math.random().toString(36).slice(2, 10).toUpperCase();
    setParams({
      amount: search.get('amount') || '0.00',
      subscriberNo: search.get('subscriberNo') || '—',
      fullName: search.get('fullName') || '—',
      period: search.get('period') || '—',
      invoiceId: search.get('invoiceId') || '—',
      txnId,
      paidAt: new Date().toLocaleString(isEn ? 'en-GB' : 'tr-TR'),
    });
  }, [isEn]);

  const formattedAmount = useMemo(() => {
    const n = Number(params?.amount ?? 0);
    if (!isFinite(n)) return params?.amount ?? '0.00';
    return n.toLocaleString(isEn ? 'en-US' : 'tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [params, isEn]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-primary/5 via-white to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        <div className="rounded-2xl border border-gray-100 bg-white shadow-[0_8px_32px_-8px_rgba(16,185,129,0.2)] p-6 md:p-8">
          <a href="/" className="flex items-center justify-center mb-6 pb-5 border-b border-gray-100" aria-label="Remus Enerji">
            <img src={remusLogo} alt="Remus Enerji" className="h-11 w-auto" />
          </a>
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-5 animate-pulse-glow">
              <CheckCircle2 className="w-10 h-10 text-primary" strokeWidth={2.4} />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {t('Ödemeniz alındı', 'Payment received')}
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              {t(
                'Tahsilat makbuzu e-posta adresinize gönderildi.',
                'A receipt has been sent to your email.'
              )}
            </p>

            <div className="rounded-xl bg-gray-50 border border-gray-100 p-5 text-left space-y-3 mb-6">
              <Row
                icon={<Hash className="w-4 h-4" />}
                label={t('İşlem No', 'Transaction ID')}
                value={params?.txnId ?? '—'}
              />
              <Row
                icon={<Calendar className="w-4 h-4" />}
                label={t('Tarih', 'Date')}
                value={params?.paidAt ?? '—'}
              />
              <Row
                icon={<Hash className="w-4 h-4" />}
                label={t('Abonelik No', 'Subscriber No')}
                value={params?.subscriberNo ?? '—'}
              />
              <Row
                icon={<User className="w-4 h-4" />}
                label={t('Kart Hamili', 'Cardholder')}
                value={params?.fullName ?? '—'}
              />
              <Row
                icon={<Receipt className="w-4 h-4" />}
                label={t('Fatura Dönemi', 'Invoice Period')}
                value={params?.period ?? '—'}
              />
              <div className="pt-3 mt-3 border-t border-gray-200 flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {t('Ödenen Tutar', 'Amount Paid')}
                </span>
                <span className="text-2xl font-bold text-primary">
                  {formattedAmount} ₺
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Download className="w-4 h-4" />
                {t('Makbuzu İndir', 'Download Receipt')}
              </button>
              <a
                href="/"
                className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-sm shadow-[0_4px_14px_rgba(16,185,129,0.3)]"
              >
                <Home className="w-4 h-4" />
                {t('Ana Sayfa', 'Home')}
              </a>
            </div>

            <p className="text-xs text-gray-400 mt-6">
              {t(
                'Bu bir demo başarı sayfasıdır. Ödeme gerçek olarak alınmamıştır.',
                'This is a demo success page. No real payment has been taken.'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Row: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({
  icon,
  label,
  value,
}) => (
  <div className="flex items-center justify-between gap-4 text-sm">
    <div className="flex items-center gap-2 text-gray-500">
      <span className="text-primary">{icon}</span>
      <span>{label}</span>
    </div>
    <span className="font-medium text-gray-900 text-right break-all">{value}</span>
  </div>
);

export default PaymentSuccess;
