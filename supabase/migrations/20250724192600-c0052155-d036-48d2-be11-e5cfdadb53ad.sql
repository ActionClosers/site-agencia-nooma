-- Create table to track service clicks
CREATE TABLE public.service_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_name TEXT NOT NULL,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_ip TEXT,
  user_agent TEXT
);

-- Enable RLS
ALTER TABLE public.service_clicks ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for tracking clicks)
CREATE POLICY "Allow public insert on service_clicks" 
ON public.service_clicks 
FOR INSERT 
WITH CHECK (true);