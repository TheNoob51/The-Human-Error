import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    doc,
    getDoc,
    setDoc,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// ─── Collection References ───
const SESSIONS_COLLECTION = "simulation_sessions";
const USERS_COLLECTION = "users";

// ─── User Profile ───

const getEmailDomain = (email) => {
    if (!email || !email.includes("@")) return "";
    return email.split("@")[1].toLowerCase();
};

export const buildDefaultUserProfile = (user = null, existingProfile = {}) => ({
    email: existingProfile.email || user?.email || "",
    displayName: existingProfile.displayName || user?.displayName || "",
    photoURL: existingProfile.photoURL || user?.photoURL || null,
    organizationName: existingProfile.organizationName || "",
    industry: existingProfile.industry || "",
    department: existingProfile.department || "",
    roleTitle: existingProfile.roleTitle || "",
    personaType: existingProfile.personaType || "",
    workEnvironment: existingProfile.workEnvironment || "",
    experienceLevel: existingProfile.experienceLevel || "",
    emailDomain: existingProfile.emailDomain || getEmailDomain(user?.email),
    commonTools: existingProfile.commonTools || "",
    simulationFocus: existingProfile.simulationFocus || "",
    notes: existingProfile.notes || "",
});

/**
 * Create or update user profile document on first login / signup
 */
export const createUserProfile = async (user) => {
    if (!user) return;
    const userRef = doc(db, USERS_COLLECTION, user.uid);
    const snap = await getDoc(userRef);
    const baseProfile = buildDefaultUserProfile(user, snap.exists() ? snap.data() : {});

    if (!snap.exists()) {
        await setDoc(userRef, {
            ...baseProfile,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
    } else {
        await setDoc(userRef, {
            email: baseProfile.email,
            displayName: baseProfile.displayName,
            photoURL: baseProfile.photoURL,
            emailDomain: baseProfile.emailDomain,
            updatedAt: serverTimestamp(),
        }, { merge: true });
    }
    return userRef;
};

export const getUserProfile = async (uid) => {
    if (!uid) return null;

    const userRef = doc(db, USERS_COLLECTION, uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
        return null;
    }

    return snap.data();
};

export const upsertUserProfile = async (uid, profileData, user = null) => {
    if (!uid) return null;

    const userRef = doc(db, USERS_COLLECTION, uid);
    const currentProfile = (await getDoc(userRef)).data() || {};
    const nextProfile = buildDefaultUserProfile(user, {
        ...currentProfile,
        ...profileData,
    });

    await setDoc(userRef, {
        ...nextProfile,
        createdAt: currentProfile.createdAt || serverTimestamp(),
        updatedAt: serverTimestamp(),
    }, { merge: true });

    return nextProfile;
};

// ─── Simulation Sessions ───

/**
 * Save a completed simulation session to Firestore
 * @param {string} uid - Firebase user ID
 * @param {object} sessionData - The full session object from SimulationContext
 */
export const saveSimulationResult = async (uid, sessionData) => {
    if (!uid || !sessionData) return null;

    const docRef = await addDoc(collection(db, SESSIONS_COLLECTION), {
        uid,
        sessionId: sessionData.sessionId,
        startTime: sessionData.startTime,
        endTime: sessionData.endTime,
        finalRiskLevel: sessionData.finalRiskLevel,
        explanation: sessionData.explanation || "",
        interactions: sessionData.interactions || [],
        emailsGenerated: sessionData.emailsGenerated || 0,
        profileSnapshot: sessionData.profileSnapshot || null,
        createdAt: serverTimestamp(),
    });

    console.log("Session saved to Firestore:", docRef.id);
    return docRef.id;
};

/**
 * Fetch all simulation sessions for a specific user, newest first
 * @param {string} uid - Firebase user ID
 * @returns {Array} Array of session objects
 */
export const getUserSimulations = async (uid) => {
    if (!uid) return [];

    // Single-field query (auto-indexed, no composite index needed)
    const q = query(
        collection(db, SESSIONS_COLLECTION),
        where("uid", "==", uid)
    );

    const snapshot = await getDocs(q);
    const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    // Sort client-side: newest first
    results.sort((a, b) => {
        const timeA = a.createdAt?.toMillis?.() || new Date(a.startTime).getTime() || 0;
        const timeB = b.createdAt?.toMillis?.() || new Date(b.startTime).getTime() || 0;
        return timeB - timeA;
    });

    return results;
};
