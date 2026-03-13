import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
  font-size: 15px;
`;

const ShutdownScreen = () => {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = '/dashboard';
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <BlackScreen
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <Title>Closing Simulation...</Title>
            <Subtitle>Syncing your latest data. Redirecting to dashboard in 3 seconds.</Subtitle>
        </BlackScreen>
    );
};

export default ShutdownScreen;
