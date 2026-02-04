import React, { useState } from 'react';
import styled from 'styled-components';
import { User, AlertCircle, Star, Paperclip, MoreVertical, Reply, CornerUpRight, Trash2 } from 'lucide-react';
import { useWindowManager } from '../WindowManager';

const MailLayout = styled.div`
  display: flex;
  height: 100%;
  font-family: 'Segoe UI', sans-serif;
`;

const Sidebar = styled.div`
  width: 280px;
  background: #f5f5f5;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const SidebarHeader = styled.div`
  padding: 15px;
  font-weight: 600;
  color: #444;
  border-bottom: 1px solid #e0e0e0;
  background: #f0f0f0;
`;

const MailItem = styled.div`
  padding: 12px 15px;
  background: ${props => props.$active ? '#fff' : 'transparent'};
  border-left: 4px solid ${props => props.$active ? '#0078d7' : 'transparent'};
  cursor: pointer;
  border-bottom: 1px solid #eaeaea;
  transition: background 0.2s;
  
  &:hover {
    background: ${props => props.$active ? '#fff' : '#e9e9e9'};
  }
`;

const Sender = styled.div`
  font-weight: ${props => props.$unread ? '700' : '600'};
  font-size: 14px;
  color: #222;
  display: flex;
  justify-content: space-between;
`;

const Time = styled.span`
  font-weight: 400;
  color: #666;
  font-size: 11px;
`;

const Subject = styled.div`
  font-size: 13px;
  color: ${props => props.$unread ? '#0078d7' : '#444'};
  margin-top: 4px;
  font-weight: ${props => props.$unread ? '600' : '400'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Preview = styled.div`
  font-size: 12px;
  color: #777;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Content = styled.div`
  flex: 1;
  background: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Toolbar = styled.div`
  height: 40px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 15px;
  color: #555;
`;

const EmailContainer = styled.div`
  padding: 30px;
  overflow-y: auto;
  flex: 1;
`;

const Header = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
`;

const HeaderTitle = styled.h2`
  margin: 0 0 15px;
  font-size: 20px;
  font-weight: 500;
  color: #111;
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #555;
  font-size: 13px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.$color || '#ddd'};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
`;

const SenderDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Body = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  margin-top: 20px;

  p {
    margin-bottom: 15px;
  }
  
  a {
    color: #0078d7;
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
`;

const LinkButton = styled.button`
  background: #0078d7;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  margin: 10px 0;
  cursor: pointer;
  
  &:hover {
    background: #006abc;
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
  background: ${props => props.$danger ? '#fff5f5' : 'white'};
  color: ${props => props.$danger ? '#d93025' : '#333'};
  border: 1px solid ${props => props.$danger ? '#fad2cf' : '#ccc'};
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    background: ${props => props.$danger ? '#fce8e6' : '#f5f5f5'};
  }
`;


const emails = [
  {
    id: 1,
    sender: "HR Team",
    email: "hr@company.com",
    subject: "New Leave Policy Update - Q1 2026",
    preview: "Dear Team, Please find attached the updated leave policy...",
    time: "09:15",
    avatarColor: "#8e24aa",
    initials: "HR",
    unread: true,
    type: "safe",
    content: `
      <p>Dear Team,</p>
      <p>We have updated our annual leave policy effective immediately. The changes include:</p>
      <ul>
        <li>Additional 2 days of wellness leave</li>
        <li>Carry-over limit increased to 10 days</li>
      </ul>
      <p>Please review the full document on the intranet.</p>
      <p>Regards,<br>HR Team</p>
    `
  },
  {
    id: 2,
    sender: "IT Support",
    email: "it-support@cornpany.com", // Subtle typo
    subject: "Action Required: Account Verification",
    preview: "Due to a recent security update, please review your account...",
    time: "10:30",
    avatarColor: "#d93025",
    initials: "IT",
    unread: true,
    type: "phishing",
    bodyComponent: ({ openBrowser }) => (
      <>
        <p>Dear User,</p>
        <p>Due to a recent security update, we require all employees to verify their account details.</p>
        <p style={{ color: '#d93025', fontWeight: 'bold' }}>Failure to act within 24 hours may result in temporary account restrictions.</p>

        <p>Please verify your status using the secure link below:</p>

        <LinkButton onClick={() => openBrowser('https://portal-companny.com/login', true)}>
          Verify Account Access
        </LinkButton>

        <p>For more information on our security protocols, visit our help center:</p>
        <ul>
          <li><a href="#" onClick={(e) => { e.preventDefault(); openBrowser('https://intranet.company.com/help', false); }}>Help Center FAQ</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); openBrowser('https://support.company.com/security', false); }}>IT Security Policy</a></li>
        </ul>

        <p>Thank you,<br />IT Support Team</p>
      </>
    )
  },
  {
    id: 3,
    sender: "DevOps",
    email: "ci-bot@company.com",
    subject: "[CI] Build #8842 Passed",
    preview: "Project: frontend-main | Branch: master | Duration: 4m 12s",
    time: "10:45",
    avatarColor: "#1b5e20",
    initials: "CI",
    unread: false,
    type: "safe",
    content: `
      <p><strong>Build #8842</strong> for project <em>frontend-main</em> has passed successfully.</p>
      <p>Commit: <code>fix: validation logic</code> (a1b2c3d)</p>
      <p>Artifacts have been deployed to staging.</p>
    `
  },
  {
    id: 4,
    sender: "Finance Team",
    email: "finance@company.com",
    subject: "Expense Report Reminder",
    preview: "This is a reminder to submit all pending expense reports...",
    time: "Yesterday",
    avatarColor: "#f57c00",
    initials: "FI",
    unread: false,
    type: "safe",
    content: `
      <p>Hi everyone,</p>
      <p>Please ensure all expense reports for January are submitted by Friday EOD.</p>
      <p>Late submissions will be processed in the next pay cycle.</p>
      <p>Regards,<br>Finance</p>
    `
  },
  {
    id: 5,
    sender: "Sarah Jenkins",
    email: "s.jenkins@company.com",
    subject: "Sprint Planning Notes",
    preview: "Thanks for the great session today. Here are the key takeaways...",
    time: "Yesterday",
    avatarColor: "#0288d1",
    initials: "SJ",
    unread: false,
    type: "safe",
    content: `
      <p>Hi Team,</p>
      <p>Great session today. Key action items:</p>
      <ol>
        <li>Finalize API contract by Wed</li>
        <li>Update updated mockups</li>
      </ol>
      <p>See you at standup.</p>
      <p>Best,<br>Sarah</p>
    `
  }
];

