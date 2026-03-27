# Appendix Code Snippets

## A. Frontend Simulation Initialization (React)

```jsx
// TurnSimulation.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WindowManagerProvider } from '../components/simulation/WindowManager';
import Desktop from '../components/simulation/Desktop';
import SimulationBriefing from './SimulationBriefing';
import { SimulationProvider, useSimulation } from '../context/SimulationContext';

const SimulationContent = () => {
  const { simulationState, startSimulation } = useSimulation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (simulationState === 'COMPLETED') {
      navigate('/dashboard');
    }
  }, [simulationState, navigate]);

  const handleStart = () => {
    startSimulation();
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  if (simulationState === 'IDLE') {
    return <SimulationBriefing onStart={handleStart} onBack={handleBack} />;
  }

  return (
    <WindowManagerProvider>
      <Desktop />
    </WindowManagerProvider>
  );
};

const TurnSimulation = () => {
  return (
    <SimulationProvider>
      <SimulationContent />
    </SimulationProvider>
  );
};

export default TurnSimulation;
```

## B. Interaction Tracking Module

```jsx
// constants.js
export const PHISHING_INTERACTIONS = {
  EMAIL_OPENED: 'EMAIL_OPENED',
  INSPECT_SENDER: 'INSPECT_SENDER',
  REPORT_PHISHING: 'REPORT_PHISHING',
  LEGIT_LINK_CLICKED: 'LEGIT_LINK_CLICKED',
  FAKE_LINK_CLICKED: 'FAKE_LINK_CLICKED',
  CREDENTIALS_ENTERED: 'CREDENTIALS_ENTERED',
  REPORTED_LEGIT_AS_PHISHING: 'REPORTED_LEGIT_AS_PHISHING',
  MISSED_PHISHING: 'MISSED_PHISHING',
  MARKED_AS_SAFE: 'MARKED_AS_SAFE',
};
```

```jsx
// SimulationContext.jsx (core logger)
const logInteraction = useCallback((type, details = {}) => {
  let hesitationMs = null;
  const currentEmailId = details.emailId;

  if (currentEmailId) {
    setEmailOpenTimestamps(prev => {
      const openTime = prev[currentEmailId];
      if (openTime) {
        hesitationMs = Date.now() - openTime;
      }
      return prev;
    });
  }

  const interaction = {
    timestamp: new Date().toISOString(),
    type,
    details,
    hesitationMs,
  };

  setSession(prev => {
    if (!prev) return prev;
    return {
      ...prev,
      interactions: [...prev.interactions, interaction],
    };
  });

  console.log('Interaction logged:', interaction);
}, []);
```

```jsx
// MailApp.jsx (usage example)
useEffect(() => {
  if (selectedEmail && !selectedEmail.isRead) {
    logInteraction(PHISHING_INTERACTIONS.EMAIL_OPENED, { emailId: selectedEmail.id });
    markAsRead(selectedEmail.id);
  }
}, [selectedEmail, logInteraction, markAsRead]);

const handleReportPhishing = () => {
  if (scenario.isLegitimate) {
    logInteraction(PHISHING_INTERACTIONS.REPORTED_LEGIT_AS_PHISHING, { emailId: scenario.id });
  } else {
    logInteraction(PHISHING_INTERACTIONS.REPORT_PHISHING, { emailId: scenario.id });
  }
  loadNextEmail(scenario.id);
};
```

## C. Risk Scoring Algorithm

```jsx
// SimulationContext.jsx
const calculateRisk = (interactionList) => {
  if (interactionList.some(i => i.type === PHISHING_INTERACTIONS.CREDENTIALS_ENTERED)) {
    return 'VERY_HIGH';
  }
  if (interactionList.some(i => i.type === PHISHING_INTERACTIONS.FAKE_LINK_CLICKED)) {
    return 'HIGH';
  }
  if (interactionList.some(i => i.type === PHISHING_INTERACTIONS.LEGIT_LINK_CLICKED)) {
    return 'MEDIUM';
  }
  if (interactionList.some(i => i.type === PHISHING_INTERACTIONS.REPORT_PHISHING)) {
    return 'LOW';
  }
  return 'LOW';
};
```

## D. Backend API (Node.js / Express)

```js
// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const geminiRoutes = require('./routes/gemini');
const trainingThreatRoutes = require('./routes/trainingThreats');

app.use('/api', geminiRoutes);
app.use('/api', trainingThreatRoutes);

app.get('/', (req, res) => {
  res.send('CyberSecurity Simulation Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

```js
// routes/gemini.js (email generation endpoint)
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

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
      Generate an array of ${count} distinct, realistic phishing email simulation scenarios in valid JSON format.
      ...
      Return raw JSON array only.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const scenarios = JSON.parse(text);

    if (Array.isArray(scenarios) && scenarios.length === count) {
      return res.json(scenarios);
    }

    return res.json(fallbackEmails);
  } catch (error) {
    console.error('Error in /generate-emails, using fallback:', error);
    return res.json(fallbackEmails);
  }
}
```

## E. Firebase Configuration

```js
// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
```

## F. AI Email Generation API Call

```jsx
// SimulationContext.jsx (frontend -> backend API call)
const generateEmails = useCallback(async (count, simulationProfile) => {
  if (!fetchLock.current) {
    fetchLock.current = true;
    try {
      const response = await fetch('http://localhost:5000/api/generate-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          count,
          profile: simulationProfile,
        }),
      });

      if (response.ok) {
        const emails = await response.json();
        if (Array.isArray(emails) && emails.length > 0) {
          fetchLock.current = false;
          return emails.slice(0, count).map(email => ({
            ...email,
            id: generateId(),
            timestamp: new Date().toISOString(),
            isRead: false,
            resolved: false,
          }));
        }
      }
    } catch (err) {
      console.warn('Backend unavailable, using local templates:', err.message);
    }
    fetchLock.current = false;
  }

  return pickLocalTemplates(count);
}, [generateId, pickLocalTemplates]);
```
