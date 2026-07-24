import styled from 'styled-components';
import AutofitGrid from 'components/AutofitGrid';
import BasicCard from 'components/BasicCard';
import Page from 'components/Page';
import SectionTitle from 'components/SectionTitle';
import { media } from 'utils/media';

const FEATURES = [
  {
    imageUrl: '/grid-icons/asset-1.svg',
    title: 'Omni Browser',
    description:
      'A lightweight, secure, and resource-efficient web browser for Android and Desktop. Built for privacy, content blocking, and speed.',
    href: '/omnibrowser',
  },
  {
    imageUrl: '/grid-icons/asset-2.svg',
    title: 'MOCNovel — Beta Under Development',
    description:
      'A decentralized publishing and immersive reading platform for independent authors and readers. Zero ads, tracking, or fees. Currently in beta at MocNovel.com.',
    href: '/mocnovel',
  },
  {
    imageUrl: '/grid-icons/asset-3.svg',
    title: 'CampCart',
    description:
      'A secure, edge-deployed peer-to-peer campus exchange marketplace for students to trade textbooks, electronics, and dorm gear safely.',
    href: '/campcart',
  },
  {
    imageUrl: '/grid-icons/asset-5.svg',
    title: 'Openved',
    description:
      'A premium, open-source Vedic astrology app built with Jetpack Compose, FastAPI, and Gemini AI for precise Kundli, Panchang, and compatibility matching. Available at Openved.com.',
    href: '/vedastra',
  },
  {
    imageUrl: '/grid-icons/asset-6.svg',
    title: 'MOC Office — In Development (Release: 18 August)',
    description:
      'A modern, privacy-first PDF reader and editing suite for Android. 12 built-in tools including merge, split, compress, lock/unlock — 100% offline, zero trackers.',
    href: '/mocoffice',
  },
  {
    imageUrl: '/grid-icons/asset-4.svg',
    title: 'RootLock',
    description:
      'A premium, privacy-first per-app locker for Android. Secure individual apps with separate credentials backed by a hardened C++17 native security engine.',
    href: '/rootlock',
  },
  {
    imageUrl: '/grid-icons/asset-7.svg',
    title: 'More Projects Incoming',
    description:
      'We are constantly prototyping new utility toolkits for secure messaging, local sync engines, and developer utilities.',
  },
];

export default function FeaturesPage() {
  return (
    <Page title="Products" description="Explore RebelRoot's open-source product suite of privacy-preserving digital tools, including Omni Browser, MOCNovel, CampCart, Openved, and RootLock.">
      <Wrapper>
        <SectionTitle>Our Product Suite</SectionTitle>
        <CustomAutofitGrid>
          {FEATURES.map((singleFeature, idx) => (
            <BasicCard key={singleFeature.title} {...singleFeature} />
          ))}
        </CustomAutofitGrid>
      </Wrapper>
    </Page>
  );
}

const Wrapper = styled.div`
  & > *:not(:first-child) {
    margin-top: 10rem;
  }
`;

const CustomAutofitGrid = styled(AutofitGrid)`
  --autofit-grid-item-size: 40rem;

  ${media('<=tablet')} {
    --autofit-grid-item-size: 30rem;
  }

  ${media('<=phone')} {
    --autofit-grid-item-size: 100%;
  }
`;
