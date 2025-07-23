-- Criar tabela para armazenar solicitações de orçamento
CREATE TABLE public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'quoted', 'closed'))
);

-- Comentários para documentar a tabela
COMMENT ON TABLE public.quotes IS 'Tabela para armazenar solicitações de orçamento dos clientes';
COMMENT ON COLUMN public.quotes.name IS 'Nome do cliente';
COMMENT ON COLUMN public.quotes.email IS 'Email do cliente';
COMMENT ON COLUMN public.quotes.company IS 'Empresa do cliente (opcional)';
COMMENT ON COLUMN public.quotes.service IS 'Serviço de interesse';
COMMENT ON COLUMN public.quotes.message IS 'Mensagem do cliente';
COMMENT ON COLUMN public.quotes.status IS 'Status da solicitação';

-- Criar índice para pesquisas por email
CREATE INDEX idx_quotes_email ON public.quotes(email);

-- Criar índice para pesquisas por data
CREATE INDEX idx_quotes_created_at ON public.quotes(created_at DESC);