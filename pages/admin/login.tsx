import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import Container from 'components/Container';
import Page from 'components/Page';

export default function AdminLoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('rebelroot');
  const [password, setPassword] = useState('75057');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const endpoint = mode === 'login' ? '/api/admin/login' : '/api/admin/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (mode === 'login') {
          localStorage.setItem('rr_admin_token', data.token);
          localStorage.setItem('rr_admin_user', JSON.stringify(data.user));
          router.push('/admin/linkedin');
        } else {
          setSuccessMsg(data.message || 'Password successfully saved in Turso DB! You can now sign in.');
          setMode('login');
        }
      } else {
        setErrorMsg(data.error || 'Operation failed');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error connecting to Turso DB server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page
      title="Admin Portal"
      description="Secure Turso DB authentication portal for REBELROOT administration."
    >
      <Head>
        <title>{mode === 'login' ? 'Sign In' : 'Set Turso DB Password'} | REBELROOT Admin</title>
      </Head>

      <LoginWrapper>
        <Container>
          <LoginCard>
            <LogoGroup>
              <LogoImg src="/rebelroot-icon.png" alt="REBELROOT" />
              <h2>REBELROOT Portal</h2>
              <Badge>Turso DB Authentication</Badge>
            </LogoGroup>

            <TabGroup>
              <TabBtn active={mode === 'login'} onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}>
                🔒 Sign In
              </TabBtn>
              <TabBtn active={mode === 'register'} onClick={() => { setMode('register'); setErrorMsg(''); setSuccessMsg(''); }}>
                ⚙️ Set Password in Turso DB
              </TabBtn>
            </TabGroup>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Admin Username</Label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="rebelroot"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>{mode === 'login' ? 'Password' : 'New Admin Password'}</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password..."
                  required
                />
              </FormGroup>

              {successMsg && <SuccessBanner>{successMsg}</SuccessBanner>}
              {errorMsg && <ErrorBanner>{errorMsg}</ErrorBanner>}

              <Button type="submit" disabled={isLoading} style={{ width: '100%', marginTop: '1rem' }}>
                {isLoading
                  ? 'Connecting to Turso DB...'
                  : mode === 'login'
                  ? 'Sign In to Dashboard 🚀'
                  : 'Save Password to Turso DB 🗄️'}
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
  max-width: 46rem;
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
  margin-bottom: 2.5rem;

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

const TabGroup = styled.div`
  display: flex;
  background: rgba(var(--text), 0.05);
  padding: 0.4rem;
  border-radius: 1rem;
  margin-bottom: 2.5rem;
`;

const TabBtn = styled.button<{ active: boolean }>`
  flex: 1;
  background: ${(p) => (p.active ? 'rgb(var(--primary))' : 'transparent')};
  color: ${(p) => (p.active ? '#ffffff' : 'rgb(var(--text))')};
  border: none;
  font-size: 1.3rem;
  font-weight: 700;
  padding: 1rem;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
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

const SuccessBanner = styled.div`
  background: rgba(76, 175, 80, 0.15);
  border: 1px solid #4caf50;
  color: #4caf50;
  font-size: 1.4rem;
  font-weight: 600;
  padding: 1.2rem;
  border-radius: 0.8rem;
  text-align: center;
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
