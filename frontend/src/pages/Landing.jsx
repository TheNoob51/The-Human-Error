import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
    AlertTriangle,
    ArrowRight,
    BarChart3,
    Brain,
    CheckCircle2,
    Clock3,
    Eye,
    MousePointerClick,
    ShieldCheck,
    Sparkles,
} from "lucide-react";
import Header from "../components/Header";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
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

const SectionLead = styled.p`
        max-width: 780px;
        margin: -1.8rem auto 2.6rem;
        text-align: center;
        color: var(--text-secondary);
        font-size: 1rem;
        line-height: 1.7;
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

const InsightsSection = styled(FeaturesSection)`
    padding-top: 1.2rem;
`;

const InsightsGrid = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;

    @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

const InsightCard = styled(Card)`
    position: relative;
    overflow: hidden;
    border-color: rgba(148, 163, 184, 0.2);
    background: linear-gradient(165deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.84));
    box-shadow: inset 0 0 0 1px rgba(125, 211, 252, 0.06);

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(160deg, rgba(59, 130, 246, 0.14), transparent 45%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 18px 34px rgba(59, 130, 246, 0.22), inset 0 0 0 1px rgba(125, 211, 252, 0.06);
        border-color: var(--border);
    }

    &:hover::before {
        opacity: 1;
    }
