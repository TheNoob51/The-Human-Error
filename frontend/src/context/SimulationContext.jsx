import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { PHISHING_INTERACTIONS } from '../constants';
import { useAuth } from './AuthContext';
import { saveSimulationResult } from '../lib/firestoreService';

const SimulationContext = createContext();

// ─── 12-template phishing email pool ───
const allMockEmails = [
    {
        senderName: "HR Department",
        senderEmail: "hr@company-benefits-update.com",
        subject: "Action Required: Update Your Benefits",
        body: "<p>Dear Employee,</p><p>Please review and update your new benefits package for the upcoming year by clicking the link below.</p><p>Failure to do so may result in loss of coverage.</p>",
        linkText: "Update Benefits Now",
        linkUrl: "update-benefits",
        clues: ["Suspicious sender domain", "Urgent consequence"],
    },
    {
        senderName: "IT Service Desk",
        senderEmail: "admin@it-support-portal.net",
        subject: "Password Expiry Notice",
        body: "<p>Your corporate password will expire in 2 hours.</p><p>Please log in immediately to retain your current password or set a new one.</p>",
        linkText: "Keep Current Password",
        linkUrl: "reset-password",
        clues: ["Urgent timeline", "Suspicious sender domain"],
    },
    {
        senderName: "CEO Office",
        senderEmail: "ceo@company.com",
        subject: "Confidential: Q3 Bonus Requirements",
        body: "<p>I am attaching the mandatory requirements to qualify for the Q3 discretionary bonus.</p><p>This is highly confidential. Please review the document here immediately.</p>",
        linkText: "View Bonus Details",
        linkUrl: "view-document",
        clues: ["Unexpected request from leadership", "High pressure/reward"],
    },
    {
        senderName: "Microsoft 365 Team",
        senderEmail: "noreply@microsoft365-security.com",
        subject: "Unusual Sign-in Activity Detected",
        body: "<p>We detected a sign-in to your account from an unfamiliar location.</p><p>If this wasn't you, please secure your account immediately by verifying your identity.</p>",
        linkText: "Review Activity",
        linkUrl: "review-activity",
        clues: ["Suspicious sender domain", "Fear-based urgency"],
    },
    {
        senderName: "Accounts Payable",
        senderEmail: "accounts@vendor-payments-portal.org",
        subject: "Invoice #4892 — Payment Overdue",
        body: "<p>Dear Finance Team,</p><p>Invoice #4892 is overdue. Please review and authorize the payment to avoid late fees and service disruption.</p>",
        linkText: "View Invoice",
        linkUrl: "view-invoice",
        clues: ["External domain", "Financial pressure", "Generic greeting"],
    },
    {
        senderName: "Google Workspace",
        senderEmail: "workspace-admin@google-workspace-alerts.net",
        subject: "Your storage is 98% full",
        body: "<p>Your Google Workspace storage is almost full. Files will stop syncing soon.</p><p>Upgrade now or clean up your drive to free space.</p>",
        linkText: "Manage Storage",
        linkUrl: "manage-storage",
        clues: ["Fake Google domain", "Urgency tactic", "No personalization"],
    },
    {
        senderName: "FedEx Shipping",
        senderEmail: "tracking@fedex-delivery-notice.com",
        subject: "Delivery Failed — Action Required",
        body: "<p>We attempted to deliver your package but no one was available to sign.</p><p>Please confirm your delivery address to reschedule.</p>",
        linkText: "Reschedule Delivery",
        linkUrl: "reschedule-delivery",
        clues: ["Fake FedEx domain", "Urgency tactic", "No tracking number"],
    },
    {
        senderName: "LinkedIn Notifications",
        senderEmail: "notifications@linkedin-connect.net",
        subject: "You have 5 new connection requests",
        body: "<p>Hi there,</p><p>Several professionals in your industry want to connect with you. Review and accept their requests to grow your network.</p>",
        linkText: "View Connection Requests",
        linkUrl: "view-connections",
        clues: ["Fake LinkedIn domain", "Generic greeting", "No specific names"],
    },
    {
        senderName: "Dropbox Team",
        senderEmail: "share@dropbox-fileshare.org",
        subject: "Document shared with you: Q3_Financials.xlsx",
        body: "<p>A colleague has shared the file <b>Q3_Financials.xlsx</b> with you via Dropbox.</p><p>Click below to view and download the document.</p>",
        linkText: "Open in Dropbox",
        linkUrl: "open-dropbox",
        clues: ["Fake Dropbox domain", "Unexpected file share", "No sender name specified"],
    },
    {
        senderName: "Bank of America Security",
        senderEmail: "security@bankofamerica-alerts.net",
        subject: "Suspicious Transaction on Your Account",
        body: "<p>We noticed a $2,499.00 transaction from an unrecognized device.</p><p>If this wasn't you, please verify your identity immediately to prevent further unauthorized activity.</p>",
        linkText: "Verify Identity",
        linkUrl: "verify-identity",
        clues: ["Fake bank domain", "Fear-based urgency", "Specific dollar amount for credibility"],
    },
    {
        senderName: "IT Compliance Team",
        senderEmail: "compliance@internal-audit-portal.com",
        subject: "Mandatory Security Audit — Complete by EOD",
        body: "<p>As part of our annual security audit, all employees must verify their system access credentials.</p><p>Failure to complete this by end of day will result in temporary account suspension.</p>",
        linkText: "Complete Audit Form",
        linkUrl: "complete-audit",
        clues: ["Suspicious domain", "Authority impersonation", "Tight deadline threat"],
    },
    {
        senderName: "Slack Workspace",
        senderEmail: "notifications@slack-workspace-alerts.com",
        subject: "New message from your manager",
        body: "<p>Your manager sent you a direct message in the #urgent channel.</p><p>Click below to read and respond to the message.</p>",
        linkText: "Open in Slack",
        linkUrl: "open-slack",
        clues: ["Fake Slack domain", "Authority impersonation", "Vague message content"],
    },
];

