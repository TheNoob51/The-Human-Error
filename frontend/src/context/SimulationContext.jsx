import React, { createContext, useContext, useState, useCallback } from 'react';
import { PHISHING_INTERACTIONS } from '../constants';

const SimulationContext = createContext();

export const SimulationProvider = ({ children }) => {
    const [simulationState, setSimulationState] = useState('IDLE'); // IDLE, RUNNING, COMPLETED
    const [inbox, setInbox] = useState([]);
    const [selectedEmailId, setSelectedEmailId] = useState(null);
    const [session, setSession] = useState(null);

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
            senderEmail: "ceo@company.com", // Spoofed legitimate address
            subject: "Confidential: Q3 Bonus Requirements",
            body: "<p>I am attaching the mandatory requirements to qualify for the Q3 discretionary bonus.</p><p>This is highly confidential. Please review the document here immediately.</p>",
            linkText: "View Bonus Details",
            linkUrl: "view-document",
            clues: ["Unexpected request from leadership", "High pressure/reward"],
            timestamp: new Date().toISOString(),
            isRead: false
        }
    ];

    const startSimulation = useCallback(() => {
        setSimulationState('RUNNING');

        // Push the first email from the queue into the inbox
        const initialInbox = [mockEmailQueue[0]];
        const remainingQueue = mockEmailQueue.slice(1);

        setInbox(initialInbox);
        setSelectedEmailId(initialInbox[0].id);

        setSession({
            sessionId: generateId(),
            startTime: new Date().toISOString(),
            interactions: [],
            emailsGenerated: 1, // 1 in inbox
            emailQueue: remainingQueue
        });

        console.log('Simulation started with sequential queue');
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
    }, []);

    const logInteraction = useCallback((type, details = {}) => {
        const interaction = {
            timestamp: new Date().toISOString(),
            type,
            details,
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
        let explanation = "Simulation finished. Analysis could not be generated.";

        try {
            const response = await fetch('http://localhost:5000/api/generate-explanation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ interactions: session.interactions, finalRiskLevel })
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
            inbox // Save inbox state if needed for review
        };

        setSession(finalSession);

        // Save to localStorage
        try {
            const existingResults = JSON.parse(localStorage.getItem('simulation_results') || '[]');
            const newResults = [finalSession, ...existingResults]; // Append new results (latest first)
            localStorage.setItem('simulation_results', JSON.stringify(newResults));
            console.log('Result saved to localStorage');
        } catch (error) {
            console.error('Failed to save simulation result:', error);
        }

    }, [session, inbox]);

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
