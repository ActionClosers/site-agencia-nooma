import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import InteractiveBackground from '@/components/InteractiveBackground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Edit, Eye, Plus, Trash2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author_name: string;
  author_email: string;
  published: boolean;
  published_at: string | null;
  featured_image: string | null;
  category_id: string | null;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

const AdminBlog = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author_name: '',
    author_email: '',
    published: false,
    category_id: '',
    featured_image: ''
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      
      // Check if user is admin
      try {
        const { data, error } = await supabase
          .rpc('is_current_user_admin');
        
        if (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(data);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      }
      
      setCheckingAdmin(false);
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    // Only fetch data if user is admin
    if (isAdmin && !checkingAdmin) {
      fetchPosts();
      fetchCategories();
    }
  }, [isAdmin, checkingAdmin]);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao carregar posts.',
        variant: 'destructive',
      });
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao carregar categorias.',
        variant: 'destructive',
      });
    } else {
      setCategories(data || []);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      author_name: '',
      author_email: '',
      published: false,
      category_id: '',
      featured_image: ''
    });
    setEditingPost(null);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content || !formData.author_name || !formData.author_email) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    const slug = generateSlug(formData.title);
    
    try {
      const postData = {
        ...formData,
        slug,
        published_at: formData.published ? new Date().toISOString() : null,
      };

      if (editingPost) {
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);

        if (updateError) throw updateError;
        
        toast({
          title: 'Sucesso!',
          description: 'Post atualizado com sucesso.',
        });
      } else {
        const { error: insertError } = await supabase
          .from('blog_posts')
          .insert([postData]);

        if (insertError) throw insertError;
        
        toast({
          title: 'Sucesso!',
          description: 'Post criado com sucesso.',
        });
      }

      setDialogOpen(false);
      resetForm();
      fetchPosts();
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao salvar post.',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || '',
      author_name: post.author_name,
      author_email: post.author_email,
      published: post.published,
      category_id: post.category_id || '',
      featured_image: post.featured_image || ''
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Sucesso!',
        description: 'Post excluído com sucesso.',
      });
      
      fetchPosts();
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao excluir post.',
        variant: 'destructive',
      });
    }
  };

  const togglePublished = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          published: !post.published,
          published_at: !post.published ? new Date().toISOString() : null
        })
        .eq('id', post.id);

      if (error) throw error;

      toast({
        title: 'Sucesso!',
        description: `Post ${!post.published ? 'publicado' : 'despublicado'} com sucesso.`,
      });
      
      fetchPosts();
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao alterar status do post.',
        variant: 'destructive',
      });
    }
  };

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">
            {loading ? 'Carregando...' : 'Verificando permissões...'}
          </p>
        </div>
      </div>
    );
  }

  // Show access denied if user is not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <InteractiveBackground />
        <Header />
        
        <main className="relative z-10 pt-20 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Acesso negado. Você não tem permissão para acessar esta área.
                </AlertDescription>
              </Alert>
              
              <div className="text-center mt-8">
                <Button onClick={() => navigate('/')} variant="outline">
                  Voltar ao início
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <InteractiveBackground />
      <Header />
      
      <main className="relative z-10 pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => navigate('/admin')}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className="font-tektur text-3xl font-bold text-foreground">
                    Gerenciar Blog
                  </h1>
                  <p className="font-sora text-muted-foreground">
                    Crie e gerencie os artigos do blog
                  </p>
                </div>
              </div>
              
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingPost ? 'Editar Post' : 'Criar Novo Post'}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Título *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          placeholder="Título do post"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="excerpt">Resumo</Label>
                        <Textarea
                          id="excerpt"
                          value={formData.excerpt}
                          onChange={(e) => handleInputChange('excerpt', e.target.value)}
                          placeholder="Breve descrição do post"
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="author_name">Nome do Autor *</Label>
                        <Input
                          id="author_name"
                          value={formData.author_name}
                          onChange={(e) => handleInputChange('author_name', e.target.value)}
                          placeholder="Nome do autor"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="author_email">Email do Autor *</Label>
                        <Input
                          id="author_email"
                          type="email"
                          value={formData.author_email}
                          onChange={(e) => handleInputChange('author_email', e.target.value)}
                          placeholder="email@exemplo.com"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="category">Categoria</Label>
                        <Select
                          value={formData.category_id}
                          onValueChange={(value) => handleInputChange('category_id', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="featured_image">URL da Imagem</Label>
                        <Input
                          id="featured_image"
                          value={formData.featured_image}
                          onChange={(e) => handleInputChange('featured_image', e.target.value)}
                          placeholder="https://exemplo.com/imagem.jpg"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="published"
                          checked={formData.published}
                          onCheckedChange={(checked) => handleInputChange('published', checked)}
                        />
                        <Label htmlFor="published">Publicar imediatamente</Label>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="content">Conteúdo *</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => handleInputChange('content', e.target.value)}
                        placeholder="Conteúdo do post"
                        rows={20}
                        className="min-h-[400px]"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSave}>
                      {editingPost ? 'Atualizar' : 'Criar'} Post
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Posts List */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Carregando posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum post encontrado.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    {post.featured_image && (
                      <img 
                        src={post.featured_image} 
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    )}
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant={post.published ? "default" : "secondary"}>
                          {post.published ? 'Publicado' : 'Rascunho'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        Por {post.author_name}
                      </p>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => togglePublished(post)}
                        >
                          {post.published ? 'Despublicar' : 'Publicar'}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEdit(post)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminBlog;