import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Mail, Globe, AlertTriangle, Wifi, Volume2, Power } from 'lucide-react';
import { useWindowManager } from './WindowManager';

const TaskbarContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: rgba(16, 16, 16, 0.95);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  z-index: 1000;
  backdrop-filter: blur(10px);
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 2px;
`;

const StartButton = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  svg {
    filter: drop-shadow(0 0 2px rgba(0,120,215, 0.5));
  }
`;

const TaskbarIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  cursor: pointer;
  position: relative;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
  
  ${props => props.$active && `
    background-color: rgba(255, 255, 255, 0.1);
    border-bottom: 2px solid #0078d7;
    color: white;
  `}
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 15px;
  padding-right: 10px;
  color: white;
  font-size: 12px;
`;

const SystemTrayIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  
  &:hover {
    color: #ddd;
  }
`;

const Clock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  height: 100%;
  cursor: default;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const WindowsLogo = () => (
    <svg width="18" height="18" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="41" height="41" fill="white" />
        <rect x="46" y="0" width="41" height="41" fill="white" />
        <rect x="0" y="46" width="41" height="41" fill="white" />
        <rect x="46" y="46" width="41" height="41" fill="white" />
    </svg>
);

const Taskbar = () => {
    const { activeWindow, openWindow, startShutdown } = useWindowManager();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: 'numeric' });
    };

    return (
        <TaskbarContainer>
            <LeftSection>
                <StartButton onClick={startShutdown} title="Start (Shutdown)">
                    <WindowsLogo />
                </StartButton>

                <TaskbarIcon
                    $active={activeWindow === 'mail'}
                    onClick={() => openWindow('mail')}
                    title="Mail"
                >
                    <Mail size={20} />
                </TaskbarIcon>

                <TaskbarIcon
                    $active={activeWindow === 'browser'}
                    onClick={() => openWindow('browser')}
                    title="Browser"
                >
                    <Globe size={20} />
                </TaskbarIcon>

                <TaskbarIcon
                    $active={activeWindow === 'alert'}
                    onClick={() => openWindow('alert')}
                    title="System Alerts"
                >
                    <AlertTriangle size={20} />
                </TaskbarIcon>
            </LeftSection>

            <RightSection>
                <SystemTrayIcon>
                    <Wifi size={16} />
                </SystemTrayIcon>
                <SystemTrayIcon>
                    <Volume2 size={16} />
                </SystemTrayIcon>
                <Clock>
                    <span>{formatTime(time)}</span>
                    <span>{formatDate(time)}</span>
                </Clock>
            </RightSection>
        </TaskbarContainer>
    );
};

export default Taskbar;
