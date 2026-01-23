import styled from "styled-components";

const CardContainer = styled.div`
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--card));
  color: hsl(var(--card-foreground));
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  text-align: center;
  align-items: center;
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
