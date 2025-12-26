import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

const LOCAL_STORAGE_KEY = 'cookie-consent';

const CookieConsent: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored !== 'accepted') {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
    // Listen for global event to open the policy modal (e.g., from footer)
    const openHandler = () => setShowPolicy(true);
    window.addEventListener('open-cookie-policy', openHandler as EventListener);
    return () => window.removeEventListener('open-cookie-policy', openHandler as EventListener);
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, 'accepted');
      localStorage.setItem(`${LOCAL_STORAGE_KEY}-analytics`, analyticsEnabled ? '1' : '0');
      localStorage.setItem(`${LOCAL_STORAGE_KEY}-marketing`, marketingEnabled ? '1' : '0');
    } catch {}
    setIsVisible(false);
  };

  const handleReject = () => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, 'rejected');
      localStorage.setItem(`${LOCAL_STORAGE_KEY}-analytics`, '0');
      localStorage.setItem(`${LOCAL_STORAGE_KEY}-marketing`, '0');
    } catch {}
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
          <div className="mx-auto max-w-4xl rounded-xl bg-white/95 backdrop-blur border border-gray-200 shadow-lg p-4 md:p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                {t('cookies.message')}{' '}
                <button
                  onClick={() => setShowPolicy(true)}
                  className="font-medium text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  {t('cookies.learn_more')}
                </button>
                .
              </p>
              <div className="flex items-center gap-2 md:gap-3">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-800 text-sm font-medium hover:bg-gray-50"
                >
                  {t('cookies.preferences')}
                </button>
                <button
                  onClick={handleReject}
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-800 text-sm font-medium hover:bg-gray-50"
                >
                  {t('cookies.reject')}
                </button>
                <button
                  onClick={handleAccept}
                  className="px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:opacity-95 active:opacity-90 whitespace-nowrap"
                >
                  {t('cookies.accept')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Policy Dialog */}
      <Dialog open={showPolicy} onOpenChange={setShowPolicy}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{t('kvkk.title')}</DialogTitle>
            <DialogDescription>
              <div className="max-h-[60vh] overflow-y-auto space-y-3 text-left text-gray-800">
                {(t('kvkk.paragraphs', { returnObjects: true }) as string[]).map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}

                <h3 className="font-semibold">{t('kvkk.sections.controller.heading')}</h3>
                <p>{t('kvkk.sections.controller.body')}</p>

                <h3 className="font-semibold">{t('kvkk.sections.purposes.heading')}</h3>
                <p>{t('kvkk.sections.purposes.desc')}</p>
                <p>{t('kvkk.sections.purposes.lead')}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {(t('kvkk.sections.purposes.bullets', { returnObjects: true }) as string[]).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <p>{t('kvkk.sections.purposes.footer')}</p>

                <h3 className="font-semibold">{t('kvkk.sections.sharing.heading')}</h3>
                <p>{t('kvkk.sections.sharing.body')}</p>

                <h3 className="font-semibold">{t('kvkk.sections.methodLegal.heading')}</h3>
                <p>{t('kvkk.sections.methodLegal.body')}</p>

                <h3 className="font-semibold">{t('kvkk.sections.rights.heading')}</h3>
                <p>{t('kvkk.sections.rights.body')}</p>

                <h3 className="font-semibold">{t('kvkk.sections.application.heading')}</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    {t('kvkk.sections.application.address_label')}: {t('kvkk.sections.application.address')}
                  </li>
                  <li>
                    {t('kvkk.sections.application.email_label')}: <a href={`mailto:${t('kvkk.sections.application.email')}`} className="text-primary underline">{t('kvkk.sections.application.email')}</a>
                  </li>
                  <li>
                    {t('kvkk.sections.application.phone_label')}: {t('kvkk.sections.application.phone')}
                  </li>
                </ul>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-800 text-sm font-medium hover:bg-gray-50">
                {t('join.close')}
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('cookies.preferences_title')}</DialogTitle>
            <DialogDescription>
              {t('cookies.preferences_desc')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">{t('cookies.analytics')}</p>
                <p className="text-xs text-gray-600">{t('cookies.analytics_desc')}</p>
              </div>
              <Switch checked={analyticsEnabled} onCheckedChange={(v: boolean) => setAnalyticsEnabled(v)} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">{t('cookies.marketing')}</p>
                <p className="text-xs text-gray-600">{t('cookies.marketing_desc')}</p>
              </div>
              <Switch checked={marketingEnabled} onCheckedChange={(v: boolean) => setMarketingEnabled(v)} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-800 text-sm font-medium hover:bg-gray-50">
                {t('join.close')}
              </button>
            </DialogClose>
            <button onClick={handleAccept} className="px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:opacity-95">
              {t('cookies.save_preferences')}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;