export const SimulationProvider = ({ children }) => {
    const { user } = useAuth();

    // ─── React state (triggers re-renders) ───
    const [simulationState, setSimulationState] = useState('IDLE');
    const [inbox, setInbox] = useState([]);
    const [selectedEmailId, setSelectedEmailId] = useState(null);
    const [session, setSession] = useState(null);
    const [emailOpenTimestamps, setEmailOpenTimestamps] = useState({});

    // ─── Refs for mutable tracking (no stale closures) ───
    const resolvedIds = useRef(new Set());
    const usedTemplates = useRef(new Set());
    const fetchLock = useRef(false);
    const sessionRef = useRef(null);
    const inboxRef = useRef([]);

    // Keep refs in sync with state
    sessionRef.current = session;
    inboxRef.current = inbox;

    const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

    // ─── Pick random templates without repeats ───
    const pickLocalTemplates = (count) => {
        const available = allMockEmails
            .map((t, i) => ({ template: t, index: i }))
            .filter(({ index }) => !usedTemplates.current.has(index));

        // Reset pool if exhausted
        if (available.length === 0) {
            usedTemplates.current = new Set();
            return pickLocalTemplates(count);
        }

        const shuffled = [...available].sort(() => Math.random() - 0.5);
        const picked = shuffled.slice(0, Math.min(count, shuffled.length));

        picked.forEach(({ index }) => usedTemplates.current.add(index));

        return picked.map(({ template }) => ({
            ...template,
            id: generateId(),
            timestamp: new Date().toISOString(),
            isRead: false,
        }));
    };

    // ─── Generate emails: backend-first, local fallback ───
    const generateEmails = async (count) => {
        // Try backend (guarded by fetchLock)
        if (!fetchLock.current) {
            fetchLock.current = true;
            try {
                const response = await fetch('http://localhost:5000/api/generate-emails');
                if (response.ok) {
                    const emails = await response.json();
                    if (Array.isArray(emails) && emails.length > 0) {
                        console.log(`✅ [Gemini] Received ${emails.length} AI-generated emails from backend`);
                        fetchLock.current = false;
                        return emails.slice(0, count).map(email => ({
                            ...email,
                            id: generateId(),
                            timestamp: new Date().toISOString(),
                            isRead: false,
                        }));
                    }
                }
            } catch (err) {
                console.warn('Backend unavailable, using local templates:', err.message);
            }
            fetchLock.current = false;
        }

        // Fallback to local template pool
        console.log(`⚠️ [Local] Using local template pool (backend unavailable or locked)`);
        return pickLocalTemplates(count);
    };

    // ─── Refill inbox when pending emails run low ───
    const refillInbox = useCallback(async () => {
        const currentInbox = inboxRef.current;
        const pendingCount = currentInbox.filter(
            e => !resolvedIds.current.has(e.id)
        ).length;

        if (pendingCount >= 3) return; // enough emails, skip

        const newCount = 2 + Math.floor(Math.random() * 2); // 2 or 3
        const newEmails = await generateEmails(newCount);

        setInbox(prev => {
            // Check again — pause if >= 9 pending
            const currentPending = prev.filter(
                e => !resolvedIds.current.has(e.id)
            ).length;
            if (currentPending >= 9) return prev;

            return [...prev, ...newEmails];
        });

        setSession(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                emailsGenerated: prev.emailsGenerated + newEmails.length,
            };
        });
    }, []);

    // ─── Start simulation with instant local emails + background Gemini fetch ───
    const startSimulation = useCallback(async () => {
        setSimulationState('RUNNING');
        setEmailOpenTimestamps({});
        resolvedIds.current = new Set();
        usedTemplates.current = new Set();
        fetchLock.current = false;

        // Instantly show 2 local template emails (no wait)
        const instantEmails = pickLocalTemplates(2);
        setInbox(instantEmails);
        setSelectedEmailId(instantEmails[0]?.id || null);

        setSession({
            sessionId: generateId(),
            startTime: new Date().toISOString(),
            interactions: [],
            emailsGenerated: instantEmails.length,
            hesitationData: [],
        });

        console.log('Simulation started with', instantEmails.length, 'instant local emails');

        // Background: fetch Gemini-generated emails and add to inbox
        generateEmails(3).then(geminiEmails => {
            setInbox(prev => [...prev, ...geminiEmails]);
            setSession(prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    emailsGenerated: prev.emailsGenerated + geminiEmails.length,
                };
            });
            console.log('Added', geminiEmails.length, 'Gemini emails to inbox in background');
        });
    }, []);

    // ─── Resolve an email and advance to the next unresolved one ───
    const loadNextEmail = useCallback((resolvedId) => {
        if (resolvedId) {
            resolvedIds.current.add(resolvedId);
        }

        setInbox(currentInbox => {
            // Mark the resolved email in inbox state
            const updated = resolvedId
                ? currentInbox.map(e => e.id === resolvedId ? { ...e, resolved: true } : e)
                : currentInbox;

            // Find first unresolved email
            const next = updated.find(e => !resolvedIds.current.has(e.id));
            if (next) {
                setSelectedEmailId(next.id);
            }
            return updated;
        });

        // Trigger refill check
        refillInbox();
    }, [refillInbox]);

    const markAsRead = useCallback((id) => {
        setInbox(prev => prev.map(email =>
            email.id === id ? { ...email, isRead: true } : email
        ));
        setSelectedEmailId(id);
        setEmailOpenTimestamps(prev => {
            if (!prev[id]) {
                return { ...prev, [id]: Date.now() };
            }
            return prev;
        });
    }, []);

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

    const endSimulation = useCallback(async () => {
        const currentSession = sessionRef.current;
        const currentInbox = inboxRef.current;
        if (!currentSession) return;
        setSimulationState('COMPLETED');

        const finalRiskLevel = calculateRisk(currentSession.interactions);

        const hesitationTimes = currentSession.interactions
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
                    interactions: currentSession.interactions,
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
            ...currentSession,
            endTime: new Date().toISOString(),
            finalRiskLevel,
            explanation,
            avgHesitationMs,
            inbox: currentInbox,
        };

        setSession(finalSession);

        try {
            if (user?.uid) {
                await saveSimulationResult(user.uid, finalSession);
                console.log('Result saved to Firestore');
            }
        } catch (err) {
            console.error('Failed to save to Firestore:', err);
        }

        try {
            const existingResults = JSON.parse(localStorage.getItem('simulation_results') || '[]');
            const newResults = [finalSession, ...existingResults];
            localStorage.setItem('simulation_results', JSON.stringify(newResults));
            console.log('Result saved to localStorage');
        } catch (error) {
            console.error('Failed to save simulation result:', error);
        }

    }, [user]);

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
