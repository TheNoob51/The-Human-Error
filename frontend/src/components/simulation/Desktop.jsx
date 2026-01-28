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
  background: url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') no-repeat center center fixed;
  background-size: cover;
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
