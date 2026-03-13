import React from 'react';
import styled from 'styled-components';
import { useSimulation } from '../../../context/SimulationContext';
import { PHISHING_INTERACTIONS } from '../../../constants';

import { RefreshCw, ArrowLeft, ArrowRight, XCircle } from 'lucide-react';

const BrowserLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const AddressBar = styled.div`
  height: 36px;
  background: #f1f3f4;
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 10px;
  border-bottom: 1px solid #ddd;
`;

const UrlInput = styled.div`
  flex: 1;
  background: white;
  border: 1px solid #ccc;
  border-radius: 16px;
  padding: 4px 15px;
  font-size: 13px;
  color: #333;
  display: flex;
  align-items: center;
  
  span {
    color: #0b57d0; // Secure/Fake icon color
    margin-right: 8px;
  }
`;

const WebContent = styled.div`
  flex: 1;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ExpiryBanner = styled.div`
  width: 100%;
  background: #fce8e6;
  color: #c5221f;
  padding: 10px;
  text-align: center;
  font-weight: 500;
  border-bottom: 1px solid #fad2cf;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const LoginForm = styled.div`
  width: 320px;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  margin-top: 40px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #555;
  margin-bottom: 20px;
  font-family: serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: #1557b0;
  }
`;

const BrowserApp = () => {
  const { logInteraction, loadNextEmail, selectedEmailId } = useSimulation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    logInteraction(PHISHING_INTERACTIONS.CREDENTIALS_ENTERED, { email });
    alert("Credentials captured! (Simulation continues)");
    loadNextEmail(selectedEmailId);
  };

  return (
    <BrowserLayout>
      <AddressBar>
        <ArrowLeft size={16} color="#888" />
        <ArrowRight size={16} color="#888" />
        <RefreshCw size={14} color="#5f6368" />
        <UrlInput>
          <span role="img" aria-label="lock">🔒</span> company-portal-login-secure.net/auth
        </UrlInput>
      </AddressBar>

      <ExpiryBanner>
        <XCircle size={16} />
        <span>Session expired. Please login again to continue.</span>
      </ExpiryBanner>

      <WebContent>
        <LoginForm>
          <Logo>Company Corp</Logo>
          <div style={{ textAlign: 'left', fontSize: '14px', marginBottom: '5px' }}>Email</div>
          <Input type="text" placeholder="user@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div style={{ textAlign: 'left', fontSize: '14px', marginBottom: '5px' }}>Password</div>
          <Input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
          <SubmitButton onClick={handleLogin}>Sign In</SubmitButton>
          <div style={{ marginTop: '15px', fontSize: '12px', color: '#1a73e8', cursor: 'pointer' }}>Forgot password?</div>
        </LoginForm>
      </WebContent>
    </BrowserLayout>
  );
};

export default BrowserApp;
