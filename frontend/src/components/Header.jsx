import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Avatar from "./Avatar";
import logo from "../assets/logo/logo_main.png";

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  border-bottom: 1px solid hsl(var(--border-hsl));
  background-color: hsl(var(--background) / 0.8);
  backdrop-filter: blur(8px);
  
  @supports (backdrop-filter: blur(8px)) {
     background-color: hsl(var(--background) / 0.6);
  }
`;

const HeaderContent = styled.div`
  display: flex;
  height: 4rem; /* Match dashboard header height preference */
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem; 
  font-weight: 700;
  font-size: 1.125rem;
  cursor: pointer;
  color: hsl(var(--foreground));
  
  img {
    height: 3rem;
    width: auto;
    object-fit: contain;
    // filter: invert(1);
    /* In light mode, invert(0) might be better if logo is dark, 
       assuming logo is white and background is dark? 
       Actually, standard shadcn is light mode default. 
       Let's assume logo adapts or remove filter if it looks bad. 
       The user said "dashboard is a bit off", maybe the logo filter is the issue?
       I'll keep it consistent with previous state for now.
    */
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";

const Header = ({ user }) => {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();

  // Use prop user if provided (for mocks/demos), otherwise use real auth user
  const displayUser = user || authUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoSection onClick={() => navigate("/")}>
          <img src={logo} alt="The Human Error Logo" />
          The Human Error
        </LogoSection>
        <NavActions>
          {displayUser ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
              <UserProfile>
                <Avatar fallback={displayUser.email ? displayUser.email[0].toUpperCase() : "U"} />
                <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  {displayUser.displayName || (displayUser.email ? displayUser.email.split('@')[0] : "User")}
                </span>
              </UserProfile>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => navigate("/auth")}>
              Login
            </Button>
          )}
        </NavActions>
      </HeaderContent>
    </HeaderContainer>
  );
};


export default Header;

