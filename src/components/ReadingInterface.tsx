import React from 'react';
import { Story, Settings } from '../types';

interface ReadingInterfaceProps {
    story: Story;
    words: string[];
    currentWordIndex: number;
    currentSentenceIndex: number;
    syllables: string;
    cleanCurrentWord: string;
    progress: number;
    isPlaying: boolean;
    settings: Settings;
    onBackToStories: () => void;
    onNextWord: () => void;
    onPrevWord: () => void;
    onJumpToWord: (index: number) => void;
    onPlayWord: () => void;
    onPlaySentence: () => void;
    onSpeakSyllable: (syllable: string) => void;
    getText: (key: string) => string;
    getTextWithParams: (key: string, params: Record<string, string>) => string;
}

const ReadingInterface: React.FC<ReadingInterfaceProps> = ({
    story,
    words,
    currentWordIndex,
    syllables,
    cleanCurrentWord,
    progress,
    isPlaying,
    settings,
    onBackToStories,
    onNextWord,
    onPrevWord,
    onJumpToWord,
    onPlayWord,
    onPlaySentence,
    onSpeakSyllable,
    getText,
    getTextWithParams
}) => {
    const renderSyllables = () => {
        if (syllables && syllables.includes('-')) {
            const syllableParts = syllables.split('-');
            return syllableParts.map((syllable, index) => (
                <React.Fragment key={index}>
                    <span 
                        className="syllable"
                        onClick={() => onSpeakSyllable(syllable)}
                    >
                        {syllable}
                    </span>
                    {index < syllableParts.length - 1 && (
                        <span className="syllable-separator">•</span>
                    )}
                </React.Fragment>
            ));
        } else {
            return (
                <span 
                    className="syllable"
                    onClick={() => onSpeakSyllable(syllables)}
                >
                    {syllables}
                </span>
            );
        }
    };

    return (
        <div>
            {/* Story Header */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-3 font-['Lato']">
                            {story.title}
                        </h2>
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <span>{words.length} {getText('words')}</span>
                            <span>{currentWordIndex + 1} / {words.length}</span>
                            <span>{getTextWithParams('est-time', { time: story.readingTime.toString() })}</span>
                        </div>
                    </div>
                    <button onClick={onBackToStories} className="btn btn-outline btn-primary">
                        <i className="fas fa-arrow-left mr-2"></i>
                        <span>{getText('back-to-stories')}</span>
                    </button>
                </div>
            </div>

            {/* Reading Area */}
            <div className="grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 gap-8 items-stretch">
                {/* Main Text Area */}
                <div className="xl:col-span-3 lg:col-span-2 flex">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 w-full flex flex-col">
                        <div 
                            className="text-xl leading-relaxed text-gray-800 h-full overflow-y-auto font-['Lato'] text-left"
                            style={{ fontSize: `${settings.fontSize}px` }}
                        >
                            {words.map((word, index) => (
                                <span
                                    key={index}
                                    className={`word-clickable ${index === currentWordIndex ? 'highlighted-word' : ''}`}
                                    onClick={() => onJumpToWord(index)}
                                >
                                    {word}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Control Panel */}
                <div className="xl:col-span-2 lg:col-span-2 flex">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 space-y-8 w-full flex flex-col">
                        {/* Current Word Display */}
                        <div className="text-center">
                            <h3 className="text-sm font-medium text-gray-600 mb-2">
                                {getText('current-word')}
                            </h3>
                            <div className="text-2xl font-bold text-gray-900 mb-2 font-['Lato']">
                                {cleanCurrentWord}
                            </div>
                        </div>

                        {/* Syllable Widget */}
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <h3 className="text-sm font-medium text-blue-800 mb-3 flex items-center">
                                <i className="fas fa-cut mr-2"></i>
                                <span>{getText('syllable-breakdown')}</span>
                            </h3>
                            <div className="text-center">
                                <div className="text-lg text-blue-900 font-medium mb-2">
                                    {renderSyllables()}
                                </div>
                                <div className="text-xs text-blue-600">
                                    <i className="fas fa-info-circle mr-1"></i>
                                    <span>{getText('click-syllables')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Audio Controls */}
                        <div className="space-y-3">
                            <button onClick={onPlayWord} className="btn btn-primary btn-lg w-full">
                                <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-volume-up'} mr-3 text-xl`}></i>
                                <span>{isPlaying ? getText('pause') : getText('hear-word')}</span>
                            </button>
                            <button onClick={onPlaySentence} className="btn btn-success btn-lg w-full">
                                <i className="fas fa-play-circle mr-3 text-xl"></i>
                                <span>{getText('hear-sentence')}</span>
                            </button>
                        </div>

                        {/* Navigation Controls */}
                        <div className="space-y-3">
                            <div className="flex space-x-2">
                                <button onClick={onPrevWord} className="btn btn-danger flex-1">
                                    <i className="fas fa-chevron-left text-lg"></i>
                                </button>
                                <button onClick={onNextWord} className="btn btn-success flex-1">
                                    <i className="fas fa-chevron-right text-lg"></i>
                                </button>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>{getText('progress')}</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="progress-bar" 
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadingInterface; 