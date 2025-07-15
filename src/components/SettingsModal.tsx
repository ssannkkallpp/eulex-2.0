import React, { useState, useEffect } from 'react';
import { Settings } from '../types';
import { availableLanguages } from '../data/translations';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    voices: SpeechSynthesisVoice[];
    getText: (key: string) => string;
    settings: Settings;
    updateSettings: (settings: Partial<Settings>) => void;
    currentLanguage: string;
    changeLanguage: (lang: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, voices, getText, settings, updateSettings, currentLanguage, changeLanguage }) => {
    const [selectedVoice, setSelectedVoice] = useState(settings.voice);
    const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

    // Debug logs
    useEffect(() => {
        if (isOpen) {
            console.log('[SettingsModal] settings.voice:', settings.voice);
            console.log('[SettingsModal] currentLanguage:', currentLanguage);
            console.log('[SettingsModal] voices:', voices.map(v => v.name));
            console.log('[SettingsModal] availableLanguages:', availableLanguages.map(l => l.code));
        }
    }, [isOpen, settings.voice, currentLanguage, voices]);

    // Always reset local state to current values when modal opens
    useEffect(() => {
        if (isOpen) {
            // If the current value is not in the options, default to the first
            const validVoice = voices.find(v => v.name === settings.voice)?.name || (voices[0]?.name || '');
            const validLang = availableLanguages.find(l => l.code === currentLanguage)?.code || (availableLanguages[0]?.code || 'en');
            setSelectedVoice(validVoice);
            setSelectedLanguage(validLang);
            console.log('[SettingsModal] setSelectedVoice:', validVoice, 'setSelectedLanguage:', validLang);
        }
    }, [isOpen, settings.voice, currentLanguage, voices]);

    const handleSave = () => {
        updateSettings({ voice: selectedVoice, language: selectedLanguage });
        changeLanguage(selectedLanguage);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 font-['Lato']">
                        {getText('settings')}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {getText('language')}
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            value={selectedLanguage}
                            onChange={e => setSelectedLanguage(e.target.value)}
                        >
                            <option value="" disabled>
                                {getText('select-language') || 'Select language'}
                            </option>
                            {availableLanguages.map(lang => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {getText('voice')}
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            value={selectedVoice || ''}
                            onChange={e => setSelectedVoice(e.target.value)}
                            disabled={voices.length === 0}
                        >
                            <option value="" disabled>{getText('select-voice') || 'Select voice'}</option>
                            {voices.map((voice, index) => (
                                <option key={index} value={voice.name}>
                                    {voice.name} ({voice.lang})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                    <button onClick={onClose} className="btn btn-outline btn-secondary flex-1">
                        <i className="fas fa-times mr-2"></i>
                        <span>{getText('cancel')}</span>
                    </button>
                    <button onClick={handleSave} className="btn btn-primary flex-1">
                        <i className="fas fa-save mr-2"></i>
                        <span>{getText('save')}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal; 