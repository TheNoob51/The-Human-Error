import React from 'react';
import styled from 'styled-components';

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
  background: ${props => props.$active ? '#fff' : 'transparent'};
  border-left: 3px solid ${props => props.$active ? '#0078d7' : 'transparent'};
  cursor: pointer;
  
  &:hover {
    background: #e6f7ff;
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
  return (
    <MailLayout>
      <Sidebar>
        <MailItem $active>
          <Sender>IT Support</Sender>
          <Subject>URGENT: Action Required</Subject>
        </MailItem>
        <MailItem>
          <Sender>Marketing Team</Sender>
          <Subject>Newsletter for Jan...</Subject>
        </MailItem>
        <MailItem>
          <Sender>HR Department</Sender>
          <Subject>Holiday Calendar</Subject>
        </MailItem>
      </Sidebar>
      <Content>
        <Header>
          <HeaderTitle>URGENT: Account Verification Required</HeaderTitle>
          <HeaderInfo>
            <Avatar><User size={16} /></Avatar>
            <div>
              <div><strong>From:</strong> IT Support &lt;support@company-security-update.com&gt;</div>
              <div><strong>To:</strong> clean.user@company.com</div>
            </div>
          </HeaderInfo>
        </Header>
        <Body>
          <p>Dear User,</p>
          <p>Your account has been flagged for suspicious activity. To prevent lockout, you must verify your identity within 10 minutes.</p>
          <p>Failure to report could result in permanent loss of access.</p>

          <FakeLinkButton>Verify Account Now</FakeLinkButton>
        </Body>

        <ActionRow>
          <SecondaryButton>Inspect Sender</SecondaryButton>
          <SecondaryButton $danger>Report Phishing</SecondaryButton>
        </ActionRow>
      </Content>
    </MailLayout>
  );
};

export default MailApp;
