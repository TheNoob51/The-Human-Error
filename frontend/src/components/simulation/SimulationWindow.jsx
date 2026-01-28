import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { X, Minus, Square } from 'lucide-react';
import { useWindowManager } from './WindowManager';
import { motion } from 'framer-motion';

const WindowContainer = styled(motion.div)`
  position: absolute;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const TitleBar = styled.div`
  background: #f1f5f9;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border-bottom: 1px solid #e2e8f0;
  user-select: none;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #475569;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const WindowControls = styled.div`
  display: flex;
  gap: 8px;
`;

const ControlButton = styled.button`
  border: none;
  background: transparent;
  color: #64748b;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$isClose ? '#ef4444' : '#e2e8f0'};
    color: ${props => props.$isClose ? 'white' : '#1e293b'};
  }
`;

const Content = styled.div`
  flex: 1;
  overflow: auto;
  background: white;
  position: relative;
`;

const SimulationWindow = ({ id, title, icon, children, width = 800, height = 600, defaultX = 50, defaultY = 50 }) => {
  const { windows, closeWindow, focusWindow, minimizeWindow, toggleMaximizeWindow } = useWindowManager();

  const windowState = windows.find(w => w.id === id);

  const [position, setPosition] = useState({ x: defaultX, y: defaultY });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Calculate focus state
  const maxZ = Math.max(...windows.map(w => w.zIndex));
  const isFocused = windowState?.zIndex === maxZ;
  const isMaximized = windowState?.isMaximized;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e) => {
    if (isMaximized) return; // Disable drag when maximized
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    focusWindow(id);
  };

  if (!windowState || !windowState.isOpen || windowState.isMinimized) return null;

  return (
    <WindowContainer
      style={{
        width: isMaximized ? '100%' : width,
        height: isMaximized ? 'calc(100% - 40px)' : height, // Subtract taskbar height if needed, assuming taskbar is 40px
        top: isMaximized ? 0 : position.y,
        left: isMaximized ? 0 : position.x,
        zIndex: windowState.zIndex,
        borderRadius: isMaximized ? 0 : 8,
        boxShadow: isDragging
          ? '0 20px 50px rgba(0,0,0,0.3)'
          : isFocused
            ? '0 10px 30px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.1)'
            : '0 5px 15px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)',
        opacity: isFocused ? 1 : 0.95,
        filter: isFocused ? 'none' : 'grayscale(10%)'
      }}
      onMouseDown={() => focusWindow(id)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
        width: isMaximized ? '100%' : width,
        height: isMaximized ? 'calc(100% - 40px)' : height,
        top: isMaximized ? 0 : position.y,
        left: isMaximized ? 0 : position.x
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }} // Slightly smoother for maximize
    >
      <TitleBar
        onMouseDown={handleMouseDown}
        style={{
          background: isFocused ? '#e2e8f0' : '#f8fafc',
          color: isFocused ? '#1e293b' : '#94a3b8'
        }}
      >
        <Title style={{ color: isFocused ? '#334155' : '#94a3b8' }}>
          {icon}
          {title}
        </Title>
        <WindowControls>
          <ControlButton onClick={(e) => {
            e.stopPropagation();
            minimizeWindow(id);
          }}>
            <Minus size={16} />
          </ControlButton>
          <ControlButton onClick={(e) => {
            e.stopPropagation();
            toggleMaximizeWindow(id);
          }}>
            <Square size={14} style={{ strokeWidth: isMaximized ? 3 : 2 }} />
          </ControlButton>
          <ControlButton $isClose onClick={(e) => {
            e.stopPropagation();
            closeWindow(id);
          }}>
            <X size={16} />
          </ControlButton>
        </WindowControls>
      </TitleBar>
      <Content>
        <div style={{ pointerEvents: isFocused ? 'auto' : 'none' }}>
          {children}
        </div>
      </Content>
    </WindowContainer>
  );
};

export default SimulationWindow;
