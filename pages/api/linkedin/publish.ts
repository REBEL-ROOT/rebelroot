import type { NextApiRequest, NextApiResponse } from 'next';
import { publishToLinkedInCompany } from 'utils/linkedinPublisher';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { organizationId, accessToken, commentary, articleUrl, articleTitle, articleDescription } = req.body;

  if (!commentary || !commentary.trim()) {
    return res.status(400).json({ error: 'Post commentary text is required.' });
  }

  // Use environment variables as fallback if not explicitly passed in payload
  const finalOrgId = organizationId || process.env.LINKEDIN_ORGANIZATION_ID;
  const finalAccessToken = accessToken || process.env.LINKEDIN_ACCESS_TOKEN;

  if (!finalOrgId || !finalAccessToken) {
    return res.status(400).json({
      error: 'Missing Organization ID or LinkedIn Access Token. Please enter them in the config settings or set LINKEDIN_ORGANIZATION_ID and LINKEDIN_ACCESS_TOKEN in environment variables.',
    });
  }

  const result = await publishToLinkedInCompany({
    organizationId: finalOrgId,
    accessToken: finalAccessToken,
    commentary,
    articleUrl,
    articleTitle,
    articleDescription,
  });

  if (result.success) {
    return res.status(200).json(result);
  } else {
    return res.status(500).json(result);
  }
}
