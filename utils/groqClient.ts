export interface GroqCompletionParams {
  prompt: string;
  systemPrompt?: string;
  model?: string;
  apiKey?: string;
  temperature?: number;
  maxTokens?: number;
}

const DEFAULT_MODEL = 'llama-3.3-70b-versatile';
const FALLBACK_MODELS = ['llama-3.3-70b-versatile', 'qwen-2.5-32b', 'deepseek-r1-distill-llama-70b'];

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
- Never write robotic corporate speak; write like an innovative developer team.
- CRITICAL: Output ONLY the final response text. Do NOT output any <think> tags, internal monologues, or thinking process.`;

/**
 * Clean reasoning tags (e.g. <think>...</think>) and metadata from Groq model outputs.
 */
function cleanModelOutput(text: string): string {
  if (!text) return '';
  let cleaned = text;

  // 1. If </think> tag is present, extract everything AFTER the last </think>
  if (cleaned.includes('</think>')) {
    cleaned = cleaned.split('</think>').pop() || '';
  }
  // 2. If <think> tag is present without </think> (truncated inside thinking mode), strip <think> and everything following
  else if (cleaned.includes('<think>')) {
    cleaned = cleaned.split('<think>')[0] || '';
  }

  return cleaned
    .replace(/^Thinking Process:[\s\S]*?\n\n/gi, '')
    .replace(/^Here's a thinking process:[\s\S]*?\n\n/gi, '')
    .trim();
}

/**
 * Call Groq Cloud API using OpenAI-compatible chat completion endpoint.
 */
export async function generateGroqCompletion(params: GroqCompletionParams): Promise<{ success: boolean; text?: string; error?: string }> {
  const apiKey = params.apiKey || process.env.GROQ_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      error: 'Missing Groq API Key. Please set GROQ_API_KEY in .env.local or enter your key in the dashboard.',
    };
  }

  const systemPrompt = params.systemPrompt || REBELROOT_SYSTEM_PROMPT;
  const modelsToTry = [
    params.model || process.env.GROQ_MODEL || DEFAULT_MODEL,
    ...FALLBACK_MODELS,
  ];

  // Filter unique model names
  const uniqueModels = Array.from(new Set(modelsToTry));

  let lastError = '';

  for (const modelCandidate of uniqueModels) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey.trim()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: modelCandidate,
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
        let content = data.choices?.[0]?.message?.content;
        if (content) {
          content = cleanModelOutput(content);
          return { success: true, text: content };
        }
      }

      const errText = await response.text();
      lastError = `Groq API Error (${response.status}): ${errText}`;
      // If error is 404 (model not found), loop to next fallback model
      if (response.status === 404 || errText.includes('model_not_found')) {
        continue;
      } else {
        break;
      }
    } catch (err: any) {
      lastError = err.message || 'Failed to connect to Groq API.';
    }
  }

  return {
    success: false,
    error: lastError || 'Groq AI generation failed.',
  };
}
