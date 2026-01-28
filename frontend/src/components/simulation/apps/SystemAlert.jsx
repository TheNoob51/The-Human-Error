import React from 'react';
import styled from 'styled-components';
import { AlertOctagon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowManager } from '../WindowManager';

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const AlertBox = styled(motion.div)`
  width: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  overflow: hidden;
  border: 1px solid #d93025;
`;

const AlertHeader = styled.div`
  background: #d93025;
  color: white;
  padding: 10px 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AlertBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #fff;
`;

const Message = styled.div`
  margin-top: 15px;
  margin-bottom: 25px;
  font-size: 16px;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: center;
`;

const Button = styled.button`
  padding: 8px 20px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
  background: ${props => props.$primary ? '#d93025' : '#f0f0f0'};
  color: ${props => props.$primary ? 'white' : '#333'};
  
  &:hover {
    background: ${props => props.$primary ? '#b01f14' : '#e0e0e0'};
  }
`;

const SystemAlert = () => {
    const { closeWindow } = useWindowManager();

    return (
        <AnimatePresence>
            <Overlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <AlertBox
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <AlertHeader>
                        <span>System Security Warning</span>
                        <X size={18} style={{ cursor: 'pointer' }} onClick={closeWindow} />
                    </AlertHeader>
                    <AlertBody>
                        <AlertOctagon size={48} color="#d93025" />
                        <Message>
                            <strong>Security Alert Detected</strong>
                            <br /><br />
                            Malicious activity was detected on your workstation. Immediate action is required to prevent data loss.
                        </Message>
                        <ButtonGroup>
                            <Button $primary>Resolve Now</Button>
                            <Button onClick={closeWindow}>Ignore</Button>
                        </ButtonGroup>
                    </AlertBody>
                </AlertBox>
            </Overlay>
        </AnimatePresence>
    );
};

export default SystemAlert;
