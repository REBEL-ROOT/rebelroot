import type { NextApiRequest, NextApiResponse } from 'next';
import { getTursoClient, initTursoSchema } from 'utils/tursoClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Ensure Turso DB schema is initialized and admin user is seeded into Turso DB
  try {
    await initTursoSchema();
  } catch (e) {
    console.warn('Turso Schema init warning:', e);
  }

  const client = getTursoClient();
  const cleanUser = username.trim().toLowerCase();
  const cleanPass = password.trim();

  // 1. Direct Turso DB Query
  if (client) {
    try {
      const result = await client.execute({
        sql: 'SELECT * FROM admin_users WHERE LOWER(username) = LOWER(?) LIMIT 1',
        args: [cleanUser],
      });

      if (result.rows && result.rows.length > 0) {
        const userRow = result.rows[0];
        if (userRow.password_hash === cleanPass) {
          return res.status(200).json({
            success: true,
            token: `rr_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            user: { username: String(userRow.username), role: String(userRow.role) },
          });
        }
      }
    } catch (err) {
      console.error('Turso DB Admin Login Error:', err);
    }
  }

  // 2. Default Fallback Admin Check
  const validPasswords = ['75057', 'rebelroot', 'rebelroot2026'];
  if ((cleanUser === 'rebelroot' || cleanUser === 'admin') && validPasswords.includes(cleanPass.toLowerCase())) {
    return res.status(200).json({
      success: true,
      token: `rr_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user: { username: cleanUser, role: 'superadmin' },
    });
  }

  return res.status(401).json({ error: 'Invalid username or password' });
}
