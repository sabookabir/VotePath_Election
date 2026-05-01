import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { getEligibilityDecision } from '../services/aiService';
import { Card } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import { ProgressTracker } from '../components/shared/ProgressTracker';
import { Check, X, Loader2 } from 'lucide-react';

export function GuidedFlow() {
  const { t, flowAnswers, updateAnswer, setAiResult } = useAppContext();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const questions = [
    { id: 'age', text: t.flow.qAge, type: 'boolean' },
    { id: 'city', text: t.flow.qCity, type: 'text' },
    { id: 'hasVoterId', text: t.flow.qVoterId, type: 'boolean' },
    { id: 'movedRecently', text: t.flow.qMoved, type: 'boolean' },
  ];

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsAnalyzing(true);
    setError('');
    try {
      const result = await getEligibilityDecision(flowAnswers);
      setAiResult(result);
      navigate('/dashboard');
    } catch (err) {
      setError("AI Error: Please ensure you have a valid VITE_GEMINI_API_KEY in your .env file.");
      setIsAnalyzing(false);
    }
  };

  const currentQ = questions[currentStep - 1];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full px-4">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{t.flow.title}</h1>
        </div>

        <ProgressTracker currentStep={currentStep} totalSteps={questions.length} />

        <div className="relative mt-12 min-h-[350px]">
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute w-full flex flex-col items-center justify-center pt-20"
              >
                <Loader2 className="w-16 h-16 text-primary-500 animate-spin mb-6" />
                <h2 className="text-xl font-medium text-slate-700">{t.flow.analyzing}</h2>
              </motion.div>
            ) : (
              <motion.div
                key={currentStep}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full"
              >
                <Card className="text-center py-12 px-8 border-t-4 border-t-primary-500 shadow-xl bg-white">
                  <h2 className="text-2xl font-medium text-slate-800 mb-10 min-h-[4rem]">
                    {currentQ.text}
                  </h2>
                  
                  {currentQ.type === 'boolean' ? (
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Button 
                        size="lg" 
                        variant={flowAnswers[currentQ.id] === 'yes' ? 'primary' : 'outline'}
                        className="flex-1 max-w-[200px] mx-auto sm:mx-0"
                        onClick={() => { updateAnswer(currentQ.id, 'yes'); handleNext(); }}
                      >
                        <Check className="w-5 h-5 mr-2" /> {t.flow.yes}
                      </Button>
                      <Button 
                        size="lg" 
                        variant={flowAnswers[currentQ.id] === 'no' ? 'primary' : 'outline'}
                        className="flex-1 max-w-[200px] mx-auto sm:mx-0"
                        onClick={() => { updateAnswer(currentQ.id, 'no'); handleNext(); }}
                      >
                        <X className="w-5 h-5 mr-2" /> {t.flow.no}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <input 
                        type="text" 
                        placeholder={t.flow.placeholderCity}
                        className="w-full max-w-md border-2 border-slate-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-primary-500 mb-6"
                        value={flowAnswers[currentQ.id]}
                        onChange={(e) => updateAnswer(currentQ.id, e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                      />
                      <Button onClick={handleNext} disabled={!flowAnswers[currentQ.id]}>
                        {t.flow.next}
                      </Button>
                    </div>
                  )}

                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {error && (
          <div className="mt-8 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 text-center">
            {error}
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            disabled={currentStep === 1 || isAnalyzing}
            className={currentStep === 1 ? "invisible" : ""}
          >
            {t.flow.back}
          </Button>

          {currentStep === questions.length && !isAnalyzing && (
            <Button onClick={handleSubmit} variant="primary">
              {t.flow.submit}
            </Button>
          )}
        </div>

      </div>
    </div>
  );
}
