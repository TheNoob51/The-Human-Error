import React from 'react';
import styled from 'styled-components';
import { useWindowManager } from './WindowManager';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import MailApp from './apps/MailApp';
import BrowserApp from './apps/BrowserApp';
import SystemAlert from './apps/SystemAlert';
import ShutdownScreen from './ShutdownScreen';
import ShutdownModal from './ShutdownModal';
import { Mail, Globe } from 'lucide-react';

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
    const { isShutdown, activeWindow, openWindow } = useWindowManager();

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

                {activeWindow === 'mail' && <MailApp />}
                {activeWindow === 'browser' && <BrowserApp />}
                {activeWindow === 'alert' && <SystemAlert />}

                <ShutdownModal />
            </ContentArea>

            <Taskbar />
        </DesktopContainer>
    );
};

export default Desktop;
