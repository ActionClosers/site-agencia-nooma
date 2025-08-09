-- Atualizar email do admin no banco de dados
UPDATE public.admin_users 
SET email = 'contato@agencianooma.com.br' 
WHERE email = 'admin@agencianooma.com';