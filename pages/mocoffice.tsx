import Head from 'next/head';
import styled from 'styled-components';
import Button from 'components/Button';
import Container from 'components/Container';
import OverTitle from 'components/OverTitle';
import Page from 'components/Page';
import SectionTitle from 'components/SectionTitle';
import { media } from 'utils/media';

import FaqSection from 'components/FaqSection';

const mocofficeFaqs = [
  {
    question: "What is MOC Office (MOCOffice) by RebelRoot?",
    answer: "MOC Office (also known as MOCOffice or Rebel Root MOC Office) is a modern, privacy-first offline PDF reader and editor for Android developed by RebelRoot. It provides 12 built-in PDF tools — including merge, split, compress, watermark, and OCR — all processing 100% locally on your device without any trackers."
  },
  {
    question: "Does MOC Office require internet to process PDF files?",
    answer: "No. MOC Office is 100% offline. All PDF operations including merge, split, compress, and OCR run entirely on your Android device without any internet connection or cloud processing."
  },
  {
    question: "Is MOC Office free and open source?",
    answer: "Yes, MOC Office is completely free, ad-free, and open source. It uses PDF.js and Jetpack Compose built to Material Design 3 standards — without any third-party trackers or analytics."
  }
];

export default function MocOfficePage() {
  return (
    <Page
      title="MOC Office (MOCOffice) by RebelRoot | Offline PDF Reader & Editor for Android"
      description="MOC Office by RebelRoot is a privacy-first offline PDF reader and editing suite for Android with 12 built-in tools and zero data tracking."
      keywords="MOC Office, MOCOffice, moc office, mocoffice, MOC OFFICE, MOCOFFICE, RebelRoot MOC Office, Rebel Root MOCOffice, PDF reader Android, PDF editor offline, offline PDF tools, merge split PDF, Android PDF suite, RebelRoot, Rebel Root, rebelroot"
      ogImage="/mocoffice-logo.png"
      hideHeader={true}
    >
      <Head>
        {/* SoftwareApplication Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'MOC Office',
              alternateName: ['MOCOffice', 'Rebel Root MOC Office', 'RebelRoot MOCOffice', 'MOC OFFICE', 'mocoffice', 'moc office'],
              operatingSystem: 'Android',
              applicationCategory: 'UtilitiesApplication',
              offers: {
                '@type': 'Offer',
                price: '0.00',
                priceCurrency: 'USD',
              },
              publisher: {
                '@type': 'Organization',
                name: 'RebelRoot',
                alternateName: ['Rebel Root', 'rebelroot.xyz'],
                url: 'https://www.rebelroot.xyz',
              },
              downloadUrl: 'https://github.com/rebelroot/MocOffice',
              description: 'A modern, privacy-first PDF reader and editing suite for Android. 12 built-in PDF tools, 100% offline processing, zero trackers — built with Jetpack Compose and Material Design 3.',
            }),
          }}
        />
        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.rebelroot.xyz" },
                { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://www.rebelroot.xyz/features" },
                { "@type": "ListItem", "position": 3, "name": "MOC Office", "item": "https://www.rebelroot.xyz/mocoffice" }
              ]
            })
          }}
        />
        {/* FAQPage Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": mocofficeFaqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
              }))
            })
          }}
        />
      </Head>

      <MainWrapper>
        {/* Hero Section */}
        <IntroSection>
          <IntroContent>
            <LogoWrapper>
              <LogoImage src="/mocoffice-logo.png" alt="MOC Office Logo" />
            </LogoWrapper>
            <OverTitle>Android PDF Suite</OverTitle>
            <Title>Your Documents. Your Device. Your Rules.</Title>

            {/* Status Badge */}
            <div style={{ display: 'inline-block', background: 'rgba(255,100,100,0.12)', border: '1px solid rgba(255,100,100,0.45)', borderRadius: '2rem', padding: '0.5rem 1.6rem', marginBottom: '2rem', fontSize: '1.4rem', fontWeight: 700, color: '#FF6464', letterSpacing: '0.04em' }}>
              🛠️ In Development — Release Date: 18 August
            </div>

            {/* Tech Badges */}
            <BadgeContainer>
              <Badge color="#4F73E6">Kotlin 100%</Badge>
              <Badge color="#4CAF50">Jetpack Compose</Badge>
              <Badge color="#FF9800">Material Design 3</Badge>
              <Badge color="#9C27B0">PDF.js Engine</Badge>
              <Badge color="#E53935">GPL-3.0</Badge>
            </BadgeContainer>

            <Subtitle>
              MOC Office is a feature-rich, completely offline PDF reader and editing suite built for Android. Powered by Mozilla&apos;s PDF.js and iText Core, it delivers 12 professional-grade document tools with zero ads, zero tracking, and zero cloud dependency — all processed entirely on your device.
            </Subtitle>

            <CTAWrapper>
              <Button href="https://github.com/rebelroot/MocOffice" target="_blank" rel="noopener noreferrer">
                View on GitHub <span>&rarr;</span>
              </Button>
              <Button href="https://github.com/rebelroot/MocOffice/releases" target="_blank" rel="noopener noreferrer" transparent>
                Download APK <span>&rarr;</span>
              </Button>
            </CTAWrapper>
          </IntroContent>
        </IntroSection>

        {/* Workflow Section */}
        <LifecycleSection>
          <Container>
            <SectionTitle>How MOC Office Works</SectionTitle>
            <FlowContainer>
              <FlowStep>
                <StepNumber>01</StepNumber>
                <StepName>Open</StepName>
                <StepDesc>Browse local storage or recents</StepDesc>
              </FlowStep>
              <FlowArrow>&rarr;</FlowArrow>
              <FlowStep>
                <StepNumber>02</StepNumber>
                <StepName>Read</StepName>
                <StepDesc>Scroll, zoom, search & bookmark</StepDesc>
              </FlowStep>
              <FlowArrow>&rarr;</FlowArrow>
              <FlowStep>
                <StepNumber>03</StepNumber>
                <StepName>Select Tool</StepName>
                <StepDesc>Pick from 12 built-in PDF tools</StepDesc>
              </FlowStep>
              <FlowArrow>&rarr;</FlowArrow>
              <FlowStep>
                <StepNumber>04</StepNumber>
                <StepName>Process</StepName>
                <StepDesc>100% on-device, no upload</StepDesc>
              </FlowStep>
              <FlowArrow>&rarr;</FlowArrow>
              <FlowStep>
                <StepNumber>05</StepNumber>
                <StepName>Export</StepName>
                <StepDesc>Save or share instantly</StepDesc>
              </FlowStep>
            </FlowContainer>
          </Container>
        </LifecycleSection>

        {/* Feature Cards */}
        <FeaturesSection>
          <Container>
            <SectionTitle>Platform Capabilities</SectionTitle>
            <FeaturesGrid>
              <FeatureCard>
                <CardIcon>📖</CardIcon>
                <CardTitle>Advanced PDF Viewer</CardTitle>
                <CardList>
                  <li><strong>Scroll Modes:</strong> Vertical continuous scroll and horizontal page-flip modes with global snap-to-pages preference.</li>
                  <li><strong>Auto-Scroll:</strong> Hands-free reading with adjustable speed control for uninterrupted reading sessions.</li>
                  <li><strong>Full-Text Search:</strong> Instantly find any phrase or keyword across the entire document with highlighted results.</li>
                  <li><strong>Table of Contents:</strong> Navigate large documents using embedded outlines and anchor bookmarks.</li>
                </CardList>
              </FeatureCard>

              <FeatureCard>
                <CardIcon>🛠️</CardIcon>
                <CardTitle>12 Built-in PDF Tools</CardTitle>
                <CardList>
                  <li><strong>Merge & Split:</strong> Combine multiple PDFs or slice by page ranges and individual pages.</li>
                  <li><strong>Compress:</strong> Optimize file size with quality presets for sharing or archiving.</li>
                  <li><strong>Rotate & Reorder:</strong> Rotate individual or all pages; drag-and-drop reordering.</li>
                  <li><strong>Watermark & Page Numbers:</strong> Add text/image watermarks with custom positioning and configurable page numbering styles.</li>
                </CardList>
              </FeatureCard>

              <FeatureCard>
                <CardIcon>🔒</CardIcon>
                <CardTitle>Security &amp; Privacy</CardTitle>
                <CardList>
                  <li><strong>Lock / Unlock PDFs:</strong> Encrypt documents with passwords using iText + Bouncy Castle cryptographic providers.</li>
                  <li><strong>Remember Passwords:</strong> Encrypted DataStore securely saves passwords — auto-submitted on reopen.</li>
                  <li><strong>100% Offline:</strong> All tools run entirely on-device. No cloud upload, no network requests except optional update checks.</li>
                  <li><strong>No Telemetry:</strong> Zero trackers, zero analytics, zero ads — fully auditable.</li>
                  <li><a href="/mocoffice/privacy-policy" style={{ color: 'rgb(var(--primary))', textDecoration: 'underline', marginTop: '0.5rem', display: 'inline-block' }}>Privacy Policy &amp; Data Safety &rarr;</a></li>
                </CardList>
              </FeatureCard>

              <FeatureCard>
                <CardIcon>🎨</CardIcon>
                <CardTitle>Modern Android UX</CardTitle>
                <CardList>
                  <li><strong>Material You:</strong> Dynamic Color theming adapts to your wallpaper on Android 12+ devices.</li>
                  <li><strong>AMOLED Black Theme:</strong> True-black variant for OLED displays to maximize battery savings.</li>
                  <li><strong>Responsive Layouts:</strong> Fully optimized for phones, tablets, portrait, and landscape orientations.</li>
                  <li><strong>Focal-Point Zoom:</strong> Double-tap zooms centered on the tapped location with configurable zoom level (1.1×–5×).</li>
                </CardList>
              </FeatureCard>

              <FeatureCard>
                <CardIcon>🔄</CardIcon>
                <CardTitle>Image Conversion</CardTitle>
                <CardList>
                  <li><strong>Images → PDF:</strong> Convert one or multiple JPG/PNG images into a clean, shareable PDF document.</li>
                  <li><strong>PDF → Images:</strong> Export any PDF page as a high-quality PNG or JPG image.</li>
                  <li><strong>Page Management:</strong> Remove specific pages, or reorder entire documents non-destructively.</li>
                  <li><strong>Attachments:</strong> View and download attachments embedded inside PDF files.</li>
                </CardList>
              </FeatureCard>

              <FeatureCard>
                <CardIcon>⚡</CardIcon>
                <CardTitle>Architecture & Performance</CardTitle>
                <CardList>
                  <li><strong>Clean MVVM:</strong> Strict Clean Architecture with Koin dependency injection and lazy singleton scoping.</li>
                  <li><strong>Room + DataStore:</strong> Fast metadata queries with Room DB and encrypted preferences with DataStore.</li>
                  <li><strong>Coil Image Loading:</strong> Memory-efficient thumbnail rendering across the file browser grid.</li>
                  <li><strong>ProGuard/R8:</strong> Code obfuscation and shrinking enabled in release builds for minimal APK size.</li>
                </CardList>
              </FeatureCard>
            </FeaturesGrid>
          </Container>
        </FeaturesSection>

        {/* Tech Stack Table */}
        <TechSection>
          <Container>
            <SectionTitle>Tech Stack</SectionTitle>
            <TechGrid>
              <TechBlock>
                <BlockHeader>UI & Theming</BlockHeader>
                <TechTable>
                  <thead>
                    <tr><th>Layer</th><th>Technology</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>UI Framework</td><td>Jetpack Compose</td></tr>
                    <tr><td>Design System</td><td>Material Design 3</td></tr>
                    <tr><td>Dynamic Color</td><td>Material You (Android 12+)</td></tr>
                    <tr><td>Image Loading</td><td>Coil</td></tr>
                  </tbody>
                </TechTable>
              </TechBlock>

              <TechBlock>
                <BlockHeader>Data & Storage</BlockHeader>
                <TechTable>
                  <thead>
                    <tr><th>Layer</th><th>Technology</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Database</td><td>Room (metadata, favorites, recents)</td></tr>
                    <tr><td>Preferences</td><td>DataStore (encrypted settings)</td></tr>
                    <tr><td>DI Framework</td><td>Koin (lazy singletons)</td></tr>
                    <tr><td>Logging</td><td>Timber</td></tr>
                  </tbody>
                </TechTable>
              </TechBlock>

              <TechBlock>
                <BlockHeader>PDF Engine</BlockHeader>
                <TechTable>
                  <thead>
                    <tr><th>Layer</th><th>Technology</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Renderer</td><td>Mozilla PDF.js (WebKit WebView)</td></tr>
                    <tr><td>PDF Manipulation</td><td>iText Core + Bouncy Castle</td></tr>
                    <tr><td>Security</td><td>FileProvider, scoped storage</td></tr>
                    <tr><td>Updates</td><td>GitHub Releases in-app updater</td></tr>
                  </tbody>
                </TechTable>
              </TechBlock>
            </TechGrid>
          </Container>
        </TechSection>

        {/* Highlights */}
        <HighlightsSection>
          <Container>
            <SectionTitle>Why MOC Office</SectionTitle>
            <HighlightsGrid>
              <HighlightItem>
                <h4>📦 12 PDF Tools</h4>
                <p>Merge, split, compress, rotate, reorder, watermark, lock, unlock, convert — all in one app, no internet required.</p>
              </HighlightItem>
              <HighlightItem>
                <h4>🚫 Zero Tracking</h4>
                <p>No analytics, no crash reporters, no ads. GPL-3.0 open-source so every line is auditable by anyone.</p>
              </HighlightItem>
              <HighlightItem>
                <h4>📱 Android 7+ Support</h4>
                <p>Targets Android API 24 through 36. Runs on phones and tablets, portrait and landscape, with fully responsive layouts.</p>
              </HighlightItem>
              <HighlightItem>
                <h4>🌑 AMOLED Ready</h4>
                <p>True-black AMOLED theme, Material You dynamic colors, and night/sepia reader modes for comfortable reading in any environment.</p>
              </HighlightItem>
            </HighlightsGrid>
          </Container>
        </HighlightsSection>

        {/* Bottom CTA */}
        <BottomCTASection>
          <Container>
            <CTAInner>
              <h3>Get MOC Office Free</h3>
              <p>Open-source, offline-first, and built for people who care about their documents and their privacy.</p>
              <CTAWrapper>
                <Button href="https://github.com/rebelroot/MocOffice/releases" target="_blank" rel="noopener noreferrer">
                  Download Latest Release <span>&rarr;</span>
                </Button>
                <Button href="https://github.com/rebelroot/MocOffice" target="_blank" rel="noopener noreferrer" transparent>
                  Explore Source Code <span>&rarr;</span>
                </Button>
              </CTAWrapper>
            </CTAInner>
          </Container>
        </BottomCTASection>
        <FaqSection title="MOC Office — Frequently Asked Questions" faqs={mocofficeFaqs} />
      </MainWrapper>
    </Page>
  );
}

