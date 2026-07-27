import type { NextApiRequest, NextApiResponse } from 'next';
import { getTursoClient, initTursoSchema } from 'utils/tursoClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await initTursoSchema();
  const client = getTursoClient();

  if (!client) {
    return res.status(500).json({ error: 'Turso DB is not connected' });
  }

  // GET: Fetch all saved automation articles & posts from Turso DB
  if (req.method === 'GET') {
    try {
      const result = await client.execute('SELECT * FROM rebelroot_articles ORDER BY created_at DESC LIMIT 50');
      const articles = result.rows.map((row) => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        commentary: row.commentary,
        articleUrl: row.article_url,
        productName: row.product_name,
        status: row.status,
        linkedinPostId: row.linkedin_post_id,
        publishedAt: row.published_at,
        createdAt: row.created_at,
      }));
      return res.status(200).json({ success: true, articles });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  // POST: Save or Update an automation article in Turso DB
  if (req.method === 'POST') {
    const { title, commentary, articleUrl, productName, status, linkedinPostId } = req.body;

    if (!title || !commentary) {
      return res.status(400).json({ error: 'Title and commentary are required' });
    }

    const id = `art_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    try {
      await client.execute({
        sql: `INSERT INTO rebelroot_articles (id, slug, title, commentary, article_url, product_name, status, linkedin_post_id, published_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          id,
          slug,
          title,
          commentary,
          articleUrl || 'https://www.rebelroot.xyz',
          productName || 'Omni Browser',
          status || 'DRAFT',
          linkedinPostId || null,
          status === 'PUBLISHED' ? new Date().toISOString() : null,
        ],
      });

      return res.status(200).json({ success: true, id, message: 'Article saved to Turso DB successfully!' });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  // DELETE: Delete an article from Turso DB
  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'Article ID is required' });

    try {
      await client.execute({
        sql: 'DELETE FROM rebelroot_articles WHERE id = ?',
        args: [id as string],
      });
      return res.status(200).json({ success: true, message: 'Article deleted from Turso DB' });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
