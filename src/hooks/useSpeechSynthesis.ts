import { useState, useEffect, useCallback } from 'react';

export function useSpeechSynthesis() {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

    useEffect(() => {
        if ('speechSynthesis' in window) {
            const synth = window.speechSynthesis;
            setSpeechSynthesis(synth);

            const loadVoices = () => {
                const availableVoices = synth.getVoices();
                setVoices(availableVoices);
            };

            // Load voices immediately if available
            loadVoices();

            // Listen for voices to load
            if (synth.onvoiceschanged !== undefined) {
                synth.onvoiceschanged = loadVoices;
            }
        }
    }, []);

    const speak = useCallback((text: string, options: {
        voice?: SpeechSynthesisVoice;
        rate?: number;
        pitch?: number;
        volume?: number;
    } = {}) => {
        if (!speechSynthesis) return;

        // Cancel any ongoing speech
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set voice
        if (options.voice && voices.length > 0) {
            utterance.voice = options.voice;
        }
        
        // Set properties
        utterance.rate = options.rate || 1.0;
        utterance.pitch = options.pitch || 1.0;
        utterance.volume = options.volume || 1.0;
        
        // Event handlers
        utterance.onstart = () => {
            setIsPlaying(true);
        };
        
        utterance.onend = () => {
            setIsPlaying(false);
        };
        
        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            setIsPlaying(false);
        };
        
        speechSynthesis.speak(utterance);
    }, [speechSynthesis, voices]);

    const stop = useCallback(() => {
        if (speechSynthesis) {
            speechSynthesis.cancel();
            setIsPlaying(false);
        }
    }, [speechSynthesis]);

    const pause = useCallback(() => {
        if (speechSynthesis) {
            speechSynthesis.pause();
        }
    }, [speechSynthesis]);

    const resume = useCallback(() => {
        if (speechSynthesis) {
            speechSynthesis.resume();
        }
    }, [speechSynthesis]);

    return {
        voices,
        isPlaying,
        speak,
        stop,
        pause,
        resume,
        speechSynthesis
    };
} 