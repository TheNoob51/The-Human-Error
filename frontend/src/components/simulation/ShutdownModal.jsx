import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowManager } from './WindowManager';
import { Power } from 'lucide-react';

const ModalOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled(motion.div)`
  background: rgba(22, 22, 22, 0.95);
  color: white;
  padding: 30px;
  border-radius: 8px;
  width: 350px;
  text-align: center;
  border: 1px solid #333;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  font-weight: normal;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
`;

const ActionButton = styled.button`
  background: ${props => props.$confirm ? '#d93025' : 'transparent'};
  border: 1px solid ${props => props.$confirm ? 'transparent' : '#666'};
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.$confirm ? '#b01f14' : 'rgba(255,255,255,0.1)'};
    border-color: ${props => props.$confirm ? 'transparent' : '#999'};
  }
`;

const ShutdownModal = () => {
    const { isShuttingDown, cancelShutdown, confirmShutdown } = useWindowManager();

    if (!isShuttingDown) return null;

    return (
        <AnimatePresence>
            <ModalOverlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <ModalContent
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <Power size={48} style={{ marginBottom: '15px' }} />
                    <Title>End Simulation?</Title>
                    <p style={{ color: '#aaa', fontSize: '14px' }}>
                        Progress will not be saved.
                    </p>

                    <ButtonRow>
                        <ActionButton $confirm onClick={confirmShutdown}>Shut Down</ActionButton>
                        <ActionButton onClick={cancelShutdown}>Cancel</ActionButton>
                    </ButtonRow>
                </ModalContent>
            </ModalOverlay>
        </AnimatePresence>
    );
};

export default ShutdownModal;
