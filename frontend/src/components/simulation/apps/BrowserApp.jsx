import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RefreshCw, ArrowLeft, ArrowRight, XCircle, ShieldCheck, Lock, AlertTriangle } from 'lucide-react';
import { useWindowManager } from '../WindowManager';

const BrowserLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: 'Segoe UI', sans-serif;
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
  border: 1px solid ${props => props.$isPhishing ? '#ea4335' : '#ccc'};
  border-radius: 16px;
  padding: 4px 15px;
  font-size: 13px;
  color: #333;
  display: flex;
  align-items: center;
  
  span {
    color: ${props => props.$isPhishing ? '#ea4335' : '#198754'}; 
    margin-right: 8px;
    display: flex;
    align-items: center;
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
  overflow-y: auto;
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

// -- Fake Login Styles --
const LoginForm = styled.div`
  width: 360px;
  padding: 40px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  text-align: center;
  margin-top: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #444;
  margin-bottom: 10px;
  font-family: serif;
`;

const Subtitle = styled.div`
  margin-bottom: 30px;
  color: #666;
  font-size: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    border-color: #1a73e8;
    outline: none;
  }
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
  margin-top: 10px;
  
  &:hover {
    background: #1557b0;
  }
`;

// -- Safe Page Styles --
const SafePageContainer = styled.div`
  max-width: 600px;
  padding: 40px;
  text-align: left;
`;

const SafeHeader = styled.h1`
  font-size: 28px;
  color: #198754;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SimulationResult = styled.div`
  max-width: 500px;
  padding: 30px;
  text-align: center;
  background: ${props => props.$risk === 'HIGH' ? '#fef2f2' : '#f0fdf4'};
  border: 2px solid ${props => props.$risk === 'HIGH' ? '#ef4444' : '#22c55e'};
  border-radius: 12px;
`;

const BrowserApp = () => {
  const { windows, closeWindow } = useWindowManager();
  const myWindow = windows.find(w => w.id === 'browser');
  const { url, isPhishing } = myWindow?.data || { url: 'about:blank', isPhishing: false };

  // Internal state for simulation flow
  const [resultSaved, setResultSaved] = useState(false);
  const [pageStage, setPageStage] = useState('viewing'); // viewing | submitted

  const handleLogin = (e) => {
    e.preventDefault();
    saveResult('HIGH');
    setPageStage('submitted');
  };

  const handleSafeAction = () => {
    // Just viewing the safe page is technically fine, but if they click "Back" or stay, it's MEDIUM risk?
    // User request: "Clicked legit link -> MEDIUM"
    // So simply arriving here is the result.
    if (!resultSaved) {
      saveResult('MEDIUM');
    }
  };

  // Auto-save Medium risk if viewing safe page
  useEffect(() => {
    if (!isPhishing && url !== 'about:blank' && !resultSaved) {
      const timer = setTimeout(() => {
        handleSafeAction();
        setResultSaved(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [url, isPhishing, resultSaved]);


  const saveResult = (risk) => {
    if (resultSaved) return;

    const result = {
      scenario: "phishing_email",
      action: risk === 'HIGH' ? "credentials_entered" : "legit_link_clicked",
      riskLevel: risk,
      timestamp: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem('simulation_results') || '[]');
    localStorage.setItem('simulation_results', JSON.stringify([result, ...existing]));
    setResultSaved(true);
  };

  const navigate = useNavigate();

  const handleReturn = () => {
    closeWindow('browser');
    closeWindow('mail');
    navigate('/dashboard');
  };

  if (pageStage === 'submitted' || (resultSaved && !isPhishing)) {
    return (
      <BrowserLayout>
        <AddressBar>
          <div style={{ flex: 1, textAlign: 'center', color: '#888', fontStyle: 'italic' }}>Simulation Ended</div>
        </AddressBar>
        <WebContent>
          <SimulationResult $risk={isPhishing ? 'HIGH' : 'MEDIUM'}>
            {isPhishing ? (
              <>
                <AlertTriangle size={48} color="#ef4444" style={{ marginBottom: 15 }} />
                <h2 style={{ color: '#991b1b', marginBottom: 10 }}>Phishing Simulation Failed</h2>
                <p>You entered credentials on a fake site.</p>
                <p style={{ fontSize: 12, color: '#666', marginTop: 10 }}>
                  The domain <b>{url}</b> is not authorized.
                </p>
              </>
            ) : (
              <>
                <ShieldCheck size={48} color="#22c55e" style={{ marginBottom: 15 }} />
                <h2 style={{ color: '#166534', marginBottom: 10 }}>Safe Link Verified</h2>
                <p>You clicked a legitimate link. However, you should still be cautious.</p>
                <p style={{ fontSize: 12, color: '#666', marginTop: 10 }}>
                  Always verify the sender before clicking.
                </p>
              </>
            )}
            <SubmitButton onClick={handleReturn} style={{ marginTop: 30, background: '#333' }}>
              Return to Dashboard
            </SubmitButton>
          </SimulationResult>
        </WebContent>
      </BrowserLayout>
    );
  }

  return (
    <BrowserLayout>
      <AddressBar>
        <ArrowLeft size={16} color="#888" />
        <ArrowRight size={16} color="#888" />
        <RefreshCw size={14} color="#5f6368" />
        <UrlInput $isPhishing={isPhishing}>
          {isPhishing ? (
            <span title="Not Secure"><AlertTriangle size={12} style={{ marginRight: 4 }} /> Not Secure</span>
          ) : (
            <span title="Secure Connection"><Lock size={12} style={{ marginRight: 4 }} /> Secure</span>
          )}
          {url}
        </UrlInput>
      </AddressBar>

      {isPhishing ? (
        // --- PHISHING PAGE ---
        <>
          <ExpiryBanner>
            <XCircle size={16} />
            <span>Session expired. Please login again to continue.</span>
          </ExpiryBanner>
          <WebContent>
            <LoginForm>
              <Logo>Company Corp</Logo>
              <Subtitle>Sign in to access the portal</Subtitle>

              <div style={{ textAlign: 'left', fontSize: '13px', marginBottom: '5px', fontWeight: 500 }}>Email</div>
              <Input type="text" placeholder="user@company.com" />

              <div style={{ textAlign: 'left', fontSize: '13px', marginBottom: '5px', fontWeight: 500 }}>Password</div>
              <Input type="password" placeholder="********" />

              <SubmitButton onClick={handleLogin}>Sign In</SubmitButton>
              <div style={{ marginTop: '15px', fontSize: '12px', color: '#1a73e8', cursor: 'pointer' }}>Forgot password?</div>
            </LoginForm>
            <div style={{ marginTop: 30, color: '#888', fontSize: 11 }}>
              Authorized Personnel Only. Monitoring in progress.
            </div>
          </WebContent>
        </>
      ) : (
        // --- SAFE PAGE ---
        <WebContent style={{ alignItems: 'flex-start' }}>
          <SafePageContainer>
            <SafeHeader>
              <ShieldCheck size={32} />
              IT Support Center
            </SafeHeader>
            <p style={{ lineHeight: '1.6', marginBottom: 20 }}>
              This is the official help center for Company Corp.
              Reference Document: <strong>SEC-2026-POL-A</strong>
            </p>
            <div style={{ background: '#f8f9fa', padding: 20, borderRadius: 8, borderLeft: '4px solid #198754' }}>
              <h3>Account Security Tips</h3>
              <ul style={{ marginTop: 10, paddingLeft: 20, lineHeight: 1.8 }}>
                <li>Never share your password.</li>
                <li>Look for the lock icon in the address bar.</li>
                <li>Report suspicious emails to IT.</li>
              </ul>
            </div>
          </SafePageContainer>
        </WebContent>
      )}
    </BrowserLayout>
  );
};

export default BrowserApp;
