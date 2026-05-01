import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../shared/Button';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { HeroIllustration } from './HeroIllustration';

export function HeroSection({ t }) {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center border-b border-slate-200/60 pb-16 pt-10 lg:pt-0">
      
      {/* Deep Vibrant Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,153,51,0.15),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(19,136,8,0.15),_transparent_50%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMTUsIDIzLCA0MiwgMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Text, CTAs, and Floating Badges */}
          <motion.div 
            className="lg:col-span-7 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl lg:text-[5rem] font-extrabold text-secondary-500 leading-[1.1] mb-6 tracking-tight drop-shadow-sm">
              जागरूक वोटर, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-success-500 to-success-600">
                सशक्त भारत
              </span>
            </h1>
            
            <p className="text-2xl text-slate-700 mb-10 max-w-xl font-medium leading-snug border-l-4 border-primary-500 pl-6">
              Check eligibility, find your polling booth, and complete your voting journey in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <div className="relative group w-full sm:w-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-pink-500 to-accent-600 rounded-2xl blur opacity-40 group-hover:opacity-70 transition duration-500 group-hover:duration-200 animate-pulse-glow" />
                <Button 
                  size="lg" 
                  onClick={() => navigate('/flow')} 
                  className="relative w-full sm:w-auto bg-gradient-to-r from-primary-500 via-pink-500 to-accent-600 border-none text-white shadow-xl px-8 h-16 text-[17px] font-bold hover:scale-[1.02] transition-transform flex items-center justify-center rounded-2xl"
                >
                  ⚡ Check Eligibility in 2 Minutes
                </Button>
              </div>
              
              <Button 
                size="lg" 
                variant="ghost"
                onClick={() => document.getElementById('booth-finder').scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto text-secondary-500 font-bold hover:bg-secondary-50 px-8 h-16 text-[17px] group rounded-2xl"
              >
                Find Your Polling Booth
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center space-x-2 text-slate-600 bg-white/60 inline-flex px-4 py-2 rounded-full border border-slate-200/50 backdrop-blur-sm shadow-sm">
                <ShieldCheck className="w-5 h-5 text-success-600" />
                <span className="text-sm font-semibold">Based on official election guidelines</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 bg-white/60 inline-flex px-4 py-2 rounded-full border border-slate-200/50 backdrop-blur-sm shadow-sm">
                <span className="text-sm font-bold text-secondary-600">Fast • Secure • Free</span>
              </div>
            </div>

          </motion.div>

          {/* RIGHT SIDE: Interactive Indian Illustration */}
          <div className="lg:col-span-5 relative mt-10 lg:mt-0">
            <HeroIllustration />
          </div>

        </div>
      </div>
    </section>
  );
}
