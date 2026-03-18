import React from 'react';
import styled from 'styled-components';
import { AlertOctagon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWindowManager } from '../WindowManager';
import { useSimulation } from '../../../context/SimulationContext';
import { PHISHING_INTERACTIONS } from '../../../constants';

const AlertBox = styled(motion.div)`
  width: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  overflow-y: auto;
  border: 1px solid #d93025;
`;

const AlertHeader = styled.div`
  background: #d93025;
  color: white;
  padding: 10px 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AlertBody = styled.div`
  padding: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #fff;
`;

const Message = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
`;

const Source = styled.div`
  margin-bottom: 12px;
  font-size: 12px;
  color: #666;
`;

const InspectionPanel = styled.div`
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid #e5e7eb;
  background: #f8fafc;
  border-radius: 6px;
  padding: 10px;
  text-align: left;
  font-size: 12px;
  color: #444;
`;

const Meta = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: #5f6368;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 7px 14px;
  border-radius: 4px;
  border: none;
  font-size: 13px;
  cursor: pointer;
  font-weight: 500;
  background: ${props => props.$primary ? '#d93025' : '#f0f0f0'};
  color: ${props => props.$primary ? 'white' : '#333'};
  
  &:hover {
    background: ${props => props.$primary ? '#b01f14' : '#e0e0e0'};
  }
