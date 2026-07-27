import { createClient, Client } from '@libsql/client';

let tursoClientInstance: Client | null = null;

export function getTursoClient(): Client | null {
  if (tursoClientInstance) return tursoClientInstance;

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    console.warn('TURSO_DATABASE_URL environment variable is missing.');
    return null;
  }

  try {
    tursoClientInstance = createClient({
      url,
      authToken,
    });
    return tursoClientInstance;
  } catch (err) {
    console.error('Failed to initialize Turso DB client:', err);
    return null;
  }
}

/**
 * Initializes required Turso DB tables for REBELROOT site & LinkedIn automation.
 */
export async function initTursoSchema(): Promise<{ success: boolean; error?: string }> {
  const client = getTursoClient();
  if (!client) return { success: false, error: 'Turso DB client unavailable' };

  try {
    // 1. Admin Users Table for REBELROOT LinkedIn Admin login
    await client.execute(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT DEFAULT 'admin',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 1b. Admin Sessions Table for Secure Authentication
    await client.execute(`
      CREATE TABLE IF NOT EXISTS admin_sessions (
        token TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        expires_at INTEGER NOT NULL
      );
    `);

    // 2. Automation Articles & LinkedIn Posts Vault Table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS rebelroot_articles (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE,
        title TEXT NOT NULL,
        commentary TEXT NOT NULL,
        article_url TEXT,
        product_name TEXT DEFAULT 'Omni Browser',
        status TEXT DEFAULT 'DRAFT',
        linkedin_post_id TEXT,
        published_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. LinkedIn Activity Logs Table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS linkedin_logs (
        id TEXT PRIMARY KEY,
        action TEXT NOT NULL,
        org_id TEXT,
        post_id TEXT,
        status_code INTEGER,
        payload_data TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    return { success: true };
  } catch (err: any) {
    console.error('Turso Schema Migration Error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Helper to execute a query safely against Turso DB.
 */
export async function queryTurso(sql: string, args: any[] = []) {
  const client = getTursoClient();
  if (!client) throw new Error('Turso DB client is not initialized');
  return await client.execute({ sql, args });
}
