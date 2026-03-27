import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useWindowManager } from '../WindowManager';
import { useSimulation } from '../../../context/SimulationContext';
import { PHISHING_INTERACTIONS } from '../../../constants';

import { User, AlertCircle } from 'lucide-react';

const MailLayout = styled.div`
  display: flex;
  height: 100%;
  min-height: 0;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 200px;
  background: #f0f0f0;
  border-right: 1px solid #ddd;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
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
  color: ${props => props.$unread ? '#111' : '#555'};
`;

const Subject = styled.div`
  font-size: 12px;
  color: ${props => props.$unread ? '#111' : '#666'};
  margin-top: 2px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background: white;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
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
    if (scenario.isLegitimate) {
      logInteraction(PHISHING_INTERACTIONS.LEGIT_LINK_CLICKED, { link: scenario.linkUrl, emailId: scenario.id });
    } else {
      logInteraction(PHISHING_INTERACTIONS.FAKE_LINK_CLICKED, { link: scenario.linkUrl, emailId: scenario.id });
    }
    openWindow('browser');
    // For phishing emails: BrowserApp handles advance after credential submission
    // For legit emails: BrowserApp shows safe page with a "Return to Inbox" button
  };

  const handleInspectSender = () => {
    logInteraction(PHISHING_INTERACTIONS.INSPECT_SENDER, { emailId: scenario.id });
    const senderEmail = scenario.senderEmail || 'unknown@unknown';
    const domain = senderEmail.split('@')[1] || 'unknown';
    const parts = domain.split('.').filter(Boolean);
    const tld = parts.length > 0 ? parts[parts.length - 1] : 'unknown';
    const root = parts.length >= 2 ? `${parts[parts.length - 2]}.${parts[parts.length - 1]}` : domain;
    const dotCount = Math.max(parts.length - 1, 0);
    const senderTag = (scenario.senderName || '').toLowerCase().replace(/[^a-z0-9\s]/g, '');
    const rootLower = root.toLowerCase();

    const clues = [
      `1) Check the domain carefully: ${domain}`,
      `2) Root domain looks like: ${root} (TLD: .${tld})`,
      `3) Dot count in domain: ${dotCount} (more levels can mean redirects/impersonation)`,
      '4) Verify whether the brand/organization name actually matches the root domain.',
      '5) Watch for extra words like alerts, support, verify, secure, portal, update in the domain.'
    ];

    if (senderTag && !rootLower.includes('company') && !rootLower.includes('slack') && !rootLower.includes('microsoft')) {
      clues.push('6) Compare the sender display name with the actual email domain. They can differ.');
    }

    clues.push('No automatic verdict is shown. Decide using these clues.');

    alert(`Inspect Sender\n\nFrom: ${senderEmail}\n\n${clues.join('\n')}`);
  };

  const handleMarkAsSafe = () => {
    if (scenario.resolved) {
      alert("You have already taken action on this email.");
      return;
    }
    if (scenario.isLegitimate) {
      logInteraction(PHISHING_INTERACTIONS.MARKED_AS_SAFE, { emailId: scenario.id });
      alert('✅ Correct! You correctly identified this as a legitimate internal email.');
    } else {
      logInteraction(PHISHING_INTERACTIONS.MISSED_PHISHING, { emailId: scenario.id });
      alert('⚠️ Incorrect! That was a phishing email. Always check sender domains and suspicious links carefully.');
    }
    loadNextEmail(scenario.id);
  };

  const handleReportPhishing = () => {
    if (scenario.resolved) {
      alert("You have already taken action on this email.");
      return;
    }
    if (scenario.isLegitimate) {
      logInteraction(PHISHING_INTERACTIONS.REPORTED_LEGIT_AS_PHISHING, { emailId: scenario.id });
      alert('❌ That was a legitimate email from your organization! Being overly cautious can disrupt workflows — check sender domains carefully.');
    } else {
      logInteraction(PHISHING_INTERACTIONS.REPORT_PHISHING, { emailId: scenario.id });
      alert('✅ Correct! You successfully identified and reported a phishing email.');
    }
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
            <Sender $unread={!email.isRead}>{email.senderName}</Sender>
            <Subject $unread={!email.isRead} style={{ fontWeight: email.isRead ? 'normal' : '700' }}>
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
              <SecondaryButton onClick={handleMarkAsSafe}>Mark as Safe</SecondaryButton>
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

