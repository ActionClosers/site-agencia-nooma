-- Insert example portfolio items
INSERT INTO public.portfolio_items (title, description, image_url, category, service_type, client_name, project_url, technologies, featured) VALUES
('Sistema de E-commerce Responsivo', 'Desenvolvimento completo de uma plataforma de e-commerce com painel administrativo, integração com pagamentos e gestão de estoque.', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop', 'E-commerce', 'Desenvolvimento Web', 'Loja Virtual ABC', 'https://example.com', ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'], true),

('Landing Page Institucional', 'Criação de landing page moderna e otimizada para conversão, com foco em captura de leads e apresentação de serviços.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', 'Landing Page', 'Design Web', 'Empresa XYZ', 'https://example.com', ARRAY['HTML', 'CSS', 'JavaScript', 'Tailwind'], false),

('Aplicativo Mobile de Delivery', 'Desenvolvimento de aplicativo móvel para delivery de alimentos com sistema de pedidos em tempo real e rastreamento.', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop', 'Mobile App', 'Desenvolvimento Mobile', 'Restaurante Gourmet', NULL, ARRAY['React Native', 'Firebase', 'Google Maps API'], true),

('Dashboard de Analytics', 'Interface administrativa para visualização de dados e métricas de negócio com gráficos interativos e relatórios.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', 'Dashboard', 'Data Visualization', 'TechCorp', 'https://example.com', ARRAY['Vue.js', 'D3.js', 'Python', 'FastAPI'], false),

('Site Institucional Corporativo', 'Website corporativo completo com área de notícias, portfólio de serviços e formulários de contato integrados.', 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop', 'Website', 'Desenvolvimento Web', 'Consultoria 123', 'https://example.com', ARRAY['WordPress', 'PHP', 'MySQL'], false),

('Sistema de Gestão Escolar', 'Plataforma completa para gestão escolar com módulos para alunos, professores, notas e comunicação.', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop', 'Sistema Web', 'Desenvolvimento Web', 'Escola ABC', NULL, ARRAY['Laravel', 'Vue.js', 'MySQL', 'Redis'], true);

-- Insert example testimonials
INSERT INTO public.testimonials (client_name, client_company, client_position, content, rating, image_url, featured) VALUES
('Maria Silva', 'Loja Virtual ABC', 'CEO', 'A Nooma desenvolveu nossa plataforma de e-commerce de forma excepcional. O projeto foi entregue no prazo e superou nossas expectativas. Nossa conversão aumentou 40% após o lançamento!', 5, 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face', true),

('João Santos', 'Empresa XYZ', 'Diretor de Marketing', 'Profissionais extremamente competentes e dedicados. A landing page criada pela equipe gerou um aumento significativo em nossos leads. Recomendo sem hesitação!', 5, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face', true),

('Ana Costa', 'Restaurante Gourmet', 'Proprietária', 'O aplicativo de delivery revolucionou nosso negócio. Interface intuitiva, funciona perfeitamente e nossos clientes adoraram. Triplicamos os pedidos online!', 5, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face', false),

('Carlos Oliveira', 'TechCorp', 'CTO', 'Dashboard incrível que nos permitiu visualizar nossos dados de forma clara e tomar decisões mais assertivas. Equipe muito técnica e profissional.', 4, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face', true),

('Luisa Ferreira', 'Consultoria 123', 'Gerente', 'Site institucional moderno e responsivo. A Nooma entendeu perfeitamente nossa necessidade e entregou exatamente o que precisávamos.', 5, NULL, false),

('Roberto Lima', 'Escola ABC', 'Diretor', 'Sistema de gestão escolar completo que facilitou muito nosso dia a dia. Todas as funcionalidades que solicitamos foram implementadas com perfeição.', 5, 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face', false);