`;

const ALERT_SCENARIOS = {
  update: {
    type: 'phishing',
    scenario: 'update',
    title: 'System Update Required',
    message: 'A critical system update is required to continue using your device.',
    source: 'System Updater',
    cta: 'Install Now',
  },
  mfa: {
    type: 'phishing',
    scenario: 'mfa',
    title: 'Login Approval Required',
    message: 'Approve sign-in request for your account.',
    source: 'Company Authenticator',
    cta: 'Approve',
  },
};

const extractDomain = (source) => {
  if (!source) return 'unknown';
  const match = source.match(/([a-z0-9-]+\.)+[a-z]{2,}/i);
  return match ? match[0].toLowerCase() : 'internal-source';
};

const getInitialScenario = (session) => {
  const interactions = session?.interactions || [];
  const hasRiskyAction = interactions.some(
    (item) =>
      item.type === PHISHING_INTERACTIONS.CREDENTIALS_ENTERED ||
      item.type === PHISHING_INTERACTIONS.FAKE_LINK_CLICKED
  );

  // Trigger MFA when there is recent risky behavior, otherwise use update prompt.
  return hasRiskyAction ? ALERT_SCENARIOS.mfa : ALERT_SCENARIOS.update;
};

const getMailRiskContext = (interactions = []) => {
  const riskyTypes = new Set([
    PHISHING_INTERACTIONS.FAKE_LINK_CLICKED,
    PHISHING_INTERACTIONS.CREDENTIALS_ENTERED,
    PHISHING_INTERACTIONS.MISSED_PHISHING,
    PHISHING_INTERACTIONS.REPORTED_LEGIT_AS_PHISHING,
  ]);

  const safeTypes = new Set([
    PHISHING_INTERACTIONS.REPORT_PHISHING,
    PHISHING_INTERACTIONS.INSPECT_SENDER,
    PHISHING_INTERACTIONS.MARKED_AS_SAFE,
  ]);

  const mailInteractions = interactions.filter((item) => item?.type !== 'alert_action');
  const riskyCount = mailInteractions.filter((item) => riskyTypes.has(item.type)).length;
  const safeCount = mailInteractions.filter((item) => safeTypes.has(item.type)).length;

  // Baseline risk is influenced by prior mail behavior.
  const baseline = Math.max(0, riskyCount * 10 - safeCount * 4);

  return {
    riskyCount,
    safeCount,
    baseline,
  };
};

const getActionDelta = (action, scenario, riskContext) => {
  if (action === 'resolve') {
    const repeatRiskPenalty = Math.min(riskContext.riskyCount * 3, 15);
    const mfaFatiguePenalty = scenario === 'mfa' ? 5 : 0;
    return 30 + repeatRiskPenalty + mfaFatiguePenalty;
  }

  if (action === 'inspect') {
    const safetyBonus = Math.min(riskContext.safeCount, 3);
    return -5 - safetyBonus;
  }

  return 0;
};

const SystemAlert = () => {
  const { closeWindow } = useWindowManager();
  const { logInteraction, session } = useSimulation();

  const [alertData, setAlertData] = React.useState(() => getInitialScenario(session));
  const [showInspection, setShowInspection] = React.useState(false);
  const [mfaCount, setMfaCount] = React.useState(1);
  const [isGeminiGenerated, setIsGeminiGenerated] = React.useState(false);

  const riskContext = React.useMemo(
    () => getMailRiskContext(session?.interactions || []),
    [session?.interactions]
  );

  const [riskScore, setRiskScore] = React.useState(riskContext.baseline);

  React.useEffect(() => {
    setRiskScore(riskContext.baseline);
  }, [riskContext.baseline]);

  React.useEffect(() => {
    let isMounted = true;

    const fetchGeminiAlert = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/generate-alert', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            scenario: alertData.scenario,
            profile: session?.profileSnapshot || null,
            recentInteractions: session?.interactions || [],
          }),
        });

        if (!response.ok) {
          if (isMounted) setIsGeminiGenerated(false);
          return;
        }

        const generated = await response.json();
        const isValidGeneratedAlert =
          generated &&
          generated.type === 'phishing' &&
          generated.scenario === alertData.scenario &&
          typeof generated.title === 'string' &&
          typeof generated.message === 'string' &&
          typeof generated.source === 'string' &&
          typeof generated.cta === 'string';

        if (isMounted && isValidGeneratedAlert) {
          const fallback = ALERT_SCENARIOS[alertData.scenario];
          setAlertData({
            ...generated,
            title: generated.title.trim() || fallback.title,
            message: generated.message.trim() || fallback.message,
            source: generated.source.trim() || fallback.source,
            cta: generated.cta.trim() || fallback.cta,
          });
          setIsGeminiGenerated(true);
        }
      } catch {
        if (isMounted) {
          setIsGeminiGenerated(false);
        }
      }
    };

    fetchGeminiAlert();

    return () => {
      isMounted = false;
    };
  }, [alertData.scenario, session?.interactions, session?.profileSnapshot]);

  const logAlertAction = (action, alert, delta, nextRiskScore) => {
    logInteraction('alert_action', {
      type: 'alert_action',
      action,
      scenario: alert.scenario,
      alertType: alert.type,
      timestamp: Date.now(),
      source: 'system_alert',
      mfaCount,
      baselineRisk: riskContext.baseline,
      scoreDelta: delta,
      adjustedRiskScore: nextRiskScore,
      riskScore,
      usedGeminiContent: isGeminiGenerated,
    });
  };

  const updateRiskScore = (action, scenario) => {
    const delta = getActionDelta(action, scenario, riskContext);
    const nextRiskScore = Math.max(0, riskScore + delta);
    setRiskScore(nextRiskScore);
    return { delta, nextRiskScore };
  };

  const handleAction = (action, alert) => {
    const { delta, nextRiskScore } = updateRiskScore(action, alert.scenario);
    logAlertAction(action, alert, delta, nextRiskScore);

    if (action === 'resolve') {
      logInteraction(PHISHING_INTERACTIONS.FAKE_LINK_CLICKED, {
        source: 'system_alert',
        action,
        scenario: alert.scenario,
      });
      closeWindow('alert');
      return;
    }

    if (action === 'inspect') {
      setShowInspection(true);
      logInteraction(PHISHING_INTERACTIONS.REPORT_PHISHING, {
        source: 'system_alert',
        action,
        scenario: alert.scenario,
      });
    }

    if (action === 'ignore') {
      logInteraction(PHISHING_INTERACTIONS.REPORT_PHISHING, {
        source: 'system_alert',
        action,
        scenario: alert.scenario,
      });
    }

    if (alert.scenario === 'mfa') {
      if (mfaCount >= 3) {
        closeWindow('alert');
      } else {
        setMfaCount((prev) => prev + 1);
      }
      return;
    }

    closeWindow('alert');
  };

  return (
    <AlertBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ width: '100%', height: '100%', border: 'none', boxShadow: 'none' }}
    >
      <AlertHeader>
        <span>{alertData.title}</span>
      </AlertHeader>
      <AlertBody>
        <AlertOctagon size={40} color="#d93025" />
        <Message>
          <strong>Security Alert Detected</strong>
          <br /><br />
          {alertData.message}
        </Message>
        <Source>Source: {alertData.source}</Source>

        {showInspection && (
          <InspectionPanel>
            <div><strong>Inspection Details</strong></div>
            <div>Reported source: {alertData.source}</div>
            <div>Derived domain: {extractDomain(alertData.source)}</div>
            <div>Scenario type: {alertData.scenario.toUpperCase()}</div>
          </InspectionPanel>
        )}

        {alertData.scenario === 'mfa' && (
          <Meta>MFA request attempt {mfaCount} of 3</Meta>
        )}
        {isGeminiGenerated && <Meta>Alert content generated by Gemini</Meta>}
        <Meta>Risk score: {riskScore}</Meta>

        <ButtonGroup>
          <Button $primary onClick={() => handleAction('resolve', alertData)}>
            {alertData.cta || (alertData.scenario === 'mfa' ? 'Approve' : 'Resolve Now')}
          </Button>
          <Button onClick={() => handleAction('inspect', alertData)}>Inspect</Button>
          <Button onClick={() => handleAction('ignore', alertData)}>Ignore</Button>
        </ButtonGroup>
      </AlertBody>
    </AlertBox>
  );
};

export default SystemAlert;
