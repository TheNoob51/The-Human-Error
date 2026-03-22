import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const buttonVariants = {
    default: css`
    background: linear-gradient(140deg, #3b82f6, #2563eb);
    color: #eaf2ff;
    box-shadow: 0 10px 24px rgba(37, 99, 235, 0.35);
    &:hover {
      background: linear-gradient(140deg, #2563eb, #1d4ed8);
      transform: translateY(-4px);
      box-shadow: 0 16px 30px rgba(37, 99, 235, 0.42);
    }
  `,
    destructive: css`
    background-color: hsl(var(--destructive));
    color: hsl(var(--destructive-foreground));
    &:hover {
      opacity: 0.9;
    }
  `,
    outline: css`
    border: 1px solid hsl(var(--input));
    background-color: rgba(15, 23, 42, 0.45);
    color: hsl(var(--foreground));
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
    &:hover {
      background-color: rgba(59, 130, 246, 0.18);
      border-color: rgba(59, 130, 246, 0.42);
      transform: translateY(-4px);
    }
  `,
    secondary: css`
    background-color: hsl(var(--secondary));
    color: hsl(var(--secondary-foreground));
    &:hover {
      opacity: 0.8;
    }
  `,
    ghost: css`
    background-color: transparent;
    color: hsl(var(--foreground));
    &:hover {
      background-color: rgba(59, 130, 246, 0.18);
      transform: translateY(-4px);
    }
  `,
    link: css`
    background-color: transparent;
    color: hsl(var(--primary));
    text-decoration: underline;
    text-underline-offset: 4px;
    padding: 0;
    height: auto;
  `,
};

const buttonSizes = {
    default: css`
    height: 2.5rem; /* 10 (40px) */
    padding: 0.5rem 1rem;
  `,
    sm: css`
    height: 2.25rem; /* 9 (36px) */
    padding: 0 0.75rem;
    font-size: 0.875rem;
  `,
    lg: css`
    height: 2.75rem; /* 11 (44px) */
    padding: 0 2rem;
  `,
    icon: css`
    height: 2.5rem;
    width: 2.5rem;
    padding: 0;
  `,
};

const StyledButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: var(--radius);
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  /* Focus ring handled in global css usually, but adding basic reset here too */
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.8), 0 0 0 4px hsl(var(--ring));
  }

  ${({ $variant }) => buttonVariants[$variant] || buttonVariants.default}
  ${({ $size }) => buttonSizes[$size] || buttonSizes.default}
`;

const Button = ({ variant = "default", size = "default", children, ...props }) => {
    return (
        <StyledButton
            $variant={variant}
            $size={size}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {children}
        </StyledButton>
    );
};

export default Button;

