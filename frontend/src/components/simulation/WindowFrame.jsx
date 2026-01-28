import React from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowManager } from './WindowManager';

const WindowContainer = styled(motion.div)`
  position: absolute;
  background: white;
  border-radius: 6px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 600px;
  min-height: 400px;
  max-width: 90vw;
  max-height: 80vh;
  z-index: 100;
`;

const TitleBar = styled.div`
  height: 32px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  user-select: none;
  border-bottom: 1px solid #f0f0f0;
`;

const Title = styled.span`
  font-size: 12px;
  color: #333;
`;

const WindowControls = styled.div`
  display: flex;
  height: 100%;
`;

const ControlButton = styled.button`
  width: 46px;
  height: 100%;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: ${props => props.$isClose ? '#e81123' : '#e5e5e5'};
    color: ${props => props.$isClose ? 'white' : 'inherit'};
  }
  
  &:active {
    background: ${props => props.$isClose ? '#cc0f1f' : '#cacaca'};
  }
`;

const WindowContent = styled.div`
  flex: 1;
  background: #fafafa;
  overflow: auto;
  position: relative;
`;

const WindowFrame = ({ title, children, onClose }) => {
    const { closeWindow } = useWindowManager();

    const handleClose = () => {
        if (onClose) onClose();
        else closeWindow();
    };

    return (
        <AnimatePresence>
            <WindowContainer
                initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
                animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
                transition={{ duration: 0.2 }}
            >
                <TitleBar>
                    <Title>{title}</Title>
                    <WindowControls>
                        <ControlButton $isClose onClick={handleClose}>
                            <X size={14} />
                        </ControlButton>
                    </WindowControls>
                </TitleBar>
                <WindowContent>
                    {children}
                </WindowContent>
            </WindowContainer>
        </AnimatePresence>
    );
};

export default WindowFrame;
