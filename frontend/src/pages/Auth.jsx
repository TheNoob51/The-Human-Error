import styled from "styled-components";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import Button from "../components/Button";
import Header from "../components/Header";

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: hsl(var(--background));
`;

const AuthContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 400px;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
  
  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  input {
    width: 100%;
    height: 2.5rem;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius);
    border: 1px solid hsl(var(--border));
    background-color: transparent;
    font-size: 0.875rem;
    
    &:focus {
      outline: 2px solid hsl(var(--ring));
      outline-offset: 2px;
    }
  }
`;

const Auth = () => {
    return (
        <PageContainer>
            <Header />
            <AuthContent>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <StyledCard>
                        <CardHeader>
                            <CardTitle>Welcome Back</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <InputGroup>
                                <label>Email</label>
                                <input type="email" placeholder="user@example.com" />
                            </InputGroup>
                            <InputGroup>
                                <label>Password</label>
                                <input type="password" placeholder="••••••••" />
                            </InputGroup>
                            <Button style={{ width: "100%", marginTop: "1rem" }}>Login</Button>
                            <p style={{ marginTop: "1rem", fontSize: "0.875rem", textAlign: "center", color: "hsl(var(--muted-foreground))" }}>
                                This is a placeholder auth page.
                            </p>
                        </CardContent>
                    </StyledCard>
                </motion.div>
            </AuthContent>
        </PageContainer>
    );
};

export default Auth;
