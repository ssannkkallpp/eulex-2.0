import React from 'react';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
    getText: (key: string) => string;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, getText }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 font-['Lato']">
                        {getText('how-to-use')}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                
                <div className="space-y-4 text-sm text-gray-600">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2 font-['Lato']">
                            {getText('getting-started')}
                        </h4>
                        <p>{getText('getting-started-desc')}</p>
                    </div>
                    
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2 font-['Lato']">
                            {getText('navigation')}
                        </h4>
                        <ul className="list-disc list-inside space-y-1">
                            <li>{getText('nav-arrows')}</li>
                            <li>{getText('nav-spacebar')}</li>
                            <li>{getText('nav-click')}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpModal; 