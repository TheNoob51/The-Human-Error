import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    ShieldAlert,
    Brain,
    MousePointerClick,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Bell
} from "lucide-react";

import Header from "../components/Header";
import Button from "../components/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import Badge from "../components/Badge";
import Progress from "../components/Progress";
import Avatar from "../components/Avatar";

/* Navbar related styles removed in favor of reusable Header */

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: hsl(var(--background));
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

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
  margin: 0.5rem 0;
`;

const MetricLabel = styled.p`
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
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
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--muted) / 0.3);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  
  th {
    text-align: left;
    padding: 0.75rem 1rem;
    color: hsl(var(--muted-foreground));
    font-weight: 500;
    border-bottom: 1px solid hsl(var(--border));
  }
  
  td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid hsl(var(--border));
  }
  
  tr:last-child td {
    border-bottom: none;
  }

  /* basic hover row */
  tbody tr:hover {
     background-color: hsl(var(--muted) / 0.5);
  }
`;

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <PageContainer>
            {/* Top Navigation using reusable Header */}
            <Header />

            <MainContent as={motion.div} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

                {/* Page Header */}
                <div>
                    <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.25rem" }}>Security Dashboard</h1>
                    <p style={{ color: "hsl(var(--muted-foreground))" }}>Behavioral insights based on simulated social engineering scenarios.</p>
                </div>

                {/* Section 1: Key Metrics */}
                <MetricsGrid>
                    {/* Card 1: Vulnerability Score */}
                    <Card>
                        <CardHeader>
                            <CardTitle style={{ fontSize: "1rem" }}>Vulnerability Score</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                                <MetricValue>72<span style={{ fontSize: "1.25rem", color: "hsl(var(--muted-foreground))", fontWeight: 400 }}>/100</span></MetricValue>
                                <AlertTriangle size={24} color="hsl(38, 92%, 50%)" />
                            </div>
                            <Progress value={72} style={{ marginTop: "1rem", marginBottom: "0.5rem" }} />
                            <MetricLabel>Higher score indicates lower susceptibility.</MetricLabel>
                        </CardContent>
                    </Card>

                    {/* Card 2: Behavior Profile */}
                    <Card>
                        <CardHeader>
                            <CardTitle style={{ fontSize: "1rem" }}>Behavior Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div style={{ marginBottom: "1rem" }}>
                                <Badge variant="warning">Rushed under urgency</Badge>
                            </div>
                            <p style={{ fontSize: "0.925rem", lineHeight: 1.5 }}>
                                Tends to act quickly when faced with time-sensitive requests, often skipping verification steps.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Card 3: Simulations Completed */}
                    <Card>
                        <CardHeader>
                            <CardTitle style={{ fontSize: "1rem" }}>Simulations Completed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                                <MetricValue>3</MetricValue>
                                <CheckCircle size={24} color="hsl(142, 76%, 36%)" />
                            </div>
                            <MetricLabel>Total scenarios interaction completed.</MetricLabel>
                        </CardContent>
                    </Card>
                </MetricsGrid>

                {/* Section 2: Behavior Insights */}
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
                                    <Badge variant="destructive">High Risk</Badge>
                                </RiskItem>
                                <RiskItem>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <ShieldAlert size={18} className="text-warning" style={{ color: "hsl(38, 92%, 50%)" }} />
                                        <span style={{ fontWeight: 500 }}>Authority-based attacks</span>
                                    </div>
                                    <Badge variant="warning">Medium Risk</Badge>
                                </RiskItem>
                                <RiskItem>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <MousePointerClick size={18} className="text-primary" />
                                        <span style={{ fontWeight: 500 }}>Reward-based attacks</span>
                                    </div>
                                    <Badge variant="success">Low Risk</Badge>
                                </RiskItem>
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

                {/* Section 3: History Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Simulation History</CardTitle>
                    </CardHeader>
                    <CardContent style={{ padding: 0 }}>
                        <div style={{ overflowX: "auto" }}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Scenario</th>
                                        <th>Attack Type</th>
                                        <th>User Action</th>
                                        <th>Date</th>
                                        <th>Outcome</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ fontWeight: 500 }}>Urgent Payroll Update</td>
                                        <td>Urgency</td>
                                        <td>Clicked Link</td>
                                        <td>Oct 24, 2025</td>
                                        <td><Badge variant="destructive">Failed</Badge></td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 500 }}>CEO Gift Card Request</td>
                                        <td>Authority</td>
                                        <td>Reported Phishing</td>
                                        <td>Oct 20, 2025</td>
                                        <td><Badge variant="success">Safe</Badge></td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 500 }}>IT Password Reset</td>
                                        <td>Technical</td>
                                        <td>Entered Creds</td>
                                        <td>Oct 15, 2025</td>
                                        <td><Badge variant="destructive">Failed</Badge></td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 500 }}>Free Conference Ticket</td>
                                        <td>Reward</td>
                                        <td>Ignored</td>
                                        <td>Oct 10, 2025</td>
                                        <td><Badge variant="success">Safe</Badge></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

            </MainContent>
        </PageContainer>
    );
};

export default Dashboard;
