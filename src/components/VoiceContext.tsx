
import React, { createContext, useContext, useCallback, useState, useEffect } from 'react';
import { Language } from '../types';

interface VoiceContextType {
  speak: (text: string) => void;
  stop: () => void;
  isSpeaking: boolean;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function VoiceProvider({ children, language }: { children: React.ReactNode; language: Language }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;

    // Stop previous speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Map language to voice codes
    const langMap = {
      'mr': 'mr-IN',
      'hi': 'hi-IN',
      'en': 'en-US'
    };

    utterance.lang = langMap[language];
    utterance.rate = 0.9; // Slightly slower for clarity
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [language]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return (
    <VoiceContext.Provider value={{ speak, stop, isSpeaking }}>
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
}
