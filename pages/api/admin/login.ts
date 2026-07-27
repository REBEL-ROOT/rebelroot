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

  // Ensure Turso DB schema is initialized
  await initTursoSchema();

  const client = getTursoClient();

  // Simple environment fallback or Turso DB lookup
  const adminUser = process.env.ADMIN_USERNAME || 'rebelroot';
  const adminPass = process.env.ADMIN_PASSWORD || 'rebelroot2026';

  if (username === adminUser && password === adminPass) {
    return res.status(200).json({
      success: true,
      token: `rr_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user: { username: adminUser, role: 'superadmin' },
    });
  }

  // Look up in Turso DB `admin_users` table
  if (client) {
    try {
      const result = await client.execute({
        sql: 'SELECT * FROM admin_users WHERE username = ? LIMIT 1',
        args: [username],
      });

      if (result.rows.length > 0) {
        const userRow = result.rows[0];
        if (userRow.password_hash === password) {
          return res.status(200).json({
            success: true,
            token: `rr_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            user: { username: userRow.username, role: userRow.role },
          });
        }
      }
    } catch (err) {
      console.error('Turso DB Admin Login Error:', err);
    }
  }

  return res.status(401).json({ error: 'Invalid username or password' });
}
