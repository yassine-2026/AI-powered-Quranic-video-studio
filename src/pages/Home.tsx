import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, LineChart, FileText, ArrowLeft, Coins } from 'lucide-react';
import { AdBlock } from '../components/AdBlock';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  const tools = [
    {
      name: t('tool_mortgage_title'),
      description: t('tool_mortgage_desc'),
      icon: FileText,
      href: '/mortgage-calculator',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      name: t('tool_compound_title'),
      description: t('tool_compound_desc'),
      icon: LineChart,
      href: '/compound-interest',
      color: 'bg-red-100 text-red-600',
    },
    {
      name: t('tool_roi_title'),
      description: t('tool_roi_desc'),
      icon: Coins,
      href: '/roi-calculator',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 sm:px-6 lg:px-8 bg-white rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-16 -mt-16 opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight mb-6 leading-tight">
            {t('home_title')} <span className="text-indigo-600">{t('home_title_highlight')}</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg text-slate-500 mb-8 leading-relaxed">
            {t('home_desc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/compound-interest"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors shadow-sm"
            >
              {t('home_btn_compound')}
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-700 font-bold hover:bg-slate-50 transition-colors border border-slate-300 shadow-sm"
            >
              {t('home_btn_about')}
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">{t('home_tools_title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              to={tool.href}
              className="group relative bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-400 flex flex-col items-center justify-center text-center transition-all shadow-sm sm:p-8"
            >
              <div className={`w-12 h-12 ${tool.color} rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                <tool.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">{tool.name}</h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                {tool.description}
              </p>
              <div className="flex items-center text-indigo-600 font-medium text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <span>{t('home_tools_start')}</span>
                <ArrowLeft className="w-3 h-3 mx-1 rtl:rotate-180" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <AdBlock format="horizontal" />

      {/* Info Section */}
      <section className="bg-indigo-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-500 opacity-20 blur-3xl"></div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('home_why_title')}</h2>
          <p className="text-indigo-100 text-base leading-relaxed mb-8 opacity-90">
            {t('home_why_desc')}
          </p>
          <ul className="space-y-4">
            {[
              t('home_why_1'),
              t('home_why_2'),
              t('home_why_3'),
              t('home_why_4')
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-indigo-800 text-green-400 flex items-center justify-center shrink-0 border border-indigo-700">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="opacity-90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
