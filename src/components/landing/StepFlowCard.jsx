import { motion } from 'framer-motion';

export function StepFlowCard() {
  return (
    <motion.div 
      className="relative w-full max-w-lg mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
    >
      {/* Abstract Indian Flag Gradient Background */}
      <div className="absolute -inset-4 bg-gradient-to-br from-primary-400/30 via-white/10 to-success-400/30 blur-2xl rounded-full" />
      
      <div className="relative bg-white/90 backdrop-blur-3xl rounded-3xl border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] p-8 overflow-hidden group">
        
        {/* Subtle Ashoka Chakra Watermark */}
        <div className="absolute -right-16 -bottom-16 w-64 h-64 border-[16px] border-secondary-500/5 rounded-full border-dashed animate-[spin_60s_linear_infinite]" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-extrabold text-secondary-500">Your Voting Journey</h3>
            <div className="bg-success-100 text-success-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center shadow-sm">
              <div className="w-2 h-2 bg-success-500 rounded-full mr-2 animate-pulse" /> Live
            </div>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-1 before:bg-gradient-to-b before:from-primary-500 before:via-slate-200 before:to-transparent">
            
            {/* Step 1 */}
            <div className="relative flex items-center group/step hover:-translate-y-1 transition-transform cursor-pointer">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary-500 shadow-md shrink-0 z-10 group-hover/step:scale-110 transition-transform">
                <span className="text-white font-bold">1</span>
              </div>
              <div className="ml-6 bg-white w-full p-4 rounded-2xl border border-primary-100 shadow-sm shadow-primary-500/10">
                <h4 className="font-bold text-slate-800 text-lg">Check Eligibility</h4>
                <p className="text-sm text-slate-500 mt-1">AI analyzes your age & city</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-center group/step hover:-translate-y-1 transition-transform cursor-pointer">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 shadow-sm shrink-0 z-10 group-hover/step:bg-accent-500 group-hover/step:text-white transition-colors">
                <span className="text-slate-500 font-bold group-hover/step:text-white">2</span>
              </div>
              <div className="ml-6 bg-slate-50/80 w-full p-4 rounded-2xl border border-slate-100 hover:bg-white hover:border-accent-200 hover:shadow-sm transition-all">
                <h4 className="font-bold text-slate-600">Submit Documents</h4>
                <p className="text-sm text-slate-400 mt-1">Upload Aadhaar / PAN</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-center group/step hover:-translate-y-1 transition-transform cursor-pointer">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 shadow-sm shrink-0 z-10 group-hover/step:bg-success-500 transition-colors">
                <span className="text-slate-500 font-bold group-hover/step:text-white">3</span>
              </div>
              <div className="ml-6 bg-slate-50/80 w-full p-4 rounded-2xl border border-slate-100 hover:bg-white hover:border-success-200 hover:shadow-sm transition-all">
                <h4 className="font-bold text-slate-600">Ready to Vote</h4>
                <p className="text-sm text-slate-400 mt-1">Cast your vote securely</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
