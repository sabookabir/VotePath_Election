import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Globe, UserCircle } from 'lucide-react';
import { translations } from '../../data/translations';

export function Navbar() {
  const { t, language, setLanguage } = useAppContext();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/votepath_logo.jpg" alt="VotePath Logo" className="h-16 w-auto object-contain py-1" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-10">
            <Link to="/" className={`text-[15px] font-bold transition-colors hover:text-primary-600 ${isActive('/') ? 'text-primary-600' : 'text-slate-600'}`}>
              {t.nav.home}
            </Link>
            <Link to="/flow" className={`text-[15px] font-bold transition-colors hover:text-primary-600 ${isActive('/flow') ? 'text-primary-600' : 'text-slate-600'}`}>
              {t.nav.flow}
            </Link>
            <Link to="/dashboard" className={`text-[15px] font-bold transition-colors hover:text-primary-600 ${isActive('/dashboard') ? 'text-primary-600' : 'text-slate-600'}`}>
              {t.nav.dashboard}
            </Link>
            <Link to="/assistant" className={`text-[15px] font-bold transition-colors hover:text-primary-600 ${isActive('/assistant') ? 'text-primary-600' : 'text-slate-600'}`}>
              {t.nav.assistant}
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-5">
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 border-2 border-slate-200 rounded-full hover:border-primary-300 hover:bg-primary-50 transition-all text-sm font-bold text-slate-700">
                <Globe className="w-4 h-4 text-primary-500" />
                <span>{translations[language].name}</span>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                <div className="py-2">
                  {Object.entries(translations).map(([code, lang]) => (
                    <button
                      key={code}
                      onClick={() => setLanguage(code)}
                      className={`block w-full text-left px-5 py-2.5 text-sm hover:bg-primary-50 hover:text-primary-600 transition-colors ${language === code ? 'bg-primary-50 text-primary-600 font-bold' : 'text-slate-700 font-medium'}`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Avatar */}
            <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center cursor-pointer hover:border-secondary-500 transition-colors">
              <UserCircle className="w-6 h-6 text-secondary-500" />
            </div>
          </div>
          
        </div>
      </div>
    </nav>
  );
}
