import React, { useState, useEffect, useRef } from 'react';
import { RealtimeAgent, RealtimeSession } from '@openai/agents-realtime';

interface VoiceAgentProps {
  isActive: boolean;
  onToggle: () => void;
}

const VoiceAgent: React.FC<VoiceAgentProps> = ({ isActive, onToggle }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionRef = useRef<RealtimeSession | null>(null);
  const agentRef = useRef<RealtimeAgent | null>(null);

  useEffect(() => {
    if (isActive && !isConnected && !isConnecting) {
      initializeVoiceAgent();
    } else if (!isActive && isConnected) {
      disconnectVoiceAgent();
    }
  }, [isActive, isConnected, isConnecting]);

  const initializeVoiceAgent = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      // Create the voice agent
      agentRef.current = new RealtimeAgent({
        name: 'EULEX Assistant',
        instructions: `You are EULEX, a helpful reading assistant. You help users learn to read by:
        - Explaining difficult words
        - Helping with pronunciation
        - Answering questions about the story
        - Providing encouragement and support
        - Using simple, clear language appropriate for learners
        
        Be friendly, patient, and educational. If the user says "hi how are you", respond warmly and ask how you can help them with their reading today.`,
      });

      // Create the session
      sessionRef.current = new RealtimeSession(agentRef.current, {
        model: 'gpt-4o-realtime-preview-2025-06-03',
      });

      // Fetch client ephemeral token from our backend
      const response = await fetch('http://localhost:3001/api/generate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate client token');
      }

      const { clientSecret } = await response.json();
      
      if (!clientSecret) {
        throw new Error('No client secret received from server');
      }

      // Connect to the session
      await sessionRef.current.connect({
        apiKey: clientSecret,
      });

      setIsConnected(true);
      setIsConnecting(false);
    } catch (err) {
      console.error('Failed to initialize voice agent:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect to voice agent');
      setIsConnecting(false);
    }
  };

  const disconnectVoiceAgent = async () => {
    try {
      if (sessionRef.current) {
        await sessionRef.current.close();
        sessionRef.current = null;
      }
      if (agentRef.current) {
        agentRef.current = null;
      }
      setIsConnected(false);
      setError(null);
    } catch (err) {
      console.error('Failed to disconnect voice agent:', err);
    }
  };

  const handleToggle = () => {
    if (isConnecting) return; // Prevent multiple clicks while connecting
    onToggle();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleToggle}
            disabled={isConnecting}
            className={`relative p-3 rounded-full transition-all duration-200 ${
              isActive && isConnected
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : isConnecting
                ? 'bg-yellow-500 text-white cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isConnecting ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : isActive && isConnected ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {isConnecting ? 'Connecting...' : isActive && isConnected ? 'Voice Active' : 'Voice Assistant'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isConnecting 
                ? 'Setting up voice connection...' 
                : isActive && isConnected 
                ? 'Click to stop voice assistant' 
                : 'Click to start voice assistant'
              }
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-xs text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {isActive && isConnected && (
          <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-xs text-green-600 dark:text-green-400">
            Voice assistant is ready! Try saying "Hi, how are you?"
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceAgent; 