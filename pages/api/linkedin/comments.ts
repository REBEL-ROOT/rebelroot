import type { NextApiRequest, NextApiResponse } from 'next';
import { generateAICommentReply, replyToLinkedInComment } from 'utils/linkedinComments';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, commentText, organizationId, accessToken, postId, commentId, replyText } = req.body;

  // Action 1: AI Understand & Generate Reply
  if (action === 'generate') {
    if (!commentText) {
      return res.status(400).json({ error: 'Comment text is required for AI analysis.' });
    }
    const suggestedReply = generateAICommentReply(commentText);
    return res.status(200).json({ success: true, suggestedReply });
  }

  // Action 2: Submit Reply to LinkedIn API
  if (action === 'reply') {
    const finalOrgId = organizationId || process.env.LINKEDIN_ORGANIZATION_ID;
    const finalAccessToken = accessToken || process.env.LINKEDIN_ACCESS_TOKEN;

    const result = await replyToLinkedInComment({
      organizationId: finalOrgId,
      accessToken: finalAccessToken,
      postId,
      commentId,
      replyText,
    });

    if (result.success) {
      return res.status(200).json({ success: true, message: 'Comment reply posted successfully!' });
    } else {
      return res.status(500).json(result);
    }
  }

  return res.status(400).json({ error: 'Invalid action specified' });
}
