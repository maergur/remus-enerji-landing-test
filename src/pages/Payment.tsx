import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  ArrowLeft,
  Lock,
  Shield,
  CheckCircle2,
  User,
  Hash,
  ExternalLink,
  Search,
  Receipt,
  Calendar,
  CreditCard,
} from 'lucide-react';
// ArrowLeft stays for the step 2/3 Back navigation buttons.
import remusLogo from '@/assets/remus-logo-2.svg';
import paymentBanner from '@/assets/payment-banner.jpg';
import PaymentFooter from '@/components/PaymentFooter';

type Invoice = {
  id: string;
  period: string;
  dueDate: string;
  amount: number;
};

type QueryState = 'idle' | 'loading' | 'not_found' | 'success';
type ConsentKey = 'distanceSale' | 'preInfo' | 'refund';
type StepId = 1 | 2 | 3;

const Payment = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const t = (tr: string, en: string) => (isEn ? en : tr);

  const [step, setStep] = useState<StepId>(1);

  // Step 1
  const [subscriberNo, setSubscriberNo] = useState('');
  const [queryState, setQueryState] = useState<QueryState>('idle');

  // Step 2
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState<string[]>([]);

  // Step 3
  const [fullName, setFullName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [consents, setConsents] = useState<Record<ConsentKey, boolean>>({
    distanceSale: false,
    preInfo: false,
    refund: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedInvoices = useMemo(
    () => invoices.filter((i) => selectedInvoiceIds.includes(i.id)),
    [invoices, selectedInvoiceIds]
  );

  const totalAmount = useMemo(
    () => selectedInvoices.reduce((sum, i) => sum + i.amount, 0),
    [selectedInvoices]
  );

  const hasSelection = selectedInvoices.length > 0;
  const allSelected = invoices.length > 0 && selectedInvoiceIds.length === invoices.length;

  const toggleInvoice = (id: string) =>
    setSelectedInvoiceIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const toggleAll = () =>
    setSelectedInvoiceIds(allSelected ? [] : invoices.map((i) => i.id));

  const allConsentsGiven = consents.distanceSale && consents.preInfo && consents.refund;

  // Card number without spaces
  const rawCardNumber = cardNumber.replace(/\s+/g, '');
  const isCardValid =
    rawCardNumber.length >= 15 && // amex=15, others=16
    /^\d+$/.test(rawCardNumber);
  const isExpiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry);
  const isCvvValid = /^\d{3,4}$/.test(cardCvv);
  const canPay =
    hasSelection &&
    fullName.trim().length >= 3 &&
    isCardValid &&
    isExpiryValid &&
    isCvvValid &&
    allConsentsGiven &&
    !isSubmitting;

  const fmtAmount = (n: number) =>
    n.toLocaleString(isEn ? 'en-US' : 'tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const toggleConsent = (key: ConsentKey) =>
    setConsents((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleQuery = async () => {
    if (!subscriberNo.trim() || queryState === 'loading') return;
    setError(null);
    setInvoices([]);
    setSelectedInvoiceIds([]);
    setQueryState('loading');
    await new Promise((r) => setTimeout(r, 900));
    const isValid = /^\d{6,}$/.test(subscriberNo.trim());
    if (!isValid) {
      setQueryState('not_found');
      return;
    }
    const mock: Invoice[] = [
      { id: 'INV-2026-03', period: 'Mart 2026', dueDate: '2026-04-20', amount: 847.5 },
      { id: 'INV-2026-02', period: 'Şubat 2026', dueDate: '2026-03-20', amount: 612.3 },
      { id: 'INV-2026-01', period: 'Ocak 2026', dueDate: '2026-02-20', amount: 1025.9 },
    ];
    setInvoices(mock);
    setSelectedInvoiceIds(mock.map((i) => i.id));
    setQueryState('success');
    setStep(2);
  };

  const goToStep3 = () => {
    if (!hasSelection) return;
    setStep(3);
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canPay || !hasSelection) return;
    setError(null);
    setIsSubmitting(true);

    const [expMonth, expYear] = cardExpiry.split('/');

    const payload = {
      subscriberNo,
      invoiceIds: selectedInvoices.map((i) => i.id),
      invoicePeriods: selectedInvoices.map((i) => i.period),
      invoiceCount: selectedInvoices.length,
      amount: totalAmount,
      currency: 'TRY',
      fullName,
      card: {
        number: rawCardNumber,
        expMonth,
        expYear,
        cvv: cardCvv,
      },
      installment: 1,
      consents,
      successUrl: `${window.location.origin}/odeme/sonuc`,
      failUrl: `${window.location.origin}/odeme/hata`,
    };

    // Stash in sessionStorage; pending page performs the actual 3DS request.
    sessionStorage.setItem('remus.payment.payload', JSON.stringify(payload));
    window.location.href = '/odeme/beklemede';
  };

  const goBack = () => {
    setError(null);
    setStep((s) => (s > 1 ? ((s - 1) as StepId) : s));
  };

  return (
    <div className="w-full flex flex-col lg:flex-row lg:h-screen lg:overflow-hidden">
      {/* LEFT — Form panel (form card fills vertical space with logo pinned to its top) */}
      <div className="w-full lg:w-1/2 lg:h-screen flex flex-col bg-white lg:overflow-y-auto">
        {/* Middle: Form card centered */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-10 pt-10 pb-4">
          <div className="w-full max-w-xl">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-[0_4px_24px_-1px_rgba(16,185,129,0.08)] p-6 md:p-8">
              <a
                href="/"
                className="flex items-center justify-center mb-6 pb-5 border-b border-gray-100"
                aria-label="Remus Enerji"
              >
                <img src={remusLogo} alt="Remus Enerji" className="h-11 w-auto" />
              </a>
              <div className="text-center mb-5">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {t('Fatura Ödeme', 'Pay Your Bill')}
                </h1>
                <p className="text-sm text-gray-500 mt-2">
                  {step === 1 && t('Abonelik numaranız ile sorgu yapın', 'Query with your subscriber number')}
                  {step === 2 && t('Ödemek istediğiniz faturayı seçin', 'Select the invoice to pay')}
                  {step === 3 && t('Kart bilgilerinizi girin', 'Enter your card details')}
                </p>
              </div>

              <Stepper step={step} t={t} />

              <form onSubmit={handlePay} className="mt-6 space-y-4">
                {/* ---------------- STEP 1: Query ---------------- */}
                {step === 1 && (
                  <>
                    <div>
                      <label htmlFor="subscriberNo" className="block text-xs font-medium text-gray-700 mb-1.5">
                        {t('Abonelik / Tesisat No', 'Subscriber / Installation No')}{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Hash className="w-4 h-4 text-gray-400" />
                          </span>
                          <input
                            id="subscriberNo"
                            type="text"
                            value={subscriberNo}
                            onChange={(e) => {
                              setSubscriberNo(e.target.value);
                              if (queryState === 'not_found') setQueryState('idle');
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleQuery();
                              }
                            }}
                            placeholder={t('Örn: 4001234567', 'e.g. 4001234567')}
                            className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-gray-900 placeholder-gray-400 text-sm"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleQuery}
                          disabled={!subscriberNo.trim() || queryState === 'loading'}
                          className={cn(
                            'inline-flex items-center justify-center gap-1.5 px-4 rounded-xl text-sm font-semibold transition-all',
                            !subscriberNo.trim() || queryState === 'loading'
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              : 'bg-primary text-white hover:bg-primary/90 shadow-[0_4px_14px_rgba(16,185,129,0.3)]'
                          )}
                        >
                          {queryState === 'loading' ? <Spinner className="w-4 h-4" /> : <Search className="w-4 h-4" />}
                          <span>{t('Sorgula', 'Query')}</span>
                        </button>
                      </div>
                    </div>

                    {queryState === 'not_found' && (
                      <div className="rounded-xl bg-amber-50 border border-amber-200 px-3 py-2.5 text-sm text-amber-800">
                        {t(
                          'Bu abonelik numarasına ait ödenmemiş fatura bulunamadı. Lütfen numarayı kontrol ediniz.',
                          'No unpaid invoices found for this subscriber number. Please check the number.'
                        )}
                      </div>
                    )}

                    <p className="text-xs text-gray-500 pt-1">
                      {t(
                        'Abonelik numaranızı son faturanızın üzerinde bulabilirsiniz.',
                        'You can find your subscriber number on your latest invoice.'
                      )}
                    </p>
                  </>
                )}

                {/* ---------------- STEP 2: Invoice select ---------------- */}
                {step === 2 && (
                  <>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-700">
                        {t('Ödenmemiş Faturalarınız', 'Your Unpaid Invoices')}
                      </span>
                      <button
                        type="button"
                        onClick={toggleAll}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        {allSelected
                          ? t('Seçimi Temizle', 'Clear All')
                          : t('Tümünü Seç', 'Select All')}
                      </button>
                    </div>
                    <div className="space-y-2">
                      {invoices.map((inv) => {
                        const isSelected = selectedInvoiceIds.includes(inv.id);
                        return (
                          <label
                            key={inv.id}
                            className={cn(
                              'flex items-center gap-3 rounded-xl border px-3.5 py-3 cursor-pointer transition-all',
                              isSelected
                                ? 'border-primary bg-primary/5 shadow-[0_0_0_1px_rgba(16,185,129,0.35)]'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            )}
                          >
                            <input
                              type="checkbox"
                              value={inv.id}
                              checked={isSelected}
                              onChange={() => toggleInvoice(inv.id)}
                              className="sr-only"
                            />
                            <span
                              className={cn(
                                'w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all',
                                isSelected
                                  ? 'bg-primary border-primary'
                                  : 'bg-white border-gray-300'
                              )}
                            >
                              {isSelected && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                              )}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <Receipt className="w-3.5 h-3.5 text-gray-400" />
                                <span className="text-sm font-medium text-gray-900">{inv.period}</span>
                              </div>
                              <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-500">
                                <Calendar className="w-3 h-3" />
                                {t('Son Ödeme:', 'Due:')} {inv.dueDate}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-base font-bold text-gray-900">{fmtAmount(inv.amount)} ₺</div>
                            </div>
                          </label>
                        );
                      })}
                    </div>

                    <div
                      className={cn(
                        'rounded-xl border px-3.5 py-2.5 flex items-center justify-between transition-colors',
                        hasSelection
                          ? 'bg-primary/5 border-primary/15'
                          : 'bg-gray-50 border-gray-200'
                      )}
                    >
                      <span className="text-xs text-gray-600">
                        <span className="font-semibold text-gray-800">
                          {selectedInvoices.length}
                        </span>{' '}
                        / {invoices.length} {t('fatura seçili', 'selected')}
                      </span>
                      <span className="text-sm text-gray-600">
                        {t('Toplam', 'Total')}:{' '}
                        <span
                          className={cn(
                            'text-base font-bold',
                            hasSelection ? 'text-primary' : 'text-gray-400'
                          )}
                        >
                          {fmtAmount(totalAmount)} ₺
                        </span>
                      </span>
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={goBack}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        {t('Geri', 'Back')}
                      </button>
                      <button
                        type="button"
                        onClick={goToStep3}
                        disabled={!hasSelection}
                        className={cn(
                          'flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all',
                          hasSelection
                            ? 'bg-primary text-white hover:bg-primary/90 shadow-[0_4px_14px_rgba(16,185,129,0.3)]'
                            : 'bg-gray-300 text-white cursor-not-allowed'
                        )}
                      >
                        {t('Devam Et', 'Continue')}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}

                {/* ---------------- STEP 3: Card + Pay ---------------- */}
                {step === 3 && hasSelection && (
                  <>
                    {/* Invoice summary */}
                    <div className="rounded-xl bg-primary/5 border border-primary/15 p-3.5 flex items-center justify-between">
                      <div className="min-w-0">
                        <div className="text-xs text-gray-500">{t('Ödenecek Tutar', 'Amount Due')}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Receipt className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          <span className="text-sm font-medium text-gray-900 truncate">
                            {selectedInvoices.length === 1
                              ? selectedInvoices[0].period
                              : `${selectedInvoices.length} ${t('fatura', 'invoices')} · ${selectedInvoices
                                  .map((i) => i.period)
                                  .join(', ')}`}
                          </span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-primary flex-shrink-0 ml-3">
                        {fmtAmount(totalAmount)} ₺
                      </div>
                    </div>

                    {/* Cardholder */}
                    <Field
                      id="fullName"
                      label={t('Kart Üzerindeki İsim', 'Name on Card')}
                      icon={<User className="w-4 h-4 text-gray-400" />}
                      value={fullName}
                      onChange={setFullName}
                      placeholder={t('Ad Soyad', 'Full Name')}
                      required
                      autoComplete="cc-name"
                    />

                    {/* Card number */}
                    <div>
                      <label htmlFor="cardNumber" className="block text-xs font-medium text-gray-700 mb-1.5">
                        {t('Kart Numarası', 'Card Number')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                        </span>
                        <input
                          id="cardNumber"
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                          className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-gray-900 placeholder-gray-400 text-sm tracking-wider font-mono"
                        />
                      </div>
                    </div>

                    {/* Expiry + CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="cardExpiry" className="block text-xs font-medium text-gray-700 mb-1.5">
                          {t('Son Kullanma', 'Expiry')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="cardExpiry"
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                          placeholder={t('AA/YY', 'MM/YY')}
                          maxLength={5}
                          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-gray-900 placeholder-gray-400 text-sm font-mono"
                        />
                      </div>
                      <div>
                        <label htmlFor="cardCvv" className="block text-xs font-medium text-gray-700 mb-1.5">
                          CVV <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="cardCvv"
                            type="password"
                            inputMode="numeric"
                            autoComplete="cc-csc"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            placeholder="•••"
                            maxLength={4}
                            className="w-full pl-3 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-gray-900 placeholder-gray-400 text-sm font-mono"
                          />
                          <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <Lock className="w-4 h-4 text-gray-400" />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Consents */}
                    <div className="pt-1 space-y-2.5">
                      <ConsentRow checked={consents.distanceSale} onChange={() => toggleConsent('distanceSale')}>
                        <a href="/mesafeli-satis" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-0.5">
                          {t('Mesafeli Satış Sözleşmesi', 'Distance Sales Agreement')}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        {t("'ni okudum, kabul ediyorum.", ' — I have read and accept it.')}
                      </ConsentRow>
                      <ConsentRow checked={consents.preInfo} onChange={() => toggleConsent('preInfo')}>
                        <a href="/on-bilgilendirme" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-0.5">
                          {t('Ön Bilgilendirme Formu', 'Preliminary Information Form')}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        {t("'nu okudum, kabul ediyorum.", ' — I have read and accept it.')}
                      </ConsentRow>
                      <ConsentRow checked={consents.refund} onChange={() => toggleConsent('refund')}>
                        <a href="/iade-iptal" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-0.5">
                          {t('İade ve İptal Koşulları', 'Refund & Cancellation Terms')}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        {t("'nı okudum, kabul ediyorum.", ' — I have read and accept it.')}
                      </ConsentRow>
                    </div>

                    {error && (
                      <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
                        {error}
                      </div>
                    )}

                    <div className="pt-1 flex gap-2">
                      <button
                        type="button"
                        onClick={goBack}
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        {t('Geri', 'Back')}
                      </button>
                      <button
                        type="submit"
                        disabled={!canPay}
                        className={cn(
                          'flex-1 py-3 px-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2',
                          canPay
                            ? 'bg-primary hover:bg-primary/90 shadow-[0_4px_14px_rgba(16,185,129,0.3)] hover:-translate-y-0.5'
                            : 'bg-gray-300 cursor-not-allowed'
                        )}
                      >
                        {isSubmitting ? (
                          <Spinner className="h-5 w-5" />
                        ) : (
                          <>
                            <Lock className="w-4 h-4" />
                            {fmtAmount(totalAmount)} ₺ {t('Öde', 'Pay')}
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-1 flex items-center justify-center gap-1.5">
                      <Shield className="w-3 h-3" />
                      {t(
                        "Kart bilgileriniz İş Bankası'na güvenli kanaldan iletilir ve 3D Secure ile korunur",
                        'Your card info is securely transmitted to İşbank and protected by 3D Secure'
                      )}
                    </p>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Bottom: compact legal strip — centered, aligned to form card width */}
        <div className="px-4 sm:px-6 lg:px-10 pb-10 pt-2">
          <PaymentFooter />
        </div>
      </div>

      {/* RIGHT — Trust panel */}
      <div className="hidden lg:flex w-1/2 h-screen relative overflow-hidden flex-col justify-between p-10">
        <img
          src={paymentBanner}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, hsla(199, 89%, 40%, 0.12) 0%, hsla(163, 93%, 28%, 0.22) 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        <div className="relative flex justify-end gap-3">
          <TrustCard icon={<Shield className="w-4 h-4" />} title={t('SSL Güvenli', 'SSL Secured')} value="%100" />
          <TrustCard icon={<Lock className="w-4 h-4" />} title={t('3D Secure', '3D Secure')} value={t('Onaylı', 'Verified')} />
        </div>

        <div className="relative text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 mb-4">
            <div className="w-5 h-5 rounded-full bg-white/90 flex items-center justify-center">
              <Lock className="w-3 h-3 text-primary" />
            </div>
            <span className="text-xs font-medium">
              {t('İş Bankası Sanal POS', 'İşbank Virtual POS')}
            </span>
          </div>
          <h2 className="text-3xl xl:text-4xl font-bold mb-3 leading-tight">
            {t('Güvenli ve hızlı ödeme', 'Safe and fast payment')}
          </h2>
          <p className="text-white/90 text-sm xl:text-base mb-6 max-w-md">
            {t(
              'Kart bilgileriniz şifreli bağlantı üzerinden İş Bankası 3D Secure sistemine iletilir; Remus Enerji tarafından saklanmaz.',
              'Your card details are transmitted over an encrypted connection to İşbank 3D Secure; never stored by Remus Enerji.'
            )}
          </p>
          <div className="grid grid-cols-2 gap-6 max-w-sm">
            <StatPill title={t('Şifreli Bağlantı', 'Encrypted')} value="256-bit" />
            <StatPill title={t('Destek', 'Support')} value="7/24" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------ Helpers & subcomponents ------------------------ */

const formatCardNumber = (v: string) =>
  v
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();

const formatExpiry = (v: string) => {
  const digits = v.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

type StepperProps = { step: StepId; t: (tr: string, en: string) => string };

const Stepper: React.FC<StepperProps> = ({ step, t }) => {
  const steps: { id: StepId; label: string }[] = [
    { id: 1, label: t('Sorgula', 'Query') },
    { id: 2, label: t('Fatura Seç', 'Select') },
    { id: 3, label: t('Öde', 'Pay') },
  ];
  return (
    <div className="flex items-center justify-between gap-2">
      {steps.map((s, idx) => {
        const isDone = step > s.id;
        const isActive = step === s.id;
        return (
          <React.Fragment key={s.id}>
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors flex-shrink-0',
                  isDone
                    ? 'bg-primary text-white'
                    : isActive
                    ? 'bg-primary text-white shadow-[0_0_0_4px_rgba(16,185,129,0.2)]'
                    : 'bg-gray-100 text-gray-400'
                )}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.id}
              </div>
              <span
                className={cn(
                  'text-xs font-medium hidden sm:inline',
                  isActive ? 'text-gray-900' : isDone ? 'text-gray-600' : 'text-gray-400'
                )}
              >
                {s.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-[2px] rounded-full transition-colors',
                  step > s.id ? 'bg-primary' : 'bg-gray-200'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  required?: boolean;
  autoComplete?: string;
};

const Field: React.FC<FieldProps> = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  icon,
  required,
  autoComplete,
}) => (
  <div>
    <label htmlFor={id} className="block text-xs font-medium text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {icon && (
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </span>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className={cn(
          'w-full py-2.5 pr-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-gray-900 placeholder-gray-400 text-sm',
          icon ? 'pl-10' : 'pl-3'
        )}
      />
    </div>
  </div>
);

const ConsentRow: React.FC<{
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}> = ({ checked, onChange, children }) => (
  <label className="flex items-start gap-2.5 cursor-pointer group">
    <span className="relative flex-shrink-0 mt-0.5">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        className={cn(
          'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all',
          checked ? 'bg-primary border-primary' : 'bg-white border-gray-300 group-hover:border-primary/50'
        )}
      >
        {checked && <CheckCircle2 className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
      </span>
    </span>
    <span className="text-xs text-gray-600 leading-relaxed select-none">{children}</span>
  </label>
);

const TrustCard: React.FC<{ icon: React.ReactNode; title: string; value: string }> = ({
  icon,
  title,
  value,
}) => (
  <div className="rounded-2xl px-4 py-3 bg-white/15 backdrop-blur-md border border-white/30 text-white min-w-[140px]">
    <div className="flex items-center gap-1.5 text-xs opacity-90">
      {icon}
      <span>{title}</span>
    </div>
    <div className="text-xl font-bold mt-0.5">{value}</div>
  </div>
);

const Spinner: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg
    className={`animate-spin ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const StatPill: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div>
    <div className="text-white text-2xl font-bold">{value}</div>
    <div className="text-white/80 text-sm">{title}</div>
  </div>
);

export default Payment;
