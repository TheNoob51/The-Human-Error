import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WindowManagerProvider } from '../components/simulation/WindowManager';
import Desktop from '../components/simulation/Desktop';
import SimulationBriefing from './SimulationBriefing';
import { SimulationProvider, useSimulation } from '../context/SimulationContext';

const SimulationContent = () => {
    const { simulationState, startSimulation } = useSimulation();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (simulationState === 'COMPLETED') {
            navigate('/dashboard');
        }
    }, [simulationState, navigate]);

    const handleStart = () => {
        startSimulation();
    };

    const handleBack = () => {
        navigate('/dashboard');
    };

    if (simulationState === 'IDLE') {
        return <SimulationBriefing onStart={handleStart} onBack={handleBack} />;
    }

    return (
        <WindowManagerProvider>
            <Desktop />
        </WindowManagerProvider>
    );
};

const TurnSimulation = () => {
    return (
        <SimulationProvider>
            <SimulationContent />
        </SimulationProvider>
    );
};

export default TurnSimulation;

