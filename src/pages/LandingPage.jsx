import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { HeroSection } from '../components/landing/HeroSection';
import { StatsSection } from '../components/landing/StatsSection';
import { FeatureCards } from '../components/landing/FeatureCards';
import { PollingBoothFinder } from '../components/landing/PollingBoothFinder';
import { LiveNewsFeed } from '../components/landing/LiveNewsFeed';

export function LandingPage() {
  const { t } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20 overflow-hidden flex flex-col relative">
      
      {/* 1. HERO SECTION */}
      <HeroSection t={t} />

      {/* 2. LIVE STATS SECTION */}
      <StatsSection />

      {/* 3. CORE FEATURES */}
      <FeatureCards t={t} />

      {/* 4. LIVE UPDATES & NEWS FEED */}
      <LiveNewsFeed />

      {/* 5. POLLING BOOTH MAP */}
      <div id="booth-finder">
        <PollingBoothFinder />
      </div>

    </div>
  );
}
