export interface LinkedInPostPayload {
  organizationId: string;
  accessToken: string;
  commentary: string;
  articleUrl?: string;
  articleTitle?: string;
  articleDescription?: string;
  imageUrl?: string;
}

export interface LinkedInPublishResult {
  success: boolean;
  postId?: string;
  postUrl?: string;
  error?: string;
}

/**
 * Publishes a post to a LinkedIn Organization (Company Profile) or Member Profile via official REST API.
 */
export async function publishToLinkedInCompany(payload: LinkedInPostPayload): Promise<LinkedInPublishResult> {
  const { organizationId, accessToken, commentary, articleUrl, articleTitle, articleDescription } = payload;

  if (!accessToken || !organizationId) {
    return {
      success: false,
      error: 'Missing LinkedIn Access Token or Organization ID.',
    };
  }

  const rawId = organizationId.trim();
  let authorUrn = rawId;

  if (!rawId.startsWith('urn:li:')) {
    // Default to organization URN if numeric ID
    authorUrn = `urn:li:organization:${rawId}`;
  }

  // Build REST API Post Payload
  const postData: Record<string, any> = {
    author: authorUrn,
    commentary,
    visibility: 'PUBLIC',
    distribution: {
      feedDistribution: 'MAIN_FEED',
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
    lifecycleState: 'PUBLISHED',
  };

  if (articleUrl) {
    postData.content = {
      article: {
        source: articleUrl,
        title: articleTitle || 'RebelRoot Application',
        description: articleDescription || 'Software Built for Rebels. By Rebels.',
      },
    };
  }

  try {
    const response = await fetch('https://api.linkedin.com/rest/posts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'LinkedIn-Version': '202401',
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify(postData),
    });

    if (response.ok || response.status === 201) {
      const postId = response.headers.get('x-restli-id') || response.headers.get('x-linkedin-id') || 'published';
      return {
        success: true,
        postId,
        postUrl: `https://www.linkedin.com/feed/update/${postId}`,
      };
    }

    const errorText = await response.text();
    return {
      success: false,
      error: `LinkedIn API Error (${response.status}): ${errorText}`,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Network error connecting to LinkedIn API.',
    };
  }
}
