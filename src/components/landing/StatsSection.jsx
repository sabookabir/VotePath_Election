import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function AnimatedCounter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing out function
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(end * easeOutQuart));

      if (percentage < 1) {
        window.requestAnimationFrame(animate);
      }
    };
    window.requestAnimationFrame(animate);
  }, [end, duration]);

  // Format numbers nicely
  const displayCount = count >= 1000000 
    ? `${(count/100000).toFixed(0)}L` 
    : count >= 1000 
      ? `${(count/1000).toFixed(0)}K` 
      : count;

  return <span>{displayCount}{suffix}</span>;
}

export function StatsSection() {
  return (
    <section className="bg-gradient-to-r from-secondary-600 to-secondary-500 py-12 border-y border-secondary-700 relative overflow-hidden">
      {/* Decorative subtle map lines */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=')]" />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-secondary-400/30">
          
          <div className="pt-4 md:pt-0">
            <h3 className="text-5xl font-black text-white mb-2 drop-shadow-md">
              <AnimatedCounter end={1000000} suffix="+" />
            </h3>
            <p className="text-blue-200 font-bold uppercase tracking-widest text-sm">Voters Assisted</p>
          </div>

          <div className="pt-8 md:pt-0">
            <h3 className="text-5xl font-black text-white mb-2 drop-shadow-md">
              <AnimatedCounter end={700000} suffix="+" />
            </h3>
            <p className="text-blue-200 font-bold uppercase tracking-widest text-sm">Booths Mapped</p>
          </div>

          <div className="pt-8 md:pt-0">
            <h3 className="text-5xl font-black text-white mb-2 drop-shadow-md">
              <AnimatedCounter end={28} />
            </h3>
            <p className="text-blue-200 font-bold uppercase tracking-widest text-sm">States Covered</p>
          </div>

        </div>
      </div>
    </section>
  );
}
