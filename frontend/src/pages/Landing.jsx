import styled from "styled-components";
import { motion } from "framer-motion";
import { Brain, MousePointerClick, ShieldCheck } from "lucide-react";
import Header from "../components/Header";
import Button from "../components/Button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "../components/Card";
import { useNavigate } from "react-router-dom";

// --- Styled Components ---

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: hsl(var(--background));
`;

const MainContent = styled.main`
  flex: 1;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6rem 2rem;
  text-align: center;
  gap: 2rem;
  /* subtle grid pattern background */
  background-image: radial-gradient(hsl(var(--border)) 1px, transparent 1px);
  background-size: 40px 40px;
  /* fade out at the bottom */
  mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 1.1;
  max-width: 800px;
  
  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
  
  /* Gradient text effect */
  background: linear-gradient(
    to bottom right,
    hsl(var(--foreground)),
    hsl(var(--foreground) / 0.7)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.125rem;
  color: hsl(var(--muted-foreground));
  max-width: 600px;
  line-height: 1.6;
  
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: -0.025em;
`;

const CardsGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StyledCard = styled(Card)`
  height: 100%;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }
`;

const Footer = styled.footer`
  padding: 2rem;
  text-align: center;
  border-top: 1px solid hsl(var(--border));
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
`;

// --- Animations ---
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const Landing = () => {
    const navigate = useNavigate();

    return (
        <PageContainer>
            <Header />

            <MainContent>
                {/* Hero */}
                <HeroSection>
                    <HeroTitle
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        The Human Error
                    </HeroTitle>
                    <HeroSubtitle
                        initial="hidden"
                        animate="visible"
                        variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { delay: 0.2, duration: 0.6 } } }}
                    >
                        A gamified platform that simulates social engineering attacks and calculates
                        user vulnerability scores using behavioral analytics.
                    </HeroSubtitle>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <Button size="lg" onClick={() => navigate('/auth')}>Start Simulation</Button>
                    </motion.div>
                </HeroSection>

                {/* How It Works */}
                <FeaturesSection>
                    <SectionTitle>How It Works</SectionTitle>
                    <CardsGrid as={motion.div} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>

                        {/* Card 1 */}
                        <motion.div variants={fadeInUp}>
                            <StyledCard>
                                <CardHeader>
                                    <Brain size={40} className="mb-2 text-primary" color="hsl(var(--primary))" />
                                    <CardTitle>Simulate Scenarios</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        Experience realistic email and chat lures designed to test your awareness
                                        in a safe, controlled environment.
                                    </CardDescription>
                                </CardContent>
                            </StyledCard>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div variants={fadeInUp}>
                            <StyledCard>
                                <CardHeader>
                                    <MousePointerClick size={40} className="mb-2 text-primary" color="hsl(var(--primary))" />
                                    <CardTitle>Track Behavior</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        We log user clicks, hesitation time, and inspection habits to understand
                                        decision-making patterns.
                                    </CardDescription>
                                </CardContent>
                            </StyledCard>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div variants={fadeInUp}>
                            <StyledCard>
                                <CardHeader>
                                    <ShieldCheck size={40} className="mb-2 text-primary" color="hsl(var(--primary))" />
                                    <CardTitle>Analyze Risk</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        Machine learning algorithms generate a personalized V-score and behavioral
                                        profile to improve security posture.
                                    </CardDescription>
                                </CardContent>
                            </StyledCard>
                        </motion.div>

                    </CardsGrid>
                </FeaturesSection>
            </MainContent>

            <Footer>
                <p>Built by Team 1 | Capstone Project 2026</p>
            </Footer>
        </PageContainer>
    );
};

export default Landing;
