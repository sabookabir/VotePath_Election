import { Sparkles, ClipboardList, MapPin, CalendarDays, Bot } from 'lucide-react';
import { Card } from '../shared/Card';
import { useNavigate } from 'react-router-dom';

export function FeatureCards({ t }) {
  const navigate = useNavigate();

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-secondary-500 mb-4">Everything You Need in One Place</h2>
        <p className="text-slate-500 font-medium text-lg">No more confusing government websites. Just clear, actionable steps.</p>
      </div>
      
      {/* 5 Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        
        {/* Card 1 */}
        <Card onClick={() => navigate('/flow')} className="bg-white hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,153,51,0.3)] transition-all duration-300 p-8 border border-slate-100 cursor-pointer group rounded-3xl lg:col-span-1 md:col-span-1">
          <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">{t.landing.features.eligibilityTitle}</h3>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">{t.landing.features.eligibilityDesc}</p>
        </Card>

        {/* Card 2 */}
        <Card onClick={() => document.getElementById('booth-finder').scrollIntoView({ behavior: 'smooth' })} className="bg-white hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(13,27,61,0.3)] transition-all duration-300 p-8 border border-slate-100 cursor-pointer group rounded-3xl lg:col-span-1 md:col-span-1">
          <div className="w-14 h-14 rounded-2xl bg-secondary-50 text-secondary-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <MapPin className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">{t.landing.features.boothTitle}</h3>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">{t.landing.features.boothDesc}</p>
        </Card>

        {/* Card 3 */}
        <Card onClick={() => navigate('/documents')} className="bg-white hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(19,136,8,0.3)] transition-all duration-300 p-8 border border-slate-100 cursor-pointer group rounded-3xl lg:col-span-1 md:col-span-1">
          <div className="w-14 h-14 rounded-2xl bg-success-50 text-success-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <ClipboardList className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Required Documents</h3>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">Know what to bring</p>
        </Card>

        {/* Card 4 */}
        <Card onClick={() => document.getElementById('live-feed').scrollIntoView({ behavior: 'smooth' })} className="bg-white hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(239,68,68,0.3)] transition-all duration-300 p-8 border border-slate-100 cursor-pointer group rounded-3xl lg:col-span-1 md:col-span-1">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <CalendarDays className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">{t.landing.features.datesTitle}</h3>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">{t.landing.features.datesDesc}</p>
        </Card>

        {/* Card 5 (AI Assistant) */}
        <Card onClick={() => navigate('/assistant')} className="bg-gradient-to-br from-accent-600 to-accent-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.5)] transition-all duration-300 p-8 border border-accent-500 cursor-pointer group rounded-3xl lg:col-span-1 md:col-span-2">
          <div className="w-14 h-14 rounded-2xl bg-white/20 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform backdrop-blur-sm">
            <Bot className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">AI Assistant</h3>
          <p className="text-sm text-accent-100 font-medium leading-relaxed">24/7 Election Guide</p>
        </Card>

      </div>
    </section>
  );
}
