import Head from 'next/head';
import styled from 'styled-components';
import Button from 'components/Button';
import Container from 'components/Container';
import OverTitle from 'components/OverTitle';
import Page from 'components/Page';
import SectionTitle from 'components/SectionTitle';
import { media } from 'utils/media';

export default function OmniBrowserPage() {
  return (
    <Page
      title="Omni Browser | RebelRoot"
      description="A premium, privacy-first mobile web browser for Android built with Jetpack Compose & GeckoView engine."
    >
      <Head>
        <meta name="keywords" content="Omni Browser, RebelRoot, privacy browser, Android browser, GeckoView browser, uBlock Origin mobile, local ML translation, private vault app, secure mobile browser" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Omni Browser",
              "operatingSystem": "Android",
              "applicationCategory": "BrowserApplication",
              "offers": {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "USD"
              },
              "publisher": {
                "@type": "Organization",
                "name": "RebelRoot",
                "url": "https://rebelroot.xyz"
              },
              "downloadUrl": "https://github.com/rebelroot/omni-browser",
              "description": "A premium, privacy-first mobile web browser for Android built with Jetpack Compose & GeckoView engine. Features built-in uBlock Origin, offline ML translation, safe locker vault, and document scanner."
            })
          }}
        />
      </Head>
      <MainWrapper>
        {/* Hero Section */}
        <IntroSection>
          <IntroContent>
            <BrowserLogoWrapper>
              <BrowserLogo src="/ic_omni_logo.webp" alt="Omni Browser Logo" />
            </BrowserLogoWrapper>
            <OverTitle>Secure Android Navigator</OverTitle>
            <Title>Desktop-Grade Performance in Your Pocket</Title>
            
            {/* Tech Badges */}
            <BadgeContainer>
              <Badge color="#4F73E6">Kotlin 1.9</Badge>
              <Badge color="#4CAF50">Compose Material 3</Badge>
              <Badge color="#FF9800">GeckoView v145</Badge>
              <Badge color="#9C27B0">GPLv3 License</Badge>
            </BadgeContainer>

            <Subtitle>
              Omni Browser is a state-of-the-art mobile browser developed by the RebelRoot collective. Powered by Mozilla&apos;s GeckoView engine, it provides built-in ad blocking, native Firefox extensions, offline ML translation, and hardware-secured sandbox vault mechanics.
            </Subtitle>

            <CTAWrapper>
              <Button href="https://github.com/REBEL-ROOT/omni-browser/releases/latest" target="_blank" rel="noopener noreferrer">
                Download APK Release <span>&rarr;</span>
              </Button>
              <Button href="https://github.com/rebelroot/omni-browser" target="_blank" rel="noopener noreferrer" transparent>
                View Source on GitHub <span>&rarr;</span>
              </Button>
            </CTAWrapper>

            <HeroFrameWrapper>
              <PhoneFrame>
                <PhoneBezel />
                <PhoneNotch />
                <ScreenshotImage src="/omni/home.png" alt="Omni Browser Home Screen" />
              </PhoneFrame>
            </HeroFrameWrapper>
          </IntroContent>
        </IntroSection>

        {/* Core Product Showcases */}
        <ShowcaseSection>
          <Container>
            <SectionTitle>Product Showcases</SectionTitle>
            <ShowcaseDescription>
              Explore the advanced offline tools, privacy containers, and visual customizers packed inside Omni.
            </ShowcaseDescription>

            <ShowcaseGrid>
              {/* Feature 1: Notepad & Vault */}
              <ShowcaseBlock>
                <ShowcaseImageSide>
                  <PhoneFrame>
                    <PhoneBezel />
                    <PhoneNotch />
                    <ScreenshotImage src="/omni/notepad_vault.png" alt="Notepad and Vault Feature" />
                  </PhoneFrame>
                </ShowcaseImageSide>
                <ShowcaseTextSide>
                  <ShowcaseTag>Privacy Vault</ShowcaseTag>
                  <ShowcaseTitle>Notepad &amp; Vault (Safe Locker)</ShowcaseTitle>
                  <ShowcaseParagraph>
                    Omni features a secure, local-first database and file sandbox isolated from standard Android storage directories. 
                  </ShowcaseParagraph>
                  <ShowcaseList>
                    <li>🔒 **Hardware Encrypted:** Secured with AES-256 GCM (`EncryptedFile`) backed by Android KeyStore.</li>
                    <li>🔑 **Biometric Integration:** Open your vault and notes securely with fingerprint authentication or lock pattern.</li>
                    <li>📝 **Structured Storage:** Organize sensitive notes, passwords, API keys, or dynamic codes in distinct filterable chips.</li>
                  </ShowcaseList>
                </ShowcaseTextSide>
              </ShowcaseBlock>

              {/* Feature 2: GeckoView Extensions Engine */}
              <ShowcaseBlock reverse>
                <ShowcaseImageSide>
                  <PhoneFrame>
                    <PhoneBezel />
                    <PhoneNotch />
                    <ScreenshotImage src="/omni/extensions_menu.png" alt="Extensions Manager Screen" />
                  </PhoneFrame>
                </ShowcaseImageSide>
                <ShowcaseTextSide>
                  <ShowcaseTag>Extensibility</ShowcaseTag>
                  <ShowcaseTitle>GeckoView WebExtensions Engine</ShowcaseTitle>
                  <ShowcaseParagraph>
                    Unlike standard WebViews that block add-ons, Omni features full integration with Mozilla&apos;s WebExtension controller to run desktop-grade plugins.
                  </ShowcaseParagraph>
                  <ShowcaseList>
                    <li>🔌 **Install .xpi Add-ons:** Install extensions directly from addons.mozilla.org (AMO) or local files.</li>
                    <li>🛡️ **Pre-bundled Shields:** Comes with uBlock Origin pre-configured to block ads, trackers, and miners instantly.</li>
                    <li>👾 **User Script Injectors:** Leverage Violentmonkey integration to load custom userscripts and CSS overlays.</li>
                  </ShowcaseList>
                </ShowcaseTextSide>
              </ShowcaseBlock>

              {/* Feature 3: Custom Site Style Engine */}
              <ShowcaseBlock>
                <ShowcaseImageSide>
                  <PhoneFrame>
                    <PhoneBezel />
                    <PhoneNotch />
                    <ScreenshotImage src="/omni/customize_style.png" alt="Customize Site Style Dashboard" />
                  </PhoneFrame>
                </ShowcaseImageSide>
                <ShowcaseTextSide>
                  <ShowcaseTag>User Experience</ShowcaseTag>
                  <ShowcaseTitle>Customize Site Style Engine</ShowcaseTitle>
                  <ShowcaseParagraph>
                    Tailor any website to your reading comfort with Omni&apos;s advanced real-time custom stylesheet injection utility.
                  </ShowcaseParagraph>
                  <ShowcaseList>
                    <li>🎨 **Theme Presets:** One-tap switching between Original, Dark, Sepia, Forest, and high-contrast OLED black themes.</li>
                    <li>📏 **Spacing Adjustments:** Fine-tune line-height, letter-spacing, and font sizes dynamically.</li>
                    <li>👓 **Accessibility Filters:** Enable Grayscale, Night Light (amber eye protection), or hide web images to save mobile data.</li>
                  </ShowcaseList>
                </ShowcaseTextSide>
              </ShowcaseBlock>

              {/* Feature 4: ExoPlayer Native Video */}
              <ShowcaseBlock reverse>
                <ShowcaseImageSide>
                  <PhoneFrame>
                    <PhoneBezel />
                    <PhoneNotch />
                    <ScreenshotImage src="/omni/native_player.png" alt="Native Media Player Screen" />
                  </PhoneFrame>
                </ShowcaseImageSide>
                <ShowcaseTextSide>
                  <ShowcaseTag>Media Engine</ShowcaseTag>
                  <ShowcaseTitle>Advanced Video Player (PiP)</ShowcaseTitle>
                  <ShowcaseParagraph>
                    Omni overrides default web video elements with an embedded hardware ExoPlayer container, capturing background audio and multi-tasking layouts.
                  </ShowcaseParagraph>
                  <ShowcaseList>
                    <li>📺 **Picture-in-Picture:** Swipe out of the app to overlay floating windows on your Android home screen.</li>
                    <li>🎛️ **Gesture Controls:** Control brightness (left margin) and volume (right margin) with vertical swipe gestures.</li>
                    <li>📥 **Stream Sniffer:** Automatically intercepts HLS (m3u8), DASH (mpd), and MSE segments for native play or download.</li>
                  </ShowcaseList>
                </ShowcaseTextSide>
              </ShowcaseBlock>
            </ShowcaseGrid>
          </Container>
        </ShowcaseSection>

        {/* Feature Highlights Grid */}
        <FeaturesSection>
          <Container>
            <SectionTitle>Engineered Utilities</SectionTitle>
            <FeaturesGrid>
              <FeatureCard>
                <CardIconWrapper>🧠</CardIconWrapper>
                <CardTitle>On-Device ML Translator</CardTitle>
                <CardDescription>
                  Translate entire web pages offline. Omni bundles <strong>Google ML Kit</strong> local translation packages to translate across 14 languages without hitting cloud servers.
                </CardDescription>
              </FeatureCard>

              <FeatureCard>
                <CardIconWrapper>📄</CardIconWrapper>
                <CardTitle>Doc Scanner (ML Edge)</CardTitle>
                <CardDescription>
                  Zero-permission document scanner powered by Google Play Services ML. Automatically detects document edges, crop-aligns, and sharpens text completely offline.
                </CardDescription>
              </FeatureCard>

              <FeatureCard>
                <CardIconWrapper>📋</CardIconWrapper>
                <CardTitle>Universal Text Copy</CardTitle>
                <CardDescription>
                  Bypasses annoying website copy blockages (such as <code>user-select: none</code> style overrides or context-menu locks) to force text selection.
                </CardDescription>
              </FeatureCard>

              <FeatureCard>
                <CardIconWrapper>🖨️</CardIconWrapper>
                <CardTitle>Clean PDF Printer</CardTitle>
                <CardDescription>
                  Generates clean PDF prints of web articles, automatically stripping floating header banners, cookies pop-ups, and advertisements.
                </CardDescription>
              </FeatureCard>

              <FeatureCard>
                <CardIconWrapper>📌</CardIconWrapper>
                <CardTitle>Instant Web App Pinning</CardTitle>
                <CardDescription>
                  Pin websites directly to your Android home launcher screen as dedicated, isolated PWA-style sandbox containers.
                </CardDescription>
              </FeatureCard>

              <FeatureCard>
                <CardIconWrapper>🔍</CardIconWrapper>
                <CardTitle>QR Scanner &amp; Generator</CardTitle>
                <CardDescription>
                  Scan QR codes and barcodes using the built-in scanner, or convert URLs and text blocks into shareable QR codes instantly.
                </CardDescription>
              </FeatureCard>
            </FeaturesGrid>
          </Container>
        </FeaturesSection>

        {/* Unidirectional Architecture Flow */}
        <ArchitectureSection>
          <Container>
            <SectionTitle>Unidirectional Data Architecture</SectionTitle>
            <ArchFlow>
              <ArchNode>
                <h5>Jetpack Compose UI</h5>
                <p>Observe state, dispatch user interactions</p>
              </ArchNode>
              <ArchConnector>&rarr;</ArchConnector>
              <ArchNode>
                <h5>BrowserViewModel</h5>
                <p>UDF State repository & command controller</p>
              </ArchNode>
              <ArchConnector>&rarr;</ArchConnector>
              <ArchNode>
                <h5>GeckoSession</h5>
                <p>Direct hook into GeckoView rendering engine</p>
              </ArchNode>
              <ArchConnector>&rarr;</ArchConnector>
              <ArchNode>
                <h5>MediaInterceptor</h5>
                <p>ExoPlayer hardware stream interceptor</p>
              </ArchNode>
            </ArchFlow>
          </Container>
        </ArchitectureSection>

        {/* Browser Comparison Table */}
        <ComparisonSection>
          <Container>
            <SectionTitle>Browser Comparison Table</SectionTitle>
            <TableWrapper>
              <ComparisonTable>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Omni Browser (RebelRoot)</th>
                    <th>Google Chrome</th>
                    <th>Brave</th>
                    <th>Firefox Android</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Engine</strong></td>
                    <td>GeckoView v145 (Firefox)</td>
                    <td>Blink (Chromium)</td>
                    <td>Blink (Chromium)</td>
                    <td>GeckoView (Firefox)</td>
                  </tr>
                  <tr>
                    <td><strong>Open Source</strong></td>
                    <td>Yes</td>
                    <td>No (Proprietary)</td>
                    <td>Yes</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td><strong>Adblocking</strong></td>
                    <td>Yes (uBlock Origin built-in)</td>
                    <td>No</td>
                    <td>Yes (Brave Shields)</td>
                    <td>Yes (Add-ons only)</td>
                  </tr>
                  <tr>
                    <td><strong>Unlimited Add-ons</strong></td>
                    <td>Yes (Firefox store .xpi)</td>
                    <td>No</td>
                    <td>No</td>
                    <td>Yes (Curated list)</td>
                  </tr>
                  <tr>
                    <td><strong>Extension Options UI</strong></td>
                    <td>Yes (Direct settings tabs)</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>Limited</td>
                  </tr>
                  <tr>
                    <td><strong>Aggressive Stream Sniffer</strong></td>
                    <td>Yes (Auto-captures HLS/DASH)</td>
                    <td>No</td>
                    <td>No</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td><strong>Native Video Player</strong></td>
                    <td>Yes (ExoPlayer with download)</td>
                    <td>No (Basic WebView)</td>
                    <td>No (Basic WebView)</td>
                    <td>No (Basic WebView)</td>
                  </tr>
                  <tr>
                    <td><strong>Offline Translator</strong></td>
                    <td>Yes (On-device ML Kit)</td>
                    <td>Yes (Cloud/On-device)</td>
                    <td>No</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td><strong>Document Scanner</strong></td>
                    <td>Yes (ML Kit Document API)</td>
                    <td>No</td>
                    <td>No</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td><strong>Private Locker</strong></td>
                    <td>Yes (Biometric & Pin encrypted)</td>
                    <td>No</td>
                    <td>No</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td><strong>One-Tap Session Burn</strong></td>
                    <td>Yes (Instant memory wipe)</td>
                    <td>No</td>
                    <td>No</td>
                    <td>Yes (Firefox Focus only)</td>
                  </tr>
                  <tr>
                    <td><strong>Universal Text Copy</strong></td>
                    <td>Yes (Bypasses restriction)</td>
                    <td>No</td>
                    <td>No</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td><strong>Interactive Page Editor</strong></td>
                    <td>Yes (In-place tap-to-edit)</td>
                    <td>No</td>
                    <td>No</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td><strong>Instant Web App Pinning</strong></td>
                    <td>Yes (Launcher shortcuts)</td>
                    <td>Yes (Standard PWA)</td>
                    <td>Yes (Standard PWA)</td>
                    <td>Limited</td>
                  </tr>
                </tbody>
              </ComparisonTable>
            </TableWrapper>
          </Container>
        </ComparisonSection>

        {/* Roadmap Section */}
        <RoadmapSectionWrapper>
          <Container>
            <SectionTitle>Development Roadmap</SectionTitle>
            <RoadmapGrid>
              <RoadmapColumn>
                <h4>✅ Completed (v1.0 – v1.2.2)</h4>
                <RoadmapList>
                  <li>**GeckoView Engine:** Core multi-tab browsing & private modes.</li>
                  <li>**WebExtension Integration:** Pre-packaged uBlock, Universal Copy, Media Grabber, and AI Blocker.</li>
                  <li>**Notepad &amp; Vault:** Biometric AES-256 secure offline credentials keeper.</li>
                  <li>**Omni Player:** Background audio ExoPlayer with swipe gesture volume/brightness.</li>
                  <li>**ML Translator:** Offline Google ML translation packs.</li>
                  <li>**QR Suite:** Camera barcode scanning, generator, and in-page scanner.</li>
                  <li>**UX Enhancements:** Android 15 Edge-to-Edge UI & custom site style presets.</li>
                </RoadmapList>
              </RoadmapColumn>
              <RoadmapColumn>
                <h4>🔜 Planned (v1.3+)</h4>
                <RoadmapList>
                  <li>**Collapsible Tab Groups:** Group and collapse open tabs by custom folders.</li>
                  <li>**Distraction-Free Reader Mode:** Dedicated page styling overrides for clean text reading.</li>
                  <li>**Password Manager:** Local biometric credentials vault integration.</li>
                  <li>**dApp Support:** Web3 client integration for MetaMask-compatible services.</li>
                  <li>**Local CSS Injection:** Custom user stylesheet rules per domain.</li>
                  <li>**Encrypted Sync:** Encrypted cloud backup for bookmarks and history.</li>
                </RoadmapList>
              </RoadmapColumn>
            </RoadmapGrid>
          </Container>
        </RoadmapSectionWrapper>

        {/* Bottom Call To Action */}
        <BottomCTASection>
          <Container>
            <CTAInner>
              <h3>Contribute to Omni Browser</h3>
              <p>Omni Browser is free, ad-free, and open source under the GPLv3 license. We welcome code contributions, localization packages, and layout bug reports.</p>
              <ButtonGroup>
                <Button href="https://github.com/REBEL-ROOT/omni-browser/releases/latest" target="_blank" rel="noopener noreferrer">
                  Download APK <span>&rarr;</span>
                </Button>
                <Button href="https://github.com/rebelroot/omni-browser" target="_blank" rel="noopener noreferrer" transparent>
                  GitHub Repository <span>&rarr;</span>
                </Button>
                <Button href="/omnibrowser/privacy-policy" transparent>
                  Privacy Policy <span>&rarr;</span>
                </Button>
              </ButtonGroup>
            </CTAInner>
          </Container>
        </BottomCTASection>
      </MainWrapper>
    </Page>
  );
}

