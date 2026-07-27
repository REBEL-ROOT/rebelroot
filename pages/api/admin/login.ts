import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

/**
 * Stateless HMAC-based authentication.
 * No database required — token is signed with ADMIN_PASSWORD as the secret.
 * The auth middleware verifies it the same way.
 */
function signToken(username: string, secret: string): string {
  const payload = `${username}:${Date.now()}`;
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  const encoded = Buffer.from(payload).toString('base64url');
  return `rr.${encoded}.${sig}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const expectedUser = (process.env.ADMIN_USERNAME || 'rebelroot').toLowerCase();
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedPass) {
    return res.status(500).json({ error: 'Server auth not configured. Set ADMIN_PASSWORD in .env.local' });
  }

  const cleanUser = username.trim().toLowerCase();
  const cleanPass = password.trim();

  if (cleanUser !== expectedUser || cleanPass !== expectedPass) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  // Sign a stateless token — no DB write needed
  const token = signToken(cleanUser, expectedPass);

  return res.status(200).json({
    success: true,
    token,
    user: { username: cleanUser, role: 'superadmin' },
  });
}
