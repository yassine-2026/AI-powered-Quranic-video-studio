import React from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../i18n';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="relative group inline-block">
      <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium uppercase">{i18n.language}</span>
      </button>
      <div className="absolute right-0 top-full mt-1 w-48 max-h-96 overflow-y-auto bg-white rounded-xl shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        <div className="py-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              className={`w-full text-start px-4 py-2 text-sm transition-colors ${
                i18n.language === lang.code
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              dir={lang.dir}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
