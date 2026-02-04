import React, { createContext, useContext, useState } from 'react';

const WindowManagerContext = createContext();

export const useWindowManager = () => useContext(WindowManagerContext);

export const WindowManagerProvider = ({ children }) => {
    // Windows state: { id: string, isOpen: boolean, zIndex: number }
    const [windows, setWindows] = useState([
        { id: 'mail', isOpen: false, zIndex: 1, isMinimized: false, isMaximized: false },
        { id: 'browser', isOpen: false, zIndex: 1, isMinimized: false, isMaximized: false },
        { id: 'alert', isOpen: false, zIndex: 1, isMinimized: false, isMaximized: false }
    ]);

    // Track the highest z-index to bring windows to front
    const [maxZIndex, setMaxZIndex] = useState(1);

    const [isShuttingDown, setIsShuttingDown] = useState(false);
    const [isShutdown, setIsShutdown] = useState(false);

    const openWindow = (id, data = null) => {
        setWindows(prev => {
            const newMax = maxZIndex + 1;
            setMaxZIndex(newMax);

            return prev.map(window => {
                if (window.id === id) {
                    return { ...window, isOpen: true, zIndex: newMax, isMinimized: false, data: data };
                }
                return window;
            });
        });
    };

    const closeWindow = (id) => {
        setWindows(prev =>
            prev.map(window =>
                window.id === id ? { ...window, isOpen: false, isMinimized: false, data: null } : window
            )
        );
    };

    const minimizeWindow = (id) => {
        setWindows(prev =>
            prev.map(window =>
                window.id === id ? { ...window, isMinimized: true } : window
            )
        );
    };

    const toggleMaximizeWindow = (id) => {
        setWindows(prev =>
            prev.map(window =>
                window.id === id ? { ...window, isMaximized: !window.isMaximized } : window
            )
        );
    };

    const focusWindow = (id) => {
        setWindows(prev => {
            const target = prev.find(w => w.id === id);
            // If already top and not minimized, do nothing
            if (target && target.zIndex === maxZIndex && !target.isMinimized) return prev;

            const newMax = maxZIndex + 1;
            setMaxZIndex(newMax);

            return prev.map(window =>
                window.id === id ? { ...window, zIndex: newMax, isMinimized: false } : window
            );
        });
    };

    const startShutdown = () => setIsShuttingDown(true);
    const cancelShutdown = () => setIsShuttingDown(false);
    const confirmShutdown = () => {
        setIsShuttingDown(false);
        setIsShutdown(true);
    };

    return (
        <WindowManagerContext.Provider
            value={{
                windows,


                openWindow,
                closeWindow,
                minimizeWindow,
                toggleMaximizeWindow,
                focusWindow,
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
