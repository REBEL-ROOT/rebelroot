import { NextApiRequest, NextApiResponse } from 'next';

const sgMail = require('@sendgrid/mail');

export default async function SendEmail(req: NextApiRequest, res: NextApiResponse) {
  const { subject, description, email, name } = req.body;
  const referer = req.headers.referer;

  // Delegate to Cloudflare Worker if configured
  const workerUrl = process.env.CLOUDFLARE_WORKER_URL;
  if (workerUrl) {
    try {
      const response = await fetch(`${workerUrl.replace(/\/$/, '')}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject, description, email, name, referer }),
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

  const content = {
    to: ['rebelroot.ltd@gmail.com'],
    from: 'rebelroot.ltd@gmail.com',
    subject: subject,
    text: description,
    html: `<div>
    <h1>Name: ${name}</h1>
    <h1>E-mail: ${email}</h1>
    <p>${description}</p>
    <p>Sent from: ${referer || 'Not specified or hidden'}`,
  };

  try {
    await sgMail.send(content);
    res.status(204).end();
  } catch (error) {
    console.log('ERROR', error);
    res.status(400).send({ message: error });
  }
}
