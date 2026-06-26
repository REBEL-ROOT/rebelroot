import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import styled from 'styled-components';
import BasicSection from 'components/BasicSection';
import Button from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';
import { EnvVars } from 'env';
import { getAllPosts } from 'utils/postsFetcher';
import Cta from 'views/HomePage/Cta';
import Features from 'views/HomePage/Features';
import FeaturesGallery from 'views/HomePage/FeaturesGallery';
import Hero from 'views/HomePage/Hero';
import Partners from 'views/HomePage/Partners';
import ScrollableBlogPosts from 'views/HomePage/ScrollableBlogPosts';
import Testimonials from 'views/HomePage/Testimonials';

export default function Homepage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{EnvVars.SITE_NAME} | Open-Source &amp; Privacy-First Digital Tools</title>
        <meta
          name="description"
          content="RebelRoot is an independent, developer-led collective designing secure, open-source, and privacy-first digital tools like Omni Browser, MOCNovel, CampCart, and Ved Astra."
        />
        <meta name="keywords" content="RebelRoot, open source collective, Omni Browser, MOCNovel, CampCart, Ved Astra, privacy mobile browser, secure reading app, student marketplace, edge computing, decentralized apps, Gemini AI" />
        <link rel="canonical" href="https://rebelroot.xyz" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="RebelRoot | Open-Source &amp; Privacy-First Digital Tools" />
        <meta property="og:description" content="RebelRoot is an independent, developer-led collective designing secure, open-source, and privacy-first digital tools like Omni Browser, MOCNovel, CampCart, and Ved Astra." />
        <meta property="og:url" content="https://rebelroot.xyz" />
        <meta property="og:site_name" content="RebelRoot" />
        <meta property="og:image" content="https://rebelroot.xyz/ic_omni_logo.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RebelRoot | Open-Source &amp; Privacy-First Digital Tools" />
        <meta name="twitter:description" content="RebelRoot is an independent, developer-led collective designing secure, open-source, and privacy-first digital tools like Omni Browser, MOCNovel, CampCart, and Ved Astra." />
        <meta name="twitter:image" content="https://rebelroot.xyz/ic_omni_logo.webp" />

        {/* Search Engine Directives */}
        <meta name="robots" content="index, follow" />

        {/* Structured Schema Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "RebelRoot",
              "url": "https://rebelroot.xyz",
              "logo": "https://rebelroot.xyz/ic_omni_logo.webp",
              "description": "An independent, developer-led collective designing secure, open-source, and privacy-first digital tools like Omni Browser, MOCNovel, CampCart, and Ved Astra.",
              "sameAs": [
                "https://github.com/rebelroot"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "RebelRoot",
              "url": "https://rebelroot.xyz",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://rebelroot.xyz/blog?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </Head>
      <HomepageWrapper>
        <WhiteBackgroundContainer>
          <Hero />
          <Partners />
          <BasicSection imageUrl="/demo-illustration-1.svg" title="Omni Browser: Clean, Secure, and Built for Privacy" overTitle="HIGH-PERFORMANCE WEB BROWSER">
            <p>
              Omni Browser is our flagship open-source browser built for speed, safety, and ultimate user control. Designed with a highly optimized codebase, it protects your personal data by default, blocks intrusive trackers, and keeps your system resource usage to an absolute minimum.
            </p>
            <ul>
              <li>Built-in extensions manager supporting desktop add-ons</li>
              <li>100% offline, on-device translation in 14 languages</li>
              <li>Secure private vault with hardware-backed AES-256 encryption</li>
            </ul>
            <NextLink href="/omnibrowser" passHref>
              <Button style={{ marginTop: '2.5rem' }}>
                Explore Omni Browser <span>&rarr;</span>
              </Button>
            </NextLink>
          </BasicSection>
          <BasicSection imageUrl="/demo-illustration-2.svg" title="MOCNovel: Read and Write Without Restrictive Borders" overTitle="DECENTRALIZED PUBLISHING & READING" reversed>
            <p>
              MOCNovel brings independent authors and readers together in a modern, ad-free publishing ecosystem. Take full control of your digital library, customize your reader layout, and sync your reading state across all of your devices.
            </p>
            <ul>
              <li>Zero advertisements, popups, or tracking algorithms</li>
              <li>Robust offline reading with decentralized library synchronization</li>
              <li>Markdown-friendly publishing workspace for independent writers</li>
            </ul>
            <NextLink href="/mocnovel" passHref>
              <Button style={{ marginTop: '2.5rem' }}>
                Explore MOCNovel <span>&rarr;</span>
              </Button>
            </NextLink>
          </BasicSection>
          <BasicSection imageUrl="/demo-illustration-3.png" title="CampCart: Trade Textbooks and Dorm Essentials Safely" overTitle="PEER-TO-PEER CAMPUS MARKETPLACE">
            <p>
              CampCart is a decentralized peer-to-peer campus exchange marketplace built specifically for college students. Trade textbooks, electronics, and dorm gear safely inside a verified student-only network.
            </p>
            <ul>
              <li>Restricted to verified (.edu) college email domains</li>
              <li>Secure escrow payments integrated via Stripe and Juspay SDK</li>
              <li>Interactive campus safety maps with designated meeting zones</li>
            </ul>
            <ButtonGroup style={{ marginTop: '2.5rem' }}>
              <NextLink href="/campcart" passHref>
                <Button>
                  Explore Details <span>&rarr;</span>
                </Button>
              </NextLink>
              <Button href="https://campcart.online" target="_blank" rel="noopener noreferrer" transparent>
                Launch Platform <span>&rarr;</span>
              </Button>
            </ButtonGroup>
          </BasicSection>
          <BasicSection imageUrl="/demo-illustration-4.png" title="Ved Astra: Vedic Wisdom Powered by Modern Edge AI" overTitle="COSMIC AI NAVIGATOR" reversed>
            <p>
              Ved Astra combines the mathematical precision of astrological computations with the reasoning power of Google Gemini. Get personalized Kundli insights, 36-point compatibility checks, and transit readings on a secure, local-first interface.
            </p>
            <ul>
              <li>High-accuracy planetary coordinates using the VedAstro engine</li>
              <li>Interactive custom canvas for drawing Kundli charts</li>
              <li>On-device AI astrology chat via RAG-augmented Gemini models</li>
            </ul>
            <ButtonGroup style={{ marginTop: '2.5rem' }}>
              <NextLink href="/vedastra" passHref>
                <Button>
                  Explore Details <span>&rarr;</span>
                </Button>
              </NextLink>
              <Button href="https://vedastra.pages.dev/" target="_blank" rel="noopener noreferrer" transparent>
                Launch App <span>&rarr;</span>
              </Button>
            </ButtonGroup>
          </BasicSection>
        </WhiteBackgroundContainer>
        <DarkerBackgroundContainer>
          <Cta />
          <FeaturesGallery />
          <Features />
          <Testimonials />
          <ScrollableBlogPosts posts={posts} />
        </DarkerBackgroundContainer>
      </HomepageWrapper>
    </>
  );
}

const HomepageWrapper = styled.div`
  & > :last-child {
    margin-bottom: 15rem;
  }
`;

const DarkerBackgroundContainer = styled.div`
  background: rgb(var(--background));

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;

const WhiteBackgroundContainer = styled.div`
  background: rgb(var(--secondBackground));

  & > :last-child {
    padding-bottom: 15rem;
  }

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllPosts(),
    },
  };
}
