//client/src/components/AIAssistant/utils/geminiAPI.js

// Gemini AI API integration
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

/**
 * Calls the Gemini AI API with the user message and context
 * @param {string} userMessage - User's message
 * @param {string} context - Context information for the AI
 * @returns {Promise<string|null>} AI response or null if error
 */
export const callGeminiAI = async (userMessage, context = '') => {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a TechnoBuild product shopping assistant. Help users find products, compare options, build custom PCs, and make purchasing decisions.

            CONTEXT:
            ${context}

            USER MESSAGE: ${userMessage}

            Respond in a helpful, friendly manner. If recommending products or builds, be specific about features and benefits. Use the available filter options to provide precise recommendations.`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini AI API error:', error);
    return null;
  }
};