CREATE TABLE public.enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  source_page TEXT,
  notified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.enquiries TO anon;
GRANT INSERT ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an enquiry"
ON public.enquiries FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(name)) > 0 AND length(name) <= 100
  AND length(email) <= 255 AND position('@' in email) > 1
  AND (phone IS NULL OR length(phone) <= 40)
  AND length(trim(message)) > 0 AND length(message) <= 2000
);