import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Speech from 'expo-speech';

interface SpeechContextType {
  speak: (text: string, options?: Speech.SpeechOptions) => void;
  stop: () => void;
  isPlaying: boolean;
  availableVoices: Speech.Voice[];
}

const SpeechContext = createContext<SpeechContextType | undefined>(undefined);

export function SpeechProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<Speech.Voice[]>([]);

  useEffect(() => {
    loadVoices();
  }, []);

  const loadVoices = async () => {
    try {
      const voices = await Speech.getAvailableVoicesAsync();
      setAvailableVoices(voices);
    } catch (error) {
      console.warn('Failed to load voices:', error);
    }
  };

  const speak = (text: string, options: Speech.SpeechOptions = {}) => {
    if (isPlaying) {
      Speech.stop();
    }

    setIsPlaying(true);
    
    Speech.speak(text, {
      ...options,
      onStart: () => setIsPlaying(true),
      onDone: () => setIsPlaying(false),
      onStopped: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  const stop = () => {
    Speech.stop();
    setIsPlaying(false);
  };

  return (
    <SpeechContext.Provider value={{
      speak,
      stop,
      isPlaying,
      availableVoices
    }}>
      {children}
    </SpeechContext.Provider>
  );
}

export function useSpeech() {
  const context = useContext(SpeechContext);
  if (context === undefined) {
    throw new Error('useSpeech must be used within a SpeechProvider');
  }
  return context;
}