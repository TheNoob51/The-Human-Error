import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Play, ShieldAlert, Cpu, Lock } from 'lucide-react';

const BriefingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0f172a; /* Dark background mainly */
  color: #f8fafc;
  font-family: 'Inter', sans-serif;
`;

const Card = styled(motion.div)`
  background: rgba(30, 41, 59, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #38bdf8; /* Sky blue accent */
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #cbd5e1;
`;

const Section = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #94a3b8;
  font-size: 0.95rem;

  svg {
    color: #64748b;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const PlayButton = styled.button`
  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
  box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(14, 165, 233, 0.4);
    background: linear-gradient(135deg, #38bdf8 0%, #0369a1 100%);
  }
`;

const CancelButton = styled.button`
  background: transparent;
  color: #94a3b8;
  border: 1px solid #475569;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
    border-color: #94a3b8;
  }
`;

const SimulationBriefing = ({ onStart, onBack }) => {
    return (
        <BriefingContainer>
            <Card
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <Title>
                    <Cpu size={32} />
                    Simulation Briefing
                </Title>
                <Description>
                    You are about to enter a simulated corporate desktop environment.
                    Your goal is to identify and report potential security threats while performing daily tasks.
                </Description>

                <Section>
                    <ListItem>
                        <ShieldAlert size={20} />
                        <span>Watch out for suspicious emails and phishing attempts.</span>
                    </ListItem>
                    <ListItem>
                        <Lock size={20} />
                        <span>Ensure sensitive data is handled correctly.</span>
                    </ListItem>
                </Section>

                <ButtonGroup>
                    <PlayButton onClick={onStart}>
                        <Play size={18} fill="currentColor" />
                        Start Simulation
                    </PlayButton>
                    <CancelButton onClick={onBack}>
                        Cancel
                    </CancelButton>
                </ButtonGroup>
            </Card>
        </BriefingContainer>
    );
};

export default SimulationBriefing;
