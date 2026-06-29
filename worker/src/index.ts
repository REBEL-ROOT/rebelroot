export interface Env {
  SENDGRID_API_KEY?: string;
  CONTACT_SENDER_EMAIL?: string;
  CONTACT_RECIPIENT_EMAIL?: string;
  CAMPCART_PUBLIC_KEY?: string; // PEM public key to verify shopping cart signatures
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

      if (url.pathname === "/api/campcart-verify" && request.method === "POST") {
        return await handleCampCartVerify(request, env);
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

async function handleCampCartVerify(request: Request, env: Env): Promise<Response> {
  const publicKeyPem = env.CAMPCART_PUBLIC_KEY;
  if (!publicKeyPem) {
    return new Response(JSON.stringify({ error: "CampCart verification public key not configured" }), {
      status: 500,
      headers: getCorsHeaders({ "Content-Type": "application/json" }),
    });
  }

  const payload: any = await request.json();
  const { products, signature } = payload; // signature is a Base64-encoded RSASSA-PKCS1-v1_5 SHA-256 signature

  if (!products || !signature) {
    return new Response(JSON.stringify({ error: "Missing required params: products, signature" }), {
      status: 400,
      headers: getCorsHeaders({ "Content-Type": "application/json" }),
    });
  }

  try {
    const isValid = await verifyProductSignature(publicKeyPem, products, signature);
    return new Response(JSON.stringify({ verified: isValid }), {
      status: 200,
      headers: getCorsHeaders({ "Content-Type": "application/json" }),
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: `Signature verification failed: ${err.message}` }), {
      status: 400,
      headers: getCorsHeaders({ "Content-Type": "application/json" }),
    });
  }
}

/* ─── Cryptographic Verifier ─── */

async function verifyProductSignature(
  publicKeyPem: string,
  products: any[],
  signatureBase64: string
): Promise<boolean> {
  const enc = new TextEncoder();
  const rawKey = pemToDer(publicKeyPem);

  const publicKey = await crypto.subtle.importKey(
    "spki",
    rawKey,
    { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } },
    false,
    ["verify"]
  );

  // Normalize product details to calculate deterministic verification string
  const normalizedData = products.map((p) => ({
    id: p.id,
    price: p.price,
    currency: p.currency,
  }));

  const data = enc.encode(JSON.stringify(normalizedData));
  const signatureBytes = Uint8Array.from(atob(signatureBase64), (c) => c.charCodeAt(0));

  return await crypto.subtle.verify("RSASSA-PKCS1-v1_5", publicKey, signatureBytes, data);
}

function pemToDer(pem: string): ArrayBuffer {
  const pemHeader = "-----BEGIN PUBLIC KEY-----";
  const pemFooter = "-----END PUBLIC KEY-----";
  const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
  const cleanPem = pemContents.replace(/\s+/g, "");
  return Uint8Array.from(atob(cleanPem), (c) => c.charCodeAt(0)).buffer;
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
