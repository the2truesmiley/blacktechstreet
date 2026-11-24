// Server-side password gate for /aspire-nvidia.
// The password and the protected workshop content live only here,
// never in the client bundle. A valid token is required to read the content.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

const encoder = new TextEncoder();

// Protected workshop content. Only returned after the server validates a token.
const WORKSHOP_CONTENT = {
  seo: {
    title: 'Black Tech Street × NVIDIA ASPIRE Skills Workshop',
    description:
      'A free, hands-on AI skills building workshop from Black Tech Street and NVIDIA. Saturday, October 10, 2026 at Langston University Tulsa. Build a skill, apply it to real work, walk out with it running.',
  },
  hero: {
    heading: 'ASPIRE Skills Building Workshop',
    status: 'Now Accepting Registrations',
    taglineLead: 'Build the Skill. Apply it to your own work.',
    taglineAccent: 'Walk out with it running.',
    subcopy:
      'NVIDIA teaches you to build the skill. Black Tech Street helps you apply it to a real task from your own life. The day ends with participants presenting what they built and why it mattered.',
    calloutTitle: 'Free Training',
    calloutBody: 'No cost to attend — registration required.',
    cta: 'Reserve your seat',
  },
  facts: [
    { icon: 'calendar', label: 'Date', value: 'Saturday, October 10, 2026' },
    { icon: 'clock', label: 'Time', value: '10:00 AM – 2:00 PM' },
    { icon: 'mapPin', label: 'Location', value: 'Langston University, Tulsa' },
  ],
  laptopNote: 'In person. Bring your own laptop and use any chatbot you like.',
  leads: [
    {
      name: 'Michael Boone',
      title: 'Manager of Trustworthy AI Product',
      org: 'NVIDIA',
      role: 'Skills build',
      imageKey: 'michael',
    },
    {
      name: 'Tyrance Billingsley II',
      title: 'Founder & CEO',
      org: 'Black Tech Street',
      role: 'Skills Application',
      imageKey: 'tyrance',
    },
  ],
  runOfShow: [
    {
      time: '9:15 – 10:00 AM',
      title: 'Doors, check in, setup',
      lead: 'Black Tech Street',
      points: [
        'Participants check in and are seated.',
        'Each person confirms their laptop and chatbot are working.',
        'A support table handles anyone who is stuck, so no one starts the day behind.',
        'Light breakfast and coffee available.',
      ],
    },
    {
      time: '10:00 – 10:15 AM',
      title: 'Welcome and live build',
      lead: 'Black Tech Street',
      points: [
        'Black Tech Street opens the day and frames what participants will walk out with.',
        'One live build on stage: a real task from the audience becomes a working skill in front of the room.',
        'Hand off to Michael Boone.',
      ],
    },
    {
      time: '10:15 – 11:35 AM',
      title: 'Skills build',
      lead: 'Michael Boone, NVIDIA',
      points: [
        'Michael Boone walks the room through building and uploading the skills, step by step.',
        'The room works in sync, with a checkpoint roughly every ten minutes.',
        'Coaches circulate to keep anyone from falling behind.',
        'Goal: every participant finishes with at least one skill that runs.',
      ],
    },
    {
      time: '11:35 – 11:50 AM',
      title: 'Break',
      lead: '',
      points: [
        'Coaches clear any remaining technical issues before the applied portion begins.',
        'Participants who want to build an extra skill can keep going with a coach.',
      ],
    },
    {
      time: '11:50 AM – 1:20 PM',
      title: 'Skills Application',
      lead: 'Black Tech Street',
      points: [
        'Five exercises, each building on the last.',
        'Participants do not move on until the current exercise produces a real result.',
      ],
    },
    {
      time: '1:20 – 1:45 PM',
      title: 'Participant presentations',
      lead: 'Black Tech Street',
      points: [
        'Five to six people present for two minutes each: what they built, what it does for them, and why it mattered.',
        'Presenters represent a range of starting experience levels.',
      ],
    },
    {
      time: '1:45 – 2:00 PM',
      title: 'Close and follow up',
      lead: 'Both',
      points: [
        'Participants write down what they saved and what they plan to automate next.',
        'Black Tech Street collects these as the record of impact and confirms the 30 day follow up.',
        'Doors stay open and the support table stays staffed for 20 minutes after.',
      ],
    },
  ],
  exercisesIntro:
    'Each exercise builds on the last, and you do not move on until the current one produces a real result. The same steps work for any skill built that morning.',
  exercises: [
    {
      icon: 'sparkles',
      n: '01',
      title: 'Feed It the Truth',
      duration: '15 min',
      desc:
        'Note three specific true things about your situation that a stranger would not know, then feed the skill your real information and get a first output.',
    },
    {
      icon: 'search',
      n: '02',
      title: 'Question It Before You Trust It',
      duration: '20 min',
      desc:
        'Ask the skill what it assumed, what its weakest part is, and what it would need to know to improve. Answer the third and run it again. This is the master habit of the day.',
    },
    {
      icon: 'repeat',
      n: '03',
      title: 'Build the Routine',
      duration: '15 min',
      desc:
        'Decide when you will run the skill again, put multiple skills in order so one feeds the next, and write the routine as one sentence.',
    },
    {
      icon: 'gauge',
      n: '04',
      title: 'Put a Number On It',
      duration: '15 min',
      desc:
        'Write how long the task took before and how long now, multiply by how often you do it across a year, and name one dated action you will take this week.',
    },
    {
      icon: 'share',
      n: '05',
      title: 'Make It Teachable',
      duration: '25 min',
      desc:
        'Write the skill as three plain steps, hand it to a stranger who runs it on their own information, watch where they get stuck, and fix the instructions until it works.',
    },
  ],
  takeaways: [
    'At least one working skill you built yourself.',
    'A real task from your own life, completed in the room.',
    'One concrete action to take this week.',
    'A skill proven to work in someone else’s hands, ready to share.',
  ],
  registration: {
    heading: 'Reserve your seat',
    subcopy: 'Free to attend. Capacity is 150 participants.',
    successHeading: 'Reservation received',
    successSubcopy: "We'll see you on Saturday, October 10, 2026.",
    successBody:
      'Your seat is reserved for the Black Tech Street × NVIDIA ASPIRE Skills Building Workshop on October 10, 2026.',
    placeholderHeading: 'Registration opens soon',
    placeholderBody:
      'Sign-ups for the October 10 workshop are not open yet. Check back shortly, or reach out through our contact page and we will let you know the moment seats are released.',
  },
  eventJsonLd: {
    name: 'Black Tech Street × NVIDIA ASPIRE Skills Building Workshop',
    description:
      'A free, hands-on AI skills building workshop. Build a skill with NVIDIA, apply it to a real task from your own work with Black Tech Street, and present what you built.',
    startDate: '2026-10-10T10:00:00-05:00',
    endDate: '2026-10-10T14:00:00-05:00',
    locationName: 'Langston University, Tulsa',
    locationAddress: '914 N Greenwood Ave, Tulsa, OK 74106',
  },
};

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

async function isTokenValid(token: string, tokenSecret: string): Promise<boolean> {
  if (!token || token.length > 512) return false;
  const [expiresAt, signature] = token.split('.');
  const expiry = Number(expiresAt);
  if (!expiresAt || !signature || !Number.isFinite(expiry) || expiry < Date.now()) {
    return false;
  }
  const expected = await sign(expiresAt, tokenSecret);
  return timingSafeEqual(signature, expected);
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
    return json({ valid: await isTokenValid(token, tokenSecret) });
  }

  // Return the protected workshop content only for a valid token.
  if (body.action === 'content') {
    const token = typeof body.token === 'string' ? body.token : '';
    if (!(await isTokenValid(token, tokenSecret))) {
      return json({ error: 'Unauthorized' }, 401);
    }
    return json({ content: WORKSHOP_CONTENT });
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
