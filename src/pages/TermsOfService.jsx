import { Scale, AlertCircle, FileCheck } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useAppContext } from '../context/AppContext';

export function TermsOfService() {
  return (
    <div className="flex flex-col">
      <main className="flex-1 pt-28 pb-20 max-w-4xl mx-auto px-4 w-full">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
          
          <div className="flex items-center space-x-4 mb-8 border-b border-slate-100 pb-8">
            <div className="w-16 h-16 bg-secondary-50 rounded-2xl flex items-center justify-center text-secondary-500 shrink-0">
              <Scale className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-secondary-500">Terms of Service</h1>
              <p className="text-slate-500 font-medium mt-1">Effective Date: October 2024</p>
            </div>
          </div>

          <div className="space-y-8 text-slate-600 leading-relaxed">
            
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><FileCheck className="w-5 h-5 mr-2 text-primary-500"/> 1. Acceptance of Terms</h2>
              <p>By accessing or using the VotePath platform, you agree to be bound by these Terms of Service. VotePath is an educational and informational tool designed to assist Indian citizens in understanding their voting rights and the electoral process.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><AlertCircle className="w-5 h-5 mr-2 text-red-500"/> 2. Disclaimer of Liability</h2>
              <p>VotePath relies on AI technology (Gemini) to simplify complex election guidelines. While we strive for accuracy, the information provided does not constitute official legal or government advice. Always cross-reference critical deadlines, document requirements, and eligibility rules with the official Election Commission of India (ECI) website or local authorities.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><Scale className="w-5 h-5 mr-2 text-secondary-500"/> 3. Acceptable Use</h2>
              <p>You agree to use VotePath solely for lawful purposes. You shall not attempt to reverse engineer the application, abuse the AI chatbot with malicious prompts, or utilize the platform for any automated scraping or unauthorized data harvesting activities.</p>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
