import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import Container from 'components/Container';
import Page from 'components/Page';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('rebelroot');
  const [password, setPassword] = useState('rebelroot');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('rr_admin_token', data.token);
        localStorage.setItem('rr_admin_user', JSON.stringify(data.user));
        router.push('/admin/linkedin');
      } else {
        setErrorMsg(data.error || 'Authentication failed');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error connecting to Turso DB authentication server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page
      title="Admin Sign In"
      description="Secure Turso DB authentication portal for REBELROOT administration."
    >
      <Head>
        <title>Sign In | REBELROOT Turso DB Portal</title>
      </Head>

      <LoginWrapper>
        <Container>
          <LoginCard>
            <LogoGroup>
              <LogoImg src="/rebelroot-icon.png" alt="REBELROOT" />
              <h2>REBELROOT Portal</h2>
              <Badge>Turso DB Authentication</Badge>
            </LogoGroup>

            <Form onSubmit={handleLogin}>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="rebelroot"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="rebelroot"
                  required
                />
              </FormGroup>

              <HintNote>
                Default credentials: <code>rebelroot</code> / <code>rebelroot</code>
              </HintNote>

              {errorMsg && <ErrorBanner>{errorMsg}</ErrorBanner>}

              <Button type="submit" disabled={isLoading} style={{ width: '100%', marginTop: '1rem' }}>
                {isLoading ? 'Authenticating with Turso DB...' : 'Sign In to Dashboard 🔒'}
              </Button>
            </Form>
          </LoginCard>
        </Container>
      </LoginWrapper>
    </Page>
  );
}

const LoginWrapper = styled.div`
  padding: 8rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

const LoginCard = styled.div`
  max-width: 44rem;
  margin: 0 auto;
  background: rgb(var(--secondBackground));
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 2rem;
  padding: 4rem;
  box-shadow: var(--shadow-md);
`;

const LogoGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 3.5rem;

  h2 {
    font-size: 2.6rem;
    font-weight: 800;
    margin: 0;
  }
`;

const LogoImg = styled.img`
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 1.4rem;
  background: #000;
  padding: 0.6rem;
`;

const Badge = styled.span`
  background: rgba(var(--primary), 0.15);
  color: rgb(var(--primary));
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0.4rem 1.2rem;
  border-radius: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 700;
`;

const Input = styled.input`
  width: 100%;
  background: rgb(var(--background));
  border: 1px solid rgba(var(--text), 0.12);
  border-radius: 0.8rem;
  padding: 1.4rem;
  color: rgb(var(--text));
  font-size: 1.5rem;

  &:focus {
    outline: none;
    border-color: rgb(var(--primary));
  }
`;

const HintNote = styled.p`
  font-size: 1.2rem;
  opacity: 0.65;
  margin: -1rem 0 0 0;
  text-align: center;

  code {
    background: rgba(var(--text), 0.08);
    padding: 0.2rem 0.5rem;
    border-radius: 0.4rem;
  }
`;

const ErrorBanner = styled.div`
  background: rgba(244, 67, 54, 0.15);
  border: 1px solid #f44336;
  color: #f44336;
  font-size: 1.4rem;
  font-weight: 600;
  padding: 1.2rem;
  border-radius: 0.8rem;
  text-align: center;
`;
