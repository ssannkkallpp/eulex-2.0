import { useState, useEffect } from 'react';
import { translations, availableLanguages } from '../data/translations';

export function useLanguage() {
    const [currentLanguage, setCurrentLanguage] = useState('en');

    useEffect(() => {
        const savedLanguage = localStorage.getItem('eulex-language');
        if (savedLanguage && translations[savedLanguage]) {
            setCurrentLanguage(savedLanguage);
        }
    }, []);

    const changeLanguage = (languageCode: string) => {
        if (translations[languageCode]) {
            setCurrentLanguage(languageCode);
            localStorage.setItem('eulex-language', languageCode);
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

    return {
        currentLanguage,
        changeLanguage,
        getText,
        getTextWithParams,
        availableLanguages
    };
} 