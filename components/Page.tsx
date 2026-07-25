import Head from 'next/head';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { EnvVars } from 'env';
import { media } from 'utils/media';
import Container from './Container';
import SectionTitle from './SectionTitle';

export interface PageProps {
  title: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  hideHeader?: boolean;
}

export default function Page({ title, description, keywords, ogImage, hideHeader = false, children }: PropsWithChildren<PageProps>) {
  const router = useRouter();
  const canonicalUrl = `${EnvVars.URL.replace(/\/$/, '')}${router.asPath.split('?')[0]}`;
  const siteName = EnvVars.SITE_NAME;
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const imageSrc = ogImage ? (ogImage.startsWith('http') ? ogImage : `${EnvVars.URL.replace(/\/$/, '')}${ogImage}`) : `${EnvVars.URL.replace(/\/$/, '')}/rebelroot-logo.png`;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={fullTitle} />
        {description && <meta property="og:description" content={description} />}
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="RebelRoot (Rebel Root)" />
        <meta property="og:image" content={imageSrc} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        {description && <meta name="twitter:description" content={description} />}
        <meta name="twitter:image" content={imageSrc} />
        
        {/* Search Engine Directives */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      </Head>
      <Wrapper>
        {!hideHeader && (
          <HeaderContainer>
            <Container>
              <Title>{title}</Title>
              {description && <Description>{description}</Description>}
            </Container>
          </HeaderContainer>
        )}
        {hideHeader ? (
          children
        ) : (
          <Container>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </Container>
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  background: rgb(var(--background));
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(var(--secondary));
  min-height: 40rem;
`;

const Title = styled(SectionTitle)`
  color: rgb(var(--textSecondary));
  margin-bottom: 2rem;
`;

const Description = styled.div`
  font-size: 1.8rem;
  color: rgba(var(--textSecondary), 0.8);
  text-align: center;
  max-width: 60%;
  margin: auto;

  ${media('<=tablet')} {
    max-width: 100%;
  }
`;

const ChildrenWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 10rem;
`;
