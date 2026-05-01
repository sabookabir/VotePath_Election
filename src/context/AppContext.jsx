import { createContext, useContext, useState, useMemo } from 'react';
import { translations } from '../data/translations';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  
  // User profile and flow state
  const [flowAnswers, setFlowAnswers] = useState({
    age: null,
    city: '',
    hasVoterId: null,
    movedRecently: null,
  });

  // Stores the strictly formatted JSON response from Gemini
  const [aiResult, setAiResult] = useState(null);

  const t = useMemo(() => translations[language], [language]);

  const updateAnswer = (key, value) => {
    setFlowAnswers(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      t,
      flowAnswers,
      updateAnswer,
      aiResult,
      setAiResult
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