/* ─── Styled Components ─── */

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: rgb(var(--text));
  font-size: 1.6rem;

  & > section {
    padding: 8rem 0;

    ${media('<=tablet')} {
      padding: 5rem 0;
    }
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

const HeroFrameWrapper = styled.div`
  margin-top: 6rem;
  perspective: 1000px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

/* Device Frame Mockup */
const PhoneFrame = styled.div`
  position: relative;
  width: 100%;
  max-width: 29rem;
  aspect-ratio: 9 / 19.5;
  border-radius: 3.6rem;
  background: #09090b;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(var(--primary), 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transform: rotateX(5deg) rotateY(-5deg);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease;

  &:hover {
    transform: rotateX(0deg) rotateY(0deg) scale(1.03);
    box-shadow: 0 35px 80px -10px rgba(0, 0, 0, 0.9), 0 0 50px rgba(var(--primary), 0.25);
  }
`;

const PhoneBezel = styled.div`
  position: absolute;
  inset: 0.6rem;
  border: 8px solid #18181b;
  border-radius: 3rem;
  pointer-events: none;
  z-index: 5;
`;

const PhoneNotch = styled.div`
  position: absolute;
  top: 1.6rem;
  left: 50%;
  transform: translateX(-50%);
  width: 1.8rem;
  height: 1.8rem;
  background: #18181b;
  border-radius: 50%;
  z-index: 10;
  border: 2px solid #09090b;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.6rem;
    height: 0.6rem;
    background: #042f56;
    border-radius: 50%;
  }
