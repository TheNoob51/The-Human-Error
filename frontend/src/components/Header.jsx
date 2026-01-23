import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "./Button";

import logo from "../assets/logo_main.png";

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  border-bottom: 1px solid hsl(var(--border));
  background-color: hsl(var(--background) / 0.8);
  backdrop-filter: blur(8px);
  /* supports backdrop-filter */
  @supports (backdrop-filter: blur(8px)) {
     background-color: hsl(var(--background) / 0.6);
  }
`;

const HeaderContent = styled.div`
  display: flex;
  height: 3.5rem; /* 14 (56px) */
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.125rem;
  cursor: pointer;
  
  img {
    height: 2rem;
    width: auto;
    object-fit: contain;
    filter: invert(1);
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoSection onClick={() => navigate("/")}>
          <img src={logo} alt="The Human Error Logo" />
          The Human Error
        </LogoSection>
        <NavActions>
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>
          <Button size="sm" onClick={() => navigate("/auth")}>
            Login / Signup
          </Button>
        </NavActions>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
