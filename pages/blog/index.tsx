import { InferGetStaticPropsType } from 'next';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import ArticleCard from 'components/ArticleCard';
import Button from 'components/Button';
import Container from 'components/Container';
import Page from 'components/Page';
import { media } from 'utils/media';
import { getAllPosts } from 'utils/postsFetcher';
import { getReadTime } from 'utils/readTime';

export default function BlogIndexPage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selectedTag, setSelectedTag] = useState('all');

  // Extract all unique tags across all posts (comma separated in metadata)
  const tagsList = ['all', ...Array.from(new Set(
    posts.flatMap(p => (p.meta.tags || '').split(',').map(t => t.trim().toLowerCase()))
  ))];

  // Filter posts based on selected tag
  const filteredPosts = posts.filter(post => {
    if (selectedTag === 'all') return true;
    const postTags = (post.meta.tags || '').split(',').map(t => t.trim().toLowerCase());
    return postTags.includes(selectedTag);
  });

  // Featured post: The latest post matching the filter (or just the absolute latest post if "all" is selected)
  const featuredPost = selectedTag === 'all' ? posts[0] : null;
  
  // Grid posts: if showing featured post, skip the first index
  const gridPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;

  const featuredReadTime = featuredPost ? getReadTime(featuredPost.content) : '';
  const featuredFormattedDate = featuredPost
    ? new Date(featuredPost.meta.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <Page
      title="RebelRoot Developer Blog"
      description="Engineering updates, architectural deep dives, and news from the RebelRoot open-source developer collective."
    >
      <BlogContainer>
        {/* Header Title */}
        <HeaderSection>
          <BlogTitle>Developer Blog</BlogTitle>
          <BlogSubtitle>
            Technical articles, project launches, and engineering logs from our core working groups.
          </BlogSubtitle>
        </HeaderSection>

        {/* Categories/Tags Filter Row */}
        <FilterContainer>
          {tagsList.map(tag => (
            <FilterChip
              key={tag}
              active={selectedTag === tag}
              onClick={() => setSelectedTag(tag)}
            >
              {tag.replace('-', ' ')}
            </FilterChip>
          ))}
        </FilterContainer>

        {/* Featured Post (Only displayed on "All" tag to present a clean layout) */}
        {featuredPost && (
          <FeaturedWrapper>
            <FeaturedCard>
              <FeaturedImageContainer>
                <NextImage
                  src={featuredPost.meta.imageUrl}
                  layout="fill"
                  objectFit="cover"
                  alt={featuredPost.meta.title}
                  priority
                />
              </FeaturedImageContainer>
              <FeaturedContent>
                <FeaturedMeta>
                  <FeaturedTag>FEATURED • {featuredPost.meta.tags.split(',')[0].toUpperCase()}</FeaturedTag>
                  <FeaturedDot />
                  <span>{featuredFormattedDate}</span>
                  <FeaturedDot />
                  <span>{featuredReadTime}</span>
                </FeaturedMeta>
                <FeaturedTitle>{featuredPost.meta.title}</FeaturedTitle>
                <FeaturedDescription>{featuredPost.meta.description}</FeaturedDescription>
                <NextLink href={'/blog/' + featuredPost.slug} passHref>
                  <Button style={{ alignSelf: 'flex-start', marginTop: '2rem' }}>
                    Read Article <span>&rarr;</span>
                  </Button>
                </NextLink>
              </FeaturedContent>
            </FeaturedCard>
          </FeaturedWrapper>
        )}

        {/* Blog Grid */}
        <GridTitle>{selectedTag === 'all' ? 'Latest Stories' : `Articles filed under "${selectedTag.replace('-', ' ')}"`}</GridTitle>
        {gridPosts.length > 0 ? (
          <CustomAutofitGrid>
            {gridPosts.map(post => (
              <ArticleCard
                key={post.slug}
                title={post.meta.title}
                description={post.meta.description}
                imageUrl={post.meta.imageUrl}
                slug={post.slug}
                date={post.meta.date}
                tags={post.meta.tags}
              />
            ))}
          </CustomAutofitGrid>
        ) : (
          <NoPostsMessage>No articles found for this category.</NoPostsMessage>
        )}
      </BlogContainer>
    </Page>
  );
}

const BlogContainer = styled(Container)`
  padding-top: 6rem;
  padding-bottom: 12rem;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 6rem;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
`;

const BlogTitle = styled.h1`
  font-size: 4.8rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;

  ${media('<=tablet')} {
    font-size: 3.8rem;
  }
`;

const BlogSubtitle = styled.p`
  font-size: 2rem;
  opacity: 0.7;
  line-height: 1.5;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  justify-content: center;
  margin-bottom: 6rem;
  border-bottom: 1px solid rgba(var(--text), 0.08);
  padding-bottom: 3rem;
`;

const FilterChip = styled.button<{ active: boolean }>`
  font-size: 1.4rem;
  font-weight: 600;
  padding: 0.8rem 1.8rem;
  border-radius: 2.5rem;
  cursor: pointer;
  border: 1px solid ${(props) => (props.active ? 'rgb(var(--primary))' : 'rgba(var(--text), 0.1)')};
  background: ${(props) => (props.active ? 'rgb(var(--primary))' : 'transparent')};
  color: ${(props) => (props.active ? '#ffffff' : 'rgb(var(--text))')};
  transition: all 0.3s ease;
  text-transform: capitalize;

  &:hover {
    border-color: rgb(var(--primary));
    background: ${(props) => (props.active ? 'rgb(var(--primary))' : 'rgba(var(--primary), 0.05)')};
  }
`;

/* Featured Card Layout */
const FeaturedWrapper = styled.div`
  margin-bottom: 8rem;
`;

const FeaturedCard = styled.div`
  display: flex;
  background: rgb(var(--cardBackground));
  border-radius: 1.6rem;
  overflow: hidden;
  border: 1px solid rgba(var(--text), 0.06);
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);

  ${media('<=tablet')} {
    flex-direction: column;
  }
`;

const FeaturedImageContainer = styled.div`
  position: relative;
  flex: 1.2;
  min-height: 38rem;

  ${media('<=tablet')} {
    min-height: 25rem;
    width: 100%;
  }
`;

const FeaturedContent = styled.div`
  flex: 1;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${media('<=tablet')} {
    padding: 3rem;
  }
`;

const FeaturedMeta = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  opacity: 0.8;
  margin-bottom: 2rem;
`;

const FeaturedTag = styled.span`
  font-weight: 700;
  color: rgb(var(--primary));
  letter-spacing: 0.05em;
`;

const FeaturedDot = styled.span`
  width: 0.4rem;
  height: 0.4rem;
  background: rgb(var(--text));
  border-radius: 50%;
  margin: 0 1rem;
  opacity: 0.4;
`;

const FeaturedTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;

  ${media('<=tablet')} {
    font-size: 2.6rem;
  }
`;

const FeaturedDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  opacity: 0.7;
`;

/* Article Grid Section */
const GridTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 4rem;
  border-left: 4px solid rgb(var(--primary));
  padding-left: 1.5rem;
  line-height: 1;
`;

const CustomAutofitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(32rem, 1fr));
  gap: 4rem 3rem;

  .article-card-wrapper {
    max-width: 100%;
    height: 48rem;
  }
`;

const NoPostsMessage = styled.div`
  text-align: center;
  font-size: 1.8rem;
  opacity: 0.6;
  padding: 6rem 0;
`;

export async function getStaticProps() {
  const posts = await getAllPosts();
  
  // Sort posts by date descending
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  );

  return {
    props: {
      posts: sortedPosts,
    },
  };
}
