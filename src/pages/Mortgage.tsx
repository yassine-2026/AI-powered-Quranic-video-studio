import React, { useState, useMemo } from 'react';
import { AdBlock } from '../components/AdBlock';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';

export default function Mortgage() {
  const [principal, setPrincipal] = useState<number>(500000);
  const [years, setYears] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [downPayment, setDownPayment] = useState<number>(100000);
  const { t } = useTranslation();

  const results = useMemo(() => {
    const loanAmount = principal - downPayment;
    if (loanAmount <= 0) return null;

    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = years * 12;

    let monthlyPayment = 0;
    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / numberOfPayments;
    } else {
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    return {
      loanAmount,
      monthlyPayment,
      totalPayment,
      totalInterest
    };
  }, [principal, years, interestRate, downPayment]);

  const chartData = results ? [
    { name: t('mortgage_principal'), value: results.loanAmount, color: '#4f46e5' },
    { name: t('mortgage_total_interest'), value: results.totalInterest, color: '#ef4444' },
  ] : [];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('mortgage_title')}</h1>
        <p className="text-slate-600">{t('mortgage_subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t('mortgage_prop_value')}
            </label>
            <div className="relative">
              <input
                type="number"
                value={principal || ''}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="500000"
              />
              <span className="absolute rtl:left-4 ltr:right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">{t('currency')}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t('mortgage_down_payment')}
            </label>
            <div className="relative">
              <input
                type="number"
                value={downPayment || ''}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
              <span className="absolute rtl:left-4 ltr:right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">{t('currency')}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t('mortgage_years')}
            </label>
            <input
              type="number"
              value={years || ''}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t('mortgage_interest')}
            </label>
            <input
              type="number"
              step="0.1"
              value={interestRate || ''}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="4.5"
            />
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-2 space-y-6">
          {results ? (
            <>
              <div className="bg-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10">
                  <h3 className="text-indigo-100 mb-2 font-medium">{t('mortgage_monthly_payment')}</h3>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl sm:text-5xl font-bold">{results.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    <span className="text-xl text-indigo-200 mb-1">{t('currency')}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="block text-sm text-slate-500 mb-1">{t('mortgage_loan_amount')}</span>
                  <span className="text-lg font-bold text-slate-900">{results.loanAmount.toLocaleString()} {t('currency')}</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="block text-sm text-slate-500 mb-1">{t('mortgage_total_interest')}</span>
                  <span className="text-lg font-bold text-red-500">{results.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })} {t('currency')}</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="block text-sm text-slate-500 mb-1">{t('mortgage_total_payment')}</span>
                  <span className="text-lg font-bold text-slate-900">{results.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })} {t('currency')}</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[300px]" dir="ltr">
                <h3 className="text-lg font-bold text-slate-900 mx-auto text-center mb-4">{t('mortgage_cost_breakdown')}</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${t('currency')}`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center h-full text-center min-h-[400px]">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-lg font-medium text-slate-900">{t('mortgage_invalid_data')}</h3>
              <p className="text-slate-500 mt-2">{t('mortgage_invalid_desc')}</p>
            </div>
          )}
          
          <AdBlock format="horizontal" />
        </div>
      </div>
    </div>
  );
}
