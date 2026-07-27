import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import Container from 'components/Container';
import Page from 'components/Page';

export default function UnifiedAdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [adminUser, setAdminUser] = useState<{ username: string } | null>(null);

  // Mode for Auth card: 'login' | 'register'
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('rebelroot');
  const [password, setPassword] = useState('');
  const [authErrorMsg, setAuthErrorMsg] = useState('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Dashboard content states
  const [commentary, setCommentary] = useState(
    `🌐 Take back control of your mobile web experience with Omni Browser by REBELROOT!\n\nBuilt for speed, privacy, and digital sovereignty:\n🔒 Hardware-Backed Safe Locker (AES-256 GCM encrypted vault)\n🔌 Native Firefox WebExtensions support (uBlock Origin)\n🧠 On-device offline page translation (Google ML Kit)\n📺 Hardware ExoPlayer video player with stream sniffer\n\n100% Free and Open Source under GPLv3 with zero ads & zero telemetry.\n\n👉 Learn more and download the latest release: https://www.rebelroot.xyz/omnibrowser\n\n#REBELROOT #OmniBrowser #OpenSource #Android #Privacy #WebDev`
  );
  const [articleUrl, setArticleUrl] = useState('https://www.rebelroot.xyz/omnibrowser');
  const [articleTitle, setArticleTitle] = useState('Omni Browser by RebelRoot — Fast & Private Android Browser');
  const [articleDescription, setArticleDescription] = useState('Built on Mozilla GeckoView with built-in uBlock Origin, offline translation & hardware vault.');
  
  const [organizationId, setOrganizationId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [groqApiKey, setGroqApiKey] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [publishResult, setPublishResult] = useState<{ success: boolean; message: string; postUrl?: string } | null>(null);

  /* Comment Reply State */
  const [incomingComment, setIncomingComment] = useState('Is Omni Browser fully open source on GitHub?');
  const [aiReplyText, setAiReplyText] = useState('');
  const [isAnalyzingComment, setIsAnalyzingComment] = useState(false);

  /* Turso DB Saved Articles State */
  const [savedArticles, setSavedArticles] = useState<any[]>([]);
  const [isSavingTurso, setIsSavingTurso] = useState(false);
  const [tursoStatusMsg, setTursoStatusMsg] = useState('');

  // Token verify logic — simply trust what's in localStorage on mount.
  // If a token is stale, secureFetch will get a 401 and call handleLogoutAction() automatically.
  useEffect(() => {
    const token = localStorage.getItem('rr_admin_token');
    const storedUser = localStorage.getItem('rr_admin_user');
    if (!token) {
      setIsLoggedIn(false);
    } else {
      if (storedUser) {
        try { setAdminUser(JSON.parse(storedUser)); } catch (e) {}
      }
      setIsLoggedIn(true);
      fetchTursoArticlesDirectly(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogoutAction = () => {
    localStorage.removeItem('rr_admin_token');
    localStorage.removeItem('rr_admin_user');
    setAdminUser(null);
    setIsLoggedIn(false);
  };

  const secureFetch = async (url: string, options: any = {}) => {
    const token = localStorage.getItem('rr_admin_token') || '';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };
    const res = await fetch(url, { ...options, headers });
    if (res.status === 401) {
      handleLogoutAction();
    }
    return res;
  };

  const fetchTursoArticlesDirectly = async (token: string) => {
    try {
      const res = await fetch('/api/linkedin/articles', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && data.articles) {
        setSavedArticles(data.articles);
      }
    } catch (err) {
      console.error('Failed to fetch articles from Turso DB:', err);
    }
  };

  const fetchTursoArticles = () => {
    const token = localStorage.getItem('rr_admin_token') || '';
    if (token) fetchTursoArticlesDirectly(token);
  };

  const getUrlDomain = (urlStr: string) => {
    try {
      return new URL(urlStr || 'https://www.rebelroot.xyz').hostname;
    } catch (e) {
      // Fallback if URL is relative or lacks protocol
      return 'rebelroot.xyz';
    }
  };

  // Auth submission handler
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthLoading(true);
    setAuthErrorMsg('');
    setAuthSuccessMsg('');

    const endpoint = authMode === 'login' ? '/api/admin/login' : '/api/admin/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (authMode === 'login') {
          localStorage.setItem('rr_admin_token', data.token);
          localStorage.setItem('rr_admin_user', JSON.stringify(data.user));
          setAdminUser(data.user);
          setIsLoggedIn(true);
          fetchTursoArticlesDirectly(data.token);
        } else {
          setAuthSuccessMsg(data.message || 'Password saved in Turso DB! You can now sign in.');
          setAuthMode('login');
        }
      } else {
        setAuthErrorMsg(data.error || 'Operation failed');
      }
    } catch (err: any) {
      setAuthErrorMsg(err.message || 'Error connecting to Turso DB server.');
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Dashboard functions
  const handleSaveToTurso = async () => {
    setIsSavingTurso(true);
    setTursoStatusMsg('');
    try {
      const res = await secureFetch('/api/linkedin/articles', {
        method: 'POST',
        body: JSON.stringify({
          title: articleTitle || 'REBELROOT Update',
          commentary,
          articleUrl,
          productName: 'Omni Browser',
          status: 'SAVED',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setTursoStatusMsg('Saved to Turso DB successfully!');
        fetchTursoArticles();
      } else {
        setTursoStatusMsg(data.error || 'Failed to save to Turso DB');
      }
    } catch (err: any) {
      setTursoStatusMsg(err.message || 'Error connecting to Turso DB');
    } finally {
      setIsSavingTurso(false);
    }
  };

  const handleLoadTursoArticle = (art: any) => {
    setArticleTitle(art.title);
    setCommentary(art.commentary);
    if (art.articleUrl) setArticleUrl(art.articleUrl);
  };

  const handleGeneratePreset = async (presetKey: string) => {
    setIsGenerating(true);
    setPublishResult(null);
    try {
      const res = await secureFetch('/api/linkedin/generate', {
        method: 'POST',
        body: JSON.stringify({ presetKey }),
      });
      const data = await res.json();
      if (data.success && data.post) {
        setCommentary(data.post.commentary);
        setArticleUrl(data.post.link);
        setArticleTitle(data.post.title);
        setArticleDescription(data.post.description);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateGroqPost = async () => {
    if (!customPrompt.trim()) return;
    setIsGenerating(true);
    setPublishResult(null);
    try {
      const res = await secureFetch('/api/linkedin/generate', {
        method: 'POST',
        body: JSON.stringify({ customPrompt, groqApiKey }),
      });
      const data = await res.json();
      if (data.success && data.post) {
        setCommentary(data.post.commentary);
        setArticleUrl(data.post.link);
        setArticleTitle(data.post.title);
        setArticleDescription(data.post.description);
      } else {
        alert(data.error || 'Groq AI generation failed.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnalyzeComment = async () => {
    setIsAnalyzingComment(true);
    try {
      const res = await secureFetch('/api/linkedin/comments', {
        method: 'POST',
        body: JSON.stringify({ action: 'generate', commentText: incomingComment, groqApiKey }),
      });
      const data = await res.json();
      if (data.success && data.suggestedReply) {
        setAiReplyText(data.suggestedReply);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzingComment(false);
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);
    setPublishResult(null);

    try {
      const res = await secureFetch('/api/linkedin/publish', {
        method: 'POST',
        body: JSON.stringify({
          organizationId,
          accessToken,
          commentary,
          articleUrl,
          articleTitle,
          articleDescription,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPublishResult({
          success: true,
          message: 'Post successfully published to REBELROOT LinkedIn Company Page!',
          postUrl: data.postUrl,
        });

        // Also save published record to Turso DB
        secureFetch('/api/linkedin/articles', {
          method: 'POST',
          body: JSON.stringify({
            title: articleTitle || 'Published LinkedIn Update',
            commentary,
            articleUrl,
            status: 'PUBLISHED',
            linkedinPostId: data.postId,
          }),
        }).then(() => fetchTursoArticles());

      } else {
        setPublishResult({
          success: false,
          message: data.error || 'Failed to publish post to LinkedIn.',
        });
      }
    } catch (err: any) {
      setPublishResult({
        success: false,
        message: err.message || 'An unexpected error occurred.',
      });
    } finally {
      setIsPublishing(false);
    }
  };

  // Render Loader
  if (isLoggedIn === null) {
    return (
      <Page title="Loading" description="Authenticating...">
        <LoaderWrapper>
          <Spinner />
          <p>Connecting securely to Turso DB...</p>
        </LoaderWrapper>
      </Page>
    );
  }

  // Render Login Card
  if (isLoggedIn === false) {
    return (
      <Page
        title="Admin Portal"
        description="Secure Turso DB authentication portal for REBELROOT administration."
      >
        <Head>
          <title>{authMode === 'login' ? 'Sign In' : 'Set Turso DB Password'} | REBELROOT Admin</title>
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
                <TabBtn active={authMode === 'login'} onClick={() => { setAuthMode('login'); setAuthErrorMsg(''); setAuthSuccessMsg(''); }}>
                  🔒 Sign In
                </TabBtn>
                <TabBtn active={authMode === 'register'} onClick={() => { setAuthMode('register'); setAuthErrorMsg(''); setAuthSuccessMsg(''); }}>
                  ⚙️ Set Password in Turso DB
                </TabBtn>
              </TabGroup>

              <Form onSubmit={handleAuthSubmit}>
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
                  <Label>{authMode === 'login' ? 'Password' : 'New Admin Password'}</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    required
                  />
                </FormGroup>

                {authSuccessMsg && <SuccessBanner>{authSuccessMsg}</SuccessBanner>}
                {authErrorMsg && <ErrorBanner>{authErrorMsg}</ErrorBanner>}

                <Button type="submit" disabled={isAuthLoading} style={{ width: '100%', marginTop: '1rem' }}>
                  {isAuthLoading
                    ? 'Connecting to Turso DB...'
                    : authMode === 'login'
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

  // Render Dashboard
  return (
    <Page
      title="LinkedIn Automation Dashboard"
      description="Automate posts, announcements, and AI comment replies for the REBELROOT LinkedIn Company Page."
      hideHeader={true}
    >
      <Head>
        <title>LinkedIn Post &amp; Comment Automation | REBELROOT Admin</title>
      </Head>

      <AdminWrapper>
        <Container>
          {/* Header Banner */}
          <CompanyHeaderCard>
            <CompanyLogoGroup>
              <CompanyLogo src="/rebelroot-icon.png" alt="REBELROOT Logo" />
              <CompanyInfo>
                <CompanyTitleRow>
                  <h2>REBELROOT</h2>
                  <Badge>Company Page</Badge>
                  <TursoBadge>🗄️ Turso DB Connected</TursoBadge>
                  <ModelBadge>⚡ Groq AI (Qwen 3.6 27B)</ModelBadge>
                </CompanyTitleRow>
                <CompanyMeta>
                  <span>👥 253 followers</span> • <span>Software Built for Rebels. By Rebels.</span>
                  {adminUser && <AdminName> • Signed in as: <strong>{adminUser.username}</strong></AdminName>}
                </CompanyMeta>
              </CompanyInfo>
            </CompanyLogoGroup>
            
            <ActionButtonsGroup>
              <LinkedInBtn
                href="https://www.linkedin.com/company/rebelroot"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Page ↗
              </LinkedInBtn>
              <LogoutBtn onClick={handleLogoutAction}>
                Sign Out 🚪
              </LogoutBtn>
            </ActionButtonsGroup>
          </CompanyHeaderCard>

          <MainGrid>
            {/* Left Column: Form & Preset Controls */}
            <LeftColumn>
              {/* Presets Generator Bar */}
              <Card>
                <CardTitle>⚡ 1-Click Product Generators</CardTitle>
                <CardSub>Select a RebelRoot application to auto-generate LinkedIn post copy:</CardSub>
                <PresetGroup>
                  <PresetBtn onClick={() => handleGeneratePreset('omnibrowser')} disabled={isGenerating}>
                    🌐 Omni Browser
                  </PresetBtn>
                  <PresetBtn onClick={() => handleGeneratePreset('mocnovel')} disabled={isGenerating}>
                    📖 MOCNovel
                  </PresetBtn>
                  <PresetBtn onClick={() => handleGeneratePreset('campcart')} disabled={isGenerating}>
                    🛒 CampCart
                  </PresetBtn>
                  <PresetBtn onClick={() => handleGeneratePreset('mocoffice')} disabled={isGenerating}>
                    📄 MOC Office
                  </PresetBtn>
                  <PresetBtn onClick={() => handleGeneratePreset('rootlock')} disabled={isGenerating}>
                    🔐 RootLock
                  </PresetBtn>
                </PresetGroup>

                <SectionDivider style={{ marginTop: '2.5rem' }}>🤖 Groq AI Custom Post Generator</SectionDivider>
                <FormGroup style={{ marginTop: '1rem' }}>
                  <Label>Prompt / Topic for Groq AI (Model: <code>qwen/qwen3.6-27b</code>)</Label>
                  <Input
                    type="text"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="e.g. Announce Omni Browser v1.3 with tab grouping and offline mode"
                  />
                  <PresetBtn
                    style={{ marginTop: '1rem', background: 'rgb(var(--primary))', color: '#fff' }}
                    onClick={handleGenerateGroqPost}
                    disabled={isGenerating || !customPrompt.trim()}
                  >
                    {isGenerating ? 'Generating with Groq...' : '⚡ Generate Post with Qwen 3.6 27B'}
                  </PresetBtn>
                </FormGroup>
              </Card>

              {/* Post Editor Studio */}
              <Card>
                <CardTitle>📝 Post Content Studio</CardTitle>
                <Form onSubmit={handlePublish}>
                  <FormGroup>
                    <LabelRow>
                      <Label>Post Commentary (Text &amp; Hashtags)</Label>
                      <CharCount>{commentary.length} chars</CharCount>
                    </LabelRow>
                    <TextArea
                      rows={9}
                      value={commentary}
                      onChange={(e) => setCommentary(e.target.value)}
                      placeholder="Write your LinkedIn post update..."
                      required
                    />
                  </FormGroup>

                  <SectionDivider>Article Link Attachment</SectionDivider>

                  <FormGroup>
                    <Label>Article / Destination URL</Label>
                    <Input
                      type="url"
                      value={articleUrl}
                      onChange={(e) => setArticleUrl(e.target.value)}
                      placeholder="https://www.rebelroot.xyz/omnibrowser"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Article Preview Title</Label>
                    <Input
                      type="text"
                      value={articleTitle}
                      onChange={(e) => setArticleTitle(e.target.value)}
                      placeholder="Title of the article preview card..."
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Article Short Description</Label>
                    <Input
                      type="text"
                      value={articleDescription}
                      onChange={(e) => setArticleDescription(e.target.value)}
                      placeholder="Brief description for the card preview..."
                    />
                  </FormGroup>

                  <SectionDivider>API &amp; Database Configuration</SectionDivider>
                  <ConfigNote>
                    Credentials pre-configured in environment variables (<code>TURSO_DATABASE_URL</code>, <code>LINKEDIN_ORGANIZATION_ID</code>, <code>LINKEDIN_ACCESS_TOKEN</code>).
                  </ConfigNote>

                  <FormGroup>
                    <Label>Organization ID (or URN)</Label>
                    <Input
                      type="text"
                      value={organizationId}
                      onChange={(e) => setOrganizationId(e.target.value)}
                      placeholder="e.g. 133454483"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>LinkedIn OAuth Access Token</Label>
                    <Input
                      type="password"
                      value={accessToken}
                      onChange={(e) => setAccessToken(e.target.value)}
                      placeholder="Bearer token starting with AQV..."
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Groq API Key (Optional)</Label>
                    <Input
                      type="password"
                      value={groqApiKey}
                      onChange={(e) => setGroqApiKey(e.target.value)}
                      placeholder="gsk_..."
                    />
                  </FormGroup>

                  {publishResult && (
                    <StatusBanner success={publishResult.success}>
                      <p>{publishResult.message}</p>
                      {publishResult.postUrl && (
                        <a href={publishResult.postUrl} target="_blank" rel="noopener noreferrer">
                          View Published Post on LinkedIn ↗
                        </a>
                      )}
                    </StatusBanner>
                  )}

                  <SubmitRow style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <Button type="submit" disabled={isPublishing}>
                      {isPublishing ? 'Publishing to LinkedIn...' : 'Publish to Company Page 🚀'}
                    </Button>
                    <PresetBtn
                      type="button"
                      onClick={handleSaveToTurso}
                      disabled={isSavingTurso}
                      style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#fff', padding: '1.2rem 2rem', borderRadius: '3rem' }}
                    >
                      {isSavingTurso ? 'Saving...' : '💾 Save Article to Turso DB'}
                    </PresetBtn>
                  </SubmitRow>
                  {tursoStatusMsg && <p style={{ fontSize: '1.3rem', opacity: 0.8, marginTop: '0.5rem' }}>{tursoStatusMsg}</p>}
                </Form>
              </Card>

              {/* Turso DB Saved Articles Vault */}
              {savedArticles.length > 0 && (
                <Card>
                  <CardTitle>🗄️ Turso DB Article Archives ({savedArticles.length})</CardTitle>
                  <CardSub>Articles &amp; post drafts stored in your Turso DB libSQL instance:</CardSub>
                  <ArticleVaultList>
                    {savedArticles.map((art) => (
                      <VaultItem key={art.id} onClick={() => handleLoadTursoArticle(art)}>
                        <VaultTitle>{art.title}</VaultTitle>
                        <VaultMeta>
                          <VaultBadge status={art.status}>{art.status}</VaultBadge>
                          <span>{new Date(art.createdAt || Date.now()).toLocaleDateString()}</span>
                        </VaultMeta>
                      </VaultItem>
                    ))}
                  </ArticleVaultList>
                </Card>
              )}

              {/* AI Comment Understanding & Reply Studio */}
              <Card>
                <CardTitle>🤖 AI Comment Reply Studio (Groq Qwen 3.6 27B)</CardTitle>
                <CardSub>Paste visitor comments on your LinkedIn posts to understand questions &amp; auto-generate official REBELROOT replies:</CardSub>
                <FormGroup>
                  <Label>Visitor Comment on Post</Label>
                  <Input
                    type="text"
                    value={incomingComment}
                    onChange={(e) => setIncomingComment(e.target.value)}
                    placeholder="e.g., Is Omni Browser open source on GitHub?"
                  />
                </FormGroup>

                <PresetBtn
                  style={{ marginTop: '1.2rem', background: 'rgba(var(--primary), 0.15)', color: 'rgb(var(--primary))' }}
                  onClick={handleAnalyzeComment}
                  disabled={isAnalyzingComment}
                >
                  {isAnalyzingComment ? 'Analyzing with Qwen 3.6 27B...' : '🤖 AI Understand & Generate Reply'}
                </PresetBtn>

                {aiReplyText && (
                  <FormGroup style={{ marginTop: '2rem' }}>
                    <Label>Generated Official Reply</Label>
                    <TextArea
                      rows={4}
                      value={aiReplyText}
                      onChange={(e) => setAiReplyText(e.target.value)}
                    />
                  </FormGroup>
                )}
              </Card>
            </LeftColumn>

            {/* Right Column: Live Mockup Feed Preview */}
            <RightColumn>
              <StickyContainer>
                <PreviewHeaderTitle>👁️ Live LinkedIn Feed Preview</PreviewHeaderTitle>
                <PreviewSub>Interactive preview of how this post renders on LinkedIn desktop &amp; mobile feeds:</PreviewSub>

                {/* LinkedIn Card Component */}
                <LinkedInCard>
                  {/* Header */}
                  <LinkedInCardHeader>
                    <LinkedInAvatar src="/rebelroot-icon.png" alt="REBELROOT" />
                    <LinkedInHeaderInfo>
                      <LinkedInNameRow>
                        <h4>REBELROOT</h4>
                        <LinkedInTag>Company</LinkedInTag>
                      </LinkedInNameRow>
                      <LinkedInSubText>Software Built for Rebels. By Rebels.</LinkedInSubText>
                      <LinkedInTimeText>Just now • 🌐</LinkedInTimeText>
                    </LinkedInHeaderInfo>
                  </LinkedInCardHeader>

                  {/* Body Text */}
                  <LinkedInBodyText>{commentary}</LinkedInBodyText>

                  {/* Article Link Card Preview */}
                  {articleUrl && (
                    <LinkedInArticleCard href={articleUrl} target="_blank" rel="noopener noreferrer">
                      <ArticleThumbnail src="/rebelroot-logo.png" alt="Article Preview" />
                      <ArticleCardContent>
                        <h5>{articleTitle || articleUrl}</h5>
                        <p>{articleDescription || 'rebelroot.xyz'}</p>
                        <ArticleDomain>{getUrlDomain(articleUrl)}</ArticleDomain>
                      </ArticleCardContent>
                    </LinkedInArticleCard>
                  )}

                  {/* Reactions Counter */}
                  <LinkedInMetricsRow>
                    <ReactionsIcons>👍 💡 ❤️ 253</ReactionsIcons>
                    <CommentsCount>14 comments • 8 reposts</CommentsCount>
                  </LinkedInMetricsRow>

                  {/* Action Bar */}
                  <LinkedInActionBar>
                    <ActionItem>👍 Like</ActionItem>
                    <ActionItem>💬 Comment</ActionItem>
                    <ActionItem>🔁 Repost</ActionItem>
                    <ActionItem>📤 Send</ActionItem>
                  </LinkedInActionBar>
                </LinkedInCard>
              </StickyContainer>
            </RightColumn>
          </MainGrid>
        </Container>
      </AdminWrapper>
    </Page>
  );
}

/* ── Styled Components ── */

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 2rem;

  p {
    font-size: 1.6rem;
    font-weight: 600;
    opacity: 0.8;
  }
`;

const Spinner = styled.div`
  width: 5rem;
  height: 5rem;
  border: 4px solid rgba(var(--primary), 0.1);
  border-top-color: rgb(var(--primary));
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

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

const AdminWrapper = styled.div`
  padding: 4rem 0 8rem 0;
  background: rgb(var(--background));
  min-height: 100vh;
  color: rgb(var(--text));
`;

const CompanyHeaderCard = styled.div`
  background: rgb(var(--secondBackground));
  border: 1px solid rgba(var(--text), 0.08);
  border-radius: 1.6rem;
  padding: 3rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
  box-shadow: var(--shadow-md);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    padding: 2.5rem;
  }
`;

const CompanyLogoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
`;

const CompanyLogo = styled.img`
  width: 7rem;
  height: 7rem;
  border-radius: 1.4rem;
  background: #000;
  object-fit: contain;
  padding: 0.8rem;
  border: 1px solid rgba(var(--text), 0.1);
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const CompanyTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-wrap: wrap;

  h2 {
    font-size: 2.8rem;
    font-weight: 800;
    margin: 0;
  }
`;

const Badge = styled.span`
  background: rgba(var(--primary), 0.15);
  color: rgb(var(--primary));
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0.4rem 1rem;
  border-radius: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TursoBadge = styled.span`
  background: rgba(0, 230, 204, 0.15);
  color: #00e6cc;
  border: 1px solid rgba(0, 230, 204, 0.3);
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0.4rem 1rem;
  border-radius: 2rem;
`;

const ModelBadge = styled.span`
  background: rgba(138, 43, 226, 0.15);
  color: #a855f7;
  border: 1px solid rgba(168, 85, 247, 0.3);
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0.4rem 1rem;
  border-radius: 2rem;
`;

const CompanyMeta = styled.div`
  font-size: 1.5rem;
  opacity: 0.75;
`;

const AdminName = styled.span`
  color: rgb(var(--primary));
`;

const ActionButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const LinkedInBtn = styled.a`
  background: #0a66c2;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1.2rem 2.4rem;
  border-radius: 3rem;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: #004182;
    transform: translateY(-2px);
  }
`;

const LogoutBtn = styled.button`
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid rgba(244, 67, 54, 0.3);
  color: #f44336;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1.2rem 2.4rem;
  border-radius: 3rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(244, 67, 54, 0.2);
    transform: translateY(-2px);
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const RightColumn = styled.div``;

const StickyContainer = styled.div`
  position: sticky;
  top: 8rem;
`;

const Card = styled.div`
  background: rgb(var(--secondBackground));
  border: 1px solid rgba(var(--text), 0.08);
  border-radius: 1.6rem;
  padding: 3.5rem;
  box-shadow: var(--shadow-sm);
`;

const CardTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 0.8rem;
`;

const CardSub = styled.p`
  font-size: 1.4rem;
  opacity: 0.7;
  margin-bottom: 2rem;
`;

const PresetGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
`;

const PresetBtn = styled.button`
  background: rgba(var(--text), 0.05);
  border: 1px solid rgba(var(--text), 0.12);
  color: rgb(var(--text));
  font-size: 1.4rem;
  font-weight: 600;
  padding: 0.8rem 1.6rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(var(--primary), 0.15);
    border-color: rgb(var(--primary));
    color: rgb(var(--primary));
    transform: translateY(-2px);
  }
`;

const ArticleVaultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const VaultItem = styled.div`
  background: rgba(var(--text), 0.04);
  border: 1px solid rgba(var(--text), 0.08);
  border-radius: 1rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(var(--primary), 0.1);
    border-color: rgb(var(--primary));
  }
`;

const VaultTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.6rem 0;
`;

const VaultMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  opacity: 0.6;
`;

const VaultBadge = styled.span<{ status: string }>`
  background: ${(p) => (p.status === 'PUBLISHED' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 193, 7, 0.2)')};
  color: ${(p) => (p.status === 'PUBLISHED' ? '#4CAF50' : '#FFC107')};
  font-weight: bold;
  padding: 0.2rem 0.8rem;
  border-radius: 1rem;
  font-size: 1.1rem;
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CharCount = styled.span`
  font-size: 1.2rem;
  opacity: 0.6;
`;

const TextArea = styled.textarea`
  width: 100%;
  background: rgb(var(--background));
  border: 1px solid rgba(var(--text), 0.12);
  border-radius: 1rem;
  padding: 1.5rem;
  color: rgb(var(--text));
  font-size: 1.5rem;
  font-family: inherit;
  line-height: 1.6;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: rgb(var(--primary));
  }
`;

const Input = styled.input`
  width: 100%;
  background: rgb(var(--background));
  border: 1px solid rgba(var(--text), 0.12);
  border-radius: 0.8rem;
  padding: 1.2rem 1.5rem;
  color: rgb(var(--text));
  font-size: 1.4rem;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: rgb(var(--primary));
  }
`;

const SectionDivider = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(var(--text), 0.08);
  color: rgb(var(--primary));
`;

const ConfigNote = styled.p`
  font-size: 1.3rem;
  opacity: 0.65;
  margin-top: -1rem;

  code {
    background: rgba(var(--text), 0.08);
    padding: 0.2rem 0.6rem;
    border-radius: 0.4rem;
  }
`;

const SubmitRow = styled.div`
  margin-top: 1.5rem;
`;

const StatusBanner = styled.div<{ success: boolean }>`
  background: ${(p) => (p.success ? 'rgba(76, 175, 80, 0.15)' : 'rgba(244, 67, 54, 0.15)')};
  border: 1px solid ${(p) => (p.success ? '#4CAF50' : '#F44336')};
  border-radius: 1rem;
  padding: 1.5rem 2rem;
  margin-top: 1rem;

  p {
    margin: 0 0 0.5rem 0;
    font-size: 1.4rem;
    font-weight: 600;
    color: ${(p) => (p.success ? '#4CAF50' : '#F44336')};
  }

  a {
    font-size: 1.3rem;
    color: rgb(var(--primary));
    font-weight: bold;
    text-decoration: underline;
  }
`;

const PreviewHeaderTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 0.8rem;
`;

const PreviewSub = styled.p`
  font-size: 1.4rem;
  opacity: 0.7;
  margin-bottom: 2.5rem;
`;

/* LinkedIn Dark Theme Feed Card Mockup */
const LinkedInCard = styled.div`
  background: #1b1f23;
  border: 1px solid #38434f;
  border-radius: 1.2rem;
  padding: 2rem;
  color: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
`;

const LinkedInCardHeader = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const LinkedInAvatar = styled.img`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 0.8rem;
  background: #000000;
  object-fit: contain;
  padding: 0.4rem;
`;

const LinkedInHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const LinkedInNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  h4 {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 700;
    color: #ffffff;
  }
`;

const LinkedInTag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  font-size: 1.1rem;
  padding: 0.2rem 0.6rem;
  border-radius: 0.4rem;
  opacity: 0.8;
`;

const LinkedInSubText = styled.span`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
`;

const LinkedInTimeText = styled.span`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 0.2rem;
`;

const LinkedInBodyText = styled.div`
  font-size: 1.45rem;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 2rem;
`;

const LinkedInArticleCard = styled.a`
  display: block;
  background: #14171a;
  border: 1px solid #38434f;
  border-radius: 0.8rem;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  margin-bottom: 2rem;
  transition: border-color 0.2s;

  &:hover {
    border-color: #0a66c2;
  }
`;

const ArticleThumbnail = styled.img`
  width: 100%;
  height: 16rem;
  object-fit: cover;
  background: #000;
`;

const ArticleCardContent = styled.div`
  padding: 1.5rem;

  h5 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 0.6rem 0;
    color: #ffffff;
  }

  p {
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.65);
    margin: 0 0 0.8rem 0;
    line-height: 1.4;
  }
`;

const ArticleDomain = styled.span`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.4);
  text-transform: lowercase;
`;

const LinkedInMetricsRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.5);
  padding-bottom: 1rem;
  border-bottom: 1px solid #2d3742;
  margin-bottom: 1rem;
`;

const ReactionsIcons = styled.span``;
const CommentsCount = styled.span``;

const LinkedInActionBar = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ActionItem = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 0.8rem 1.2rem;
  border-radius: 0.4rem;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
  }
`;
