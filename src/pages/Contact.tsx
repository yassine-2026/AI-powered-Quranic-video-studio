import React, { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { AdBlock } from '../components/AdBlock';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      
      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">{t('contact_title')}</h1>
        <p className="text-xl text-slate-600">{t('contact_subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">{t('contact_email_title')}</h3>
              <p className="text-slate-500 text-sm mb-2">{t('contact_email_desc')}</p>
              <a href="mailto:support@fincalc-pro.com" className="text-indigo-600 font-medium hover:underline" dir="ltr">support@fincalc-pro.com</a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">{t('contact_dev_title')}</h3>
              <p className="text-slate-500 text-sm">{t('contact_dev_desc')}</p>
            </div>
          </div>
          
          <div className="pt-4">
             <AdBlock format="rectangle" />
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm text-right rtl:text-right ltr:text-left">
            {success ? (
              <div className="bg-emerald-50 text-emerald-800 p-8 rounded-2xl text-center border border-emerald-100 flex flex-col items-center justify-center h-full min-h-[300px]">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">{t('contact_success_title')}</h3>
                <p>{t('contact_success_desc')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="text-start">
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      {t('contact_name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="text-start">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      {t('contact_email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="john@example.com"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="text-start">
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                    {t('contact_subject')}
                  </label>
                  <select
                    id="subject"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    <option value="">{t('contact_subject_placeholder')}</option>
                    <option value="support">{t('contact_subject_1')}</option>
                    <option value="feedback">{t('contact_subject_2')}</option>
                    <option value="business">{t('contact_subject_3')}</option>
                    <option value="other">{t('contact_subject_4')}</option>
                  </select>
                </div>

                <div className="text-start">
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    {t('contact_message')}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                    placeholder={t('contact_message_placeholder')}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>{t('contact_sending')}</>
                  ) : (
                    <>
                      {t('contact_submit')}
                      <Send className="w-4 h-4 rtl:rotate-180" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
