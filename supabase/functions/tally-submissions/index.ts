import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TALLY_API_KEY = Deno.env.get('TALLY_API_KEY');
    if (!TALLY_API_KEY) {
      throw new Error('TALLY_API_KEY is not configured');
    }

    const url = new URL(req.url);
    const formId = url.searchParams.get('formId');

    if (!formId) {
      return new Response(
        JSON.stringify({ error: 'formId query parameter is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const page = url.searchParams.get('page') || '1';

    const tallyUrl = `https://api.tally.so/forms/${formId}/submissions?page=${page}`;
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
