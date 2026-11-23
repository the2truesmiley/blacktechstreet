CREATE TABLE public.workshop_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id text NOT NULL,
  question text NOT NULL,
  answer text,
  status text NOT NULL CHECK (status IN ('answered','forwarded')),
  visitor_name text,
  visitor_email text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.workshop_questions TO service_role;
ALTER TABLE public.workshop_questions ENABLE ROW LEVEL SECURITY;