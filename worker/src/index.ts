export interface Env {
  SENDGRID_API_KEY?: string;
  CONTACT_SENDER_EMAIL?: string;
  CONTACT_RECIPIENT_EMAIL?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // 1. CORS Preflight Handling
    if (request.method === "OPTIONS") {
      return handleCors();
    }

    // 2. Routing Handlers
    try {
      if (url.pathname === "/api/send-email" && request.method === "POST") {
        return await handleSendEmail(request, env);
      }

      if (url.pathname === "/api/feedback" && request.method === "POST") {
        return await handleFeedback(request, env);
      }

      // Fallback 404
      return new Response(JSON.stringify({ error: "Route not found" }), {
        status: 404,
        headers: getCorsHeaders({ "Content-Type": "application/json" }),
      });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message || "Internal Server Error" }), {
        status: 500,
        headers: getCorsHeaders({ "Content-Type": "application/json" }),
      });
    }
  },
};

/* ─── Route Handlers ─── */

async function handleSendEmail(request: Request, env: Env): Promise<Response> {
  if (!env.SENDGRID_API_KEY) {
    return new Response(JSON.stringify({ error: "SendGrid API key not configured on serverless environment" }), {
      status: 500,
      headers: getCorsHeaders({ "Content-Type": "application/json" }),
    });
  }

  const payload: any = await request.json();
  const { name, email, description, subject } = payload;

  if (!name || !email || !description) {
    return new Response(JSON.stringify({ error: "Missing required fields: name, email, description" }), {
      status: 400,
      headers: getCorsHeaders({ "Content-Type": "application/json" }),
    });
  }

  const sender = env.CONTACT_SENDER_EMAIL || "rebelroot.ltd@gmail.com";
  const recipient = env.CONTACT_RECIPIENT_EMAIL || "rebelroot.ltd@gmail.com";

  // Build SendGrid mail payload
  const sendgridPayload = {
    personalizations: [
      {
        to: [{ email: recipient }],
        subject: subject || "Contact Form Submission",
      },
    ],
    from: { email: sender },
    reply_to: { email: email, name: name },
    content: [
      {
        type: "text/plain",
        value: `Name: ${name}\nEmail: ${email}\nMessage:\n${description}`,
      },
    ],
  };

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendgridPayload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return new Response(JSON.stringify({ error: `SendGrid error forwarding: ${errorText}` }), {
      status: response.status,
      headers: getCorsHeaders({ "Content-Type": "application/json" }),
    });
  }

  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(),
  });
}

async function handleFeedback(request: Request, env: Env): Promise<Response> {
  if (!env.SENDGRID_API_KEY) {
    return new Response(JSON.stringify({ error: "SendGrid API key not configured on serverless environment" }), {
      status: 500,
      headers: getCorsHeaders({ "Content-Type": "application/json" }),
    });
  }

  const payload: any = await request.json();
  const { name, email, rating, product, message } = payload;

  if (!name || !email || !rating || !product || !message) {
    return new Response(JSON.stringify({ error: "Missing required fields: name, email, rating, product, message" }), {
      status: 400,
      headers: getCorsHeaders({ "Content-Type": "application/json" }),
    });
  }

  const sender = env.CONTACT_SENDER_EMAIL || "rebelroot.ltd@gmail.com";
  const recipient = env.CONTACT_RECIPIENT_EMAIL || "rebelroot.ltd@gmail.com";

  // Create star rating string representation
  const starRating = "⭐".repeat(Math.min(5, Math.max(1, parseInt(rating))));

  const feedbackPayload = {
    personalizations: [
      {
        to: [{ email: recipient }],
        subject: `[RebelRoot Feedback] - ${product} (${rating}/5 Stars)`,
      },
    ],
    from: { email: sender },
    reply_to: { email: email, name: name },
    content: [
      {
        type: "text/plain",
        value: `Feedback Received for RebelRoot Project:\n\n` +
               `Product: ${product}\n` +
               `Rating: ${starRating} (${rating}/5)\n` +
               `Submitter Name: ${name}\n` +
               `Submitter Email: ${email}\n\n` +
               `Feedback Message:\n${message}`,
      },
    ],
  };

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedbackPayload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return new Response(JSON.stringify({ error: `SendGrid error forwarding: ${errorText}` }), {
      status: response.status,
      headers: getCorsHeaders({ "Content-Type": "application/json" }),
    });
  }

  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(),
  });
}

/* ─── CORS Helpers ─── */

function handleCors(): Response {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(),
  });
}

function getCorsHeaders(customHeaders: Record<string, string> = {}): Headers {
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    ...customHeaders,
  });
  return headers;
}
