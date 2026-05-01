import { motion } from 'framer-motion';

export function HeroIllustration() {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-visible">
      {/* Animated Tiranga Flag Waves behind everything */}
      <div className="absolute inset-0 flex flex-col justify-center items-center opacity-70 overflow-hidden rounded-[3rem] -z-10">
        <motion.div 
          className="w-[150%] h-40 bg-gradient-to-r from-[#FF9933]/0 via-[#FF9933] to-[#FF9933]/0 blur-3xl"
          animate={{ x: [-100, 100, -100], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="w-[150%] h-40 bg-gradient-to-r from-white/0 via-white to-white/0 blur-3xl"
          animate={{ x: [100, -100, 100], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="w-[150%] h-40 bg-gradient-to-r from-[#138808]/0 via-[#138808] to-[#138808]/0 blur-3xl"
          animate={{ x: [-50, 50, -50], y: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Spinning Ashoka Chakra Element */}
      <motion.div 
        className="absolute w-80 h-80 border-[20px] border-[#0D1B3D]/15 rounded-full border-dashed -z-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div 
        className="absolute w-[280px] h-[280px] border-[2px] border-[#0D1B3D]/20 rounded-full -z-10"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* Main Illustration Card (Voting Hand) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="relative z-10 w-72 h-[380px] bg-white/40 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-white/60 flex flex-col items-center justify-center p-8 group"
      >
        <div className="relative">
           {/* Glow behind hand */}
           <div className="absolute inset-0 bg-primary-400/30 blur-2xl rounded-full scale-150 group-hover:bg-primary-500/40 transition-colors duration-500" />
           
           {/* Pure SVG Voting Finger */}
           <motion.svg viewBox="0 0 100 150" className="w-40 h-56 relative z-10 drop-shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           >
              {/* Hand/Finger Base */}
              <path d="M35 150 V 60 C 35 45, 65 45, 65 60 V 150" fill="#fcd34d" />
              {/* Thumb curve */}
              <path d="M15 130 C 15 110, 35 110, 35 130" fill="#fbbf24" />
              {/* Other fingers folded */}
              <path d="M65 110 C 85 110, 85 130, 65 130" fill="#fbbf24" />
              <path d="M65 90 C 80 90, 80 110, 65 110" fill="#f59e0b" />
              {/* Ink mark line */}
              <path d="M35 75 V 55 C 35 45, 65 45, 65 55 V 65" fill="#0D1B3D" /> 
           </motion.svg>
           
           {/* Floating Sparkles */}
           <motion.div 
             className="absolute -top-4 -right-4 text-3xl"
             animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
             transition={{ duration: 3, repeat: Infinity }}
           >
             ✨
           </motion.div>
        </div>
        
        <h3 className="mt-8 text-3xl font-black text-slate-800 text-center tracking-tight">
          Your Vote, <br/>
          <span className="text-primary-600">Your Power</span>
        </h3>
        
        {/* Mini Indian Flag dots */}
        <div className="mt-6 flex space-x-3">
          <div className="w-4 h-4 bg-[#FF9933] rounded-full shadow-sm"></div>
          <div className="w-4 h-4 bg-white border border-slate-200 rounded-full shadow-sm"></div>
          <div className="w-4 h-4 bg-[#138808] rounded-full shadow-sm"></div>
        </div>
      </motion.div>
    </div>
  );
}
