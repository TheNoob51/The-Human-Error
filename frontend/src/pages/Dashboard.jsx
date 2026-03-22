import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    ShieldAlert,
    Brain,
    MousePointerClick,
    AlertTriangle,
    CheckCircle,
    Clock
} from "lucide-react";

import Header from "../components/Header";
import Button from "../components/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import Badge from "../components/Badge";
import Progress from "../components/Progress";
import ProfileDetailsPane from "../components/ProfileDetailsPane";
import { useAuth } from "../context/AuthContext";
import { getUserSimulations, upsertUserProfile } from "../lib/firestoreService";

/* Navbar related styles removed in favor of reusable Header */

const PageContainer = styled.div`
  min-height: 100vh;
    background: transparent;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionBlock = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.25rem;
    border: 1px solid var(--border);
    border-radius: 16px;
    background: linear-gradient(160deg, var(--card-bg), rgba(255, 255, 255, 0.02));
`;

const PageHeaderRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
`;

const DashboardTitle = styled.h1`
    font-size: clamp(1.9rem, 2.4vw, 2.4rem);
    font-weight: 800;
    margin: 0;
    letter-spacing: -0.03em;
`;

const DashboardSubtitle = styled.p`
    color: var(--text-secondary);
    margin: 0.35rem 0 0;
`;

const HeaderActions = styled.div`
    display: flex;
    gap: 0.75rem;
    align-items: center;
    flex-wrap: wrap;
`;

// Grid Layouts
const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const InsightsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

// Custom Card Styles
const MetricValue = styled.div`
    font-size: clamp(2.1rem, 3vw, 2.8rem);
  font-weight: 800;
  line-height: 1;
  margin: 0.5rem 0;
`;

const MetricLabel = styled.p`
  font-size: 0.875rem;
    color: var(--text-secondary);
`;

const MetricCard = styled(Card)`
    text-align: left;
`;

const ScoreMeta = styled.span`
    font-size: 1.25rem;
    color: var(--text-secondary);
    font-weight: 400;
`;

const SplitValueRow = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
`;

const RiskProfileGrid = styled.div`
    display: flex;
    gap: 1rem;
    margin: 0.75rem 0 1rem;
`;

const RiskProfileCell = styled.div`
    text-align: center;
    flex: 1;
    border-radius: 12px;
    padding: 10px;
    border: 1px solid transparent;
    background-color: ${(props) => props.$tone === 'high' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(34, 197, 94, 0.12)'};
    border-color: ${(props) => props.$tone === 'high' ? 'rgba(239, 68, 68, 0.28)' : 'rgba(34, 197, 94, 0.28)'};
`;

const RiskProfileValue = styled.div`
    font-size: 2rem;
    font-weight: 800;
    color: ${(props) => props.$tone === 'high' ? 'var(--danger)' : 'var(--success)'};
`;

const RiskProfileLabel = styled.div`
    font-size: 0.75rem;
    color: var(--text-secondary);
`;

const SessionHeading = styled.span`
    font-size: 0.9rem;
    color: var(--text-secondary);
    font-weight: 600;
`;

const RiskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RiskItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
    border-radius: 12px;
    border: 1px solid var(--border);
  background-color: hsl(var(--muted) / 0.3);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-4px);
        border-color: rgba(59, 130, 246, 0.4);
    }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  
  th {
    text-align: left;
        padding: 0.9rem 1rem;
        color: var(--text-secondary);
    font-weight: 500;
    border-bottom: 1px solid hsl(var(--border-hsl));
        background: rgba(255, 255, 255, 0.02);
  }
  
  td {
        padding: 0.85rem 1rem;
    border-bottom: 1px solid hsl(var(--border-hsl));
  }
  
  tr:last-child td {
    border-bottom: none;
  }

  /* basic hover row */
  tbody tr:hover {
      background-color: rgba(59, 130, 246, 0.12);
  }
`;

const SelectorRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    padding-top: 0.25rem;
`;

