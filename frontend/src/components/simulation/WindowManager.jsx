import React, { createContext, useContext, useState } from 'react';

const WindowManagerContext = createContext();

export const useWindowManager = () => useContext(WindowManagerContext);

export const WindowManagerProvider = ({ children }) => {
    const [activeWindow, setActiveWindow] = useState(null);
    const [isShuttingDown, setIsShuttingDown] = useState(false); // Shutdown confirmation modal
    const [isShutdown, setIsShutdown] = useState(false); // Final black screen

    const openWindow = (appName) => {
        setActiveWindow(appName);
    };

    const closeWindow = () => {
        setActiveWindow(null);
    };

    const startShutdown = () => {
        setIsShuttingDown(true);
    };

    const cancelShutdown = () => {
        setIsShuttingDown(false);
    };

    const confirmShutdown = () => {
        setIsShuttingDown(false);
        setIsShutdown(true);
    };

    return (
        <WindowManagerContext.Provider
            value={{
                activeWindow,
                openWindow,
                closeWindow,
                isShuttingDown,
                startShutdown,
                cancelShutdown,
                confirmShutdown,
                isShutdown,
            }}
        >
            {children}
        </WindowManagerContext.Provider>
    );
};
