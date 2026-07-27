import type { NextApiRequest, NextApiResponse } from 'next';
import { getTursoClient, initTursoSchema } from 'utils/tursoClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  await initTursoSchema();
  const client = getTursoClient();

  if (!client) {
    return res.status(500).json({ error: 'Turso DB client is not connected.' });
  }

  const cleanUser = username.trim().toLowerCase();
  const cleanPass = password.trim();
  const userRole = role || 'superadmin';
  const id = `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

  try {
    // Check if user exists, if so UPDATE, else INSERT into Turso DB
    const existing = await client.execute({
      sql: 'SELECT id FROM admin_users WHERE LOWER(username) = LOWER(?) LIMIT 1',
      args: [cleanUser],
    });

    if (existing.rows.length > 0) {
      await client.execute({
        sql: 'UPDATE admin_users SET password_hash = ?, role = ? WHERE LOWER(username) = LOWER(?)',
        args: [cleanPass, userRole, cleanUser],
      });
      return res.status(200).json({
        success: true,
        message: `Password updated in Turso DB for admin user '${cleanUser}'!`,
      });
    } else {
      await client.execute({
        sql: 'INSERT INTO admin_users (id, username, password_hash, role) VALUES (?, ?, ?, ?)',
        args: [id, cleanUser, cleanPass, userRole],
      });
      return res.status(200).json({
        success: true,
        message: `New admin user '${cleanUser}' successfully registered in Turso DB!`,
      });
    }
  } catch (err: any) {
    console.error('Turso DB Register Error:', err);
    return res.status(500).json({ error: err.message || 'Failed to register admin in Turso DB.' });
  }
}
