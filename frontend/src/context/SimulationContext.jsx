import React, { createContext, useContext, useState, useCallback } from 'react';
import { PHISHING_INTERACTIONS } from '../constants';

const SimulationContext = createContext();

export const SimulationProvider = ({ children }) => {
    const [simulationState, setSimulationState] = useState('IDLE'); // IDLE, RUNNING, COMPLETED
    const [inbox, setInbox] = useState([]);
    const [selectedEmailId, setSelectedEmailId] = useState(null);
    const [interactions, setInteractions] = useState([]);
    const [result, setResult] = useState(null);

    // Initial default emails
    const defaultInbox = [
        {
            id: 'default-1',
            senderName: "IT Support",
            senderEmail: "support@company.com",
            subject: "Welcome to the Cybersecurity Training",
            body: "<p>Welcome! Please be aware of phishing attempts.</p>",
            isRead: false,
            timestamp: new Date().toISOString(),
            isSafe: true // Internal flag
        }
    ];

    const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

    const startSimulation = useCallback(() => {
        setSimulationState('RUNNING');
        setInbox(defaultInbox);
        setSelectedEmailId(defaultInbox[0].id);
        setInteractions([]);
        setResult(null);
        console.log('Simulation started');
    }, []);

    const fetchPhishingScenario = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:5000/api/generate-phishing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error('API request failed');
            const data = await response.json();
            return {
                ...data,
                id: generateId(),
                isRead: false,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error('Failed to fetch phishing scenario, using fallback:', error);
            return {
                id: generateId(),
                senderName: "IT Support",
                senderEmail: "support@company-security-update.com",
                subject: "URGENT: Account Verification Required",
                body: "<p>Dear User,</p><p>Your account has been flagged for suspicious activity. To prevent lockout, you must verify your identity within 10 minutes.</p><p>Failure to report could result in permanent loss of access.</p>",
                linkText: "Verify Account Now",
                linkUrl: "verify-account",
                clues: ["Urgent language", "Suspicious sender domain", "Generic greeting"],
                isRead: false,
                timestamp: new Date().toISOString()
            };
        }
    }, []);

    // Periodic Email Injection
    React.useEffect(() => {
        let interval;
        if (simulationState === 'RUNNING') {
            // Fetch one immediately if inbox is just defaults? 
            // Or just wait 5s for the first "attack" then every 30s

            const fetchAndAdd = async () => {
                const newEmail = await fetchPhishingScenario();
                setInbox(prev => [newEmail, ...prev]); // Add new email to top
                // Play notification sound?
            };

            // Initial fetch after 2 seconds to get the game going
            const initialTimer = setTimeout(fetchAndAdd, 2000);

            interval = setInterval(fetchAndAdd, 30000); // Every 30 seconds

            return () => {
                clearTimeout(initialTimer);
                clearInterval(interval);
            };
        }
    }, [simulationState, fetchPhishingScenario]);

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
        setInteractions((prev) => [...prev, interaction]);
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

    const endSimulation = useCallback(() => {
        setSimulationState('COMPLETED');
        const finalRiskLevel = calculateRisk(interactions);

        const finalResult = {
            inbox: inbox,
            interactions,
            finalRiskLevel,
            timestamp: new Date().toISOString(),
        };

        setResult(finalResult);
        console.log('Simulation ended. Result:', finalResult);

        // Save to localStorage
        try {
            const existingResults = JSON.parse(localStorage.getItem('simulation_results') || '[]');
            const newResults = [finalResult, ...existingResults]; // Append new results (latest first)
            localStorage.setItem('simulation_results', JSON.stringify(newResults));
            console.log('Result saved to localStorage');
        } catch (error) {
            console.error('Failed to save simulation result:', error);
        }

    }, [inbox, interactions]);

    const value = {
        simulationState,
        inbox,
        selectedEmailId,
        interactions,
        result,
        startSimulation,
        logInteraction,
        endSimulation,
        fetchPhishingScenario,
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