`;

const InsightValue = styled.p`
    margin: 0;
    font-size: clamp(1.8rem, 3vw, 2.4rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #dbeafe;
`;

const InsightLabel = styled.p`
    margin: 0.5rem 0 0;
    color: var(--text-secondary);
    font-size: 0.94rem;
`;

const ProcessSection = styled(FeaturesSection)`
    padding-top: 0.4rem;
`;

const ProcessGrid = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`;

const ProcessCard = styled(Card)`
    position: relative;
    overflow: hidden;
    min-height: 170px;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(160deg, rgba(59, 130, 246, 0.14), transparent 45%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 18px 34px rgba(59, 130, 246, 0.22);
        border-color: var(--border);
    }

    &:hover::before {
        opacity: 1;
    }

    &::after {
        content: "";
        position: absolute;
        right: -32px;
        bottom: -42px;
        width: 140px;
        height: 140px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(56, 189, 248, 0.16), transparent 70%);
        pointer-events: none;
    }
`;

const StepNumber = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 999px;
    background: rgba(96, 165, 250, 0.18);
    border: 1px solid rgba(96, 165, 250, 0.35);
    color: #bfdbfe;
    font-size: 0.84rem;
    font-weight: 700;
`;

const PointsList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 0.9rem;
`;

const PointItem = styled.li`
    display: flex;
    gap: 0.65rem;
    align-items: flex-start;
    color: var(--text-secondary);
    line-height: 1.55;

    svg {
        color: #7dd3fc;
        flex-shrink: 0;
        margin-top: 0.18rem;
    }
`;

const FinalCtaSection = styled.section`
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 1.2rem 2rem 5rem;
`;

const FinalCtaCard = styled(Card)`
    position: relative;
    overflow: hidden;
    text-align: left;
    border-color: rgba(125, 211, 252, 0.34);
    background:
        radial-gradient(600px 260px at 85% 10%, rgba(56, 189, 248, 0.12), transparent 70%),
        linear-gradient(135deg, rgba(30, 41, 59, 0.96), rgba(15, 23, 42, 0.94));
    border-radius: calc(var(--radius) + 6px);
    padding: clamp(1.35rem, 2.4vw, 2.2rem);

    &:hover {
        transform: none;
        box-shadow: 0 14px 34px rgba(2, 6, 23, 0.35);
        border-color: rgba(125, 211, 252, 0.34);
    }

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(112deg, rgba(59, 130, 246, 0.16), transparent 36%, transparent 64%, rgba(125, 211, 252, 0.13));
        opacity: 0.86;
        pointer-events: none;
    }

    &::after {
        content: "";
        position: absolute;
        inset: 0;
        background-image:
            linear-gradient(rgba(147, 197, 253, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 197, 253, 0.06) 1px, transparent 1px);
        background-size: 28px 28px;
        mask-image: radial-gradient(circle at 82% 36%, black 10%, transparent 76%);
        pointer-events: none;
    }

    > * {
        position: relative;
        z-index: 1;
    }
`;

const FinalCtaInner = styled.div`
    display: grid;
    gap: clamp(1.25rem, 2vw, 2rem);
    grid-template-columns: 1fr;

    @media (min-width: 920px) {
        grid-template-columns: 1.35fr 1fr;
        align-items: start;
    }
`;

const FinalCtaColumn = styled.div`
    display: grid;
    gap: 1rem;
`;

const FinalCtaKicker = styled.p`
    margin: 0 0 0.75rem;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    border: 1px solid rgba(125, 211, 252, 0.34);
    border-radius: 999px;
    padding: 0.36rem 0.8rem;
    color: #c7d2fe;
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
`;

const FinalCtaTitle = styled.h3`
    margin: 0;
    font-size: clamp(1.6rem, 3vw, 2rem);
    letter-spacing: -0.02em;
`;

const FinalCtaText = styled.p`
    margin: 0.75rem 0 0;
    max-width: 720px;
    color: var(--text-secondary);
    line-height: 1.7;
`;

const CtaMetaRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    margin-top: 1.2rem;
`;

const CtaMetaChip = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    border: 1px solid rgba(148, 163, 184, 0.32);
    border-radius: 999px;
    padding: 0.4rem 0.75rem;
    color: #cbd5e1;
    font-size: 0.82rem;
    background: rgba(15, 23, 42, 0.28);
`;

const CtaActionRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
`;

const ButtonText = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
`;

const CtaHint = styled.p`
    margin: 0.2rem 0 0;
    font-size: 0.84rem;
    color: #93c5fd;
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
    const { user } = useAuth();
    const [showBelowFold, setShowBelowFold] = useState(false);
    const isLoggedIn = Boolean(user);

    const insightStats = [
        { value: "93%", label: "attacks start with human interaction", icon: AlertTriangle },
        { value: "4", label: "core simulation channels in one environment", icon: Eye },
        { value: "< 3 min", label: "average time to complete one scenario", icon: Clock3 },
        { value: "V-score", label: "continuous risk index per participant", icon: BarChart3 },
    ];

    const processSteps = [
        {
            step: "01",
            title: "Enter a realistic threat story",
            description:
                "Participants interact with authentic-looking emails, internal chats, prompts, and system popups that mirror daily workflow pressure.",
        },
        {
            step: "02",
            title: "Measure behavior, not just outcomes",
            description:
                "The platform captures hesitation, cursor movement, click paths, and verification behavior to reveal how decisions are made under stress.",
        },
        {
            step: "03",
            title: "Generate an explainable vulnerability profile",
            description:
                "Behavioral signals are translated into an interpretable V-score with clear strengths, blind spots, and recommended corrective actions.",
        },
        {
            step: "04",
            title: "Train again with adaptive difficulty",
            description:
                "Follow-up scenarios adjust complexity to reinforce weak areas, helping users build durable instincts instead of one-time awareness.",
        },
    ];

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
                            <SectionLead>
                                Human error is rarely random. It follows patterns that can be measured,
                                explained, and improved through repeated simulation and feedback.
                            </SectionLead>
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

                        <InsightsSection>
                            <SectionTitle>Why This Matters</SectionTitle>
                            <InsightsGrid as={motion.div} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                                {insightStats.map(({ value, label, icon: Icon }) => (
                                    <motion.div variants={fadeInUp} key={label}>
                                        <InsightCard>
                                            <CardHeader>
                                                <Icon size={22} color="hsl(var(--primary))" />
                                                <InsightValue>{value}</InsightValue>
                                                <InsightLabel>{label}</InsightLabel>
                                            </CardHeader>
                                        </InsightCard>
                                    </motion.div>
                                ))}
                            </InsightsGrid>
                        </InsightsSection>

                        <ProcessSection>
                            <SectionTitle>Simulation Journey</SectionTitle>
                            <ProcessGrid as={motion.div} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                                {processSteps.map((item) => (
                                    <motion.div variants={fadeInUp} key={item.step}>
                                        <ProcessCard>
                                            <CardHeader>
                                                <StepNumber>{item.step}</StepNumber>
                                                <CardTitle>{item.title}</CardTitle>
                                                <CardDescription>{item.description}</CardDescription>
                                            </CardHeader>
                                        </ProcessCard>
                                    </motion.div>
                                ))}
                            </ProcessGrid>
                        </ProcessSection>

                        <FinalCtaSection>
                            <FinalCtaCard as={motion.div} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                                <FinalCtaInner>
                                    <FinalCtaColumn>
                                        <FinalCtaKicker>
                                            <Sparkles size={14} />
                                            Behavior-first security training
                                        </FinalCtaKicker>
                                        <FinalCtaTitle>What You Get Beyond a Typical Awareness Quiz</FinalCtaTitle>
                                        <FinalCtaText>
                                            The Human Error combines realistic simulation, behavioral telemetry,
                                            and explainable analytics to make security training measurable,
                                            repeatable, and personalized for every participant.
                                        </FinalCtaText>

                                        <CtaMetaRow>
                                            <CtaMetaChip>
                                                <BarChart3 size={14} />
                                                Explainable V-score analytics
                                            </CtaMetaChip>
                                            <CtaMetaChip>
                                                <Eye size={14} />
                                                Real-time decision telemetry
                                            </CtaMetaChip>
                                            <CtaMetaChip>
                                                <ShieldCheck size={14} />
                                                Adaptive resilience practice
                                            </CtaMetaChip>
                                        </CtaMetaRow>
                                    </FinalCtaColumn>

                                    <FinalCtaColumn>
                                        <CardTitle>What You Actually Build</CardTitle>
                                        <CardDescription>
                                            Outcomes focus on practical habits your team can apply the same day.
                                        </CardDescription>
                                        <PointsList>
                                            <PointItem>
                                                <CheckCircle2 size={18} />
                                                Scenario-based learning mapped to real workplace attacks.
                                            </PointItem>
                                            <PointItem>
                                                <CheckCircle2 size={18} />
                                                Actionable V-score tracking for individuals and teams.
                                            </PointItem>
                                            <PointItem>
                                                <CheckCircle2 size={18} />
                                                Immediate practice loops to convert insight into safer behavior.
                                            </PointItem>
                                        </PointsList>

                                        <CtaActionRow>
                                            <Button size="lg" onClick={() => navigate(isLoggedIn ? '/dashboard' : '/auth')}>
                                                <ButtonText>
                                                    {isLoggedIn ? "Go to Dashboard" : "Launch Full Experience"}
                                                    <ArrowRight size={16} />
                                                </ButtonText>
                                            </Button>
                                            <Button variant="outline" size="lg" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                                                Revisit Overview
                                            </Button>
                                        </CtaActionRow>
                                        <CtaHint>
                                            {isLoggedIn
                                                ? "Jump back in and continue your progress."
                                                : "No signup friction. Start your first scenario in minutes."}
                                        </CtaHint>
                                    </FinalCtaColumn>
                                </FinalCtaInner>
                            </FinalCtaCard>
                        </FinalCtaSection>
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

