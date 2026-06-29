import { NextApiRequest, NextApiResponse } from 'next';

const sgMail = require('@sendgrid/mail');

export default async function SendFeedback(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, rating, product, message } = req.body;

  // Delegate to Cloudflare Worker if configured
  const workerUrl = process.env.CLOUDFLARE_WORKER_URL;
  if (workerUrl) {
    try {
      const response = await fetch(`${workerUrl.replace(/\/$/, '')}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, rating, product, message }),
      });

      if (response.ok) {
        return res.status(204).end();
      } else {
        const errorText = await response.text();
        return res.status(response.status).send({ message: `Worker delegation failed: ${errorText}` });
      }
    } catch (error) {
      console.error('Worker delegation error:', error);
      return res.status(500).send({ message: 'Worker connection error' });
    }
  }

  // Fallback to local SendGrid integration
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const starRating = '⭐'.repeat(Math.min(5, Math.max(1, parseInt(rating))));

  const content = {
    to: ['rebelroot.ltd@gmail.com'],
    from: 'rebelroot.ltd@gmail.com',
    subject: `[RebelRoot Local Feedback] - ${product} (${rating}/5 Stars)`,
    text: `Feedback Received for RebelRoot Project:\n\n` +
          `Product: ${product}\n` +
          `Rating: ${starRating} (${rating}/5)\n` +
          `Submitter Name: ${name}\n` +
          `Submitter Email: ${email}\n\n` +
          `Feedback Message:\n${message}`,
  };

  try {
    await sgMail.send(content);
    res.status(204).end();
  } catch (error) {
    console.log('ERROR', error);
    res.status(400).send({ message: error });
  }
}
