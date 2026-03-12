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

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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

router.get('/generate-emails', async (req, res) => {
    // Fallback static array of 3 emails
    const fallbackEmails = [
        {
            id: 'e1',
            senderName: 'IT Support',
            senderEmail: 'it-helpdesk@company-internal-support.com',
            subject: 'URGENT: Password Expiry in 24 Hours',
            body: '<p>Dear Employee,</p><p>Your corporate network password will expire in 24 hours. Please update it immediately to avoid losing access to your accounts.</p><p>Click the link below to update your password:</p><p><a href="http://company-internal-support.com/reset">Update Password Now</a></p><p>Thank you,<br>IT Support</p>',
            linkText: 'Update Password Now',
            linkUrl: 'http://company-internal-support.com/reset',
            clues: ['Urgent tone', 'Suspicious domain (company-internal-support.com instead of usual domain)', 'Generic greeting']
        },
        {
            id: 'e2',
            senderName: 'HR Payroll',
            senderEmail: 'payroll@hr-services-portal.net',
            subject: 'ACTION REQUIRED: Review Your Q3 Tax Documents',
            body: '<p>Hello,</p><p>Your Q3 tax documents are now available for review. There seems to be a discrepancy in your recent withholding.</p><p>Please log in to the payroll portal to review and correct the information before the end of the week.</p><p><a href="http://hr-services-portal.net/login">Access Payroll Portal</a></p><p>Best regards,<br>HR Department</p>',
            linkText: 'Access Payroll Portal',
            linkUrl: 'http://hr-services-portal.net/login',
            clues: ['Threat of discrepancy', 'Vague external domain', 'Request to log in via email link']
        },
        {
            id: 'e3',
            senderName: 'CEO Office',
            senderEmail: 'ceo.office@company-executive-direct.org',
            subject: 'Confidential: Quick task needed',
            body: '<p>Are you available right now? I need you to handle a quick, confidential task for me regarding an upcoming client gift. I am currently in a meeting and cannot take calls.</p><p>Please click here to confirm you can assist: <a href="http://company-executive-direct.org/confirm">Confirm Availability</a></p><p>Thanks.</p>',
            linkText: 'Confirm Availability',
            linkUrl: 'http://company-executive-direct.org/confirm',
            clues: ['CEO Fraud / Authority impersonation', 'Unusual request', 'Claiming to be unavailable for verification']
        }
    ];

    try {
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'dummy_key') {
            console.warn('GEMINI_API_KEY not configured or is dummy. Using fallback array.');
            return res.json(fallbackEmails);
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
        Generate an array of 3 distinct, realistic phishing email simulation scenarios in valid JSON format.
        Each should represent a different type of social engineering (e.g., IT urgency, HR issue, CEO fraud).
        
        The JSON output must be a pure JSON array containing EXACTLY 3 objects with the following structure:
        [
            {
                "id": "String (unique identifier, e.g., e1, e2, e3)",
                "senderName": "String",
                "senderEmail": "String",
                "subject": "String",
                "body": "String (HTML content of the email body)",
                "linkText": "String (Text for the call-to-action link)",
                "linkUrl": "String (The fake URL)",
                "clues": ["Array of strings describing the phishing clues present"]
            },
            ...
        ]

        Make the scenarios subtle but detectable. Do not include markdown formatting like \`\`\`json. Just return the raw JSON array string.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        console.log('Gemini /generate-emails Raw Response:', text);

        // Robust cleanup of markdown code blocks
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const scenarios = JSON.parse(text);

        if (Array.isArray(scenarios) && scenarios.length === 3) {
            return res.json(scenarios);
        } else {
            console.warn('Gemini returned invalid or incorrect sized array. Using fallback array.');
            return res.json(fallbackEmails);
        }

    } catch (error) {
        console.error('Error in /generate-emails, using fallback:', error);
        return res.json(fallbackEmails);
    }
});

router.post('/generate-explanation', async (req, res) => {
    const { interactions, finalRiskLevel, avgHesitationMs } = req.body;

    const hesitationNote = avgHesitationMs
        ? `The user's average decision time was ${Math.round(avgHesitationMs / 1000)} seconds per action.`
        : '';

    const fallbackExplanation = `The user completed the simulation with a final risk level of ${finalRiskLevel}. This is based on their recorded actions during the scenarios. A ${finalRiskLevel} risk typically indicates ${finalRiskLevel === 'LOW' ? 'good security awareness' : 'areas that need significant improvement in identifying threats'}. ${hesitationNote}`;

    try {
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'dummy_key') {
            console.warn('GEMINI_API_KEY not configured or is dummy. Using fallback explanation.');
            return res.json({ explanation: fallbackExplanation });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
        You are an expert cybersecurity analyst evaluating a user's performance in a phishing simulation.
        
        Session Data:
        - Interactions: ${JSON.stringify(interactions)}
        - Final Assigned Risk Level: ${finalRiskLevel}
        - Average Decision/Hesitation Time: ${avgHesitationMs ? Math.round(avgHesitationMs / 1000) + ' seconds' : 'Not recorded'}
        
        Write a concise, 3-5 sentence explanation of why the user received this specific risk level based strictly on the actions they took in the interactions array. If hesitation time data is available, comment on whether they acted too quickly (impulsive, under 5 seconds) or took appropriate time to evaluate. Address the user directly (e.g., "You clicked a link..."). Keep the tone professional but instructive.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();

        if (text) {
            return res.json({ explanation: text });
        } else {
            return res.json({ explanation: fallbackExplanation });
        }

    } catch (error) {
        console.error('Error in /generate-explanation, using fallback:', error);
        return res.json({ explanation: fallbackExplanation });
    }
});

module.exports = router;
