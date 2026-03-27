import styled from "styled-components";
import * as React from "react";

const ProgressRoot = styled.div`
  position: relative;
  height: 0.5rem; /* 2 (8px) */
  width: 100%;
  overflow: hidden;
  border-radius: 9999px;
  background-color: hsl(var(--muted));
`;

const ProgressIndicator = styled.div`
  height: 100%;
  width: 100%;
  background-color: hsl(var(--primary));
  transition: transform 0.5s ease-in-out;
  transform: translateX(-${(props) => 100 - (props.value || 0)}%);
`;

const Progress = React.forwardRef(({ value = 0, ...props }, ref) => (
    <ProgressRoot ref={ref} {...props}>
        <ProgressIndicator value={value} />
    </ProgressRoot>
));

Progress.displayName = "Progress";

export default Progress;

