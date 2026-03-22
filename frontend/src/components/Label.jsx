import styled from "styled-components";
import { forwardRef } from "react";

const StyledLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  line-height: none;
  
  /* Peer disabled support would require complex CSS selectors or JS, keeping simple for now */
  &[data-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Label = forwardRef(({ className, children, ...props }, ref) => (
    <StyledLabel ref={ref} className={className} {...props}>
        {children}
    </StyledLabel>
));

Label.displayName = "Label";

export default Label;

