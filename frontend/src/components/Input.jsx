import styled from "styled-components";
import { forwardRef } from "react";

const StyledInput = styled.input`
  display: flex;
  height: 2.5rem; /* 10 (40px) */
  width: 100%;
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border-hsl));
  background-color: hsl(var(--background));
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem; /* 14px */
  color: hsl(var(--foreground));
  transition: all 0.2s ease-in-out;
  
  &::placeholder {
    color: hsl(var(--muted-foreground));
  }
  
  &:focus-visible {
    outline: 2px solid hsl(var(--ring));
    outline-offset: 2px;
    border-color: transparent;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Input = forwardRef((props, ref) => {
    return <StyledInput ref={ref} {...props} />;
});

Input.displayName = "Input";

export default Input;

