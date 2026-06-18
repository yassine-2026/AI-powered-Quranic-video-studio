import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { en } from './locales/en';
import { ar } from './locales/ar';
import { fr, es, de } from './locales/chunk1';
import { pt, it, tr, ru } from './locales/chunk2';
import { zh, ja, ko, hi, nl } from './locales/chunk3';
import { pl, sv, id, th, vi, bn } from './locales/chunk4';

const resources = {
  ar, en, fr, es, de, pt, it, tr, ru, zh, ja, ko, hi, nl, pl, sv, id, th, vi, bn
};

export const LANGUAGES = [
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'es', name: 'Español', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', dir: 'ltr' },
  { code: 'it', name: 'Italiano', dir: 'ltr' },
  { code: 'pt', name: 'Português', dir: 'ltr' },
  { code: 'tr', name: 'Türkçe', dir: 'ltr' },
  { code: 'ru', name: 'Русский', dir: 'ltr' },
  { code: 'zh', name: '中文 (简体)', dir: 'ltr' },
  { code: 'ja', name: '日本語', dir: 'ltr' },
  { code: 'ko', name: '한국어', dir: 'ltr' },
  { code: 'hi', name: 'हिन्दी', dir: 'ltr' },
  { code: 'nl', name: 'Nederlands', dir: 'ltr' },
  { code: 'pl', name: 'Polski', dir: 'ltr' },
  { code: 'sv', name: 'Svenska', dir: 'ltr' },
  { code: 'id', name: 'Bahasa Indonesia', dir: 'ltr' },
  { code: 'th', name: 'ไทย', dir: 'ltr' },
  { code: 'vi', name: 'Tiếng Việt', dir: 'ltr' },
  { code: 'bn', name: 'বাংলা', dir: 'ltr' },
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false, 
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

// Update the html dir attribute when language changes
i18n.on('languageChanged', (lng) => {
  const langObj = LANGUAGES.find(l => l.code === lng);
  if (langObj) {
    document.documentElement.dir = langObj.dir;
    document.documentElement.lang = langObj.code;
  } else {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = lng;
  }
});

// Set initial direction
const initialLangObj = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];
document.documentElement.dir = initialLangObj.dir;
document.documentElement.lang = initialLangObj.code;

export default i18n;
