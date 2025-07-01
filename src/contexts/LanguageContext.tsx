import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations, availableLanguages } from '../data/translations';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
  getText: (key: string) => string;
  getTextWithParams: (key: string, params: Record<string, string>) => string;
  availableLanguages: typeof availableLanguages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('eulex-language');
      if (savedLanguage && translations[savedLanguage]) {
        setCurrentLanguage(savedLanguage);
      }
    } catch (error) {
      console.warn('Failed to load language:', error);
    }
  };

  const changeLanguage = async (languageCode: string) => {
    if (translations[languageCode]) {
      setCurrentLanguage(languageCode);
      try {
        await AsyncStorage.setItem('eulex-language', languageCode);
      } catch (error) {
        console.warn('Failed to save language:', error);
      }
    }
  };

  const getText = (key: string): string => {
    const lang = translations[currentLanguage];
    return lang && lang[key] ? lang[key] : translations.en[key] || key;
  };

  const getTextWithParams = (key: string, params: Record<string, string>): string => {
    let text = getText(key);
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{${param}}`, value);
    });
    return text;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      changeLanguage,
      getText,
      getTextWithParams,
      availableLanguages
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}