-- Habilitar Row Level Security na tabela quotes
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir que qualquer pessoa insira dados no formulário
-- (formulário público de contato não requer autenticação)
CREATE POLICY "Allow public insert on quotes" 
ON public.quotes 
FOR INSERT 
TO public 
WITH CHECK (true);