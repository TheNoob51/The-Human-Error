import React, { createContext, useContext, useState, useCallback } from 'react';
import { PHISHING_INTERACTIONS } from '../constants';
import { useAuth } from './AuthContext';
import { saveSimulationResult } from '../lib/firestoreService';

const SimulationContext = createContext();

export const SimulationProvider = ({ children }) => {
    const { user } = useAuth();
    const [simulationState, setSimulationState] = useState('IDLE'); // IDLE, RUNNING, COMPLETED
    const [inbox, setInbox] = useState([]);
    const [selectedEmailId, setSelectedEmailId] = useState(null);
    const [session, setSession] = useState(null);
    const [emailOpenTimestamps, setEmailOpenTimestamps] = useState({}); // Track when each email was opened

    const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

    const mockEmailQueue = [
        {
            id: generateId(),
            senderName: "HR Department",
            senderEmail: "hr@company-benefits-update.com",
            subject: "Action Required: Update Your Benefits",
            body: "<p>Dear Employee,</p><p>Please review and update your new benefits package for the upcoming year by clicking the link below.</p><p>Failure to do so may result in loss of coverage.</p>",
            linkText: "Update Benefits Now",
            linkUrl: "update-benefits",
            clues: ["Suspicious sender domain", "Urgent consequence"],
            timestamp: new Date().toISOString(),
            isRead: false
        },
        {
            id: generateId(),
            senderName: "IT Service Desk",
            senderEmail: "admin@it-support-portal.net",
            subject: "Password Expiry Notice",
            body: "<p>Your corporate password will expire in 2 hours.</p><p>Please log in immediately to retain your current password or set a new one.</p>",
            linkText: "Keep Current Password",
            linkUrl: "reset-password",
            clues: ["Urgent timeline", "Suspicious sender domain"],
            timestamp: new Date().toISOString(),
            isRead: false
        },
        {
            id: generateId(),
            senderName: "CEO Office",
            senderEmail: "ceo@company.com",
            subject: "Confidential: Q3 Bonus Requirements",
            body: "<p>I am attaching the mandatory requirements to qualify for the Q3 discretionary bonus.</p><p>This is highly confidential. Please review the document here immediately.</p>",
            linkText: "View Bonus Details",
            linkUrl: "view-document",
            clues: ["Unexpected request from leadership", "High pressure/reward"],
            timestamp: new Date().toISOString(),
            isRead: false
        }
    ];

    /**
     * Fetch emails from backend API, fall back to hardcoded queue on failure
     */
    const fetchEmailsFromBackend = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/generate-emails');
            if (response.ok) {
                const emails = await response.json();
                if (Array.isArray(emails) && emails.length > 0) {
                    // Add client-side fields
                    return emails.map(email => ({
                        ...email,
                        id: email.id || generateId(),
                        timestamp: new Date().toISOString(),
                        isRead: false,
                    }));
                }
            }
        } catch (err) {
            console.warn('Backend unavailable, using local mock emails:', err.message);
        }
        return null; // Signals to use fallback
    };

    const startSimulation = useCallback(async () => {
        setSimulationState('RUNNING');
        setEmailOpenTimestamps({}); // Reset hesitation tracking

        // Try fetching from backend, fall back to mock queue
        let emailQueue = await fetchEmailsFromBackend();
        if (!emailQueue) {
            emailQueue = [...mockEmailQueue];
        }

        const initialInbox = [emailQueue[0]];
        const remainingQueue = emailQueue.slice(1);

        setInbox(initialInbox);
        setSelectedEmailId(initialInbox[0].id);

        setSession({
            sessionId: generateId(),
            startTime: new Date().toISOString(),
            interactions: [],
            emailsGenerated: 1,
            emailQueue: remainingQueue,
            hesitationData: [], // Track hesitation times per action
        });

        console.log('Simulation started — emails fetched from', emailQueue === mockEmailQueue ? 'mock' : 'backend');
    }, []);

    const loadNextEmail = useCallback(() => {
        setSession(prevSession => {
            if (!prevSession || prevSession.emailQueue.length === 0) {
                console.log("No more emails in queue.");
                return prevSession; // Queue empty
            }

            const nextEmail = prevSession.emailQueue[0];
            const updatedQueue = prevSession.emailQueue.slice(1);

            // Update inbox
            setInbox(prevInbox => [nextEmail, ...prevInbox]);
            // (Optional) Select the new email automatically:
            setSelectedEmailId(nextEmail.id);

            return {
                ...prevSession,
                emailsGenerated: prevSession.emailsGenerated + 1,
                emailQueue: updatedQueue
            };
        });
    }, []);

    const markAsRead = useCallback((id) => {
        setInbox(prev => prev.map(email =>
            email.id === id ? { ...email, isRead: true } : email
        ));
        setSelectedEmailId(id);
        // Record when this email was opened for hesitation tracking
        setEmailOpenTimestamps(prev => {
            if (!prev[id]) {
                return { ...prev, [id]: Date.now() };
            }
            return prev;
        });
    }, []);

    const logInteraction = useCallback((type, details = {}) => {
        // Calculate hesitation time if an email is currently selected
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
            hesitationMs, // Time between opening email and taking action
        };
        setSession((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                interactions: [...prev.interactions, interaction]
            };
        });
        console.log('Interaction logged:', interaction);
    }, []);

    const calculateRisk = (interactionList) => {
        // Determine finalRiskLevel based on highest-risk interaction

        // 1. CREDENTIALS_ENTERED -> VERY_HIGH
        if (interactionList.some(i => i.type === PHISHING_INTERACTIONS.CREDENTIALS_ENTERED)) {
            return 'VERY_HIGH';
        }

        // 2. FAKE_LINK_CLICKED -> HIGH
        if (interactionList.some(i => i.type === PHISHING_INTERACTIONS.FAKE_LINK_CLICKED)) {
            return 'HIGH';
        }

        // 3. LEGIT_LINK_CLICKED -> MEDIUM
        if (interactionList.some(i => i.type === PHISHING_INTERACTIONS.LEGIT_LINK_CLICKED)) {
            return 'MEDIUM';
        }

        // 4. REPORT_PHISHING -> LOW
        if (interactionList.some(i => i.type === PHISHING_INTERACTIONS.REPORT_PHISHING)) {
            return 'LOW';
        }

        // Default: If no significant action taken yet, assume LOW.
        return 'LOW';
    };

    const endSimulation = useCallback(async () => {
        if (!session) return;
        setSimulationState('COMPLETED');

        const finalRiskLevel = calculateRisk(session.interactions);

        // Calculate average hesitation time
        const hesitationTimes = session.interactions
            .filter(i => i.hesitationMs != null)
            .map(i => i.hesitationMs);
        const avgHesitationMs = hesitationTimes.length > 0
            ? Math.round(hesitationTimes.reduce((a, b) => a + b, 0) / hesitationTimes.length)
            : null;

        let explanation = "Simulation finished. Analysis could not be generated.";

        try {
            const response = await fetch('http://localhost:5000/api/generate-explanation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    interactions: session.interactions,
                    finalRiskLevel,
                    avgHesitationMs,
                })
            });
            if (response.ok) {
                const data = await response.json();
                explanation = data.explanation;
            }
        } catch (err) {
            console.error("Failed to generate explanation:", err);
        }

        const finalSession = {
            ...session,
            endTime: new Date().toISOString(),
            finalRiskLevel,
            explanation,
            avgHesitationMs,
            inbox // Save inbox state for review
        };

        setSession(finalSession);

        // Save to Firestore (primary) + localStorage (backup)
        try {
            if (user?.uid) {
                await saveSimulationResult(user.uid, finalSession);
                console.log('Result saved to Firestore');
            }
        } catch (err) {
            console.error('Failed to save to Firestore:', err);
        }

        // Also save to localStorage as fallback
        try {
            const existingResults = JSON.parse(localStorage.getItem('simulation_results') || '[]');
            const newResults = [finalSession, ...existingResults];
            localStorage.setItem('simulation_results', JSON.stringify(newResults));
            console.log('Result saved to localStorage');
        } catch (error) {
            console.error('Failed to save simulation result:', error);
        }

    }, [session, inbox, user]);

    const value = {
        simulationState,
        inbox,
        selectedEmailId,
        session,
        startSimulation,
        logInteraction,
        endSimulation,
        loadNextEmail,
        markAsRead,
    };

    return (
        <SimulationContext.Provider value={value}>
            {children}
        </SimulationContext.Provider>
    );
};

export const useSimulation = () => {
    const context = useContext(SimulationContext);
    if (!context) {
        throw new Error('useSimulation must be used within a SimulationProvider');
    }
    return context;
};
