import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useWindowManager } from '../WindowManager';
import { useSimulation } from '../../../context/SimulationContext';
import { PHISHING_INTERACTIONS } from '../../../constants';

import { User, AlertCircle } from 'lucide-react';

const MailLayout = styled.div`
  display: flex;
  height: 100%;
`;

const Sidebar = styled.div`
  width: 200px;
  background: #f0f0f0;
  border-right: 1px solid #ddd;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const MailItem = styled.div`
  padding: 10px;
  background: ${props => props.$resolved ? '#e8e8e8' : props.$active ? '#fff' : 'transparent'};
  border-left: 3px solid ${props => props.$active ? '#0078d7' : 'transparent'};
  cursor: pointer;
  opacity: ${props => props.$resolved ? 0.6 : 1};
  
  &:hover {
    background: ${props => props.$resolved ? '#e0e0e0' : '#e6f7ff'};
  }
`;

const Sender = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const Subject = styled.div`
  font-size: 12px;
  color: #555;
  margin-top: 2px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background: white;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const HeaderTitle = styled.h2`
  margin: 0 0 10px;
  font-size: 18px;
  color: #d93025; // Urgent color
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #555;
  font-size: 13px;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  background: #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Body = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #333;
`;

const FakeLinkButton = styled.button`
  background: #0078d7;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 20px;
  cursor: pointer;
  
  &:hover {
    background: #005a9e;
  }
`;

const ActionRow = styled.div`
  margin-top: 40px;
  display: flex;
  gap: 10px;
  border-top: 1px solid #eee;
  padding-top: 15px;
`;

const SecondaryButton = styled.button`
  background: ${props => props.$danger ? '#fff0f0' : 'white'};
  color: ${props => props.$danger ? '#d93025' : '#333'};
  border: 1px solid ${props => props.$danger ? '#dbaaaa' : '#ccc'};
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.$danger ? '#ffe6e6' : '#f5f5f5'};
  }
`;

const MailApp = () => {
  const { openWindow } = useWindowManager();
  // Consume inbox and selection logic from context
  const {
    logInteraction,
    inbox,
    markAsRead,
    selectedEmailId,
    loadNextEmail
  } = useSimulation();

  // Find the selected email object
  const selectedEmail = inbox.find(e => e.id === selectedEmailId) || inbox[0] || null;

  // If no email selected (shouldn't happen if inbox has default), fallback
  const scenario = selectedEmail || {
    senderName: "No Mail",
    senderEmail: "",
    subject: "Inbox Empty",
    body: "<p>No emails to display.</p>",
    linkText: "",
    linkUrl: "",
    clues: []
  };

  useEffect(() => {
    if (selectedEmail && !selectedEmail.isRead) {
      logInteraction(PHISHING_INTERACTIONS.EMAIL_OPENED, { emailId: selectedEmail.id });
      markAsRead(selectedEmail.id);
    }
  }, [selectedEmail, logInteraction, markAsRead]);

  const handleVerifyClick = () => {
    if (!scenario.linkUrl) return;
    if (scenario.resolved) {
      alert("You have already taken action on this email.");
      return;
    }
    logInteraction(PHISHING_INTERACTIONS.FAKE_LINK_CLICKED, { link: scenario.linkUrl, emailId: scenario.id });
    openWindow('browser');
    // Don't call loadNextEmail here — BrowserApp handles it after credential submission
  };

  const handleInspectSender = () => {
    logInteraction(PHISHING_INTERACTIONS.INSPECT_SENDER, { emailId: scenario.id });
    const domain = scenario.senderEmail.split('@')[1] || 'unknown';
    alert(`Sender Domain: ${domain} (Suspicious)`);
  };

  const handleReportPhishing = () => {
    if (scenario.resolved) {
      alert("You have already taken action on this email.");
      return;
    }
    logInteraction(PHISHING_INTERACTIONS.REPORT_PHISHING, { emailId: scenario.id });
    alert("Phishing reported!");
    loadNextEmail(scenario.id);
  };

  return (
    <MailLayout>
      <Sidebar>
        {inbox.map(email => (
          <MailItem
            key={email.id}
            $active={selectedEmailId === email.id}
            $resolved={email.resolved}
            onClick={() => markAsRead(email.id)}
          >
            <Sender>{email.senderName}</Sender>
            <Subject style={{ fontWeight: email.isRead ? 'normal' : 'bold' }}>
              {email.subject}{email.resolved ? ' ✓' : ''}
            </Subject>
          </MailItem>
        ))}
      </Sidebar>
      <Content>
        {selectedEmail ? (
          <>
            <Header>
              <HeaderTitle>{scenario.subject}</HeaderTitle>
              <HeaderInfo>
                <Avatar><User size={16} /></Avatar>
                <div>
                  <div><strong>From:</strong> {scenario.senderName} &lt;{scenario.senderEmail}&gt;</div>
                  <div><strong>To:</strong> clean.user@company.com</div>
                </div>
              </HeaderInfo>
            </Header>
            <Body>
              <div dangerouslySetInnerHTML={{ __html: scenario.body }} />
              {scenario.linkText && (
                <FakeLinkButton onClick={handleVerifyClick}>{scenario.linkText}</FakeLinkButton>
              )}
            </Body>

            <ActionRow>
              <SecondaryButton onClick={handleInspectSender}>Inspect Sender</SecondaryButton>
              <SecondaryButton $danger onClick={handleReportPhishing}>Report Phishing</SecondaryButton>
            </ActionRow>
          </>
        ) : (
          <div style={{ padding: 20, color: '#888' }}>Select an email to read</div>
        )}
      </Content>
    </MailLayout>
  );
};

export default MailApp;
