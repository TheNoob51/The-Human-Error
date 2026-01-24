import styled, { css } from "styled-components";

const badgeVariants = {
    default: css`
    background-color: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
    border: 1px solid transparent;
  `,
    secondary: css`
    background-color: hsl(var(--secondary));
    color: hsl(var(--secondary-foreground));
    border: 1px solid transparent;
  `,
    destructive: css`
    background-color: hsl(var(--destructive));
    color: hsl(var(--destructive-foreground));
    border: 1px solid transparent;
  `,
    outline: css`
    color: hsl(var(--foreground));
    border: 1px solid hsl(var(--border));
  `,
    success: css` /* Custom for dashboard */
    background-color: hsl(142, 76%, 36%);
    color: white;
    border: 1px solid transparent;
  `,
    warning: css` /* Custom for dashboard */
    background-color: hsl(38, 92%, 50%);
    color: black;
    border: 1px solid transparent;
  `,
};

const StyledBadge = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px; /* full rounded */
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  ${({ $variant }) => badgeVariants[$variant] || badgeVariants.default}
  
  &:hover {
    opacity: 0.8;
  }
`;

const Badge = ({ variant = "default", children, ...props }) => {
    return (
        <StyledBadge $variant={variant} {...props}>
            {children}
        </StyledBadge>
    );
};

export default Badge;
