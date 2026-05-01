import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, ExternalLink, Calendar, Info, Clock } from 'lucide-react';
import { Card } from '../shared/Card';

const MOCK_LIVE_DATA = [
  {
    id: 1,
    type: 'headline',
    title: 'Election Commission announces special voter registration drive for youth.',
    time: '2 hours ago',
    source: 'Govt. Official Feed'
  },
  {
    id: 2,
    type: 'date',
    title: 'Final Date for Voter ID corrections: May 15, 2026.',
    time: '4 hours ago',
    source: 'ECI Notification'
  },
  {
    id: 3,
    type: 'info',
    title: 'New Supreme Court ruling: 100% VVPAT slip matching verification demands dismissed.',
    time: '1 day ago',
    source: 'National News'
  },
  {
    id: 4,
    type: 'headline',
    title: 'Voter Helpline App downloads cross 50 Million mark ahead of upcoming elections.',
    time: 'Just now',
    source: 'Govt. Press Release'
  }
];

export function LiveNewsFeed() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLiveNews = async () => {
      try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://timesofindia.indiatimes.com/rssfeeds/296589292.cms');
        const data = await response.json();
        
        if (data.status === 'ok') {
          const liveItems = data.items.slice(0, 4).map((item, index) => {
            let type = 'headline';
            if (item.title.toLowerCase().includes('date') || item.title.toLowerCase().includes('schedule')) type = 'date';
            else if (index % 3 === 0) type = 'info';

            const pubDate = new Date(item.pubDate);
            const now = new Date();
            const diffMs = now - pubDate;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMins / 60);
            const timeStr = diffHours > 24 
              ? `${Math.floor(diffHours / 24)} days ago` 
              : diffHours > 0 
                ? `${diffHours} hours ago` 
                : `${diffMins} mins ago`;

            return {
              id: item.guid || index,
              type,
              title: item.title,
              time: timeStr,
              source: 'Times of India',
              link: item.link
            };
          });
          setNews(liveItems);
        } else {
          setNews(MOCK_LIVE_DATA);
        }
      } catch (err) {
        console.error("Failed to fetch live news:", err);
        setNews(MOCK_LIVE_DATA);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLiveNews();
  }, []);

  return (
    <section id="live-feed" className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <h2 className="text-sm font-black text-red-500 uppercase tracking-widest">Live Feed</h2>
          </div>
          <h3 className="text-4xl font-extrabold text-secondary-500">Important Updates & Dates</h3>
        </div>
        <p className="text-slate-500 font-medium max-w-sm text-right mt-4 md:mt-0">Real-time updates pulled directly from official government & news sources.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <AnimatePresence>
          {isLoading ? (
            // Skeleton Loader
            [1, 2, 3, 4].map((i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Card className="p-6 bg-white/60 backdrop-blur border border-slate-100 animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-1/4 mb-4" />
                  <div className="h-6 bg-slate-200 rounded w-full mb-2" />
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-4" />
                  <div className="h-3 bg-slate-200 rounded w-1/3" />
                </Card>
              </motion.div>
            ))
          ) : (
            news.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 bg-white hover:-translate-y-1 hover:shadow-xl transition-all border border-slate-100 h-full flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center ${
                        item.type === 'headline' ? 'bg-primary-50 text-primary-600' :
                        item.type === 'date' ? 'bg-red-50 text-red-600' : 'bg-secondary-50 text-secondary-600'
                      }`}>
                        {item.type === 'headline' && <Radio className="w-3 h-3 mr-1.5" />}
                        {item.type === 'date' && <Calendar className="w-3 h-3 mr-1.5" />}
                        {item.type === 'info' && <Info className="w-3 h-3 mr-1.5" />}
                        {item.type.toUpperCase()}
                      </span>
                      <a href={item.link || '#'} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 text-slate-300 hover:text-primary-400 transition-colors cursor-pointer" />
                      </a>
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 leading-snug mb-4">{item.title}</h4>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-500 font-medium pt-4 border-t border-slate-100">
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5 text-slate-400" /> {item.time}</span>
                    <span>{item.source}</span>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
