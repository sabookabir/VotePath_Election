import { useState, useRef, useCallback } from 'react';

export function useAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const isProcessing = useRef(false);

  const execute = useCallback(async (aiFunction, ...args) => {
    // 1. SINGLE REQUEST CONTROL
    // Prevent duplicate calls if already processing
    if (isProcessing.current) return null;
    
    isProcessing.current = true;
    setIsLoading(true);
    setError(null);

    try {
      // Execute the provided AI service function
      const result = await aiFunction(...args);
      return result;
    } catch (err) {
      console.error("useAI caught an error:", err);
      // 5. ERROR HANDLING - Never show raw API errors in UI
      // The aiService will handle 429 and fallback, so if it reaches here, it's a fatal crash.
      setError("Server busy or unavailable. Showing sample result due to high demand.");
      return null;
    } finally {
      setIsLoading(false);
      isProcessing.current = false;
    }
  }, []);

  return { execute, isLoading, error, setError };
}
