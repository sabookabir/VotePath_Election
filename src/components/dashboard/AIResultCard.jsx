import { Card } from '../shared/Card';
import { CheckCircle2, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export function AIResultCard() {
  const { t, aiResult } = useAppContext();

  if (!aiResult) return null;

  // Determine styles based on strict AI string output
  const isEligible = aiResult.eligibility.toLowerCase().includes('not') === false;
  const statusColor = isEligible ? "text-success-600" : "text-red-600";
  const statusBg = isEligible ? "bg-success-50 border-success-200" : "bg-red-50 border-red-200";
  const StatusIcon = isEligible ? CheckCircle2 : AlertCircle;

  return (
    <div className="space-y-6">
      <Card className={`border-2 ${statusBg}`}>
        <div className="flex items-start space-x-4">
          <StatusIcon className={`w-8 h-8 ${statusColor} mt-1 flex-shrink-0`} />
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-1">{t.dashboard.statusTitle}: {aiResult.eligibility}</h2>
            <p className="text-slate-600 font-medium">{aiResult.reason}</p>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border border-primary-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <CheckCircle2 className="w-5 h-5 mr-2 text-primary-500" />
            {t.dashboard.actionsTitle}
          </h3>
          <ul className="space-y-3">
            {aiResult.actions.map((action, i) => (
              <li key={i} className="flex items-start">
                <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-slate-700 mt-0.5">{action}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="border border-secondary-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-secondary-500" />
            {t.dashboard.docsTitle}
          </h3>
          <ul className="space-y-3">
            {aiResult.documents.map((doc, i) => (
              <li key={i} className="flex items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                <FileText className="w-4 h-4 text-slate-400 mr-2 mt-0.5" />
                <span className="text-slate-700 text-sm font-medium">{doc}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="bg-slate-900 text-white">
        <h3 className="text-lg font-bold text-slate-300 mb-2">{t.dashboard.nextStepTitle}</h3>
        <p className="text-xl flex items-center">
          <ArrowRight className="w-5 h-5 mr-3 text-primary-400" />
          {aiResult.next_step}
        </p>
      </Card>
    </div>
  );
}
