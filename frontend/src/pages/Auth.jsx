import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import Label from "../components/Label";
import Header from "../components/Header";
import { siGithub, siGoogle } from "simple-icons/icons";

// Helper component for Simple Icons
const SimpleIcon = ({ icon, size = 16, color = "currentColor", style = {} }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={icon.path} />
  </svg>
);

// --- Styled Components ---

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: hsl(var(--background));
`;

const AuthLayout = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: radial-gradient(circle at top center, hsl(var(--primary) / 0.1), transparent 40%);
`;

const AuthCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  overflow: hidden;
  position: relative;
`;

const TabsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: hsl(var(--muted));
  padding: 0.25rem;
  margin: 1.5rem 1.5rem 0;
  border-radius: calc(var(--radius) - 2px);
`;

const TabTrigger = styled.button`
  background-color: ${(props) => (props.$active ? "hsl(var(--background))" : "transparent")};
  color: ${(props) => (props.$active ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))")};
  box-shadow: ${(props) => (props.$active ? "0 1px 2px 0 rgb(0 0 0 / 0.05)" : "none")};
  border: none;
  padding: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: calc(var(--radius) - 4px);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: hsl(var(--foreground));
  }
`;

const Divider = styled.div`
  position: relative;
  text-align: center;
  margin: 1.5rem 0;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: hsl(var(--border));
  }

  span {
    position: relative;
    background-color: hsl(var(--card));
    padding: 0 0.75rem;
    color: hsl(var(--muted-foreground));
    font-size: 0.75rem;
    text-transform: uppercase;
  }
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SocialButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

// --- Animations ---

const slideVariants = {
  hidden: { x: 20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 },
};

const Auth = ({ initialMode = "login" }) => {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Sync internal state if URL allows direct navigation or prop update
    if (initialMode && (initialMode === 'login' || initialMode === 'signup')) {
      setMode(initialMode);
    }
  }, [initialMode]);

  const handleTabChange = (newMode) => {
    // Clear error when switching modes
    setError("");
    setMode(newMode);
    // Optionally correct the URL without full reload
    window.history.pushState(null, "", `/${newMode}`);
  };

  const isLogin = mode === "login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/dashboard");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      // Suppress weak password alert
      if (err.message.includes("weak-password")) return;
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  return (
    <PageContainer>
      <Header />
      <AuthLayout>
        <AuthCard>
          <TabsList>
            <TabTrigger $active={isLogin} onClick={() => handleTabChange("login")}>
              Login
            </TabTrigger>
            <TabTrigger $active={!isLogin} onClick={() => handleTabChange("signup")}>
              Sign Up
            </TabTrigger>
          </TabsList>

          <CardHeader>
            <CardTitle>{isLogin ? "Welcome back" : "Create an account"}</CardTitle>
            <CardDescription>
              {isLogin
                ? "Enter your email below to login to your account"
                : "Enter your email below to create your account"}
            </CardDescription>
          </CardHeader>

          <div style={{ padding: "0 1.5rem 1.5rem" }}>
            <AnimatePresence mode="wait" initial={false}>
              <Form
                key={mode}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideVariants}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="test@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="123456"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {error && (
                  <div style={{ color: "hsl(var(--destructive))", fontSize: "0.875rem", fontWeight: 500 }}>
                    {error}
                  </div>
                )}

                <Button type="submit" style={{ width: "100%" }}>
                  {isLogin ? "Login" : "Sign Up"}
                </Button>
              </Form>
            </AnimatePresence>

            <Divider>
              <span>Or continue with</span>
            </Divider>

            <SocialButtons>
              <Button variant="outline">
                <SimpleIcon icon={siGithub} style={{ marginRight: "0.5rem" }} />
                Github
              </Button>
              <Button variant="outline">
                <SimpleIcon icon={siGoogle} style={{ marginRight: "0.5rem" }} />
                Google
              </Button>
            </SocialButtons>
          </div>

          <CardFooter style={{ justifyContent: "center" }}>
            <p style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>
              By clicking continue, you agree to our Terms of Service.
            </p>
          </CardFooter>
        </AuthCard>
      </AuthLayout>
    </PageContainer>
  );
};

export default Auth;
