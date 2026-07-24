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

import FaqSection from 'components/FaqSection';

const homepageFaqs = [
  {
    question: "What is RebelRoot (Rebel Root)?",
    answer: "RebelRoot (also known as Rebel Root) is an independent, developer-led open-source collective dedicated to building privacy-first, zero-surveillance digital software tools and applications including Omni Browser, MOCNovel, CampCart, Openved, MOC Office, and RootLock."
  },
  {
    question: "What software products are developed by RebelRoot?",
    answer: "RebelRoot develops Omni Browser (OmniBrowser - privacy mobile web browser for Android), MOCNovel (MOC Novel - ad-free decentralized reading & publishing), CampCart (Camp Cart - student campus exchange marketplace), Openved (Ved Astra - Vedic astrology AI), MOC Office (100% offline Android PDF editor), and RootLock (Root Lock - hardware-hardened C++ app locker)."
  },
  {
    question: "Are RebelRoot software applications free and open source?",
    answer: "Yes, all RebelRoot applications, software tools, and platforms are 100% free, privacy-preserving, and open-source under permissive licenses."
  },
  {
    question: "How does RebelRoot guarantee user privacy?",
    answer: "RebelRoot software is engineered with a strict local-first, zero-telemetry architecture. Your personal data is stored and processed locally on your physical hardware, shielded from external tracking and surveillance."
  }
];

