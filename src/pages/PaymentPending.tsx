import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Lock } from 'lucide-react';
import remusLogo from '@/assets/remus-logo-2.svg';
import PaymentFooter from '@/components/PaymentFooter';

// Set to true once backend endpoint exists.
const USE_REAL_BACKEND = false;

const PaymentPending: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const t = (tr: string, en: string) => (isEn ? en : tr);

  const [stage, setStage] = useState<'connecting' | 'verifying' | 'finalizing'>(
    'connecting'
  );

  useEffect(() => {
    const raw = sessionStorage.getItem('remus.payment.payload');
    if (!raw) {
      window.location.replace('/odeme');
      return;
    }
    let cancelled = false;

    (async () => {
      const payload = JSON.parse(raw);

      // Stage 1: Connecting to bank
      await wait(900);
      if (cancelled) return;
      setStage('verifying');

      if (USE_REAL_BACKEND) {
        try {
          const response = await fetch('/api/payment/initiate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!response.ok) throw new Error('init_failed');
          const data = await response.json();
          if (data?.redirectUrl) {
            window.location.href = data.redirectUrl;
            return;
          }
          throw new Error('no_redirect');
        } catch {
          if (cancelled) return;
          window.location.replace('/odeme/hata?reason=connection');
          return;
        }
      }

      // Mock: 3DS verification step
      await wait(1000);
      if (cancelled) return;
      setStage('finalizing');
      await wait(900);
      if (cancelled) return;

      // Mock success rate: 80%. Failure shows retry path.
      const success = Math.random() < 0.8;
      if (success) {
        sessionStorage.removeItem('remus.payment.payload');
        const ids: string[] = Array.isArray(payload.invoiceIds)
          ? payload.invoiceIds
          : payload.invoiceId
          ? [payload.invoiceId]
          : [];
        const periods: string[] = Array.isArray(payload.invoicePeriods)
          ? payload.invoicePeriods
          : payload.invoicePeriod
          ? [payload.invoicePeriod]
          : [];
        const qs = new URLSearchParams({
          amount: String(payload.amount),
          subscriberNo: payload.subscriberNo,
          fullName: payload.fullName,
          invoiceId: ids.join(','),
          period: periods.join(', '),
          count: String(ids.length || 1),
          txnId: 'RMS-' + Math.random().toString(36).slice(2, 10).toUpperCase(),
        });
        window.location.replace(`/odeme/sonuc?${qs.toString()}`);
      } else {
        const reasons = ['insufficient_funds', 'declined', '3ds_failed'];
        const reason = reasons[Math.floor(Math.random() * reasons.length)];
        window.location.replace(`/odeme/hata?reason=${reason}`);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const stageLabel: Record<typeof stage, string> = {
    connecting: t('Bankaya bağlanılıyor…', 'Connecting to bank…'),
    verifying: t("3D Secure ile doğrulanıyor…", 'Verifying with 3D Secure…'),
    finalizing: t('İşlem tamamlanıyor…', 'Finalizing transaction…'),
  };

  const stageIdx = stage === 'connecting' ? 0 : stage === 'verifying' ? 1 : 2;

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-primary/5 via-white to-white px-4 py-10">
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="w-full max-w-xl">
          <div className="rounded-2xl border border-gray-100 bg-white shadow-[0_8px_32px_-8px_rgba(16,185,129,0.2)] p-6 md:p-8">
          <div className="flex items-center justify-center mb-6 pb-5 border-b border-gray-100">
            <img src={remusLogo} alt="Remus Enerji" className="h-11 w-auto" />
          </div>

          <div className="text-center">
            {/* Animated rings */}
            <div className="relative w-20 h-20 mx-auto mb-6">
              <span className="absolute inset-0 rounded-full border-2 border-primary/20" />
              <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
              <span className="absolute inset-2 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="w-6 h-6 text-primary" />
              </span>
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1.5">
              {t('Ödemeniz işleniyor', 'Processing your payment')}
            </h1>
            <p className="text-sm text-gray-500 mb-7">
              {t(
                'Lütfen sayfayı kapatmayın veya yenilemeyin.',
                'Please do not close or refresh this page.'
              )}
            </p>

            {/* Stage indicator */}
            <div className="flex items-center justify-center gap-3 mb-4">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === stageIdx
                      ? 'w-10 bg-primary'
                      : i < stageIdx
                      ? 'w-6 bg-primary/40'
                      : 'w-6 bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs font-medium text-gray-700">{stageLabel[stage]}</p>

            <div className="mt-7 pt-5 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400">
              <Shield className="w-3.5 h-3.5" />
              {t(
                "Bağlantınız SSL ile şifrelidir · İş Bankası 3D Secure",
                'Connection secured via SSL · İşbank 3D Secure'
              )}
            </div>
          </div>
          </div>
        </div>
      </div>
      <div className="pt-8">
        <PaymentFooter />
      </div>
    </div>
  );
};

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default PaymentPending;
