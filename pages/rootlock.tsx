import Head from 'next/head';
import styled from 'styled-components';
import Button from 'components/Button';
import Container from 'components/Container';
import OverTitle from 'components/OverTitle';
import Page from 'components/Page';
import SectionTitle from 'components/SectionTitle';
import { media } from 'utils/media';

import FaqSection from 'components/FaqSection';

const rootlockFaqs = [
  {
    question: "What is RootLock (Root Lock) by RebelRoot?",
    answer: "RootLock (also known as Root Lock or RebelRoot RootLock) is a premium, privacy-first per-app locker for Android developed by RebelRoot. Unlike standard app lockers, each app gets its own isolated credential (PIN, password, pattern, or biometric) protected by a hardened native C++ PBKDF2 security core."
  },
  {
    question: "How is RootLock different from other Android app lockers?",
    answer: "RootLock uses a native C++ JNI security bridge with offline PBKDF2 key derivation — meaning credentials are never sent to the cloud or stored in plain text. Each app has its own separate unlock credential with graduated cooldown timers for repeat failed attempts."
  },
  {
    question: "Is RootLock free and open source?",
    answer: "Yes, RootLock is completely free and open source. There are no in-app purchases, ads, or subscription fees. All security operations run offline on your Android device."
  }
];

export default function RootLockPage() {
  return (
    <Page
      title="RootLock (Root Lock) by RebelRoot | Hardware-Hardened Android App Locker"
      description="RootLock (Root Lock / Rebel Root RootLock) is a premium, privacy-first per-app locker for Android. Each app gets its own credential (PIN/biometric) protected by a native C++ PBKDF2 security core. By RebelRoot."
      keywords="RootLock, Root Lock, rootlock, root lock, ROOTLOCK, ROOT LOCK, RebelRoot RootLock, Rebel Root RootLock, app locker Android, privacy app lock, biometric app lock, C++ security, PBKDF2 Android, per-app locker, RebelRoot, Rebel Root, rebelroot"
      hideHeader={true}
    >
      <Head>
        {/* SoftwareApplication Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "RootLock",
              "alternateName": ["Root Lock", "Rebel Root RootLock", "RebelRoot Root Lock", "ROOTLOCK", "ROOT LOCK", "rootlock", "root lock"],
              "operatingSystem": "Android",
              "applicationCategory": "SecurityApplication",
              "offers": {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "USD"
              },
              "publisher": {
                "@type": "Organization",
                "name": "RebelRoot",
                "alternateName": ["Rebel Root", "rebelroot.xyz"],
                "url": "https://www.rebelroot.xyz"
              },
              "downloadUrl": "https://github.com/rebelroot",
              "description": "A premium, privacy-first per-app locker for Android. Each app gets its own separate credential (PIN, password, pattern, biometric) protected by a hardened native C++ security core."
            })
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
                { "@type": "ListItem", "position": 3, "name": "RootLock", "item": "https://www.rebelroot.xyz/rootlock" }
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
              "mainEntity": rootlockFaqs.map(faq => ({
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
              <LogoIcon>🔒</LogoIcon>
            </LogoWrapper>
            <OverTitle>NATIVE SECURITY ENCLAVE</OverTitle>
            <Title>Hardware-Hardened App Lock Engine</Title>
            
            {/* Tech Badges */}
            <BadgeContainer>
              <Badge color="#F7A41D">C++17 Core</Badge>
              <Badge color="#3DDC84">Android 16 (Baklava)</Badge>
              <Badge color="#6200EE">Kotlin Multi-Module</Badge>
              <Badge color="#00C1A2">JNI Bridge</Badge>
            </BadgeContainer>

            <Subtitle>
              RootLock protects your sensitive banking, message, and authentication applications with isolated credentials. Powered by an offline native C++ PBKDF2 cryptography engine, it verifies access credentials locally, keeping your master pins safely zeroed out of system memory.
            </Subtitle>

            <CTAWrapper>
              <Button href="https://github.com/rebelroot" target="_blank" rel="noopener noreferrer">
                View Source Code <span>&rarr;</span>
              </Button>
              <Button href="/support" transparent>
                Report Feedback <span>&rarr;</span>
              </Button>
            </CTAWrapper>
          </IntroContent>
        </IntroSection>

        {/* Dynamic Verification lifecycle */}
        <LifecycleSection>
          <Container>
            <SectionTitle>The Security Verification Cycle</SectionTitle>
            <FlowContainer>
              <FlowStep>
                <StepNumber>01</StepNumber>
                <StepName>App Launch</StepName>
                <StepDesc>Foreground service intercepts launch context</StepDesc>
              </FlowStep>
              <FlowArrow>&rarr;</FlowArrow>
              <FlowStep>
                <StepNumber>02</StepNumber>
                <StepName>Prompt Overlay</StepName>
                <StepDesc>Displays glassmorphic credentials pad</StepDesc>
              </FlowStep>
              <FlowArrow>&rarr;</FlowArrow>
              <FlowStep>
                <StepNumber>03</StepNumber>
                <StepName>JNI Bridge</StepName>
                <StepDesc>Kotlin transfers candidate keys to C++ heap</StepDesc>
              </FlowStep>
              <FlowArrow>&rarr;</FlowArrow>
              <FlowStep>
                <StepNumber>04</StepNumber>
                <StepName>PBKDF2 Compute</StepName>
                <StepDesc>Hardened cryptography verify checks hash</StepDesc>
              </FlowStep>
              <FlowArrow>&rarr;</FlowArrow>
              <FlowStep>
                <StepNumber>05</StepNumber>
                <StepName>Memory Purge</StepName>
                <StepDesc>Sensitive buffers are instantly zeroed and freed</StepDesc>
              </FlowStep>
            </FlowContainer>
          </Container>
        </LifecycleSection>

        {/* Feature Highlights Grid */}
        <FeaturesSection>
          <Container>
            <SectionTitle>Engineered Protections</SectionTitle>
            <FeaturesGrid>
              <FeatureCard>
                <CardIcon>🛡️</CardIcon>
                <CardTitle>Hardened Cryptography Core</CardTitle>
                <CardList>
                  <li><strong>Native Verifier:</strong> Full PBKDF2-HMAC-SHA512 verification lives inside isolated C++17 JNI.</li>
                  <li><strong>Memory Hygiene:</strong> Secrets copy directly into `mlock`-ed buffers, zeroed on free to prevent heap dumps.</li>
                  <li><strong>Independent Salts:</strong> Unique 16-byte random salts per locked app to stop side-channel attacks.</li>
                  <li><strong>Self-Diagnostics:</strong> Performs automated engine self-tests on every device boot.</li>
                </CardList>
              </FeatureCard>

              <FeatureCard>
                <CardIcon>⏱️</CardIcon>
                <CardTitle>Graduated Lockout Policy</CardTitle>
                <CardList>
                  <li><strong>Anti-Brute Force:</strong> Access is frozen for 30 seconds after 3 failed password attempts.</li>
                  <li><strong>Graduated Scale:</strong> Cooldown expands to 60 seconds at 5 failures, and 5 minutes at 10.</li>
                  <li><strong>System Intruder Capture:</strong> Declares failure callbacks for third-party camera snapping modules.</li>
                  <li><strong>Decoy Pins:</strong> Input decoy passwords to unlock dummy mock app layouts.</li>
                </CardList>
              </FeatureCard>

              <FeatureCard>
                <CardIcon>🎨</CardIcon>
                <CardTitle>Material 3 &amp; Glassmorphism</CardTitle>
                <CardList>
                  <li><strong>Dynamic Styling:</strong> System-wide compatibility with Android Material You dynamic palettes.</li>
                  <li><strong>Immersive Overlay:</strong> Luxurious frosted glass overlay hides application backdrops in real-time.</li>
                  <li><strong>7 Built-in Themes:</strong> Switch between Light, Dark, Sepia, Emerald, Indigo, and OLED black.</li>
                  <li><strong>Spring Motion:</strong> Interactive feedback utilizes highly polished, native spring-physics animations.</li>
                </CardList>
              </FeatureCard>

              <FeatureCard>
                <CardIcon>📊</CardIcon>
                <CardTitle>Privately Logged Statistics</CardTitle>
                <CardList>
                  <li><strong>Local Database:</strong> Verification audits are compiled strictly inside offline room sandboxes.</li>
                  <li><strong>Interactive Charts:</strong> Visualizes daily summaries, failed locks, and app opened ratios.</li>
                  <li><strong>Score Engine:</strong> Generates a cumulative privacy health score of your device app locks.</li>
                  <li><strong>No Network Sync:</strong> Lock records are never transmitted outside your physical hardware.</li>
                </CardList>
              </FeatureCard>
            </FeaturesGrid>
          </Container>
        </FeaturesSection>

        {/* Technical Stack Section */}
        <TechStackSection>
          <Container>
            <SectionTitle>Technical Specifications</SectionTitle>
            <TechGrids>
              <TechGridBlock>
                <BlockHeader>Android Environment</BlockHeader>
                <TechTable>
                  <thead>
                    <tr>
                      <th>Component</th>
                      <th>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Target platform</td>
                      <td>Android Platform 36 (Baklava / 16)</td>
                    </tr>
                    <tr>
                      <td>Minimum SDK</td>
                      <td>API 26 (Android 8.0)</td>
                    </tr>
                    <tr>
                      <td>Presentation</td>
                      <td>Jetpack Compose &amp; Material 3</td>
                    </tr>
                    <tr>
                      <td>Memory management</td>
                      <td>16 KB Page-aligned loader layout</td>
                    </tr>
                  </tbody>
                </TechTable>
              </TechGridBlock>

              <TechGridBlock>
                <BlockHeader>Security Specs</BlockHeader>
                <TechTable>
                  <thead>
                    <tr>
                      <th>Specification</th>
                      <th>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Native Core</td>
                      <td>C++17 compiler via Android NDK &amp; CMake</td>
                      
                    </tr>
                    <tr>
                      <td>Primitives</td>
                      <td>PBKDF2-HMAC-SHA512 (100,000 iterations)</td>
                    </tr>
                    <tr>
                      <td>Salt allocation</td>
                      <td>16-Byte cryptographically secure random bytes</td>
                    </tr>
                    <tr>
                      <td>Database</td>
                      <td>Room local SQLite with hardware master keys</td>
                    </tr>
                  </tbody>
                </TechTable>
              </TechGridBlock>
            </TechGrids>
          </Container>
        </TechStackSection>
        <FaqSection title="RootLock — Frequently Asked Questions" faqs={rootlockFaqs} />
      </MainWrapper>
    </Page>
  );
}

