-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  category_id UUID REFERENCES public.categories(id),
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create tags table
CREATE TABLE public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create post tags junction table
CREATE TABLE public.post_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  UNIQUE(post_id, tag_id)
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;

-- Create policies for public reading
CREATE POLICY "Anyone can view categories" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view published posts" ON public.blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Anyone can view tags" ON public.tags
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view post tags" ON public.post_tags
  FOR SELECT USING (true);

-- Create policies for authenticated users (admin)
CREATE POLICY "Authenticated users can manage categories" ON public.categories
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage posts" ON public.blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage tags" ON public.tags
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage post tags" ON public.post_tags
  FOR ALL USING (auth.role() = 'authenticated');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for blog posts
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some default categories
INSERT INTO public.categories (name, slug, description) VALUES
  ('Web Design', 'web-design', 'Artigos sobre design de websites e interfaces'),
  ('Marketing Digital', 'marketing-digital', 'Estratégias de marketing online'),
  ('SEO', 'seo', 'Otimização para mecanismos de busca'),
  ('Branding', 'branding', 'Desenvolvimento de marca e identidade visual'),
  ('Dicas', 'dicas', 'Dicas gerais para negócios online');

-- Insert some default tags
INSERT INTO public.tags (name, slug) VALUES
  ('React', 'react'),
  ('Design', 'design'),
  ('UX/UI', 'ux-ui'),
  ('Google Ads', 'google-ads'),
  ('Social Media', 'social-media'),
  ('WordPress', 'wordpress'),
  ('E-commerce', 'e-commerce'),
  ('Analytics', 'analytics');