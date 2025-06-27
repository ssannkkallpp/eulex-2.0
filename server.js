const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Endpoint to generate client ephemeral token
app.post('/api/generate-token', async (req, res) => {
  try {
    const openaiApiKey = process.env.OPENAI_API_KEY;
    
    if (!openaiApiKey) {
      return res.status(500).json({ 
        error: 'OpenAI API key not configured on server' 
      });
    }

    const response = await axios.post(
      'https://api.openai.com/v1/realtime/sessions',
      {
        model: 'gpt-4o-realtime-preview-2025-06-03'
      },
      {
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const clientSecret = response.data.client_secret?.value;
    
    if (!clientSecret) {
      return res.status(500).json({ 
        error: 'Failed to generate client token' 
      });
    }

    res.json({ clientSecret });
  } catch (error) {
    console.error('Error generating token:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to generate client token',
      details: error.response?.data || error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Token endpoint: http://localhost:${PORT}/api/generate-token`);
}); 