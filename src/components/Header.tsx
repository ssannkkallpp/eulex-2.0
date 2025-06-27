import React from 'react';

interface HeaderProps {
    onLanguageClick: () => void;
    onSettingsClick: () => void;
    onHelpClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLanguageClick, onSettingsClick, onHelpClick }) => {
    return (
        <header className="bg-white border-b-4 border-gray-200 shadow-lg mb-8">
            <div className="container mx-auto px-6 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                            <i className="fas fa-book-open text-white text-2xl"></i>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 font-['Lato'] tracking-wide">EULEX</h1>
                            <p className="text-sm text-gray-500 font-medium">Reading Assistant</p>
                        </div>
                    </div>
                    
                    <nav className="hidden md:flex items-center space-x-8">
                        <button 
                            onClick={onLanguageClick}
                            className="text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-100" 
                            title="Change Language"
                        >
                            <i className="fas fa-language text-xl"></i>
                        </button>
                        <button 
                            onClick={onSettingsClick}
                            className="text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
                        >
                            <i className="fas fa-cog text-xl"></i>
                        </button>
                        <button 
                            onClick={onHelpClick}
                            className="text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
                        >
                            <i className="fas fa-question-circle text-xl"></i>
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header; 