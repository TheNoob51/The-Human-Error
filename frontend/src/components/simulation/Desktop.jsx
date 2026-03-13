import React from 'react';
import styled from 'styled-components';
import { useWindowManager } from './WindowManager';
import { useSimulation } from '../../context/SimulationContext';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import MailApp from './apps/MailApp';
import BrowserApp from './apps/BrowserApp';
import SystemAlert from './apps/SystemAlert';
import ShutdownScreen from './ShutdownScreen';
import ShutdownModal from './ShutdownModal';
import { Mail, Globe } from 'lucide-react';
import SimulationWindow from './SimulationWindow';

const DesktopContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #1e3a8a; /* Professional blue */
  position: relative;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  user-select: none;
`;

const ContentArea = styled.div`
  width: 100%;
  height: calc(100% - 40px); // Subtract taskbar height
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;



const Desktop = () => {
    const { isShutdown, openWindow, startShutdown, confirmShutdown } = useWindowManager();
    const { endSimulation, isSaving } = useSimulation();
    const [isEndingSimulation, setIsEndingSimulation] = React.useState(false);

    const handleConfirmClose = async () => {
        if (isEndingSimulation || isSaving) return;

        setIsEndingSimulation(true);
        try {
            await endSimulation({ deferNavigation: true });
            confirmShutdown();
        } catch (error) {
            console.error('Failed to end simulation before shutdown:', error);
        } finally {
            setIsEndingSimulation(false);
        }
    };

    if (isShutdown) {
        return <ShutdownScreen />;
    }

    return (
        <DesktopContainer>
            <ContentArea>
                <div style={{ position: 'absolute', top: 20, left: 20, display: 'flex', flexDirection: 'column' }}>
                    <DesktopIcon
                        label="Mail"
                        icon={<Mail size={24} />}
                        onClick={() => openWindow('mail')}
                    />
                    <DesktopIcon
                        label="Browser"
                        icon={<Globe size={24} />}
                        onClick={() => openWindow('browser')}
                    />
                </div>

                {/* Stop Simulation Button */}
                <div style={{ position: 'absolute', top: 20, right: 20 }}>
                    <button
                        onClick={startShutdown}
                        disabled={isSaving || isEndingSimulation}
                        style={{
                            background: isSaving || isEndingSimulation ? '#999' : '#d93025',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: isSaving || isEndingSimulation ? 'not-allowed' : 'pointer',
                            fontWeight: 'bold',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                        }}
                    >
                        {isSaving || isEndingSimulation ? 'Saving...' : 'Stop Simulation'}
                    </button>
                </div>

                <SimulationWindow
                    id="mail"
                    title="Inbox - Corporate Mail"
                    icon={<Mail size={16} />}
                    defaultX={100}
                    defaultY={50}
                >
                    <MailApp />
                </SimulationWindow>

                <SimulationWindow
                    id="browser"
                    title="Employee Portal - Edge"
                    icon={<Globe size={16} />}
                    defaultX={150}
                    defaultY={80}
                >
                    <BrowserApp />
                </SimulationWindow>

                <SimulationWindow
                    id="alert"
                    title="System Alert"
                    icon={<Mail size={16} />} // Using Mail icon as generic system icon for now
                    defaultX={300}
                    defaultY={200}
                    width={400}
                    height={200}
                >
                    <SystemAlert />
                </SimulationWindow>

                <ShutdownModal
                    onConfirm={handleConfirmClose}
                    isProcessing={isEndingSimulation || isSaving}
                />
            </ContentArea>

            <Taskbar />
        </DesktopContainer>
    );
};

export default Desktop;
