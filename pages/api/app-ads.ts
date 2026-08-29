import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.status(200).send('google.com, pub-5773812795876340, DIRECT, f08c47fec0942fa0\n');
}
