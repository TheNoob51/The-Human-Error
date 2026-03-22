import React from 'react';
import styled from 'styled-components';

const IconContainer = styled.div`
  width: 80px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 10px;
  cursor: pointer;
  padding: 5px;
  border: 1px solid transparent;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
  
  &:active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const IconImage = styled.div`
  width: 48px;
  height: 48px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  
  svg {
    width: 100%;
    height: 100%;
    drop-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  }
`;

const IconLabel = styled.span`
  color: white;
  font-size: 12px;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
  line-height: 1.2;
`;

const DesktopIcon = ({ label, icon, onClick }) => {
    return (
        <IconContainer onClick={onClick}>
            <IconImage>{icon}</IconImage>
            <IconLabel>{label}</IconLabel>
        </IconContainer>
    );
};

export default DesktopIcon;