`;

const ScreenshotImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const BrowserLogoWrapper = styled.div`
  width: 12rem;
  height: 12rem;
  background: rgb(var(--secondBackground));
  border-radius: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(var(--text), 0.05);
  margin-bottom: 3rem;
`;

const BrowserLogo = styled.img`
  width: 8rem;
  height: 8rem;
  object-fit: contain;
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
`;

/* Alternate Feature Showcase styling */
const ShowcaseSection = styled.section`
  background: rgb(var(--secondBackground));
  border-top: 1px solid rgba(var(--text), 0.05);
  border-bottom: 1px solid rgba(var(--text), 0.05);
`;

const ShowcaseDescription = styled.p`
  text-align: center;
  font-size: 1.8rem;
  max-width: 65rem;
  margin: 1.5rem auto 6rem auto;
  opacity: 0.75;
`;

const ShowcaseGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12rem;
  margin-top: 6rem;

  ${media('<=tablet')} {
    gap: 8rem;
  }
`;

const ShowcaseBlock = styled.div<{ reverse?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8rem;
  flex-direction: ${(props) => (props.reverse ? 'row-reverse' : 'row')};

  ${media('<=desktop')} {
    gap: 4rem;
  }

  ${media('<=tablet')} {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
  }
`;

const ShowcaseImageSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  perspective: 1000px;
`;

const ShowcaseTextSide = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ShowcaseTag = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: rgb(var(--primary));
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const ShowcaseTitle = styled.h3`
  font-size: 3.2rem;
  font-weight: 800;
  letter-spacing: -0.02em;

  ${media('<=tablet')} {
    font-size: 2.6rem;
  }
`;

const ShowcaseParagraph = styled.p`
  font-size: 1.7rem;
  line-height: 1.6;
  opacity: 0.8;
`;

const ShowcaseList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;

  li {
    font-size: 1.5rem;
    line-height: 1.5;
    position: relative;
    padding-left: 2.5rem;

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: rgb(var(--primary));
      font-weight: bold;
    }
  }