/* ─── Styled Components ─── */

const MainWrapper = styled.div`
  & > *:not(:first-child) {
    padding: 8rem 0;
    border-top: 1px solid rgba(var(--text), 0.05);
  }
`;

const IntroSection = styled.section`
  text-align: center;
  background: linear-gradient(180deg, rgba(var(--secondary), 0.05) 0%, rgba(var(--background), 0) 100%);
`;

const IntroContent = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 80rem;
`;

const LogoWrapper = styled.div`
  margin-bottom: 3rem;
`;

const LogoImage = styled.img`
  width: 14rem;
  height: 14rem;
  object-fit: cover;
  border-radius: 2.8rem;
  box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.5), 0 0 30px rgba(var(--primary), 0.12);
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    transform: scale(1.04);
    box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.6), 0 0 40px rgba(var(--primary), 0.2);
  }
`;

const Title = styled.h1`
  font-size: 4.8rem;
  font-weight: 800;
  line-height: 1.15;
  margin-top: 2rem;
  margin-bottom: 2.5rem;
  letter-spacing: -0.02em;

  ${media('<=tablet')} {
    font-size: 3.6rem;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  justify-content: center;
  margin-bottom: 3rem;
`;

const Badge = styled.span<{ color: string }>`
  background-color: ${(props) => props.color};
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 0.6rem 1.4rem;
  border-radius: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  letter-spacing: 0.02em;
`;

const Subtitle = styled.p`
  font-size: 2rem;
  line-height: 1.6;
  opacity: 0.8;
  font-weight: 400;
  margin-bottom: 4rem;
`;

const CTAWrapper = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

/* Lifecycle */
const LifecycleSection = styled.section``;

const FlowContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 5rem;
`;

const FlowStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 12rem;
`;

const StepNumber = styled.span`
  font-size: 3rem;
  font-weight: 900;
  color: rgb(var(--primary));
  line-height: 1;
  margin-bottom: 0.8rem;
`;

const StepName = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const StepDesc = styled.p`
  font-size: 1.3rem;
  opacity: 0.6;
  max-width: 12rem;
`;

const FlowArrow = styled.span`
  font-size: 2.5rem;
  opacity: 0.3;
  margin-top: 1rem;
  padding: 0 0.5rem;
`;

/* Features */
const FeaturesSection = styled.section``;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-top: 5rem;

  ${media('<=desktop')} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media('<=tablet')} {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: rgb(var(--secondBackground));
  border: 1px solid rgba(var(--text), 0.06);
  border-radius: 1.5rem;
  padding: 3rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.2);
  }
`;

const CardIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: rgb(var(--primary));
`;

const CardList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  li {
    font-size: 1.4rem;
    line-height: 1.6;
    opacity: 0.8;
    padding-left: 1rem;
    border-left: 2px solid rgba(var(--primary), 0.3);
  }
`;

/* Tech Stack */
const TechSection = styled.section``;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-top: 5rem;

  ${media('<=desktop')} {
    grid-template-columns: 1fr 1fr;
  }

  ${media('<=tablet')} {
    grid-template-columns: 1fr;
  }
`;

const TechBlock = styled.div`
  background: rgb(var(--secondBackground));
  border-radius: 1.2rem;
  padding: 3rem;
  border: 1px solid rgba(var(--text), 0.06);
`;

const BlockHeader = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: rgb(var(--primary));
`;

const TechTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1.4rem;

  th,
  td {
    padding: 1.2rem 0.8rem;
    text-align: left;
  }

  th {
    border-bottom: 2px solid rgba(var(--text), 0.1);
    font-weight: 700;
    opacity: 0.9;
  }

  td {
    border-bottom: 1px solid rgba(var(--text), 0.05);
    opacity: 0.8;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

/* Highlights */
const HighlightsSection = styled.section``;

const HighlightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  margin-top: 5rem;

  ${media('<=desktop')} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media('<=phone')} {
    grid-template-columns: 1fr;
  }
`;

const HighlightItem = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1.2rem;
  }

  p {
    font-size: 1.4rem;
    line-height: 1.6;
    opacity: 0.7;
  }
`;

/* Bottom CTA */
const BottomCTASection = styled.section`
  background: rgb(var(--background));
`;

const CTAInner = styled.div`
  background: linear-gradient(135deg, rgba(var(--primary), 0.1) 0%, rgba(var(--secondary), 0.1) 100%);
  border: 1px solid rgba(var(--primary), 0.2);
  border-radius: 1.5rem;
  padding: 6rem;
  text-align: center;
  max-width: 90rem;
  margin: 0 auto;
  box-shadow: var(--shadow-lg);

  h3 {
    font-size: 3.2rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;
  }

  p {
    font-size: 1.8rem;
    opacity: 0.8;
    margin-bottom: 3.5rem;
    max-width: 60rem;
    margin-left: auto;
    margin-right: auto;
  }
`;