const MainWrapper = styled.div`
  background: rgb(var(--background));
  color: rgb(var(--text));
`;

const IntroSection = styled.section`
  padding: 8rem 0;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const IntroContent = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoWrapper = styled.div`
  width: 9.6rem;
  height: 9.6rem;
  background: rgba(var(--primary), 0.1);
  border: 1px solid rgba(var(--primary), 0.2);
  border-radius: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
  font-size: 4.8rem;
  box-shadow: var(--shadow-md);
`;

const LogoIcon = styled.span`
  line-height: 1;
`;

const Title = styled.h1`
  font-size: 4.8rem;
  font-weight: 800;
  line-height: 1.2;
  margin: 1.5rem 0 2rem;
  letter-spacing: -0.03em;
  color: rgb(var(--text));

  ${media('<=tablet')} {
    font-size: 3.6rem;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
`;

const Badge = styled.span<{ color: string }>`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ color }) => color};
  background: ${({ color }) => `${color}12`};
  border: 1px solid ${({ color }) => `${color}33`};
  padding: 0.6rem 1.6rem;
  border-radius: 3rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Subtitle = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.75);
  margin-bottom: 4rem;

  ${media('<=tablet')} {
    font-size: 1.6rem;
  }
`;

const CTAWrapper = styled.div`
  display: flex;
  gap: 2rem;
  
  ${media('<=phone')} {
    flex-direction: column;
    width: 100%;
    
    & > * {
      width: 100%;
    }
  }
