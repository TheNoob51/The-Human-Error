/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { createUserProfile, getUserProfile } from '../lib/firestoreService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (!currentUser) {
                setUserProfile(null);
                setLoading(false);
                return;
            }

            try {
                await createUserProfile(currentUser);
                const profile = await getUserProfile(currentUser.uid);
                setUserProfile(profile);
            } catch (error) {
                console.warn('Unable to hydrate user profile:', error);
                setUserProfile(null);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const refreshUserProfile = async () => {
        if (!auth.currentUser) {
            setUserProfile(null);
            return null;
        }

        const profile = await getUserProfile(auth.currentUser.uid);
        setUserProfile(profile);
        return profile;
    };

    const value = {
        user,
        userProfile,
        loading,
        refreshUserProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

