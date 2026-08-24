CREATE TABLE public.email_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  source TEXT NOT NULL,
  detail TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX email_signups_email_source_key ON public.email_signups (lower(email), source);

GRANT INSERT ON public.email_signups TO anon;
GRANT INSERT ON public.email_signups TO authenticated;
GRANT ALL ON public.email_signups TO service_role;

ALTER TABLE public.email_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an email signup"
ON public.email_signups
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(email) BETWEEN 5 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (name IS NULL OR char_length(name) <= 120)
  AND source IN ('footer', 'event-alerts', 'resource-guide')
  AND (detail IS NULL OR char_length(detail) <= 200)
);