`;

/* Architecture diagram styling */
const ArchitectureSection = styled.section`
  border-bottom: 1px solid rgba(var(--text), 0.05);
`;

const ArchFlow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 5rem;
  gap: 2rem;

  ${media('<=desktop')} {
    flex-direction: column;
    justify-content: center;
  }
`;

const ArchNode = styled.div`
  background: rgb(var(--secondBackground));
  padding: 2.5rem;
  border-radius: 0.8rem;
  border: 1px solid rgba(var(--text), 0.08);
  flex: 1;
  min-width: 18rem;
  max-width: 24rem;
  box-shadow: var(--shadow-md);
  text-align: center;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: rgb(var(--primary));
  }

  h5 {
    font-size: 1.7rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: rgb(var(--primary));
  }

  p {
    font-size: 1.3rem;
    opacity: 0.7;
    line-height: 1.4;
  }
`;

const ArchConnector = styled.div`
  font-size: 2.4rem;
  color: rgb(var(--primary));
  font-weight: bold;

  ${media('<=desktop')} {
    transform: rotate(90deg);
    margin: 0.5rem 0;
  }
`;

/* Feature list grid */
const FeaturesSection = styled.section`
  background: rgb(var(--background));
`;

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
  border: 1px solid rgba(var(--text), 0.05);
  border-radius: 1.5rem;
  padding: 3rem;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(var(--primary), 0.4);
    box-shadow: 0 15px 30px -10px rgba(var(--primary), 0.15);
  }
