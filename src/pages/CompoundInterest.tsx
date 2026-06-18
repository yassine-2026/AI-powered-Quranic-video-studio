import React, { useState, useMemo } from 'react';
import { AdBlock } from '../components/AdBlock';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

export default function CompoundInterest() {
  const [initialAmount, setInitialAmount] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [years, setYears] = useState<number>(10);
  const [interestRate, setInterestRate] = useState<number>(7);
  const { t } = useTranslation();

  const results = useMemo(() => {
    let currentTotal = initialAmount;
    let totalInvested = initialAmount;
    let chartData = [];
    
    // Add year 0
    chartData.push({
      year: 0,
      total: currentTotal,
      invested: totalInvested,
      interest: 0
    });

    const monthlyRate = (interestRate / 100) / 12;

    for (let y = 1; y <= years; y++) {
      for (let m = 1; m <= 12; m++) {
        currentTotal += monthlyContribution;
        currentTotal *= (1 + monthlyRate);
        totalInvested += monthlyContribution;
      }
      
      chartData.push({
        year: y,
        total: Math.round(currentTotal),
        invested: totalInvested,
        interest: Math.round(currentTotal - totalInvested)
      });
    }

    return {
      finalAmount: currentTotal,
      totalInvested: totalInvested,
      totalInterest: currentTotal - totalInvested,
      data: chartData
    };
  }, [initialAmount, monthlyContribution, years, interestRate]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('compound_title')}</h1>
        <p className="text-slate-600">{t('compound_subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 h-fit">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t('compound_initial')}
            </label>
            <div className="relative">
              <input
                type="number"
                value={initialAmount || ''}
                onChange={(e) => setInitialAmount(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              />
              <span className="absolute rtl:left-4 ltr:right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">{t('currency')}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t('compound_monthly')}
            </label>
            <div className="relative">
              <input
                type="number"
                value={monthlyContribution || ''}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              />
              <span className="absolute rtl:left-4 ltr:right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">{t('currency')}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t('compound_years')}
            </label>
            <input
              type="number"
              value={years || ''}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t('compound_interest')}
            </label>
            <input
              type="number"
              step="0.1"
              value={interestRate || ''}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10">
              <h3 className="text-indigo-100 mb-2 font-medium">{t('compound_final_amount')}</h3>
              <div className="flex items-end gap-2">
                <span className="text-4xl sm:text-5xl font-bold">{results.finalAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                <span className="text-xl text-indigo-200 mb-1">{t('currency')}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="block text-sm text-slate-500 mb-1">{t('compound_total_invested')}</span>
              <span className="text-lg font-bold text-slate-900">{results.totalInvested.toLocaleString()} {t('currency')}</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="block text-sm text-slate-500 mb-1">{t('compound_total_interest')}</span>
              <span className="text-lg font-bold text-emerald-500">+{results.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })} {t('currency')}</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[400px]" dir="ltr">
            <h3 className="text-lg font-bold text-slate-900 mx-auto text-center mb-6">{t('compound_chart_title')}</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={results.data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" tickFormatter={(value) => `${t('compound_year_prefix')} ${value}`} axisLine={false} tickLine={false} />
                <YAxis 
                  tickFormatter={(value) => `$${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`} 
                  axisLine={false} 
                  tickLine={false}
                  orientation="right"
                />
                <Tooltip 
                  formatter={(value: number) => [`${value.toLocaleString()} ${t('currency')}`, t('compound_tooltip_amount')]}
                  labelFormatter={(label) => `${t('compound_tooltip_year')} ${label}`}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'right' }}
                />
                <Area type="monotone" dataKey="total" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <AdBlock format="horizontal" />
        </div>
      </div>
    </div>
  );
}
