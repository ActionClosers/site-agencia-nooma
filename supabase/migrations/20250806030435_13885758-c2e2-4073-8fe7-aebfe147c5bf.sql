-- Create admin_users table to control who can access admin panel
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can view admin_users (for checking if they're admin)
CREATE POLICY "Anyone can check if email is admin" 
ON public.admin_users 
FOR SELECT 
TO authenticated
USING (true);

-- Only existing admins can add new admins
CREATE POLICY "Only admins can insert new admins" 
ON public.admin_users 
FOR INSERT 
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = auth.jwt() ->> 'email'
  )
);

-- Insert the first admin (you'll need to change this email to yours)
INSERT INTO public.admin_users (email) VALUES ('admin@agencianooma.com');

-- Create function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = auth.jwt() ->> 'email'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;