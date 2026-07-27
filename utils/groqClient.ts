export interface GroqCompletionParams {
  prompt: string;
  systemPrompt?: string;
  model?: string;
  apiKey?: string;
  temperature?: number;
  maxTokens?: number;
}

const DEFAULT_MODEL = 'qwen/qwen3.6-27b';
const FALLBACK_MODELS = ['qwen/qwen3.6-27b', 'qwen-2.5-32b', 'llama-3.3-70b-versatile'];

const REBELROOT_SYSTEM_PROMPT = `You are the official AI Social Media & Communications Director for REBELROOT (https://www.rebelroot.xyz).
REBELROOT is an independent, privacy-first, developer-led open-source collective building software for digital sovereignty.
Our core products:
- Omni Browser: Fast, private GeckoView Android web browser with uBlock Origin, offline translation, hardware vault, ExoPlayer.
- MOCNovel: Decentralized, zero-ads publishing platform for authors & readers.
- CampCart: Secure campus student peer-to-peer exchange marketplace.
- MOC Office: 100% offline PDF & document utility suite.
- RootLock: Hardened C++17 native app locker engine for Android.

Writing Style:
- Tone: Rebellious, bold, professional, developer-first, clear.
- Include punchy hooks, clean bullet points with emojis, relevant hashtags, and call-to-actions.
- Never write robotic corporate speak; write like an innovative developer team.`;

/**
 * Call Groq Cloud API using OpenAI-compatible chat completion endpoint.
 */
export async function generateGroqCompletion(params: GroqCompletionParams): Promise<{ success: boolean; text?: string; error?: string }> {
  const apiKey = params.apiKey || process.env.GROQ_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      error: 'Missing Groq API Key. Please provide GROQ_API_KEY in environment variables or configuration.',
    };
  }

  const model = params.model || process.env.GROQ_MODEL || DEFAULT_MODEL;
  const systemPrompt = params.systemPrompt || REBELROOT_SYSTEM_PROMPT;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey.trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: params.prompt },
        ],
        temperature: params.temperature ?? 0.7,
        max_tokens: params.maxTokens ?? 1024,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        return { success: true, text: content };
      }
    }

    const errText = await response.text();
    return {
      success: false,
      error: `Groq API Error (${response.status}): ${errText}`,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Failed to connect to Groq API.',
    };
  }
}
