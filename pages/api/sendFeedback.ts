import { NextApiRequest, NextApiResponse } from 'next';

export default async function SendFeedback(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, rating, product, message } = req.body;

  // 1. Delegate to Cloudflare Worker
  const workerUrl = process.env.CLOUDFLARE_WORKER_URL || 'https://rebelroot-backend.parasdevprojects.workers.dev';
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

  // 2. Direct Fallback to Telegram/Discord in Next.js Serverless runtime
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;

  const numericRating = parseInt(rating);
  const starRating = '⭐'.repeat(Math.min(5, Math.max(1, numericRating)));

  const telegramText = `<b>⭐️ New Product Feedback (Local Backend)</b>\n\n` +
                       `<b>Product:</b> ${product}\n` +
                       `<b>Rating:</b> ${starRating} (${numericRating}/5)\n` +
                       `<b>User:</b> ${name} (${email})\n\n` +
                       `<b>Comment:</b>\n${message}`;

  const discordColor = numericRating >= 4 ? 3066993 : numericRating <= 2 ? 15158332 : 15844367;

  const discordEmbed = {
    title: `⭐️ New Product Feedback: ${product} (Local Backend)`,
    color: discordColor,
    fields: [
      { name: "Rating", value: `${starRating} (${numericRating}/5)`, inline: true },
      { name: "User Name", value: name, inline: true },
      { name: "User Email", value: email, inline: true },
      { name: "Feedback Comment", value: message, inline: false },
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
      return res.status(500).send({ message: `Feedback dispatch failed: ${err.message}` });
    }
  }

  return res.status(500).send({ message: 'No notification channels (Cloudflare Worker, Telegram, or Discord) are configured.' });
}
