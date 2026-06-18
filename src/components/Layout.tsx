import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Calculator, LineChart, FileText, Info, Mail, Menu, X, Coins } from 'lucide-react';
import { cn } from '../lib/utils';
import { AdBlock } from './AdBlock';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navigation = [
    { name: t('nav_home'), href: '/', icon: Calculator },
    { name: t('nav_mortgage'), href: '/mortgage-calculator', icon: FileText },
    { name: t('nav_compound'), href: '/compound-interest', icon: LineChart },
    { name: t('nav_roi'), href: '/roi-calculator', icon: Coins },
    { name: t('nav_blog'), href: '/blog', icon: FileText },
    { name: t('nav_about'), href: '/about', icon: Info },
    { name: t('nav_contact'), href: '/contact', icon: Mail },
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-2xl text-slate-800 tracking-tight">{t('app_brand')}<span className="text-indigo-600"> {t('app_brand_highlight')}</span></span>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex md:space-x-8 md:space-x-reverse items-center justify-center">
                {navigation.slice(0, 5).map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "inline-flex items-center pt-1 border-b-2 text-sm font-medium transition-colors pb-1",
                        isActive 
                          ? "border-indigo-600 text-indigo-600" 
                          : "border-transparent text-slate-600 hover:border-slate-300 hover:text-indigo-600"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              <LanguageSwitcher />

              {/* Mobile menu button */}
              <div className="flex items-center md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                >
                  <span className="sr-only">{t('nav_home')} Menu</span>
                  {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={closeMenu}
                    className={cn(
                      "block px-4 py-2 text-base font-medium",
                      isActive
                        ? "text-indigo-700 bg-indigo-50"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdBlock format="horizontal" className="mb-8 hidden sm:flex" />
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto shrink-0 py-8 text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl text-slate-800">{t('app_brand')} {t('app_brand_highlight')}</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                {t('footer_desc')}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-slate-800 tracking-wider uppercase mb-4">{t('footer_tools_title')}</h3>
              <ul className="space-y-3">
                <li><Link to="/mortgage-calculator" className="text-sm hover:text-indigo-600 transition-colors text-slate-500">{t('nav_mortgage')}</Link></li>
                <li><Link to="/compound-interest" className="text-sm hover:text-indigo-600 transition-colors text-slate-500">{t('nav_compound')}</Link></li>
                <li><Link to="/roi-calculator" className="text-sm hover:text-indigo-600 transition-colors text-slate-500">{t('nav_roi')}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-800 tracking-wider uppercase mb-4">{t('footer_links_title')}</h3>
              <ul className="space-y-3">
                <li><Link to="/blog" className="text-sm hover:text-indigo-600 transition-colors text-slate-500">{t('nav_blog')}</Link></li>
                <li><Link to="/about" className="text-sm hover:text-indigo-600 transition-colors text-slate-500">{t('nav_about')}</Link></li>
                <li><Link to="/contact" className="text-sm hover:text-indigo-600 transition-colors text-slate-500">{t('nav_contact')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 mt-4 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-400">
            <p>&copy; {new Date().getFullYear()} {t('footer_rights')}</p>
            <div className="flex gap-4 space-x-4 space-x-reverse">
              <Link to="#" className="hover:text-slate-600 transition-colors">{t('footer_privacy')}</Link>
              <Link to="#" className="hover:text-slate-600 transition-colors">{t('footer_terms')}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
