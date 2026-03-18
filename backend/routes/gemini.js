const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Use a dummy key if env var is missing during initialization to prevent crash
// The actual check happens inside the route handler
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');

const getProfileSummary = (profile = {}) => {
    const segments = [
        profile.personaType && `User type: ${profile.personaType}`,
        profile.roleTitle && `Role: ${profile.roleTitle}`,
        profile.department && `Department or field: ${profile.department}`,
        profile.organizationName && `Organization: ${profile.organizationName}`,
        profile.industry && `Industry: ${profile.industry}`,
        profile.workEnvironment && `Work setting: ${profile.workEnvironment}`,
        profile.experienceLevel && `Experience level: ${profile.experienceLevel}`,
        profile.emailDomain && `Email domain: ${profile.emailDomain}`,
        profile.commonTools && `Common tools: ${profile.commonTools}`,
        profile.simulationFocus && `Training focus: ${profile.simulationFocus}`,
        profile.notes && `Additional context: ${profile.notes}`,
    ].filter(Boolean);

    if (segments.length === 0) {
        return 'Target a general knowledge worker with believable but varied phishing lures.';
    }

    return segments.join('\n');
};

const buildFallbackEmails = (profile = {}, count = 3) => {
    const organization = profile.organizationName || (profile.personaType === 'Student' ? 'your institution' : 'your organization');
    const role = profile.roleTitle || profile.personaType || 'team member';
    const department = profile.department || (profile.personaType === 'Student' ? 'student services' : 'operations');
    const domain = profile.emailDomain || 'support-portal-example.com';
    const focus = profile.simulationFocus || 'General phishing awareness';

    const templates = [
        {
            id: 'e1',
            senderName: profile.personaType === 'Student' ? 'Student Portal Support' : 'IT Support',
            senderEmail: `access@${domain.replace(/^[^.]+\./, 'secure-') || 'secure-support-example.com'}`,
            subject: `${organization}: ${focus.includes('Credential') ? 'Account verification required' : 'Action required on your account'}`,
            body: `<p>Hello ${role},</p><p>We detected a configuration issue affecting access to ${organization} systems. Please verify your account details before end of day to avoid interruption.</p><p><a href="http://${domain}/verify">Verify Access</a></p>`,
            linkText: 'Verify Access',
            linkUrl: `http://${domain}/verify`,
            clues: ['Urgent account request', 'Link sent by email', 'Verification pressure'],
        },
        {
            id: 'e2',
            senderName: profile.personaType === 'Student' ? 'Financial Aid Office' : `${department} Team`,
            senderEmail: `review@${domain}`,
            subject: profile.personaType === 'Student' ? 'Your enrollment record needs review' : `${department}: review pending for this week`,
            body: `<p>Hi,</p><p>A new request related to ${department} has been flagged for your review. Open the secure portal below and confirm the details today.</p><p><a href="http://${domain}/review">Open Review Portal</a></p>`,
            linkText: 'Open Review Portal',
            linkUrl: `http://${domain}/review`,
            clues: ['Generic greeting', 'Unexpected review request', 'Email link to portal'],
        },
        {
            id: 'e3',
            senderName: 'Executive Office',
            senderEmail: `leadership@${domain}`,
            subject: `Confidential request for ${role}`,
            body: `<p>I need your help with a time-sensitive item for ${organization}. Please confirm that you can review the attached instructions immediately and keep this private.</p><p><a href="http://${domain}/confidential">Review Instructions</a></p>`,
            linkText: 'Review Instructions',
            linkUrl: `http://${domain}/confidential`,
            clues: ['Authority impersonation', 'Pressure to act privately', 'Unexpected confidential request'],
        },
    ];

    return templates.slice(0, count);
};

const buildFallbackAlert = (scenario = 'update') => {
    if (scenario === 'mfa') {
        return {
            type: 'phishing',
            scenario: 'mfa',
            title: 'Login Approval Required',
            message: 'Approve sign-in request for your account.',
            source: 'Company Authenticator',
            cta: 'Approve',
        };
    }

    return {
        type: 'phishing',
        scenario: 'update',
        title: 'System Update Required',
        message: 'A critical system update is required to continue using your device.',
        source: 'System Updater',
        cta: 'Install Now',
    };
};

