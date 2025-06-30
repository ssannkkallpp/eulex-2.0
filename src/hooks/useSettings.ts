import { useState, useEffect } from 'react';
import { Settings } from '../types';

const defaultSettings: Settings = {
    voice: 'default',
    fontSize: 18,
    theme: 'light',
    speechRate: 1.0,
    autoPlay: false
};

export function useSettings() {
    const [settings, setSettings] = useState<Settings>(defaultSettings);

    useEffect(() => {
        const saved = localStorage.getItem('eulex-settings');
        if (saved) {
            try {
                const parsedSettings = JSON.parse(saved);
                setSettings({ ...defaultSettings, ...parsedSettings });
            } catch (error) {
                console.warn('Failed to load settings:', error);
            }
        }
    }, []);

    const updateSettings = (newSettings: Partial<Settings>) => {
        const updatedSettings = { ...settings, ...newSettings };
        setSettings(updatedSettings);
        
        try {
            localStorage.setItem('eulex-settings', JSON.stringify(updatedSettings));
        } catch (error) {
            console.warn('Failed to save settings:', error);
        }
    };

    const applySettings = () => {
        // Apply font size
        document.documentElement.style.fontSize = `${settings.fontSize}px`;
        
        // Apply theme
        document.documentElement.setAttribute('data-theme', settings.theme);
    };

    useEffect(() => {
        applySettings();
    }, [settings]);

    return {
        settings,
        updateSettings,
        applySettings
    };
} 