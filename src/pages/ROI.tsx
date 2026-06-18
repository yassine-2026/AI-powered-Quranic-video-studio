import React, { useState, useMemo } from 'react';
import { AdBlock } from '../components/AdBlock';
import { useTranslation } from 'react-i18next';

export default function ROI() {
  const [invested, setInvested] = useState<number>(1000);
  const [returned, setReturned] = useState<number>(1250);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(1);
  const { t } = useTranslation();

  const results = useMemo(() => {
    if (invested <= 0) return null;

    const netProfit = returned - invested;
    const roi = (netProfit / invested) * 100;
    
    // Annualized ROI
    let annualizedRoi = 0;
    if (investmentPeriod > 0) {
      annualizedRoi = ((Math.pow(returned / invested, 1 / investmentPeriod)) - 1) * 100;
    }

    return {
      netProfit,
      roi,
      annualizedRoi,
      isPositive: netProfit >= 0
    };
  }, [invested, returned, investmentPeriod]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('roi_title')}</h1>
        <p className="text-slate-600">{t('roi_subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t('roi_invested')}
            </label>
            <div className="relative">
              <input
                type="number"
                value={invested || ''}
                onChange={(e) => setInvested(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                placeholder="1000"
              />
              <span className="absolute rtl:left-4 ltr:right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">{t('currency')}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t('roi_returned')}
            </label>
            <div className="relative">
              <input
                type="number"
                value={returned || ''}
                onChange={(e) => setReturned(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                placeholder="1250"
              />
              <span className="absolute rtl:left-4 ltr:right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">{t('currency')}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t('roi_period')}
            </label>
            <input
              type="number"
              step="0.5"
              value={investmentPeriod || ''}
              onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
              placeholder="1"
            />
          </div>
        </div>

        <div className="space-y-6">
          {results ? (
            <>
              <div className={`rounded-3xl p-8 text-white shadow-md relative overflow-hidden ${results.isPositive ? 'bg-amber-500' : 'bg-red-500'}`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10 text-center">
                  <h3 className="text-amber-50 mb-2 font-medium">{t('roi_percentage')}</h3>
                  <div className="text-5xl font-bold" dir="ltr">
                    {results.roi.toFixed(2)}%
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                  <span className="block text-sm text-slate-500 mb-2">{t('roi_net')}</span>
                  <span className={`text-2xl font-bold ${results.isPositive ? 'text-emerald-500' : 'text-red-500'}`} dir="ltr">
                    {Math.abs(results.netProfit).toLocaleString()} {t('currency')} {results.netProfit > 0 ? '+' : (results.netProfit < 0 ? '-' : '')}
                  </span>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center opacity-90">
                  <span className="block text-sm text-slate-500 mb-2" title={t('roi_annualized_tooltip')}>{t('roi_annualized')}</span>
                  <span className={`text-2xl font-bold ${results.annualizedRoi >= 0 ? 'text-amber-600' : 'text-red-500'}`} dir="ltr">
                    {results.annualizedRoi ? `${results.annualizedRoi.toFixed(2)}%` : '-'}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center h-full text-center">
              <span className="text-4xl mb-4">💡</span>
              <p className="text-slate-500">{t('roi_invalid')}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="pt-8">
        <AdBlock format="horizontal" />
      </div>
    </div>
  );
}
