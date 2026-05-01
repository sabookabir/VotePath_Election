import { useState } from 'react';
import { Mail, Bug, MessageSquarePlus, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/shared/Button';

export function SupportPage() {
  const { t, changeLanguage } = useAppContext();
  const [activeTab, setActiveTab] = useState('contact'); // 'contact', 'feedback', 'bug'
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      e.target.reset();
    }, 3000);
  };

  return (
    <div className="flex flex-col">
      <main className="flex-1 pt-28 pb-20 max-w-3xl mx-auto px-4 w-full">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-secondary-500 mb-4">How can we help you?</h1>
          <p className="text-slate-500 font-medium">Select a category below to get in touch with the VotePath team.</p>
        </div>

        {/* Custom Tabs */}
        <div className="flex p-1 bg-slate-200/60 rounded-2xl mb-8">
          <button 
            onClick={() => setActiveTab('contact')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center ${activeTab === 'contact' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Mail className="w-4 h-4 mr-2" /> Contact Support
          </button>
          <button 
            onClick={() => setActiveTab('feedback')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center ${activeTab === 'feedback' ? 'bg-white text-success-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <MessageSquarePlus className="w-4 h-4 mr-2" /> Feedback
          </button>
          <button 
            onClick={() => setActiveTab('bug')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center ${activeTab === 'bug' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Bug className="w-4 h-4 mr-2" /> Report Bug
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-6 text-success-500">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Message Received!</h3>
              <p className="text-slate-500">Thank you for reaching out. Our team will look into it.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="Doe" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input required type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="john@example.com" />
              </div>

              {activeTab === 'bug' && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Severity Level</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-slate-50 focus:bg-white">
                    <option>Minor Issue (UI Glitch)</option>
                    <option>Major Issue (Feature not working)</option>
                    <option>Critical (Crash/Data Loss)</option>
                  </select>
                </div>
              )}

              {activeTab === 'feedback' && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Rate your experience</label>
                  <div className="flex space-x-4">
                    {[1, 2, 3, 4, 5].map(num => (
                      <label key={num} className="cursor-pointer">
                        <input type="radio" name="rating" className="sr-only peer" />
                        <div className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center font-bold text-slate-500 peer-checked:bg-primary-500 peer-checked:border-primary-500 peer-checked:text-white transition-all">
                          {num}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  {activeTab === 'contact' ? 'How can we help?' : activeTab === 'bug' ? 'Describe the bug in detail' : 'What features would you like to see?'}
                </label>
                <textarea required rows="5" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-slate-50 focus:bg-white resize-none" placeholder="Type your message here..."></textarea>
              </div>

              <Button type="submit" size="lg" className="w-full bg-secondary-500 hover:bg-secondary-600 text-white rounded-xl h-14 text-lg">
                Submit {activeTab === 'contact' ? 'Message' : activeTab === 'bug' ? 'Report' : 'Feedback'}
              </Button>

            </form>
          )}

        </div>
      </main>
    </div>
  );
}
