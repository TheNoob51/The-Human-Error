const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Use a dummy key if env var is missing during initialization to prevent crash
// The actual check happens inside the route handler
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');

router.post('/generate-phishing', async (req, res) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            console.error('SERVER ERROR: GEMINI_API_KEY is not set in environment variables.');
            return res.status(500).json({
                error: 'Server configuration error',
                details: 'Gemini API key is missing from backend configuration.'
            });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
        Generate a realistic phishing email simulation scenario in valid JSON format.
        
        The JSON object must have the following structure:
        {
            "senderName": "String (e.g., IT Support, HR, CEO)",
            "senderEmail": "String (e.g., support@company-security-update.com)",
            "subject": "String (Urgent subject line)",
            "body": "String (HTML content of the email body)",
            "linkText": "String (Text for the call-to-action link)",
            "linkUrl": "String (The fake URL)",
            "clues": ["Array of strings describing the phishing clues present"]
        }

        Make it subtle but detectable. Do not include markdown formatting like \`\`\`json. Just return the raw JSON string.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        console.log('Gemini Raw Response:', text);

        // Robust cleanup of markdown code blocks
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const scenario = JSON.parse(text);
        res.json(scenario);

    } catch (error) {
        console.error('Error generating phishing simulation:', error);
        res.status(500).json({ error: 'Failed to generate simulation content' });
    }
});

module.exports = router;
