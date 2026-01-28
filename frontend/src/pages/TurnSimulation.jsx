import React from 'react';
import { WindowManagerProvider } from '../components/simulation/WindowManager';
import Desktop from '../components/simulation/Desktop';

const TurnSimulation = () => {
    return (
        <WindowManagerProvider>
            <Desktop />
        </WindowManagerProvider>
    );
};

export default TurnSimulation;
