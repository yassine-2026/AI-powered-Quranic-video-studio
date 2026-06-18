import React from 'react';
import { AdBlock } from '../components/AdBlock';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Blog() {
  const { t } = useTranslation();

  const posts = [
    {
      id: 1,
      title: t('blog_1_title'),
      excerpt: t('blog_1_excerpt'),
      date: '2023-11-15',
      category: t('blog_1_cat'),
    },
    {
      id: 2,
      title: t('blog_2_title'),
      excerpt: t('blog_2_excerpt'),
      date: '2023-10-28',
      category: t('blog_2_cat'),
    },
    {
      id: 3,
      title: t('blog_3_title'),
      excerpt: t('blog_3_excerpt'),
      date: '2023-10-02',
      category: t('blog_3_cat'),
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">{t('blog_title')}</h1>
        <p className="text-slate-600 text-lg">
          {t('blog_subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-medium px-2.5 py-1 rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center text-slate-400 text-xs gap-1">
                  <Calendar className="w-3 h-3" />
                  <time dateTime={post.date}>{post.date}</time>
                </div>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                <Link to="#" className="hover:text-indigo-600 transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link to="#" className="text-indigo-600 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all group">
                  {t('blog_read_more')} <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180 transform group-hover:-translate-x-1 ltr:group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button className="px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors opacity-50 cursor-not-allowed">
          {t('blog_load_more')}
        </button>
      </div>

      <div className="pt-8">
        <AdBlock format="horizontal" />
      </div>
    </div>
  );
}