`;

const LifecycleSection = styled.section`
  background: rgb(var(--secondBackground));
  padding: 10rem 0;
  border-top: 1px solid rgba(var(--text), 0.05);
  border-bottom: 1px solid rgba(var(--text), 0.05);
`;

const FlowContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 5rem;
  gap: 2rem;
  overflow-x: auto;
  padding-bottom: 2rem;

  ${media('<=tablet')} {
    flex-direction: column;
    align-items: center;
    gap: 4rem;
  }
`;

const FlowStep = styled.div`
  flex: 1;
  text-align: center;
  min-width: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepNumber = styled.div`
  font-size: 2.8rem;
  font-weight: 800;
  color: rgb(var(--primary));
  background: rgba(var(--primary), 0.08);
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  box-shadow: 0 4px 10px rgba(var(--primary), 0.1);
`;

const StepName = styled.h4`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const StepDesc = styled.p`
  font-size: 1.4rem;
  line-height: 1.4;
  color: rgba(var(--text), 0.65);
`;

const FlowArrow = styled.div`
  font-size: 2.4rem;
  color: rgba(var(--text), 0.2);
  align-self: center;
  margin-top: -4rem;

  ${media('<=tablet')} {
    transform: rotate(90deg);
    margin: 0;
  }
`;

const FeaturesSection = styled.section`
  padding: 10rem 0;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin-top: 6rem;

  ${media('<=tablet')} {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: rgb(var(--secondBackground));
  border: 1px solid rgba(var(--text), 0.05);
  border-radius: 2.4rem;
  padding: 4rem;
  box-shadow: var(--shadow-md);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-0.5rem);
    box-shadow: var(--shadow-lg);
    border-color: rgba(var(--primary), 0.15);
  }
`;

const CardIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 2.5rem;
`;

const CardTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 2rem;
`;

const CardList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  li {
    font-size: 1.5rem;
    line-height: 1.5;
    color: rgba(var(--text), 0.8);
    position: relative;
    padding-left: 2rem;

    &::before {
      content: "•";
      color: rgb(var(--primary));
      font-weight: bold;
      position: absolute;
      left: 0;
    }
  }
`;

const TechStackSection = styled.section`
  background: rgb(var(--secondBackground));
  padding: 10rem 0;
  border-top: 1px solid rgba(var(--text), 0.05);
`;

const TechGrids = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  margin-top: 6rem;

  ${media('<=tablet')} {
    grid-template-columns: 1fr;
  }
`;

const TechGridBlock = styled.div`
  background: rgb(var(--background));
  border: 1px solid rgba(var(--text), 0.04);
  border-radius: 2rem;
  padding: 3rem;
  box-shadow: var(--shadow-md);
`;

const BlockHeader = styled.h3`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 2.5rem;
  padding-bottom: 1.2rem;
  border-bottom: 2px solid rgba(var(--primary), 0.15);
`;

const TechTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th, td {
    padding: 1.2rem 1.6rem;
    font-size: 1.5rem;
  }

  th {
    font-weight: 700;
    color: rgba(var(--text), 0.6);
    border-bottom: 1px solid rgba(var(--text), 0.08);
  }

  td {
    color: rgb(var(--text));
    border-bottom: 1px solid rgba(var(--text), 0.04);

    &:first-child {
      font-weight: 600;
      color: rgba(var(--text), 0.8);
      width: 40%;
    }
  }

  tr:last-child td {
    border-bottom: none;
  }
`;