`;

const CardIconWrapper = styled.div`
  font-size: 3.5rem;
  margin-bottom: 2rem;
  width: 6rem;
  height: 6rem;
  background: linear-gradient(135deg, rgba(var(--primary), 0.1) 0%, rgba(var(--secondary), 0.1) 100%);
  border-radius: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(var(--primary), 0.15);
`;

const CardTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: rgb(var(--text));
`;

const CardDescription = styled.p`
  font-size: 1.45rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.75);

  strong {
    color: rgb(var(--text));
  }
`;

const ComparisonSection = styled.section`
  background: rgb(var(--secondBackground));
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  margin-top: 5rem;
  border: 1px solid rgba(var(--text), 0.08);
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
`;

const ComparisonTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 1.5rem;
  background: rgb(var(--secondBackground));

  th, td {
    padding: 1.8rem 2rem;
    border-bottom: 1px solid rgba(var(--text), 0.08);
    white-space: nowrap;
  }

  th {
    background: rgba(var(--secondary), 0.1);
    font-weight: 700;
    color: rgb(var(--text));
  }

  tr:last-child td {
    border-bottom: none;
  }

  /* Sticky first column */
  th:first-child, td:first-child {
    position: sticky;
    left: 0;
    background: rgb(var(--secondBackground));
    z-index: 1;
    border-right: 1px solid rgba(var(--text), 0.08);
    box-shadow: 2px 0 5px -2px rgba(0, 0, 0, 0.1);
  }

  th:first-child {
    background: rgb(var(--secondBackground));
    background-image: linear-gradient(rgba(var(--secondary), 0.1), rgba(var(--secondary), 0.1));
    z-index: 2;
  }

  /* Highlight Omni Browser column */
  td:nth-child(2), th:nth-child(2) {
    background: rgba(var(--primary), 0.05);
    font-weight: 500;
  }
  
  td:nth-child(2) {
    color: rgb(var(--text));
  }
