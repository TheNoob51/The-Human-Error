import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WindowManagerProvider } from '../components/simulation/WindowManager';
import Desktop from '../components/simulation/Desktop';
import SimulationBriefing from './SimulationBriefing';

const TurnSimulation = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const navigate = useNavigate();

    const handleStart = () => {
        setIsPlaying(true);
    };

    const handleBack = () => {
        navigate('/dashboard');
    };

    if (!isPlaying) {
        return <SimulationBriefing onStart={handleStart} onBack={handleBack} />;
    }

    return (
        <WindowManagerProvider>
            <Desktop />
        </WindowManagerProvider>
    );
};

export default TurnSimulation;
