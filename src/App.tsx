import { useState, useEffect } from 'react';
import { useLanguage } from './hooks/useLanguage';
import { useSettings } from './hooks/useSettings';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { stories } from './data/stories';
import { parseContent, cleanWord, getSyllables } from './utils/syllableUtils';
import { Story, ReadingState, ModalState } from './types';
import Header from './components/Header';
import LanguageModal from './components/LanguageModal';
import StorySelection from './components/StorySelection';
import ReadingInterface from './components/ReadingInterface';
import SettingsModal from './components/SettingsModal';
import HelpModal from './components/HelpModal';
import CompletionModal from './components/CompletionModal';

function App() {
    const { getText, getTextWithParams, currentLanguage, changeLanguage } = useLanguage();
    const { settings, updateSettings } = useSettings();
    const { speak, voices, isPlaying } = useSpeechSynthesis();
    
    const [readingState, setReadingState] = useState<ReadingState>({
        currentStory: null,
        words: [],
        sentences: [],
        currentWordIndex: 0,
        currentSentenceIndex: 0,
        wordSentenceMap: [],
        isPlaying: false
    });
    
    const [modals, setModals] = useState<ModalState>({
        languageModal: false,
        settingsModal: false,
        helpModal: false,
        completionModal: false
    });

    // Show language modal on first visit
    useEffect(() => {
        if (!localStorage.getItem('eulex-language-selected')) {
            setModals(prev => ({ ...prev, languageModal: true }));
        }
    }, []);

    // Debug: Log settings when they change
    useEffect(() => {
        console.log('[EULEX] Current settings:', settings);
    }, [settings]);

    const loadStory = (story: Story) => {
        const { words, sentences, wordSentenceMap } = parseContent(story.content);
        
        setReadingState({
            currentStory: story,
            words,
            sentences,
            currentWordIndex: 0,
            currentSentenceIndex: 0,
            wordSentenceMap,
            isPlaying: false
        });

        // Auto-play first word if enabled
        if (settings.autoPlay) {
            setTimeout(() => playCurrentWord(), 500);
        }
    };

    const nextWord = () => {
        if (readingState.currentWordIndex < readingState.words.length - 1) {
            setReadingState(prev => {
                const newIndex = prev.currentWordIndex + 1;
                console.log('[EULEX] nextWord: moving to index', newIndex, 'word:', prev.words[newIndex]);
                return {
                    ...prev,
                    currentWordIndex: newIndex,
                    currentSentenceIndex: prev.wordSentenceMap[newIndex] || 0
                };
            });
        }
    };

    const prevWord = () => {
        if (readingState.currentWordIndex > 0) {
            setReadingState(prev => {
                const newIndex = prev.currentWordIndex - 1;
                console.log('[EULEX] prevWord: moving to index', newIndex, 'word:', prev.words[newIndex]);
                return {
                    ...prev,
                    currentWordIndex: newIndex,
                    currentSentenceIndex: prev.wordSentenceMap[newIndex] || 0
                };
            });
        }
    };

    const jumpToWord = (index: number) => {
        if (index >= 0 && index < readingState.words.length) {
            setReadingState(prev => ({
                ...prev,
                currentWordIndex: index,
                currentSentenceIndex: prev.wordSentenceMap[index] || 0
            }));
            playCurrentWord();
        }
    };

    // Play word when currentWordIndex changes
    useEffect(() => {
        if (readingState.currentStory) {
            console.log('[EULEX] useEffect: currentWordIndex changed to', readingState.currentWordIndex, 'word:', readingState.words[readingState.currentWordIndex]);
            playCurrentWord();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [readingState.currentWordIndex]);

    const playCurrentWord = () => {
        if (isPlaying) {
            return;
        }
        const currentWord = cleanWord(readingState.words[readingState.currentWordIndex]);
        const selectedVoice = voices.find(v => v.name === settings.voice) || voices[0];
        console.log('[EULEX] playCurrentWord: index', readingState.currentWordIndex, 'word:', currentWord, 'voice:', selectedVoice?.name);
        speak(currentWord, {
            voice: selectedVoice,
            rate: settings.speechRate
        });
    };

    const playCurrentSentence = () => {
        const sentence = readingState.sentences[readingState.currentSentenceIndex];
        if (sentence) {
            const selectedVoice = voices.find(v => v.name === settings.voice) || voices[0];
            console.log('[EULEX] Playing sentence:', sentence, 'with voice:', selectedVoice?.name);
            speak(sentence, {
                voice: selectedVoice,
                rate: settings.speechRate
            });
        }
    };

    const speakSyllable = (syllable: string) => {
        const selectedVoice = voices.find(v => v.name === settings.voice) || voices[0];
        console.log('[EULEX] Playing syllable:', syllable, 'with voice:', selectedVoice?.name);
        speak(syllable, {
            voice: selectedVoice,
            rate: settings.speechRate
        });
    };

    const showStorySelection = () => {
        setReadingState(prev => ({
            ...prev,
            currentStory: null,
            currentWordIndex: 0,
            currentSentenceIndex: 0
        }));
    };

    const openModal = (modalName: keyof ModalState) => {
        setModals(prev => ({ ...prev, [modalName]: true }));
    };

    const closeModal = (modalName: keyof ModalState) => {
        setModals(prev => ({ ...prev, [modalName]: false }));
    };

    const handleLanguageSelect = () => {
        localStorage.setItem('eulex-language-selected', 'true');
        closeModal('languageModal');
    };

    const handleCompletion = () => {
        closeModal('completionModal');
        setReadingState(prev => ({
            ...prev,
            currentWordIndex: 0,
            currentSentenceIndex: 0
        }));
    };

    // Check for completion
    useEffect(() => {
        if (readingState.currentStory && readingState.currentWordIndex >= readingState.words.length - 1) {
            setModals(prev => ({ ...prev, completionModal: true }));
        }
    }, [readingState.currentWordIndex, readingState.words.length, readingState.currentStory]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!readingState.currentStory) return;
            
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    nextWord();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextWord();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    prevWord();
                    break;
                case 'KeyP':
                    e.preventDefault();
                    playCurrentWord();
                    break;
                case 'KeyS':
                    e.preventDefault();
                    playCurrentSentence();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [readingState.currentStory, readingState.currentWordIndex]);

    const currentWord = readingState.words[readingState.currentWordIndex] || '';
    const cleanCurrentWord = cleanWord(currentWord);
    const syllables = getSyllables(cleanCurrentWord);
    const progress = readingState.words.length > 0 ? ((readingState.currentWordIndex + 1) / readingState.words.length) * 100 : 0;

    return (
        <div className="bg-gray-50 min-h-screen font-['Lato']">
            <Header 
                onLanguageClick={() => openModal('languageModal')}
                onSettingsClick={() => openModal('settingsModal')}
                onHelpClick={() => openModal('helpModal')}
            />

            <main className="container mx-auto px-6 py-6">
                {!readingState.currentStory ? (
                    <StorySelection 
                        stories={stories}
                        onStorySelect={loadStory}
                        getText={getText}
                    />
                ) : (
                    <ReadingInterface
                        story={readingState.currentStory}
                        words={readingState.words}
                        currentWordIndex={readingState.currentWordIndex}
                        currentSentenceIndex={readingState.currentSentenceIndex}
                        syllables={syllables}
                        cleanCurrentWord={cleanCurrentWord}
                        progress={progress}
                        isPlaying={isPlaying}
                        settings={settings}
                        onBackToStories={showStorySelection}
                        onNextWord={nextWord}
                        onPrevWord={prevWord}
                        onJumpToWord={jumpToWord}
                        onPlayWord={playCurrentWord}
                        onPlaySentence={playCurrentSentence}
                        onSpeakSyllable={speakSyllable}
                        getText={getText}
                        getTextWithParams={getTextWithParams}
                    />
                )}
            </main>

            <LanguageModal
                isOpen={modals.languageModal}
                onClose={() => closeModal('languageModal')}
                onLanguageSelect={handleLanguageSelect}
                getText={getText}
            />

            <SettingsModal
                isOpen={modals.settingsModal}
                onClose={() => closeModal('settingsModal')}
                voices={voices}
                getText={getText}
                settings={settings}
                updateSettings={updateSettings}
                currentLanguage={currentLanguage}
                changeLanguage={changeLanguage}
            />

            <HelpModal
                isOpen={modals.helpModal}
                onClose={() => closeModal('helpModal')}
                getText={getText}
            />

            <CompletionModal
                isOpen={modals.completionModal}
                onClose={handleCompletion}
                getText={getText}
            />
        </div>
    );
}

export default App; 