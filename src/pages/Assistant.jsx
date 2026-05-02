import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { useAI } from '../hooks/useAI';
import { Card } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import { simplifyText } from '../services/aiService';
import { Sparkles, Loader2, Languages, BookOpen } from 'lucide-react';

export function Assistant() {
  const { t } = useAppContext();
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const { execute, isLoading: isProcessing, error } = useAI();

  const handleSimplify = async () => {
    if (!inputText.trim()) return;
    const res = await execute(simplifyText, inputText);
    if (res) {
      setResult(res);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50 flex flex-col">
      <div className="max-w-4xl w-full mx-auto px-4">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">{t.assistant.title}</h1>
          <p className="text-slate-600 mt-2">{t.assistant.subtitle}</p>
        </div>

        <Card className="shadow-2xl border-slate-200">
          
          <div className="mb-6">
            <textarea
              rows={6}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.assistant.placeholder}
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-4 focus:outline-none focus:border-primary-500 resize-none text-slate-700"
            />
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-slate-500">Powered by Gemini AI</span>
              <Button onClick={handleSimplify} disabled={isProcessing || !inputText.trim()} className="flex items-center">
                {isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                {t.assistant.simplifyBtn}
              </Button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 mb-6 text-sm">
              {error}
            </div>
          )}

          {result && !isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-6 pt-6 border-t border-slate-100"
            >
              {/* English Result */}
              <div className="bg-primary-50/50 p-5 rounded-xl border border-primary-100">
                <h3 className="font-bold text-primary-800 mb-3 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  {t.assistant.englishResult}
                </h3>
                <p className="text-slate-700 leading-relaxed text-sm">
                  {result.simple_english}
                </p>
              </div>

              {/* Hindi Result */}
              <div className="bg-secondary-50 p-5 rounded-xl border border-secondary-100">
                <h3 className="font-bold text-secondary-800 mb-3 flex items-center">
                  <Languages className="w-5 h-5 mr-2" />
                  {t.assistant.hindiResult}
                </h3>
                <p className="text-slate-700 leading-relaxed text-sm" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                  {result.hindi_translation}
                </p>
              </div>
            </motion.div>
          )}

        </Card>
      </div>
    </div>
  );
}
