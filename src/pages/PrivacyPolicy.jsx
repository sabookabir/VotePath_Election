import { Shield, Lock, FileText, Globe } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useAppContext } from '../context/AppContext';

export function PrivacyPolicy() {
  return (
    <div className="flex flex-col">
      <main className="flex-1 pt-28 pb-20 max-w-4xl mx-auto px-4 w-full">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
          
          <div className="flex items-center space-x-4 mb-8 border-b border-slate-100 pb-8">
            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-500 shrink-0">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-secondary-500">Privacy Policy</h1>
              <p className="text-slate-500 font-medium mt-1">Last Updated: October 2024</p>
            </div>
          </div>

          <div className="space-y-8 text-slate-600 leading-relaxed">
            
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><Lock className="w-5 h-5 mr-2 text-primary-500"/> 1. Information We Collect</h2>
              <p>VotePath respects your privacy. We collect minimal information necessary to provide our services. When you use the AI Eligibility Check or Polling Booth Finder, we temporarily process:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Age and City/State to determine voting eligibility.</li>
                <li>Temporary geolocation data (only when explicitly requested by you) to find nearby polling stations.</li>
                <li>Device and browser type for analytical purposes to improve our platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><FileText className="w-5 h-5 mr-2 text-success-500"/> 2. How We Use Your Data</h2>
              <p>We do not store your personal queries. The data provided to our AI Assistant is processed in real-time through secure API connections to generate immediate answers regarding election laws and eligibility. We do not sell, rent, or share your personal data with third-party advertisers.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><Globe className="w-5 h-5 mr-2 text-secondary-500"/> 3. Third-Party Integrations</h2>
              <p>VotePath utilizes external services such as the Google Gemini API for intelligent text processing and OpenStreetMap Nominatim for geolocation services. By using our platform, you acknowledge that anonymized prompt data or coordinates may be securely transmitted to these providers strictly for fulfilling your requests.</p>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
