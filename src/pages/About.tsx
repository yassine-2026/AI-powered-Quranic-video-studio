import React from 'react';
import { Calculator } from 'lucide-react';
import { AdBlock } from '../components/AdBlock';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <div className="text-center">
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Calculator className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">{t('about_title')}</h1>
        <p className="text-xl text-slate-600">{t('about_subtitle')}</p>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed text-lg">
        <p>
          {t('about_p1')}
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('about_h2_1')}</h2>
        <ul className="list-disc list-outside pl-4 pr-6 space-y-3 marker:text-indigo-500">
          <li>{t('about_li1')}</li>
          <li>{t('about_li2')}</li>
          <li>{t('about_li3')}</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{t('about_h2_2')}</h2>
        <p>
          {t('about_p2')}
        </p>

        <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 mt-8">
          <p className="text-indigo-800 text-base font-medium m-0">
            {t('about_disclaimer')}
          </p>
        </div>
      </div>

      <AdBlock format="horizontal" />
    </div>
  );
}
