# Voice Agent Setup Guide

EULEX now includes an AI voice assistant powered by OpenAI's Voice Agents SDK that can help with reading comprehension and pronunciation.

## Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the root directory with your OpenAI API key:

```bash
# OpenAI API Key for voice agent
OPENAI_API_KEY=your_openai_api_key_here

# Server port (optional, defaults to 3001)
PORT=3001
```

Get your OpenAI API key from: https://platform.openai.com/api-keys

### 2. Running the Application

#### Option A: Run Both Frontend and Backend Together
```bash
npm run dev:full
```

#### Option B: Run Separately
Terminal 1 (Backend):
```bash
npm run dev:server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### 3. Using the Voice Agent

1. **Select a Story**: Choose any story from the story selection screen
2. **Activate Voice Agent**: Click the microphone button in the bottom-right corner
3. **Grant Microphone Access**: Allow microphone access when prompted
4. **Start Talking**: Try saying "Hi, how are you?" or ask questions about the story

### 4. Voice Agent Capabilities

The EULEX voice assistant can help with:
- **Word explanations**: "What does [word] mean?"
- **Pronunciation help**: "How do you pronounce [word]?"
- **Reading comprehension**: "Can you explain this sentence?"
- **General assistance**: "Hi, how are you?" or "Help me read this"

### 5. Troubleshooting

#### Common Issues:

1. **"OpenAI client key not configured"**
   - Make sure your `.env` file has the correct `OPENAI_API_KEY`
   - Restart the backend server after adding the key

2. **"Failed to connect to voice agent"**
   - Check that the backend server is running on port 3001
   - Ensure your OpenAI API key is valid and has credits

3. **Microphone not working**
   - Check browser permissions for microphone access
   - Try refreshing the page and granting permissions again

4. **Voice agent not appearing**
   - Make sure you've selected a story first
   - The voice agent only appears when reading a story

### 6. Development Notes

- The voice agent uses OpenAI's `gpt-4o-realtime-preview-2025-06-03` model
- Client ephemeral tokens are generated securely on the backend
- The voice agent is designed to be educational and supportive for reading learners
- All voice interactions are processed through OpenAI's secure infrastructure

### 7. Security

- Your OpenAI API key is stored securely on the backend
- Client tokens are ephemeral and expire quickly
- No voice data is stored permanently
- All communication is encrypted

## API Endpoints

- `POST /api/generate-token` - Generates client ephemeral token for voice agent

## Dependencies

- `@openai/agents-realtime` - OpenAI Voice Agents SDK
- `express` - Backend server
- `cors` - Cross-origin resource sharing
- `axios` - HTTP client for API calls
- `dotenv` - Environment variable management 