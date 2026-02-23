import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // ── Auth check: only logged-in users can access ──
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ── Fetch Tally submissions ──
    const TALLY_API_KEY = Deno.env.get('TALLY_API_KEY');
    if (!TALLY_API_KEY) {
      throw new Error('TALLY_API_KEY is not configured');
    }

    const url = new URL(req.url);
    const formId = url.searchParams.get('formId');

    // Validate formId: alphanumeric, hyphens, underscores only
    if (!formId || !/^[a-zA-Z0-9_-]+$/.test(formId)) {
      return new Response(
        JSON.stringify({ error: 'Invalid or missing formId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate page: must be a positive integer
    const rawPage = url.searchParams.get('page') || '1';
    const pageNum = parseInt(rawPage, 10);
    if (isNaN(pageNum) || pageNum < 1 || pageNum > 1000) {
      return new Response(
        JSON.stringify({ error: 'Invalid page number' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const tallyUrl = `https://api.tally.so/forms/${encodeURIComponent(formId)}/submissions?page=${pageNum}`;
    const response = await fetch(tallyUrl, {
      headers: { 'Authorization': `Bearer ${TALLY_API_KEY}` },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Tally API error [${response.status}]: ${errorText}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error fetching Tally submissions:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
