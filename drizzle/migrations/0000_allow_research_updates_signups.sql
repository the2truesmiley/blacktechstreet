DROP POLICY IF EXISTS "Anyone can submit an email signup" ON public.email_signups;

CREATE POLICY "Anyone can submit an email signup"
ON public.email_signups
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(email) BETWEEN 5 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (name IS NULL OR char_length(name) <= 120)
  AND source IN ('footer', 'event-alerts', 'resource-guide', 'research-updates')
  AND (detail IS NULL OR char_length(detail) <= 200)
);