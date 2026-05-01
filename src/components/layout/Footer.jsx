import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export function Footer() {
  const { t } = useAppContext();
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-2">
            <img src="/votepath_logo.jpg" alt="VotePath Logo" className="h-10 w-auto object-contain" />
          </div>
          
          <div className="flex space-x-6 text-sm text-slate-500 font-medium">
            <Link to="/privacy" className="hover:text-primary-500 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary-500 transition-colors">Terms of Service</Link>
            <Link to="/support" className="hover:text-primary-500 transition-colors">Contact Support</Link>
          </div>
          
          <div className="flex items-center text-slate-500 text-sm font-medium">
            Built with <Heart className="w-4 h-4 text-red-500 mx-1" /> for India
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} VotePath. Not an official government application.
        </div>
      </div>
    </footer>
  );
}
