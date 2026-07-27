export interface LinkedInComment {
  id: string;
  authorName: string;
  authorUrn: string;
  text: string;
  createdAt: string;
}

export interface CommentReplyRequest {
  organizationId: string;
  accessToken: string;
  postId: string;
  commentId: string;
  replyText: string;
}

/**
 * AI-generates an official contextual reply to a LinkedIn post comment.
 */
export function generateAICommentReply(commentText: string, productContext?: string): string {
  const text = commentText.toLowerCase();

  if (text.includes('open source') || text.includes('github') || text.includes('gpl')) {
    return 'Hi there! Yes, all RebelRoot applications (including Omni Browser) are 100% free and open-source under the GPLv3 license with zero tracking. You can check out our full repository on GitHub: https://github.com/REBEL-ROOT/omni-browser ✊';
  }

  if (text.includes('ios') || text.includes('iphone') || text.includes('apple')) {
    return 'Thanks for reaching out! Omni Browser is currently optimized for Android devices to leverage native GeckoView engine performance. iOS support is on our technical roadmap! Stay tuned for updates. 🚀';
  }

  if (text.includes('download') || text.includes('apk') || text.includes('install')) {
    return 'Hello! You can download the latest official APK release directly from our release page: https://github.com/REBEL-ROOT/omni-browser/releases/latest or visit our portal at https://www.rebelroot.xyz/omnibrowser 🌐';
  }

  if (text.includes('privacy') || text.includes('track') || text.includes('ad') || text.includes('data')) {
    return 'Great question! RebelRoot operates on a strict digital sovereignty model: zero remote telemetry, built-in uBlock Origin adblock, hardware AES-256 encrypted vaults, and on-device processing. Everything stays on your phone! 🛡️';
  }

  if (text.includes('great') || text.includes('awesome') || text.includes('love') || text.includes('good') || text.includes('nice')) {
    return 'Thank you so much for the support! Software built for rebels, by rebels. Let us know if you have any feature requests or feedback! ✊✨';
  }

  // Default contextual reply
  return `Thank you for your comment! At RebelRoot, we build privacy-first, auditable open-source applications. Feel free to check out our documentation and features at https://www.rebelroot.xyz 🌐`;
}

/**
 * Submits an official reply to a LinkedIn post comment via REST API.
 */
export async function replyToLinkedInComment(params: CommentReplyRequest): Promise<{ success: boolean; error?: string }> {
  const { organizationId, accessToken, postId, commentId, replyText } = params;

  if (!accessToken || !organizationId || !replyText) {
    return { success: false, error: 'Missing required credentials or reply text.' };
  }

  const cleanOrgId = organizationId.trim().replace(/^urn:li:organization:/, '');
  const authorUrn = `urn:li:organization:${cleanOrgId}`;

  const payload = {
    author: authorUrn,
    commentary: replyText,
    object: commentId.startsWith('urn:li:') ? commentId : `urn:li:comment:(${postId},${commentId})`,
  };

  try {
    const response = await fetch(`https://api.linkedin.com/rest/socialActions/${encodeURIComponent(postId)}/comments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'LinkedIn-Version': '202401',
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 201) {
      return { success: true };
    }

    const errText = await response.text();
    return { success: false, error: `LinkedIn API Error (${response.status}): ${errText}` };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to submit comment reply.' };
  }
}
