import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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

const networkGraphTexture = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 700'%3E%3Cg stroke='rgba(165,208,242,0.34)' stroke-width='1.2'%3E%3Cline x1='94' y1='546' x2='224' y2='466'/%3E%3Cline x1='224' y1='466' x2='338' y2='528'/%3E%3Cline x1='338' y1='528' x2='410' y2='430'/%3E%3Cline x1='410' y1='430' x2='540' y2='470'/%3E%3Cline x1='684' y1='188' x2='786' y2='160'/%3E%3Cline x1='786' y1='160' x2='874' y2='232'/%3E%3Cline x1='874' y1='232' x2='954' y2='212'/%3E%3Cline x1='954' y1='212' x2='1048' y2='286'/%3E%3Cline x1='1048' y1='286' x2='1114' y2='238'/%3E%3Cline x1='684' y1='188' x2='874' y2='232'/%3E%3Cline x1='224' y1='466' x2='410' y2='430'/%3E%3Cline x1='338' y1='528' x2='540' y2='470'/%3E%3C/g%3E%3Cg stroke='rgba(165,208,242,0.2)' stroke-width='0.95'%3E%3Cline x1='62' y1='316' x2='224' y2='466'/%3E%3Cline x1='154' y1='602' x2='338' y2='528'/%3E%3Cline x1='564' y1='360' x2='786' y2='160'/%3E%3Cline x1='610' y1='244' x2='874' y2='232'/%3E%3Cline x1='902' y1='116' x2='954' y2='212'/%3E%3Cline x1='1012' y1='118' x2='1048' y2='286'/%3E%3C/g%3E%3Cg fill='rgba(198,214,233,0.78)'%3E%3Ccircle cx='94' cy='546' r='3.5'/%3E%3Ccircle cx='224' cy='466' r='4.4'/%3E%3Ccircle cx='338' cy='528' r='3.8'/%3E%3Ccircle cx='410' cy='430' r='4.0'/%3E%3Ccircle cx='540' cy='470' r='3.3'/%3E%3Ccircle cx='684' cy='188' r='4.0'/%3E%3Ccircle cx='786' cy='160' r='4.6'/%3E%3Ccircle cx='874' cy='232' r='4.1'/%3E%3Ccircle cx='954' cy='212' r='3.6'/%3E%3Ccircle cx='1048' cy='286' r='3.9'/%3E%3Ccircle cx='1114' cy='238' r='3.3'/%3E%3C/g%3E%3C/svg%3E")`;

const networkGlowTexture = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 700'%3E%3Cdefs%3E%3CradialGradient id='g' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='rgba(194,217,242,0.72)'/%3E%3Cstop offset='100%25' stop-color='rgba(194,217,242,0)'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='224' cy='466' r='34' fill='url(%23g)'/%3E%3Ccircle cx='786' cy='160' r='36' fill='url(%23g)'/%3E%3Ccircle cx='874' cy='232' r='31' fill='url(%23g)'/%3E%3Ccircle cx='410' cy='430' r='29' fill='url(%23g)'/%3E%3C/svg%3E")`;

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
    background: transparent;
`;

const MainContent = styled.main`
  flex: 1;
`;

const HeroSection = styled.section`
    position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
    min-height: calc(100vh - 4rem);
    padding: 7rem 2rem 6rem;
  text-align: center;
    gap: 1.5rem;
    overflow: hidden;
    background:
        linear-gradient(114deg, rgba(59, 130, 246, 0.05) 0%, rgba(99, 102, 241, 0.07) 42%, rgba(14, 165, 233, 0.04) 72%, rgba(2, 132, 199, 0.05) 100%),
        radial-gradient(780px 420px at 22% 70%, rgba(59, 130, 246, 0.12), transparent 70%),
        radial-gradient(620px 340px at 82% 26%, rgba(14, 165, 233, 0.1), transparent 72%);
  mask-image: linear-gradient(to bottom, black 80%, transparent 100%);

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
            ${networkGlowTexture},
            ${networkGlowTexture},
            ${networkGlowTexture},
            radial-gradient(500px 220px at 30% 25%, rgba(59, 130, 246, 0.16), transparent 70%),
            radial-gradient(460px 240px at 72% 8%, rgba(14, 165, 233, 0.12), transparent 70%);
        background-size: 52% 52%, 50% 50%, 42% 42%, auto, auto;
        background-position: -6% 82%, 106% 6%, 50% 42%, center, center;
        background-repeat: no-repeat;
        opacity: 0.72;
        pointer-events: none;
    }

    &::after {
        content: "";
        position: absolute;
        inset: 0;
        background:
            ${networkGraphTexture},
            ${networkGraphTexture},
            ${networkGraphTexture};
        background-size: 52% 52%, 50% 50%, 42% 42%;
        background-position: -6% 82%, 106% 6%, 50% 42%;
        background-repeat: no-repeat;
        opacity: 0.58;
        pointer-events: none;
    }

    > * {
        position: relative;
        z-index: 1;
    }
