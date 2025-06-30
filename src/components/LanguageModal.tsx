import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

interface LanguageModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLanguageSelect: () => void;
    getText: (key: string) => string;
}

const LanguageModal: React.FC<LanguageModalProps> = ({ isOpen, onLanguageSelect, getText }) => {
    const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
    const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

    if (!isOpen) return null;

    const handleLanguageSelect = () => {
        changeLanguage(selectedLanguage);
        onLanguageSelect();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 border border-gray-200">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-globe text-white text-2xl"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 font-['Lato']">
                        {getText('welcome')}
                    </h2>
                    <p className="text-gray-600 mt-2">{getText('select-language')}</p>
                </div>
                
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {getText('native-language')}
                    </label>
                    <select 
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {availableLanguages.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                    
                    <button 
                        onClick={handleLanguageSelect}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <i className="fas fa-play mr-2"></i>
                        <span>{getText('start-learning')}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LanguageModal; 