// Server-side password gate for /aspire-nvidia.
// The password lives only in an edge-function secret, never in the client bundle.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

const encoder = new TextEncoder();

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function timingSafeEqual(a: string, b: string) {
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);
  if (aBytes.length !== bBytes.length) return false;
  let diff = 0;
  for (let i = 0; i < aBytes.length; i++) diff |= aBytes[i] ^ bBytes[i];
  return diff === 0;
}

async function sign(payload: string, secret: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const password = Deno.env.get('ASPIRE_NVIDIA_PASSWORD');
  const tokenSecret = Deno.env.get('ASPIRE_NVIDIA_TOKEN_SECRET');
  if (!password || !tokenSecret) {
    console.error('nvidia-access: missing ASPIRE_NVIDIA_PASSWORD or ASPIRE_NVIDIA_TOKEN_SECRET');
    return json({ error: 'Access check is not configured' }, 500);
  }

  let body: { action?: string; password?: string; token?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid request body' }, 400);
  }

  // Validate an existing token (used on page load / refresh).
  if (body.action === 'verify') {
    const token = typeof body.token === 'string' ? body.token : '';
    if (token.length > 512) return json({ valid: false }, 200);
    const [expiresAt, signature] = token.split('.');
    const expiry = Number(expiresAt);
    if (!expiresAt || !signature || !Number.isFinite(expiry) || expiry < Date.now()) {
      return json({ valid: false });
    }
    const expected = await sign(expiresAt, tokenSecret);
    return json({ valid: timingSafeEqual(signature, expected) });
  }

  // Exchange a password for a token.
  const submitted = typeof body.password === 'string' ? body.password.trim() : '';
  if (!submitted || submitted.length > 128) return json({ error: 'Incorrect password' }, 401);

  if (!timingSafeEqual(submitted.toUpperCase(), password.trim().toUpperCase())) {
    // Small delay to blunt rapid guessing.
    await new Promise((resolve) => setTimeout(resolve, 400));
    return json({ error: 'Incorrect password' }, 401);
  }

  const expiresAt = String(Date.now() + TOKEN_TTL_MS);
  const token = `${expiresAt}.${await sign(expiresAt, tokenSecret)}`;
  return json({ token, expiresAt: Number(expiresAt) });
});
