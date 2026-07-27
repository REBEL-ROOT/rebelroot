import Head from 'next/head';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import Container from 'components/Container';
import Page from 'components/Page';

export default function LinkedInAdminPage() {
  const [commentary, setCommentary] = useState(
    `🌐 Take back control of your mobile web experience with Omni Browser by REBELROOT!\n\nBuilt for speed, privacy, and digital sovereignty:\n🔒 Hardware-Backed Safe Locker (AES-256 GCM encrypted vault)\n🔌 Native Firefox WebExtensions support (uBlock Origin)\n🧠 On-device offline page translation (Google ML Kit)\n📺 Hardware ExoPlayer video player with stream sniffer\n\n100% Free and Open Source under GPLv3 with zero ads & zero telemetry.\n\n👉 Learn more and download the latest release: https://www.rebelroot.xyz/omnibrowser\n\n#REBELROOT #OmniBrowser #OpenSource #Android #Privacy #WebDev`
  );
  const [articleUrl, setArticleUrl] = useState('https://www.rebelroot.xyz/omnibrowser');
  const [articleTitle, setArticleTitle] = useState('Omni Browser by RebelRoot — Fast & Private Android Browser');
  const [articleDescription, setArticleDescription] = useState('Built on Mozilla GeckoView with built-in uBlock Origin, offline translation & hardware vault.');
  
  const [organizationId, setOrganizationId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [publishResult, setPublishResult] = useState<{ success: boolean; message: string; postUrl?: string } | null>(null);

  const handleGeneratePreset = async (presetKey: string) => {
    setIsGenerating(true);
    setPublishResult(null);
    try {
      const res = await fetch('/api/linkedin/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);
    setPublishResult(null);

    try {
      const res = await fetch('/api/linkedin/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  return (
    <Page
      title="LinkedIn Automation Dashboard"
      description="Automate posts, announcements, and release updates for the REBELROOT LinkedIn Company Page."
      hideHeader={true}
    >
      <Head>
        <title>LinkedIn Post Automation | REBELROOT Admin</title>
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
                </CompanyTitleRow>
                <CompanyMeta>
                  <span>👥 253 followers</span> • <span>Software Built for Rebels. By Rebels.</span>
                </CompanyMeta>
              </CompanyInfo>
            </CompanyLogoGroup>
            <LinkedInBtn
              href="https://www.linkedin.com/company/rebelroot"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on LinkedIn ↗
            </LinkedInBtn>
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

                  <SectionDivider>LinkedIn OAuth Credentials</SectionDivider>
                  <ConfigNote>
                    Leave blank to use environment variables (<code>LINKEDIN_ORGANIZATION_ID</code> &amp; <code>LINKEDIN_ACCESS_TOKEN</code>).
                  </ConfigNote>

                  <FormGroup>
                    <Label>Organization ID (or URN)</Label>
                    <Input
                      type="text"
                      value={organizationId}
                      onChange={(e) => setOrganizationId(e.target.value)}
                      placeholder="e.g. 12345678 or urn:li:organization:12345678"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>LinkedIn OAuth Access Token</Label>
                    <Input
                      type="password"
                      value={accessToken}
                      onChange={(e) => setAccessToken(e.target.value)}
                      placeholder="Bearer token with w_organization_social scope..."
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

                  <SubmitRow>
                    <Button type="submit" disabled={isPublishing}>
                      {isPublishing ? 'Publishing to LinkedIn...' : 'Publish to Company Page 🚀'}
                    </Button>
                  </SubmitRow>
                </Form>
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
                        <ArticleDomain>{new URL(articleUrl || 'https://www.rebelroot.xyz').hostname}</ArticleDomain>
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

const CompanyMeta = styled.div`
  font-size: 1.5rem;
  opacity: 0.75;
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

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 700;
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
