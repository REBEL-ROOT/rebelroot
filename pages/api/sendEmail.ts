import { NextApiRequest, NextApiResponse } from 'next';

export default async function SendEmail(req: NextApiRequest, res: NextApiResponse) {
  const { subject, description, email, name } = req.body;
  const referer = req.headers.referer;

  // 1. Delegate to Cloudflare Worker if configured
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

  // 2. Direct Fallback to Telegram/Discord in Next.js Serverless runtime
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;

  const telegramText = `<b>📬 New Contact Submission (Local Backend)</b>\n\n` +
                       `<b>Subject:</b> ${subject || "Contact Form Inquiry"}\n` +
                       `<b>Name:</b> ${name}\n` +
                       `<b>Email:</b> ${email}\n\n` +
                       `<b>Message:</b>\n${description}`;

  const discordEmbed = {
    title: "📬 New Contact Submission (Local Backend)",
    color: 3447003,
    fields: [
      { name: "Subject", value: subject || "Contact Form Inquiry", inline: false },
      { name: "Name", value: name, inline: true },
      { name: "Email", value: email, inline: true },
      { name: "Message", value: description, inline: false },
    ],
    timestamp: new Date().toISOString(),
  };

  const promises: Promise<any>[] = [];

  if (telegramToken && telegramChatId) {
    promises.push(
      fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: telegramText,
          parse_mode: 'HTML',
        }),
      })
    );
  }

  if (discordWebhook) {
    promises.push(
      fetch(discordWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [discordEmbed],
        }),
      })
    );
  }

  if (promises.length > 0) {
    try {
      await Promise.all(promises);
      return res.status(204).end();
    } catch (err: any) {
      return res.status(500).send({ message: `Notification dispatch failed: ${err.message}` });
    }
  }

  return res.status(500).send({ message: 'No notification channels (Cloudflare Worker, Telegram, or Discord) are configured.' });
}
