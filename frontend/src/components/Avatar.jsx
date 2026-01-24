import styled from "styled-components";
import * as React from "react";

const AvatarRoot = styled.div`
  position: relative;
  display: flex;
  height: 2.5rem; /* 10 (40px) */
  width: 2.5rem; 
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  overflow: hidden;
  background-color: hsl(var(--muted));
  border: 1px solid hsl(var(--border));
`;

const AvatarImage = styled.img`
  aspect-ratio: 1 / 1;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const AvatarFallback = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
  font-weight: 500;
`;

const Avatar = React.forwardRef(({ src, alt, fallback, ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false);

    return (
        <AvatarRoot ref={ref} {...props}>
            {src && !hasError ? (
                <AvatarImage src={src} alt={alt} onError={() => setHasError(true)} />
            ) : (
                <AvatarFallback>{fallback || "U"}</AvatarFallback>
            )}
        </AvatarRoot>
    )
});

Avatar.displayName = "Avatar";

export default Avatar;
