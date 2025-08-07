-- Inserir o usuário admin padrão se não existir
INSERT INTO admin_users (email) 
VALUES ('admin@agencianooma.com')
ON CONFLICT (email) DO NOTHING;

-- Criar função para recuperação de senha (edge function será criada depois)
CREATE OR REPLACE FUNCTION public.request_password_reset(user_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Verifica se o email existe
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = user_email) THEN
    RETURN true;
  ELSE
    RETURN false;
  END IF;
END;
$$;