const MailApp = () => {
  const { openWindow, closeWindow } = useWindowManager();
  const [selectedEmail, setSelectedEmail] = useState(emails[1]); // Default to Phishing email for demo visibility? Or maybe first one? Let's stick with Phishing or first. Let's do first one to make them look for it, or phishing to be immediate? User request said "User interacts with ONE phishing email". Let's default to first email (HR) to make it realistic.
  // Actually, let's default to null or the first one. Let's do the first one.
  // Wait, let's select the first one.

  const handleSelectEmail = (email) => {
    setSelectedEmail(email);
  };

  const handleOpenBrowser = (url, isPhishing) => {
    openWindow('browser', { url, isPhishing });
  };

  const handleReportPhishing = () => {
    // Report phishing -> Save result -> Close simulation
    const result = {
      scenario: "phishing_email",
      action: "reported",
      riskLevel: "LOW", // Safe
      timestamp: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem('simulation_results') || '[]');
    localStorage.setItem('simulation_results', JSON.stringify([result, ...existing]));

    alert("Phishing Reported. Good job! Simulation Ending...");
    // In real app, close all windows or navigate away.
    // For now, let's close Mail and existing Browser.
    closeWindow('mail');
    closeWindow('browser');
    // We might want to force navigation back to Dashboard? 
    // We can't easily access navigate here without hook, but user can close via desktop or we can add a 'finish' method to context.
    // For demo, alert is fine, user will manually close or we can rely on them closing. 
  };

  return (
    <MailLayout>
      <Sidebar>
        <SidebarHeader>Inbox (2)</SidebarHeader>
        {emails.map(email => (
          <MailItem
            key={email.id}
            $active={selectedEmail?.id === email.id}
            onClick={() => handleSelectEmail(email)}
          >
            <Sender $unread={email.unread}>
              {email.sender}
              <Time>{email.time}</Time>
            </Sender>
            <Subject $unread={email.unread}>{email.subject}</Subject>
            <Preview>{email.preview}</Preview>
          </MailItem>
        ))}
      </Sidebar>

      <Content>
        <Toolbar>
          <Reply size={18} />
          <CornerUpRight size={18} />
          <Trash2 size={18} />
          <span style={{ flex: 1 }}></span>
          <MoreVertical size={18} />
        </Toolbar>

        {selectedEmail ? (
          <EmailContainer>
            <Header>
              <HeaderTitle>{selectedEmail.subject}</HeaderTitle>
              <HeaderInfo>
                <Avatar $color={selectedEmail.avatarColor}>{selectedEmail.initials}</Avatar>
                <SenderDetails>
                  <div><strong>{selectedEmail.sender}</strong> &lt;{selectedEmail.email}&gt;</div>
                  <div style={{ color: '#777' }}>To: me@company.com</div>
                </SenderDetails>
              </HeaderInfo>
            </Header>

            <Body>
              {selectedEmail.bodyComponent ? (
                selectedEmail.bodyComponent({ openBrowser: handleOpenBrowser })
              ) : (
                <div dangerouslySetInnerHTML={{ __html: selectedEmail.content }} />
              )}
            </Body>

            {selectedEmail.type === 'phishing' && (
              <ActionRow>
                <SecondaryButton onClick={() => alert('Sender: it-support@cornpany.com\n\nNotice the spelling: "cornpany" instead of "company".')}>
                  <AlertCircle size={14} /> Inspect Sender
                </SecondaryButton>
                <SecondaryButton $danger onClick={handleReportPhishing}>
                  <ShieldAlertIcon /> Report Phishing
                </SecondaryButton>
              </ActionRow>
            )}
          </EmailContainer>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#aaa' }}>
            Select an email to read
          </div>
        )}
      </Content>
    </MailLayout>
  );
};

// Helper icon
const ShieldAlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export default MailApp;