export default function Homepage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>RebelRoot (Rebel Root) | Open-Source &amp; Privacy-First Digital Tools</title>
        <meta
          name="description"
          content="RebelRoot (Rebel Root) is an independent open-source collective designing secure, privacy-first digital tools: Omni Browser (OmniBrowser), MOCNovel, CampCart, Openved, MOC Office & RootLock."
        />
        <meta name="keywords" content="RebelRoot, Rebel Root, rebelroot, rebel root, rebelroot.xyz, REBELROOT, REBEL ROOT, RebelRoot collective, open source collective, Omni Browser, OmniBrowser, omni browser, omnibrowser, MOCNovel, MOC Novel, mocnovel, moc novel, CampCart, Camp Cart, campcart, camp cart, Openved, Ved Astra, VedAstra, openved, vedastra, MOC Office, MOCOffice, moc office, RootLock, Root Lock, rootlock, root lock, privacy Android apps, open source software" />
        <link rel="canonical" href="https://www.rebelroot.xyz" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="RebelRoot (Rebel Root) | Open-Source &amp; Privacy-First Digital Tools" />
        <meta property="og:description" content="RebelRoot (Rebel Root) is an independent open-source collective designing secure, privacy-first digital tools: Omni Browser (OmniBrowser), MOCNovel, CampCart, Openved, MOC Office & RootLock." />
        <meta property="og:url" content="https://www.rebelroot.xyz" />
        <meta property="og:site_name" content="RebelRoot (Rebel Root)" />
        <meta property="og:image" content="https://www.rebelroot.xyz/ic_omni_logo.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RebelRoot (Rebel Root) | Open-Source &amp; Privacy-First Digital Tools" />
        <meta name="twitter:description" content="RebelRoot (Rebel Root) is an independent open-source collective designing secure, privacy-first digital tools: Omni Browser (OmniBrowser), MOCNovel, CampCart, Openved, MOC Office & RootLock." />
        <meta name="twitter:image" content="https://www.rebelroot.xyz/ic_omni_logo.webp" />

        {/* Search Engine Directives */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

        {/* Organization Schema — expanded for Google Knowledge Panel eligibility */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.rebelroot.xyz/#organization",
              "name": "RebelRoot",
              "alternateName": ["Rebel Root", "RebelRoot Collective", "Rebel-Root", "REBELROOT", "rebelroot.xyz", "Rebel Root Collective"],
              "url": "https://www.rebelroot.xyz",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.rebelroot.xyz/ic_omni_logo.webp",
                "width": 512,
                "height": 512
              },
              "description": "An independent, developer-led collective designing secure, open-source, and privacy-first digital tools like Omni Browser, MOCNovel, CampCart, Openved, MOC Office, and RootLock.",
              "foundingDate": "2023",
              "numberOfEmployees": { "@type": "QuantitativeValue", "value": 5 },
              "sameAs": [
                "https://github.com/REBEL-ROOT",
                "https://github.com/rebelroot",
                "https://github.com/ParasxAgarwal",
                "https://www.linkedin.com/company/rebelroot/",
                "https://twitter.com/rebelrootxyz"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "url": "https://www.rebelroot.xyz/support",
                "email": "support@rebelroot.xyz"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "RebelRoot Open-Source Products",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "SoftwareApplication", "name": "Omni Browser", "url": "https://www.rebelroot.xyz/omnibrowser" } },
                  { "@type": "Offer", "itemOffered": { "@type": "SoftwareApplication", "name": "MOCNovel", "url": "https://www.rebelroot.xyz/mocnovel" } },
                  { "@type": "Offer", "itemOffered": { "@type": "SoftwareApplication", "name": "CampCart", "url": "https://www.rebelroot.xyz/campcart" } },
                  { "@type": "Offer", "itemOffered": { "@type": "SoftwareApplication", "name": "Openved", "url": "https://www.rebelroot.xyz/vedastra" } },
                  { "@type": "Offer", "itemOffered": { "@type": "SoftwareApplication", "name": "MOC Office", "url": "https://www.rebelroot.xyz/mocoffice" } },
                  { "@type": "Offer", "itemOffered": { "@type": "SoftwareApplication", "name": "RootLock", "url": "https://www.rebelroot.xyz/rootlock" } }
                ]
              },
              "knowsAbout": [
                "Omni Browser", "OmniBrowser", "MOCNovel", "MOC Novel",
                "CampCart", "Camp Cart", "Openved", "VedAstra", "Ved Astra",
                "MOC Office", "MOCOffice", "RootLock", "Root Lock",
                "Mobile Web Browsers", "Android Security", "Privacy Software",
                "Open Source Software", "Privacy-First Applications"
              ]
            })
          }}
        />

        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://www.rebelroot.xyz/#website",
              "name": "RebelRoot",
              "alternateName": ["Rebel Root", "rebelroot.xyz", "REBELROOT", "Rebel Root Collective"],
              "url": "https://www.rebelroot.xyz",
              "publisher": { "@id": "https://www.rebelroot.xyz/#organization" },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.rebelroot.xyz/blog?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
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
              "mainEntity": homepageFaqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
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
          <BasicSection imageUrl="/demo-illustration-2.svg" title="MOCNovel: Read and Write Without Restrictive Borders" overTitle="DECENTRALIZED PUBLISHING & READING — BETA" reversed>
            <p>
              MOCNovel brings independent authors and readers together in a modern, ad-free publishing ecosystem. Take full control of your digital library, customize your reader layout, and sync your reading state across all of your devices.
            </p>
            <ul>
              <li>Zero advertisements, popups, or tracking algorithms</li>
              <li>Robust offline reading with decentralized library synchronization</li>
              <li>Markdown-friendly publishing workspace for independent writers</li>
            </ul>
            <div style={{ display: 'inline-block', background: 'rgba(255,165,0,0.12)', border: '1px solid rgba(255,165,0,0.45)', borderRadius: '2rem', padding: '0.4rem 1.4rem', marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.3rem', fontWeight: 700, color: '#FFA500' }}>
              🚧 Beta Under Development — MocNovel.com
            </div>
            <NextLink href="/mocnovel" passHref>
              <Button style={{ marginTop: '1.5rem' }}>
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
          <BasicSection imageUrl="/vedastra-screenshot.png" title="Openved: Vedic Wisdom Powered by Modern Edge AI" overTitle="COSMIC AI NAVIGATOR" reversed>
            <p>
              Openved combines the mathematical precision of astrological computations with the reasoning power of Google Gemini. Get personalized Kundli insights, 36-point compatibility checks, and transit readings on a secure, local-first interface.
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
              <Button href="https://openved.com" target="_blank" rel="noopener noreferrer" transparent>
                Visit Openved.com <span>&rarr;</span>
              </Button>
            </ButtonGroup>
          </BasicSection>
          <BasicSection imageUrl="/grid-icons/asset-6.svg" title="MOC Office: The Private, Powerful Android PDF Suite" overTitle="OFFLINE PDF READER &amp; EDITOR">
            <p>
              MOC Office is a feature-rich, 100% offline PDF reader and editing suite for Android. Powered by Mozilla&apos;s PDF.js, it delivers 12 professional-grade document tools — merge, split, compress, lock, convert — with zero tracking and zero cloud dependency.
            </p>
            <ul>
              <li>12 built-in PDF tools — all processed locally on-device</li>
              <li>AMOLED black theme and Material You dynamic color support</li>
              <li>Full-text search, bookmarks, auto-scroll, and table of contents</li>
            </ul>
            <div style={{ display: 'inline-block', background: 'rgba(255,100,100,0.1)', border: '1px solid rgba(255,100,100,0.4)', borderRadius: '2rem', padding: '0.4rem 1.4rem', marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.3rem', fontWeight: 700, color: '#FF6464' }}>
              🛠️ In Development — Release: 18 August
            </div>
            <NextLink href="/mocoffice" passHref>
              <Button style={{ marginTop: '1.5rem' }}>
                Explore MOC Office <span>&rarr;</span>
              </Button>
            </NextLink>
          </BasicSection>
          <BasicSection imageUrl="/grid-icons/asset-4.svg" title="RootLock: Hardware-Hardened Per-App Privacy Locker" overTitle="NATIVE SECURITY ENCLAVE" reversed>
            <p>
              RootLock protects your personal and financial applications with separate, isolated credentials. Powered by an offline native C++ PBKDF2 cryptography core, it secures app launches against intrusions without exposing master secrets to memory or cloud storage.
            </p>
            <ul>
              <li>Hardened native C++ security core with JNI bindings</li>
              <li>Graduated cooldown timers that scale up during repeat failed attempts</li>
              <li>Modern glassmorphic locking screens featuring smooth spring animations</li>
            </ul>
            <NextLink href="/rootlock" passHref>
              <Button style={{ marginTop: '2.5rem' }}>
                Explore RootLock <span>&rarr;</span>
              </Button>
            </NextLink>
          </BasicSection>
          <FaqSection title="RebelRoot (Rebel Root) Overview & FAQ" faqs={homepageFaqs} />
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
