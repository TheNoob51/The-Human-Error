import styled from "styled-components";
import { motion } from "framer-motion";
import Header from "../components/Header";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: hsl(var(--background));
`;

const DashboardContent = styled.main`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  margin-top: 2rem;
`;

const Dashboard = () => {
    return (
        <PageContainer>
            <Header />
            <DashboardContent>
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}
                >
                    Dashboard
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ color: "hsl(var(--muted-foreground))" }}
                >
                    Your security profile and simulation results.
                </motion.p>

                <Grid>
                    {[1, 2, 3].map((item, index) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (index * 0.1) }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Metric {item}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p style={{ color: "hsl(var(--muted-foreground))" }}>Placeholder data visualization would go here.</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </Grid>
            </DashboardContent>
        </PageContainer>
    );
};

export default Dashboard;
