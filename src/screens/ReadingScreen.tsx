import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';
import { useSpeech } from '../contexts/SpeechContext';
import { parseContent, cleanWord, getSyllables } from '../utils/syllableUtils';
import { Story } from '../types';

interface ReadingScreenProps {
  route: {
    params: {
      story: Story;
    };
  };
  navigation: any;
}

export default function ReadingScreen({ route, navigation }: ReadingScreenProps) {
  const { story } = route.params;
  const { getText, getTextWithParams } = useLanguage();
  const { settings } = useSettings();
  const { speak, isPlaying } = useSpeech();

  const [words, setWords] = useState<string[]>([]);
  const [sentences, setSentences] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [wordSentenceMap, setWordSentenceMap] = useState<number[]>([]);

  useEffect(() => {
    const { words, sentences, wordSentenceMap } = parseContent(story.content);
    setWords(words);
    setSentences(sentences);
    setWordSentenceMap(wordSentenceMap);
  }, [story]);

  useEffect(() => {
    if (words.length > 0 && settings.autoPlay) {
      setTimeout(() => playCurrentWord(), 500);
    }
  }, [words, settings.autoPlay]);

  const playCurrentWord = () => {
    if (words[currentWordIndex]) {
      const word = cleanWord(words[currentWordIndex]);
      speak(word, { rate: settings.speechRate });
    }
  };

  const playCurrentSentence = () => {
    if (sentences[currentSentenceIndex]) {
      speak(sentences[currentSentenceIndex], { rate: settings.speechRate });
    }
  };

  const playSyllable = (syllable: string) => {
    speak(syllable, { rate: settings.speechRate });
  };

  const nextWord = () => {
    if (currentWordIndex < words.length - 1) {
      const newIndex = currentWordIndex + 1;
      setCurrentWordIndex(newIndex);
      setCurrentSentenceIndex(wordSentenceMap[newIndex] || 0);
      
      // Auto-play next word
      setTimeout(() => {
        const word = cleanWord(words[newIndex]);
        speak(word, { rate: settings.speechRate });
      }, 100);
    } else {
      // Story completed
      Alert.alert(
        getText('congrats'),
        '',
        [
          {
            text: getText('thanks'),
            onPress: () => {
              setCurrentWordIndex(0);
              setCurrentSentenceIndex(0);
            },
          },
        ]
      );
    }
  };

  const prevWord = () => {
    if (currentWordIndex > 0) {
      const newIndex = currentWordIndex - 1;
      setCurrentWordIndex(newIndex);
      setCurrentSentenceIndex(wordSentenceMap[newIndex] || 0);
      
      // Auto-play previous word
      setTimeout(() => {
        const word = cleanWord(words[newIndex]);
        speak(word, { rate: settings.speechRate });
      }, 100);
    }
  };

  const jumpToWord = (index: number) => {
    setCurrentWordIndex(index);
    setCurrentSentenceIndex(wordSentenceMap[index] || 0);
    
    // Auto-play selected word
    setTimeout(() => {
      const word = cleanWord(words[index]);
      speak(word, { rate: settings.speechRate });
    }, 100);
  };

  const currentWord = words[currentWordIndex] || '';
  const cleanCurrentWord = cleanWord(currentWord);
  const syllables = getSyllables(cleanCurrentWord);
  const progress = words.length > 0 ? ((currentWordIndex + 1) / words.length) * 100 : 0;

  const renderSyllables = () => {
    if (syllables && syllables.includes('-')) {
      const syllableParts = syllables.split('-');
      return syllableParts.map((syllable, index) => (
        <View key={index} style={styles.syllableRow}>
          <TouchableOpacity
            style={styles.syllable}
            onPress={() => playSyllable(syllable)}
          >
            <Text style={styles.syllableText}>{syllable}</Text>
          </TouchableOpacity>
          {index < syllableParts.length - 1 && (
            <Text style={styles.syllableSeparator}>•</Text>
          )}
        </View>
      ));
    } else {
      return (
        <TouchableOpacity
          style={styles.syllable}
          onPress={() => playSyllable(syllables)}
        >
          <Text style={styles.syllableText}>{syllables}</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Story Info */}
        <View style={styles.storyInfo}>
          <Text style={styles.storyTitle}>{story.title}</Text>
          <View style={styles.storyMeta}>
            <Text style={styles.metaText}>
              {words.length} {getText('words')}
            </Text>
            <Text style={styles.metaText}>
              {currentWordIndex + 1} / {words.length}
            </Text>
            <Text style={styles.metaText}>
              {getTextWithParams('est-time', { time: story.readingTime.toString() })}
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{Math.round(progress)}%</Text>
        </View>

        {/* Reading Text */}
        <View style={styles.textContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.textContent}>
              {words.map((word, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.word,
                    index === currentWordIndex && styles.currentWord,
                  ]}
                  onPress={() => jumpToWord(index)}
                >
                  <Text
                    style={[
                      styles.wordText,
                      { fontSize: settings.fontSize },
                      index === currentWordIndex && styles.currentWordText,
                    ]}
                  >
                    {word}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Current Word Display */}
        <View style={styles.currentWordContainer}>
          <Text style={styles.currentWordLabel}>{getText('current-word')}</Text>
          <Text style={styles.currentWordDisplay}>{cleanCurrentWord}</Text>
        </View>

        {/* Syllable Widget */}
        <View style={styles.syllableContainer}>
          <Text style={styles.syllableLabel}>
            🔪 {getText('syllable-breakdown')}
          </Text>
          <View style={styles.syllableContent}>
            {renderSyllables()}
          </View>
          <Text style={styles.syllableHint}>
            ℹ️ {getText('click-syllables')}
          </Text>
        </View>

        {/* Audio Controls */}
        <View style={styles.audioControls}>
          <TouchableOpacity style={styles.audioButton} onPress={playCurrentWord}>
            <Text style={styles.audioButtonText}>
              {isPlaying ? '⏸️' : '🔊'} {isPlaying ? getText('pause') : getText('hear-word')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.audioButtonSecondary} onPress={playCurrentSentence}>
            <Text style={styles.audioButtonSecondaryText}>
              ▶️ {getText('hear-sentence')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Navigation Controls */}
        <View style={styles.navigationControls}>
          <TouchableOpacity
            style={[styles.navButton, currentWordIndex === 0 && styles.navButtonDisabled]}
            onPress={prevWord}
            disabled={currentWordIndex === 0}
          >
            <Text style={styles.navButtonText}>◀️</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.navButton, currentWordIndex >= words.length - 1 && styles.navButtonDisabled]}
            onPress={nextWord}
            disabled={currentWordIndex >= words.length - 1}
          >
            <Text style={styles.navButtonText}>▶️</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  storyInfo: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storyTitle: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  storyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Lato-Regular',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Lato-Bold',
    color: '#6b7280',
    minWidth: 40,
  },
  textContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  word: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginHorizontal: 2,
    marginVertical: 1,
    borderRadius: 4,
  },
  currentWord: {
    backgroundColor: '#fde68a',
  },
  wordText: {
    fontFamily: 'Lato-Regular',
    color: '#1f2937',
  },
  currentWordText: {
    fontFamily: 'Lato-Bold',
    color: '#b45309',
  },
  currentWordContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentWordLabel: {
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    color: '#6b7280',
    marginBottom: 8,
  },
  currentWordDisplay: {
    fontSize: 24,
    fontFamily: 'Lato-Bold',
    color: '#1f2937',
  },
  syllableContainer: {
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  syllableLabel: {
    fontSize: 14,
    fontFamily: 'Lato-Bold',
    color: '#1e40af',
    marginBottom: 12,
  },
  syllableContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  syllableRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  syllable: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#bfdbfe',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
    marginVertical: 2,
    minWidth: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  syllableText: {
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    color: '#1e40af',
  },
  syllableSeparator: {
    fontSize: 16,
    color: '#60a5fa',
    marginHorizontal: 4,
  },
  syllableHint: {
    fontSize: 12,
    color: '#1e40af',
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
  },
  audioControls: {
    marginBottom: 16,
  },
  audioButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  audioButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato-Bold',
  },
  audioButtonSecondary: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  audioButtonSecondaryText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato-Bold',
  },
  navigationControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  navButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flex: 0.48,
    alignItems: 'center',
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  navButtonDisabled: {
    backgroundColor: '#9ca3af',
    shadowOpacity: 0.1,
  },
  navButtonText: {
    fontSize: 24,
  },
});