router.post('/generate-alert', async (req, res) => {
    const scenario = req.body?.scenario === 'mfa' ? 'mfa' : 'update';
    const profile = req.body?.profile || {};
    const recentInteractions = Array.isArray(req.body?.recentInteractions) ? req.body.recentInteractions.slice(-8) : [];
    const fallbackAlert = buildFallbackAlert(scenario);

    try {
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'dummy_key') {
            console.warn('GEMINI_API_KEY not configured or is dummy. Using fallback alert.');
            return res.json(fallbackAlert);
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const prompt = `
        Generate one cybersecurity behavioral simulation alert as valid JSON only.

        Required schema (must match exactly):
        {
            "type": "phishing",
            "scenario": "${scenario}",
            "title": "string",
            "message": "string",
            "source": "string",
            "cta": "string"
        }

        Context:
        - Target profile:
        ${getProfileSummary(profile)}
        - Recent interactions (latest first): ${JSON.stringify(recentInteractions)}

        Rules:
        - Keep language concise and realistic for enterprise security prompts.
        - Do not include markdown, comments, or extra keys.
        - "type" must be "phishing".
        - "scenario" must stay "${scenario}".
        ${scenario === 'mfa'
                ? '- The CTA should be equivalent to approving a login request.'
                : '- The CTA should be equivalent to installing or applying an update.'}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const parsed = JSON.parse(text);
        const isValid =
            parsed &&
            parsed.type === 'phishing' &&
            parsed.scenario === scenario &&
            typeof parsed.title === 'string' &&
            typeof parsed.message === 'string' &&
            typeof parsed.source === 'string' &&
            typeof parsed.cta === 'string';

        if (!isValid) {
            return res.json(fallbackAlert);
        }

        return res.json(parsed);
    } catch (error) {
        console.error('Error in /generate-alert, using fallback:', error);
        return res.json(fallbackAlert);
    }
});

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

router.get('/generate-emails', generateEmailsHandler);
router.post('/generate-emails', generateEmailsHandler);

async function generateEmailsHandler(req, res) {
    const requestedCount = Number(req.body?.count || req.query?.count || 3);
    const count = Number.isFinite(requestedCount) ? Math.min(Math.max(requestedCount, 1), 5) : 3;
    const profile = req.body?.profile || {};
    const fallbackEmails = buildFallbackEmails(profile, count);

    try {
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'dummy_key') {
            console.warn('GEMINI_API_KEY not configured or is dummy. Using fallback array.');
            return res.json(fallbackEmails);
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
        Generate an array of ${count} distinct, realistic phishing email simulation scenarios in valid JSON format.
        Each should represent a different type of social engineering while matching the target profile below when relevant.

        Target profile:
        ${getProfileSummary(profile)}

        Adaptation rules:
        - If the profile is student-oriented, prefer campus, portal, financial aid, schedule, or internship themes.
        - If the profile is employment-oriented, prefer company, payroll, compliance, procurement, or collaboration-tool themes.
        - If the profile is a general user, prefer delivery, banking, password reset, and consumer account themes.
        - Use the organization, role, department, tools, and email domain naturally, but do not make every scenario identical.
        - Vary the social engineering angle across urgency, authority, reward, curiosity, or routine workflow.
        
        The JSON output must be a pure JSON array containing EXACTLY ${count} objects with the following structure:
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

        if (Array.isArray(scenarios) && scenarios.length === count) {
            return res.json(scenarios);
        } else {
            console.warn('Gemini returned invalid or incorrect sized array. Using fallback array.');
            return res.json(fallbackEmails);
        }

    } catch (error) {
        console.error('Error in /generate-emails, using fallback:', error);
        return res.json(fallbackEmails);
    }
}

router.post('/generate-explanation', async (req, res) => {
    const { interactions, finalRiskLevel, avgHesitationMs, profile } = req.body;

    const hesitationNote = avgHesitationMs
        ? `The user's average decision time was ${Math.round(avgHesitationMs / 1000)} seconds per action.`
        : '';
    const profileNote = profile?.roleTitle || profile?.personaType
        ? ` The simulation was tailored to a ${profile.roleTitle || profile.personaType} context${profile?.organizationName ? ` at ${profile.organizationName}` : ''}.`
        : '';

    const fallbackExplanation = `The user completed the simulation with a final risk level of ${finalRiskLevel}. This is based on their recorded actions during the scenarios.${profileNote} A ${finalRiskLevel} risk typically indicates ${finalRiskLevel === 'LOW' ? 'good security awareness' : 'areas that need significant improvement in identifying threats'}. ${hesitationNote}`;

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
        - Target Profile: ${getProfileSummary(profile)}
        
        Write a concise, 3-5 sentence explanation of why the user received this specific risk level based strictly on the actions they took in the interactions array. If hesitation time data is available, comment on whether they acted too quickly (impulsive, under 5 seconds) or took appropriate time to evaluate. Briefly mention how the profile-tailored scenario context relates to the user's actions when it is relevant. Address the user directly (e.g., "You clicked a link..."). Keep the tone professional but instructive.
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
