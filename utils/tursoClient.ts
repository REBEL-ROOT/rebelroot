import { createClient, Client } from '@libsql/client';

let tursoClientInstance: Client | null = null;

const DEFAULT_TURSO_URL = 'libsql://rrdb-rebelroot.aws-ap-south-1.turso.io';
const DEFAULT_TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODUxODQwODIsImlkIjoiMDE5ZmE1NDItYzkwMS03NTljLThkYTItYTNiMjg1ODgyOTM4Iiwia2lkIjoiamU3RzlGTEJaWUVvbXJibzdmcE9tbUJwNmM4SFNQRWJydGhwSnlpV25icyIsInJpZCI6ImViMzNmN2VlLWFkZTMtNDA0Yy04NjZkLWU4ODdiYjliYjRjYiJ9.wPTfGrrTEztNvc2IbVMCC48T-wdh0hPS9d73fHEjnJwqryGtmDQ8XPv_3BKlJ4HQlbDEQzYELW_nDHgDfTMeAA';

export function getTursoClient(): Client | null {
  if (tursoClientInstance) return tursoClientInstance;

  const url = process.env.TURSO_DATABASE_URL || DEFAULT_TURSO_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN || DEFAULT_TURSO_TOKEN;

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
 * Initializes required Turso DB tables and seeds default admin user into Turso DB.
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

    // Seed default admin user into Turso DB if not exists
    await client.execute({
      sql: `INSERT OR IGNORE INTO admin_users (id, username, password_hash, role) VALUES (?, ?, ?, ?)`,
      args: ['usr_rebelroot', 'rebelroot', '75057', 'superadmin'],
    });

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
