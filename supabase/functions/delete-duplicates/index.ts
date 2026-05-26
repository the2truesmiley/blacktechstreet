import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  const body = await req.json().catch(() => ({}));
  const files: string[] = body.files ?? [];
  const { data, error } = await supabase.storage
    .from("hqopeningphotos")
    .remove(files);
  return new Response(JSON.stringify({ data, error }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
