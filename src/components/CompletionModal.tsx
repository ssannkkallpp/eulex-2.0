import React from 'react';

interface CompletionModalProps {
    isOpen: boolean;
    onClose: () => void;
    getText: (key: string) => string;
}

const CompletionModal: React.FC<CompletionModalProps> = ({ isOpen, onClose, getText }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 border border-gray-200 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-trophy text-white text-3xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {getText('congrats')}
                </h2>
                <button 
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg mt-4"
                >
                    {getText('thanks')}
                </button>
            </div>
        </div>
    );
};

export default CompletionModal; 