`;

const HeroTitle = styled(motion.h1)`
    font-size: clamp(3rem, 7.2vw, 8rem);
  font-weight: 800;
  letter-spacing: -0.05em;
    line-height: 1.03;
    max-width: 920px;
    margin: 0;
    background: linear-gradient(120deg, #f8fbff 12%, #93c5fd 56%, #60a5fa 88%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
    text-shadow: 0 20px 36px rgba(59, 130, 246, 0.18);
`;

const HeroSubtitle = styled(motion.p)`
    font-size: 1.1rem;
    color: var(--text-secondary);
    max-width: 700px;
  line-height: 1.6;
    margin: 0;
  
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const FeaturesSection = styled.section`
    padding: 4rem 2rem 5rem;
  max-width: 1200px;
  margin: 0 auto;
    width: 100%;
`;

const SectionTitle = styled.h2`
    font-size: clamp(1.9rem, 2.7vw, 2.6rem);
  font-weight: 700;
  text-align: center;
    margin: 0 0 3rem;
  letter-spacing: -0.025em;
`;

const CardsGrid = styled.div`
  display: grid;
    gap: 1.5rem;
  grid-template-columns: 1fr;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StyledCard = styled(Card)`
    position: relative;
  height: 100%;
    text-align: left;
    overflow: hidden;
    transition: all 0.3s ease;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(160deg, rgba(59, 130, 246, 0.14), transparent 45%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }

    svg {
        color: #60a5fa;
    }
  
  &:hover {
        transform: translateY(-4px);
        box-shadow: 0 18px 34px rgba(59, 130, 246, 0.22);
      border-color: var(--border);
    }

    &:hover::before {
        opacity: 1;
    }

    ${CardHeader} {
        align-items: flex-start;
        gap: 0.8rem;
    }

    ${CardTitle} {
        font-size: 1.3rem;
    }

    ${CardDescription} {
        text-align: left;
        color: var(--text-secondary);
        font-size: 0.95rem;
        line-height: 1.65;
  }
`;

const Footer = styled.footer`
  padding: 2rem;
  text-align: center;
    border-top: 1px solid var(--border);
    color: var(--text-secondary);
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
    const [showBelowFold, setShowBelowFold] = useState(false);

    useEffect(() => {
        if (showBelowFold) return;

        const revealBelowFold = () => {
            if (window.scrollY > 12) {
                setShowBelowFold(true);
            }
        };

        const revealImmediately = () => {
            setShowBelowFold(true);
        };

        const revealOnIntent = (event) => {
            const revealKeys = ["ArrowDown", "PageDown", "Space", " "];
            if (revealKeys.includes(event.key)) {
                setShowBelowFold(true);
            }
        };

        window.addEventListener("scroll", revealBelowFold, { passive: true });
        window.addEventListener("wheel", revealImmediately, { passive: true });
        window.addEventListener("touchstart", revealImmediately, { passive: true });
        window.addEventListener("touchmove", revealImmediately, { passive: true });
        window.addEventListener("keydown", revealOnIntent);

        return () => {
            window.removeEventListener("scroll", revealBelowFold);
            window.removeEventListener("wheel", revealImmediately);
            window.removeEventListener("touchstart", revealImmediately);
            window.removeEventListener("touchmove", revealImmediately);
            window.removeEventListener("keydown", revealOnIntent);
        };
    }, [showBelowFold]);

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

                {showBelowFold && (
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                    >
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
                    </motion.div>
                )}
            </MainContent>

            {showBelowFold && (
                <Footer>
                    <p>Built by Team 1 | Capstone Project 2026</p>
                </Footer>
            )}
        </PageContainer>
    );
};

export default Landing;

