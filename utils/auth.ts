import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

/**
 * Verifies a stateless HMAC token signed by the login API.
 * No database lookup required.
 */
function verifyToken(token: string, secret: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3 || parts[0] !== 'rr') return false;
    const [, encoded, sig] = parts;
    const payload = Buffer.from(encoded, 'base64url').toString();
    const expectedSig = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig));
  } catch {
    return false;
  }
}

export function requireAuth(req: NextApiRequest, res: NextApiResponse): boolean {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    res.status(401).json({ error: 'Unauthorized — no token provided' });
    return false;
  }

  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    res.status(500).json({ error: 'Server auth not configured' });
    return false;
  }

  if (!verifyToken(token, secret)) {
    res.status(401).json({ error: 'Unauthorized — invalid or expired token' });
    return false;
  }

  return true;
}
