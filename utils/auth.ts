import type { NextApiRequest, NextApiResponse } from 'next';
import { getTursoClient } from './tursoClient';

/**
 * Validates the Authorization Bearer token against Turso DB `admin_sessions` table.
 * Returns true if the token is valid and unexpired, false otherwise.
 * If false, it automatically sends a 401 response.
 */
export async function requireAuth(req: NextApiRequest, res: NextApiResponse): Promise<boolean> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing or invalid token format' });
    return false;
  }

  const token = authHeader.replace('Bearer ', '').trim();
  const client = getTursoClient();

  if (!client) {
    res.status(500).json({ error: 'Database connection error during authentication' });
    return false;
  }

  try {
    const result = await client.execute({
      sql: 'SELECT * FROM admin_sessions WHERE token = ? AND expires_at > ? LIMIT 1',
      args: [token, Date.now()],
    });

    if (result.rows && result.rows.length > 0) {
      return true; // Token is valid!
    } else {
      res.status(401).json({ error: 'Unauthorized: Token is invalid or has expired' });
      return false;
    }
  } catch (err) {
    console.error('Authentication check error:', err);
    res.status(500).json({ error: 'Internal server error during authentication' });
    return false;
  }
}
