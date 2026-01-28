import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BlackScreen = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', sans-serif;
`;

const Title = styled.h1`
  font-weight: 300;
  margin-bottom: 40px;
`;

const ReturnButton = styled.button`
  border: 1px solid white;
  background: transparent;
  color: white;
  padding: 10px 30px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: white;
    color: black;
  }
`;

const ShutdownScreen = () => {
    const navigate = useNavigate();

    return (
        <BlackScreen
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <Title>Simulation Ended</Title>
            <ReturnButton onClick={() => navigate('/dashboard')}>Return to Dashboard</ReturnButton>
        </BlackScreen>
    );
};

export default ShutdownScreen;