`;

/* Roadmap Styles */
const RoadmapSectionWrapper = styled.section`
  background: rgb(var(--background));
  border-top: 1px solid rgba(var(--text), 0.05);
`;

const RoadmapGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 5rem;

  ${media('<=tablet')} {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const RoadmapColumn = styled.div`
  background: rgb(var(--secondBackground));
  border: 1px solid rgba(var(--text), 0.06);
  border-radius: 1.6rem;
  padding: 4rem;
  box-shadow: var(--shadow-sm);

  h4 {
    font-size: 2.2rem;
    font-weight: 800;
    margin-bottom: 2.5rem;
    color: rgb(var(--text));
    border-bottom: 2px solid rgba(var(--text), 0.05);
    padding-bottom: 1.5rem;
  }
`;

const RoadmapList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  li {
    font-size: 1.5rem;
    line-height: 1.6;
    position: relative;
    padding-left: 2.5rem;

    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: rgb(var(--primary));
      font-size: 2.4rem;
      line-height: 1;
      top: -0.2rem;
    }
  }
`;

const BottomCTASection = styled.section`
  background: rgb(var(--secondBackground));
  border-top: 1px solid rgba(var(--text), 0.05);
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;

  ${media('<=tablet')} {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

const CTAWrapper = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 4rem;

  ${media('<=tablet')} {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;