const SessionSelect = styled.select`
        padding: 0.56rem 0.75rem;
        border: 1px solid var(--border);
        border-radius: 12px;
        background: rgba(15, 23, 42, 0.7);
    color: hsl(var(--foreground));
    min-width: 220px;
        transition: all 0.3s ease;

        &:hover {
            border-color: rgba(59, 130, 246, 0.42);
        }
`;

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, userProfile, refreshUserProfile } = useAuth();
    const [results, setResults] = useState([]);
    const [selectedSessionId, setSelectedSessionId] = useState('ALL');
    const [loading, setLoading] = useState(true);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [metrics, setMetrics] = useState({
        totalSimulations: 0,
        highRiskCount: 0,
        lowRiskCount: 0,
        averageRiskScore: 0,
    });
    const [riskBreakdown, setRiskBreakdown] = useState({
        urgency: { count: 0, level: 'Low Risk', variant: 'success' },
        authority: { count: 0, level: 'Low Risk', variant: 'success' },
        reward: { count: 0, level: 'Low Risk', variant: 'success' },
    });
    const [avgHesitation, setAvgHesitation] = useState(null);

    const filteredResults = selectedSessionId === 'ALL'
        ? results
        : results.filter((r) => r.__sessionKey === selectedSessionId);

    // NOTE: previously was useState(() => {...}, []) which is a bug — should be useEffect
    useEffect(() => {
        const loadResults = async () => {
            setLoading(true);
            let stored = [];

            // Load from Firestore
            try {
                if (user?.uid) {
                    stored = await getUserSimulations(user.uid);
                }
            } catch (err) {
                console.warn('Firestore fetch failed, falling back to localStorage:', err);
            }

            // Fallback only if Firestore returned nothing
            if (stored.length === 0) {
                try {
                    stored = JSON.parse(localStorage.getItem('simulation_results') || '[]');
                } catch (e) {
                    console.error('localStorage parse error:', e);
                }
            }

            stored.sort((a, b) => {
                const timeA = a.createdAt?.toMillis?.() || new Date(a.endTime || a.startTime).getTime() || 0;
                const timeB = b.createdAt?.toMillis?.() || new Date(b.endTime || b.startTime).getTime() || 0;
                return timeB - timeA;
            });

            const normalized = stored.map((session, index) => ({
                ...session,
                __sessionKey: String(session.sessionId || session.id || `local-${index}`),
            }));

            setResults(normalized);

            setLoading(false);
        };

        loadResults();
    }, [user]);

    useEffect(() => {
        if (selectedSessionId !== 'ALL' && !results.some((r) => r.__sessionKey === selectedSessionId)) {
            setSelectedSessionId('ALL');
        }
    }, [results, selectedSessionId]);

    useEffect(() => {
        const source = filteredResults;

        if (source.length === 0) {
            setMetrics({
                totalSimulations: 0,
                highRiskCount: 0,
                lowRiskCount: 0,
                averageRiskScore: 0,
            });
            setRiskBreakdown({
                urgency: { count: 0, level: 'Low Risk', variant: 'success' },
                authority: { count: 0, level: 'Low Risk', variant: 'success' },
                reward: { count: 0, level: 'Low Risk', variant: 'success' },
            });
            setAvgHesitation(null);
            return;
        }

        let high = 0;
        let low = 0;
        let totalScore = 0;
        let urgencyRisky = 0;
        let authorityRisky = 0;
        let rewardRisky = 0;
        let totalHesitation = 0;
        let hesitationCount = 0;

        const riskMap = {
            'VERY_HIGH': 0,
            'HIGH': 1,
            'MEDIUM': 2,
            'LOW': 3,
        };

        source.forEach(session => {
            const risk = session.finalRiskLevel || 'LOW';
            if (risk === 'VERY_HIGH' || risk === 'HIGH') high++;
            if (risk === 'MEDIUM' || risk === 'LOW') low++;
            totalScore += (riskMap[risk] ?? 3);

            if (session.avgHesitationMs) {
                totalHesitation += session.avgHesitationMs;
                hesitationCount++;
            }

            const interactions = session.interactions || [];
            interactions.forEach(interaction => {
                const isFailed = interaction.type === 'CREDENTIALS_ENTERED' || interaction.type === 'FAKE_LINK_CLICKED';
                const details = interaction.details || {};
                const emailData = (session.inbox || []).find(e => e.id === details.emailId);
                const clues = emailData?.clues?.join(' ').toLowerCase() || '';

                if (isFailed) {
                    if (clues.includes('urgent') || clues.includes('expir') || clues.includes('timeline')) urgencyRisky++;
                    if (clues.includes('ceo') || clues.includes('authority') || clues.includes('leadership') || clues.includes('executive')) authorityRisky++;
                    if (clues.includes('reward') || clues.includes('bonus') || clues.includes('benefit')) rewardRisky++;
                }
            });
        });

        const avg = totalScore / source.length;
        const avgPercentage = Math.round((avg / 3) * 100);

        setMetrics({
            totalSimulations: source.length,
            highRiskCount: high,
            lowRiskCount: low,
            averageRiskScore: avgPercentage,
        });

        const getRiskLevel = (count) => {
            if (count >= 3) return { level: 'High Risk', variant: 'destructive' };
            if (count >= 1) return { level: 'Medium Risk', variant: 'warning' };
            return { level: 'Low Risk', variant: 'success' };
        };

        setRiskBreakdown({
            urgency: { count: urgencyRisky, ...getRiskLevel(urgencyRisky) },
            authority: { count: authorityRisky, ...getRiskLevel(authorityRisky) },
            reward: { count: rewardRisky, ...getRiskLevel(rewardRisky) },
        });

        setAvgHesitation(
            hesitationCount > 0 ? Math.round(totalHesitation / hesitationCount / 1000) : null
        );
    }, [filteredResults]);

    const recentSession = filteredResults[0] || null;

    const handleProfileSave = async (profileData) => {
        if (!user?.uid) {
            throw new Error('No authenticated user found.');
        }

        setIsSavingProfile(true);
        try {
            await upsertUserProfile(user.uid, profileData, user);
            await refreshUserProfile();
        } finally {
            setIsSavingProfile(false);
        }
    };

    return (
        <PageContainer>
            {/* Top Navigation using reusable Header */}
            <Header />

            <MainContent as={motion.div} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

                {/* Page Header */}
                <PageHeaderRow>
                    <div>
                        <DashboardTitle>Security Dashboard</DashboardTitle>
                        <DashboardSubtitle>Behavioral insights based on simulated social engineering scenarios.</DashboardSubtitle>
                    </div>
                    <HeaderActions>
                        <Button variant="outline" onClick={() => navigate("/training")}>
                            Start Training
                        </Button>
                        <Button onClick={() => navigate("/simulation")}>
                            Start Simulation
                        </Button>
                    </HeaderActions>
                </PageHeaderRow>

                <SelectorRow>
                    <SessionHeading>
                        {loading ? 'Loading Results...' : 'View Results:'}
                    </SessionHeading>
                    <SessionSelect
                        value={selectedSessionId}
                        onChange={(e) => setSelectedSessionId(e.target.value)}
                    >
                        <option value="ALL">All Simulations</option>
                        {results.map((session, index) => (
                            <option key={session.__sessionKey || index} value={session.__sessionKey}>
                                {`Simulation ${index + 1} - ${new Date(session.endTime || session.startTime).toLocaleDateString()}`}
                            </option>
                        ))}
                    </SessionSelect>
                </SelectorRow>

                <ProfileDetailsPane
                    user={user}
                    profile={userProfile}
                    onSave={handleProfileSave}
                    isSaving={isSavingProfile}
                />

                {/* Section 1: Key Metrics */}
                <SectionBlock>
                <MetricsGrid>
                    {/* Card 1: Vulnerability Score */}
                    <MetricCard>
                        <CardHeader>
                            <CardTitle style={{ fontSize: "1rem" }}>Vulnerability Score</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SplitValueRow>
                                <MetricValue>{metrics.averageRiskScore}<ScoreMeta>/100</ScoreMeta></MetricValue>
                                {metrics.averageRiskScore < 50 ? (
                                    <AlertTriangle size={24} color="hsl(var(--destructive))" />
                                ) : (
                                    <ShieldAlert size={24} color="hsl(38, 92%, 50%)" />
                                )}
                            </SplitValueRow>
                            <Progress value={metrics.averageRiskScore} style={{ marginTop: "1rem", marginBottom: "0.5rem" }} />
                            <MetricLabel>Higher score indicates lower susceptibility.</MetricLabel>
                        </CardContent>
                    </MetricCard>

                    {/* Card 2: Risk Profile */}
                    <MetricCard>
                        <CardHeader>
                            <CardTitle style={{ fontSize: "1rem" }}>Risk Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RiskProfileGrid>
                                <RiskProfileCell $tone="high">
                                    <RiskProfileValue $tone="high">{metrics.highRiskCount}</RiskProfileValue>
                                    <RiskProfileLabel>HIGH RISK</RiskProfileLabel>
                                </RiskProfileCell>
                                <RiskProfileCell $tone="low">
                                    <RiskProfileValue $tone="low">{metrics.lowRiskCount}</RiskProfileValue>
                                    <RiskProfileLabel>LOW RISK</RiskProfileLabel>
                                </RiskProfileCell>
                            </RiskProfileGrid>
                            <p style={{ fontSize: "0.85rem", lineHeight: 1.4, color: "var(--text-secondary)", textAlign: "center" }}>
                                Historical baseline of susceptibility across all simulated encounters.
                            </p>
                        </CardContent>
                    </MetricCard>

                    {/* Card 3: Simulations Completed */}
                    <MetricCard>
                        <CardHeader>
                            <CardTitle style={{ fontSize: "1rem" }}>Simulations Completed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SplitValueRow>
                                <MetricValue>{metrics.totalSimulations}</MetricValue>
                                <CheckCircle size={24} color="hsl(142, 76%, 36%)" />
                            </SplitValueRow>
                            <MetricLabel>Total scenarios successfully completed.</MetricLabel>
                        </CardContent>
                    </MetricCard>
                </MetricsGrid>
                </SectionBlock>

                {/* Section 2: Behavior Insights */}
                <SectionBlock>
                <InsightsGrid>
                    <Card>
                        <CardHeader>
                            <CardTitle>Risk Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RiskList>
                                <RiskItem>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <AlertTriangle size={18} className="text-destructive" />
                                        <span style={{ fontWeight: 500 }}>Urgency-based attacks</span>
                                    </div>
                                    <Badge variant={riskBreakdown.urgency.variant}>{riskBreakdown.urgency.level}</Badge>
                                </RiskItem>
                                <RiskItem>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <ShieldAlert size={18} className="text-warning" style={{ color: "hsl(38, 92%, 50%)" }} />
                                        <span style={{ fontWeight: 500 }}>Authority-based attacks</span>
                                    </div>
                                    <Badge variant={riskBreakdown.authority.variant}>{riskBreakdown.authority.level}</Badge>
                                </RiskItem>
                                <RiskItem>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <MousePointerClick size={18} className="text-primary" />
                                        <span style={{ fontWeight: 500 }}>Reward-based attacks</span>
                                    </div>
                                    <Badge variant={riskBreakdown.reward.variant}>{riskBreakdown.reward.level}</Badge>
                                </RiskItem>
                                {avgHesitation !== null && (
                                    <RiskItem>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <Clock size={18} />
                                            <span style={{ fontWeight: 500 }}>Avg. Decision Time</span>
                                        </div>
                                        <Badge variant={avgHesitation < 5 ? 'destructive' : avgHesitation < 15 ? 'warning' : 'success'}>
                                            {avgHesitation}s
                                        </Badge>
                                    </RiskItem>
                                )}
                            </RiskList>
                        </CardContent>
                    </Card>

                    <Card style={{ backgroundColor: "hsl(var(--secondary) / 0.5)", border: "none" }}>
                        <CardHeader>
                            <CardTitle>Recommended Focus</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p style={{ lineHeight: 1.6, marginBottom: "1.5rem" }}>
                                You show a vulnerability to <strong>urgency-based</strong> social engineering triggers. Attackers use this to bypass critical thinking.
                            </p>
                            <Button
                                variant="outline"
                                style={{ width: "100%", backgroundColor: "hsl(var(--background))" }}
                                onClick={() => navigate("/simulation")}
                            >
                                Start Urgency Training
                            </Button>
                        </CardContent>
                    </Card>
                </InsightsGrid>
                </SectionBlock>

                {/* Section 3: Selected Session Details */}
                <SectionBlock>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {selectedSessionId === 'ALL' ? 'Most Recent Session (All Simulations)' : 'Selected Simulation'}
                            {recentSession && <Badge variant="outline" style={{ marginLeft: "10px", fontSize: "0.75rem" }}>{new Date(recentSession.endTime || recentSession.startTime).toLocaleDateString()}</Badge>}
                        </CardTitle>
                    </CardHeader>
                    <CardContent style={{ padding: 0 }}>
                        {recentSession ? (
                            <div style={{ overflowX: "auto" }}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Time</th>
                                            <th>Interaction Type</th>
                                            <th>Risk Level</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentSession.interactions.map((interaction, index) => {
                                            let badgeVariant = "secondary";
                                            if (interaction.type.includes("ENTERED") || interaction.type.includes("FAKE_LINK")) badgeVariant = "destructive";
                                            else if (interaction.type.includes("REPORT")) badgeVariant = "success";

                                            // Handle edge case of EMAIL_OPENED which isn't defined explicitly here
                                            else if (interaction.type.includes("OPENED")) badgeVariant = "outline";

                                            return (
                                                <tr key={index}>
                                                    <td>{new Date(interaction.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                                                    <td style={{ fontWeight: 500 }}>{interaction.type}</td>
                                                    <td><Badge variant={badgeVariant}>{badgeVariant === "destructive" ? "Failed" : badgeVariant === "success" ? "Safe" : "Action"}</Badge></td>
                                                </tr>
                                            );
                                        })}
                                        {recentSession.interactions.length === 0 && (
                                            <tr>
                                                <td colSpan="3" style={{ textAlign: "center", padding: "2rem", color: "hsl(var(--muted-foreground))" }}>
                                                    No interactions recorded for this session.
                                                </td>
                                            </tr>
                                        )}
                                        <tr style={{ backgroundColor: "hsl(var(--secondary) / 0.5)" }}>
                                            <td colSpan="2" style={{ fontWeight: 600, textAlign: "right" }}>Overall Session Grade:</td>
                                            <td>
                                                <Badge
                                                    variant={recentSession.finalRiskLevel === 'LOW' ? 'success' : recentSession.finalRiskLevel === 'MEDIUM' ? 'warning' : 'destructive'}
                                                >
                                                    {recentSession.finalRiskLevel} RISK
                                                </Badge>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                                {recentSession.explanation && (
                                    <div style={{ padding: "1.5rem", borderTop: "1px solid hsl(var(--border-hsl))", backgroundColor: "hsl(var(--muted)/0.2)" }}>
                                        <h4 style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                            <Brain size={16} color="hsl(var(--primary))" />
                                            AI Analysis
                                        </h4>
                                        <p style={{ fontSize: "0.925rem", color: "hsl(var(--muted-foreground))", lineHeight: 1.5 }}>
                                            {recentSession.explanation}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div style={{ padding: "3rem", textAlign: "center", color: "hsl(var(--muted-foreground))" }}>
                                <p>No simulation sessions recorded yet.</p>
                                <Button
                                    onClick={() => navigate("/simulation")}
                                    style={{ marginTop: "1rem" }}
                                >
                                    Start First Simulation
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
                </SectionBlock>

            </MainContent>
        </PageContainer>
    );
};

export default Dashboard;

