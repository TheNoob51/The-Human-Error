import styled from "styled-components";

const CardContainer = styled.div`
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: linear-gradient(160deg, var(--card-bg), rgba(255, 255, 255, 0.02));
  backdrop-filter: blur(12px);
  color: hsl(var(--card-foreground));
  box-shadow: 0 14px 34px rgba(2, 6, 23, 0.35);
  text-align: center;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 16px 40px rgba(59, 130, 246, 0.18);
    border-color: rgba(59, 130, 246, 0.35);
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.0rem; /* space-y-1.5 */
  padding: 1.5rem;
  align-items: center;
`;

const CardTitle = styled.h3`
  font-weight: 600;
  font-size: 1.5rem; /* 24px */
  line-height: 1;
  letter-spacing: -0.025em; /* tracking-tight */
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: 0.875rem; /* 14px */
  color: hsl(var(--muted-foreground));
  margin: 0;
  text-align: center;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  padding-top: 0;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  padding-top: 0;
`;

const Card = ({ children, ...props }) => {
  return <CardContainer {...props}>{children}</CardContainer>;
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };

