export interface Story {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'poetry';
  description: string;
  wordCount: number;
  readingTime: number;
  content: string;
}

export interface Settings {
  voice: string;
  fontSize: number;
  theme: 'light' | 'dark' | 'sepia';
  speechRate: number;
  autoPlay: boolean;
  language?: string;
  sentenceRate?: number;
}

export interface Voice {
  name: string;
  lang: string;
  voiceURI: string;
}

export interface Language {
  code: string;
  name: string;
}

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export interface SyllableData {
  syllables: string[];
  cleanWord: string;
}

export interface ReadingState {
  currentStory: Story | null;
  words: string[];
  sentences: string[];
  currentWordIndex: number;
  currentSentenceIndex: number;
  wordSentenceMap: number[];
  isPlaying: boolean;
}

export interface ModalState {
  languageModal: boolean;
  settingsModal: boolean;
  helpModal: boolean;
  completionModal: boolean;
} 