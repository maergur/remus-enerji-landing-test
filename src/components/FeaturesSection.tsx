import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check, X } from 'lucide-react';

// Check and cross icons for the comparison table
const CheckIcon = ({ className = "" }: { className?: string }) => (
  <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/15 ${className}`}>
    <Check className="w-5 h-5 text-primary" />
  </div>
);

const CrossIcon = ({ className = "" }: { className?: string }) => (
  <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 ${className}`}>
    <X className="w-5 h-5 text-red-500" />
  </div>
);

const FeaturesSection = () => {
  const { t } = useTranslation();
  return (
    <section className="pt-12 pb-24 relative overflow-hidden bg-white">
      {/* Background effects - subtle for light theme */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Comparison Section */}
        <div>
          <h2 className="section-title-gradient text-center animate-slide-up">{t('features.new_era')}</h2>
          
          {/* Desktop Comparison Table */}
          <div className="overflow-x-auto mt-12 hidden md:block animate-slide-up delay-200">
            <div className="max-w-5xl w-full mx-auto rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-white">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-primary/10 to-blue-400/10">
                    <th className="w-1/4 p-4 text-left text-sm font-bold text-gray-900"></th>
                    <th className="w-1/4 p-4 text-left text-sm font-bold text-gray-900"></th>
                    <th className="w-1/4 p-4 text-sm font-bold text-primary">{t('features.comparison.remus')}</th>
                    <th className="w-1/4 p-4 text-sm font-bold text-gray-500">{t('features.comparison.traditional')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="font-semibold text-gray-900 p-4 align-top">{t('features.comparison.how_billing')}</td>
                    <td className="p-4 text-gray-600 text-sm border-l border-gray-100">{t('features.comparison.pay_only')}</td>
                    <td className="p-4 border-l border-gray-100 text-center"><CheckIcon /></td>
                    <td className="p-4 border-l border-gray-100 text-center text-gray-500 text-sm">{t('features.comparison.guarantee_none')}</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/50">
                    <td className="p-4"></td>
                    <td className="p-4 text-gray-600 text-sm border-l border-gray-100">{t('features.comparison.hourly_pricing')}</td>
                    <td className="p-4 border-l border-gray-100 text-center"><CheckIcon /></td>
                    <td className="p-4 border-l border-gray-100 text-center"><CrossIcon /></td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="p-4"></td>
                    <td className="p-4 text-gray-600 text-sm border-l border-gray-100">{t('features.comparison.cancel_anytime')}</td>
                    <td className="p-4 border-l border-gray-100 text-center"><CheckIcon /></td>
                    <td className="p-4 border-l border-gray-100 text-center"><CrossIcon /></td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/50">
                    <td className="font-semibold text-gray-900 p-4 align-top">{t('features.comparison.support')}</td>
                    <td className="p-4 text-gray-600 text-sm border-l border-gray-100">{t('features.comparison.manage_everything')}</td>
                    <td className="p-4 border-l border-gray-100 text-center"><CheckIcon /></td>
                    <td className="p-4 border-l border-gray-100 text-center"><CrossIcon /></td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="p-4"></td>
                    <td className="p-4 text-gray-600 text-sm border-l border-gray-100">{t('features.comparison.fast_ui')}</td>
                    <td className="p-4 border-l border-gray-100 text-center"><CheckIcon /></td>
                    <td className="p-4 border-l border-gray-100 text-center text-gray-500 text-sm">{t('features.comparison.guarantee_none')}</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/50">
                    <td className="font-semibold text-gray-900 p-4 align-top">{t('features.comparison.what_else')}</td>
                    <td className="p-4 text-gray-600 text-sm border-l border-gray-100">{t('features.comparison.smart_device')}</td>
                    <td className="p-4 border-l border-gray-100 text-center"><CheckIcon /></td>
                    <td className="p-4 border-l border-gray-100 text-center"><CrossIcon /></td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="p-4"></td>
                    <td className="p-4 text-gray-600 text-sm border-l border-gray-100">{t('features.comparison.smart_meter')}</td>
                    <td className="p-4 border-l border-gray-100 text-center"><CheckIcon /></td>
                    <td className="p-4 border-l border-gray-100 text-center"><CrossIcon /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Mobile Comparison Cards */}
          <div className="block md:hidden mt-8 space-y-4">
            {/* Card 1 */}
            <div className="feature-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="font-bold text-gray-900 mb-2 text-sm">{t('features.comparison.how_billing')}</div>
              <div className="text-xs text-gray-600 mb-3">{t('features.comparison.pay_only')}</div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-semibold">{t('features.comparison.remus')}</span>
                  <CheckIcon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{t('features.comparison.traditional')}</span>
                  <span className="text-gray-500 text-[10px]">{t('features.comparison.guarantee_none')}</span>
                </div>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="feature-card animate-slide-up" style={{ animationDelay: '0.15s' }}>
              <div className="text-xs text-gray-600 mb-3">{t('features.comparison.hourly_pricing')}</div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-semibold">{t('features.comparison.remus')}</span>
                  <CheckIcon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{t('features.comparison.traditional')}</span>
                  <CrossIcon className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="feature-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-xs text-gray-600 mb-3">{t('features.comparison.cancel_anytime')}</div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-semibold">{t('features.comparison.remus')}</span>
                  <CheckIcon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{t('features.comparison.traditional')}</span>
                  <CrossIcon className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            {/* Card 4 */}
            <div className="feature-card animate-slide-up" style={{ animationDelay: '0.25s' }}>
              <div className="font-bold text-gray-900 mb-2 text-sm">{t('features.comparison.support')}</div>
              <div className="text-xs text-gray-600 mb-3">{t('features.comparison.manage_everything')}</div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-semibold">{t('features.comparison.remus')}</span>
                  <CheckIcon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{t('features.comparison.traditional')}</span>
                  <CrossIcon className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            {/* Card 5 */}
            <div className="feature-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="font-bold text-gray-900 mb-2 text-sm">{t('features.comparison.what_else')}</div>
              <div className="text-xs text-gray-600 mb-3">{t('features.comparison.smart_device')}</div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-semibold">{t('features.comparison.remus')}</span>
                  <CheckIcon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{t('features.comparison.traditional')}</span>
                  <CrossIcon className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            {/* Card 6 */}
            <div className="feature-card animate-slide-up" style={{ animationDelay: '0.35s' }}>
              <div className="text-xs text-gray-600 mb-3">{t('features.comparison.smart_meter')}</div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-semibold">{t('features.comparison.remus')}</span>
                  <CheckIcon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{t('features.comparison.traditional')}</span>
                  <CrossIcon className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
