import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { AIResultCard } from '../components/dashboard/AIResultCard';
import { Button } from '../components/shared/Button';

export function Dashboard() {
  const { t, aiResult } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 flex justify-between items-end">
          <h1 className="text-3xl font-bold text-slate-900">{t.dashboard.title}</h1>
        </div>

        {aiResult ? (
          <AIResultCard />
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-medium text-slate-600 mb-6">No AI data found.</h2>
            <Button onClick={() => navigate('/flow')}>Start Eligibility Check</Button>
          </div>
        )}

      </div>
    </div>
  );
}
