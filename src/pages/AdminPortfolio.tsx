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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Edit, Plus, Trash2, Star, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  service_type: string;
  client_name: string;
  project_url: string;
  technologies: string[];
  featured: boolean;
}

interface Testimonial {
  id: string;
  client_name: string;
  client_company: string;
  client_position: string;
  content: string;
  rating: number;
  image_url: string;
  featured: boolean;
}

const AdminPortfolio = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [portfolioDialogOpen, setPortfolioDialogOpen] = useState(false);
  const [testimonialDialogOpen, setTestimonialDialogOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioItem | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  
  const [portfolioForm, setPortfolioForm] = useState({
    title: '',
    description: '',
    image_url: '',
    category: '',
    service_type: '',
    client_name: '',
    project_url: '',
    technologies: '',
    featured: false
  });

  const [testimonialForm, setTestimonialForm] = useState({
    client_name: '',
    client_company: '',
    client_position: '',
    content: '',
    rating: 5,
    image_url: '',
    featured: false
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
      fetchPortfolioItems();
      fetchTestimonials();
    }
  }, [isAdmin, checkingAdmin]);

  const fetchPortfolioItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao carregar itens do portfólio.',
        variant: 'destructive',
      });
    } else {
      setPortfolioItems(data || []);
    }
    setLoading(false);
  };

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao carregar depoimentos.',
        variant: 'destructive',
      });
    } else {
      setTestimonials(data || []);
    }
  };

  const resetPortfolioForm = () => {
    setPortfolioForm({
      title: '',
      description: '',
      image_url: '',
      category: '',
      service_type: '',
      client_name: '',
      project_url: '',
      technologies: '',
      featured: false
    });
    setEditingPortfolio(null);
  };

  const resetTestimonialForm = () => {
    setTestimonialForm({
      client_name: '',
      client_company: '',
      client_position: '',
      content: '',
      rating: 5,
      image_url: '',
      featured: false
    });
    setEditingTestimonial(null);
  };

  const handlePortfolioSave = async () => {
    if (!portfolioForm.title || !portfolioForm.description || !portfolioForm.category) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const portfolioData = {
        ...portfolioForm,
        technologies: portfolioForm.technologies ? portfolioForm.technologies.split(',').map(t => t.trim()) : []
      };

      if (editingPortfolio) {
        const { error } = await supabase
          .from('portfolio_items')
          .update(portfolioData)
          .eq('id', editingPortfolio.id);

        if (error) throw error;
        
        toast({
          title: 'Sucesso!',
          description: 'Item do portfólio atualizado com sucesso.',
        });
      } else {
        const { error } = await supabase
          .from('portfolio_items')
          .insert([portfolioData]);

        if (error) throw error;
        
        toast({
          title: 'Sucesso!',
          description: 'Item do portfólio criado com sucesso.',
        });
      }

      setPortfolioDialogOpen(false);
      resetPortfolioForm();
      fetchPortfolioItems();
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao salvar item do portfólio.',
        variant: 'destructive',
      });
    }
  };

  const handleTestimonialSave = async () => {
    if (!testimonialForm.client_name || !testimonialForm.content) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (editingTestimonial) {
        const { error } = await supabase
          .from('testimonials')
          .update(testimonialForm)
          .eq('id', editingTestimonial.id);

        if (error) throw error;
        
        toast({
          title: 'Sucesso!',
          description: 'Depoimento atualizado com sucesso.',
        });
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([testimonialForm]);

        if (error) throw error;
        
        toast({
          title: 'Sucesso!',
          description: 'Depoimento criado com sucesso.',
        });
      }

      setTestimonialDialogOpen(false);
      resetTestimonialForm();
      fetchTestimonials();
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao salvar depoimento.',
        variant: 'destructive',
      });
    }
  };

  const handlePortfolioEdit = (item: PortfolioItem) => {
    setEditingPortfolio(item);
    setPortfolioForm({
      title: item.title,
      description: item.description || '',
      image_url: item.image_url || '',
      category: item.category,
      service_type: item.service_type || '',
      client_name: item.client_name || '',
      project_url: item.project_url || '',
      technologies: item.technologies ? item.technologies.join(', ') : '',
      featured: item.featured
    });
    setPortfolioDialogOpen(true);
  };

  const handleTestimonialEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setTestimonialForm({
      client_name: testimonial.client_name,
      client_company: testimonial.client_company || '',
      client_position: testimonial.client_position || '',
      content: testimonial.content,
      rating: testimonial.rating || 5,
      image_url: testimonial.image_url || '',
      featured: testimonial.featured
    });
    setTestimonialDialogOpen(true);
  };

  const handlePortfolioDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este item do portfólio?')) return;

    try {
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Sucesso!',
        description: 'Item do portfólio excluído com sucesso.',
      });
      
      fetchPortfolioItems();
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao excluir item do portfólio.',
        variant: 'destructive',
      });
    }
  };

  const handleTestimonialDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este depoimento?')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Sucesso!',
        description: 'Depoimento excluído com sucesso.',
      });
      
      fetchTestimonials();
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao excluir depoimento.',
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
                    Gerenciar Portfólio
                  </h1>
                  <p className="font-sora text-muted-foreground">
                    Gerencie projetos e depoimentos
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="portfolio" className="space-y-8">
              <TabsList>
                <TabsTrigger value="portfolio">Portfólio</TabsTrigger>
                <TabsTrigger value="testimonials">Depoimentos</TabsTrigger>
              </TabsList>

              {/* Portfolio Tab */}
              <TabsContent value="portfolio" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-tektur text-2xl font-bold">Projetos do Portfólio</h2>
                  
                  <Dialog open={portfolioDialogOpen} onOpenChange={setPortfolioDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={resetPortfolioForm}>
                        <Plus className="h-4 w-4 mr-2" />
                        Novo Projeto
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          {editingPortfolio ? 'Editar Projeto' : 'Criar Novo Projeto'}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="portfolio-title">Título *</Label>
                          <Input
                            id="portfolio-title"
                            value={portfolioForm.title}
                            onChange={(e) => setPortfolioForm(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Título do projeto"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="portfolio-category">Categoria *</Label>
                          <Select
                            value={portfolioForm.category}
                            onValueChange={(value) => setPortfolioForm(prev => ({ ...prev, category: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fotografia">Fotografia</SelectItem>
                              <SelectItem value="filmagem">Filmagem</SelectItem>
                              <SelectItem value="design">Design</SelectItem>
                              <SelectItem value="trafego-pago">Tráfego Pago</SelectItem>
                              <SelectItem value="eventos">Eventos</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="portfolio-service">Tipo de Serviço</Label>
                          <Input
                            id="portfolio-service"
                            value={portfolioForm.service_type}
                            onChange={(e) => setPortfolioForm(prev => ({ ...prev, service_type: e.target.value }))}
                            placeholder="Ex: Sessão fotográfica"
                          />
                        </div>

                        <div>
                          <Label htmlFor="portfolio-client">Cliente</Label>
                          <Input
                            id="portfolio-client"
                            value={portfolioForm.client_name}
                            onChange={(e) => setPortfolioForm(prev => ({ ...prev, client_name: e.target.value }))}
                            placeholder="Nome do cliente"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <Label htmlFor="portfolio-description">Descrição *</Label>
                          <Textarea
                            id="portfolio-description"
                            value={portfolioForm.description}
                            onChange={(e) => setPortfolioForm(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Descrição do projeto"
                            rows={3}
                          />
                        </div>

                        <div>
                          <Label htmlFor="portfolio-image">URL da Imagem</Label>
                          <Input
                            id="portfolio-image"
                            value={portfolioForm.image_url}
                            onChange={(e) => setPortfolioForm(prev => ({ ...prev, image_url: e.target.value }))}
                            placeholder="https://exemplo.com/imagem.jpg"
                          />
                        </div>

                        <div>
                          <Label htmlFor="portfolio-url">URL do Projeto</Label>
                          <Input
                            id="portfolio-url"
                            value={portfolioForm.project_url}
                            onChange={(e) => setPortfolioForm(prev => ({ ...prev, project_url: e.target.value }))}
                            placeholder="https://projeto.com"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <Label htmlFor="portfolio-technologies">Tecnologias/Ferramentas</Label>
                          <Input
                            id="portfolio-technologies"
                            value={portfolioForm.technologies}
                            onChange={(e) => setPortfolioForm(prev => ({ ...prev, technologies: e.target.value }))}
                            placeholder="Photoshop, Lightroom, Canon 5D (separado por vírgula)"
                          />
                        </div>

                        <div className="md:col-span-2 flex items-center space-x-2">
                          <Switch
                            id="portfolio-featured"
                            checked={portfolioForm.featured}
                            onCheckedChange={(checked) => setPortfolioForm(prev => ({ ...prev, featured: checked }))}
                          />
                          <Label htmlFor="portfolio-featured">Projeto em destaque</Label>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" onClick={() => setPortfolioDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handlePortfolioSave}>
                          {editingPortfolio ? 'Atualizar' : 'Criar'} Projeto
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Portfolio Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioItems.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow">
                      {item.image_url && (
                        <img 
                          src={item.image_url} 
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      )}
                      <CardHeader>
                        <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{item.category}</Badge>
                          {item.featured && (
                            <Badge variant="default">
                              <Star className="h-3 w-3 mr-1" />
                              Destaque
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                          {item.description}
                        </p>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handlePortfolioEdit(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handlePortfolioDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Testimonials Tab */}
              <TabsContent value="testimonials" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-tektur text-2xl font-bold">Depoimentos de Clientes</h2>
                  
                  <Dialog open={testimonialDialogOpen} onOpenChange={setTestimonialDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={resetTestimonialForm}>
                        <Plus className="h-4 w-4 mr-2" />
                        Novo Depoimento
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          {editingTestimonial ? 'Editar Depoimento' : 'Criar Novo Depoimento'}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="testimonial-name">Nome do Cliente *</Label>
                          <Input
                            id="testimonial-name"
                            value={testimonialForm.client_name}
                            onChange={(e) => setTestimonialForm(prev => ({ ...prev, client_name: e.target.value }))}
                            placeholder="Nome do cliente"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="testimonial-company">Empresa</Label>
                          <Input
                            id="testimonial-company"
                            value={testimonialForm.client_company}
                            onChange={(e) => setTestimonialForm(prev => ({ ...prev, client_company: e.target.value }))}
                            placeholder="Nome da empresa"
                          />
                        </div>

                        <div>
                          <Label htmlFor="testimonial-position">Cargo</Label>
                          <Input
                            id="testimonial-position"
                            value={testimonialForm.client_position}
                            onChange={(e) => setTestimonialForm(prev => ({ ...prev, client_position: e.target.value }))}
                            placeholder="Cargo do cliente"
                          />
                        </div>

                        <div>
                          <Label htmlFor="testimonial-rating">Avaliação</Label>
                          <Select
                            value={testimonialForm.rating.toString()}
                            onValueChange={(value) => setTestimonialForm(prev => ({ ...prev, rating: parseInt(value) }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 Estrela</SelectItem>
                              <SelectItem value="2">2 Estrelas</SelectItem>
                              <SelectItem value="3">3 Estrelas</SelectItem>
                              <SelectItem value="4">4 Estrelas</SelectItem>
                              <SelectItem value="5">5 Estrelas</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="md:col-span-2">
                          <Label htmlFor="testimonial-content">Depoimento *</Label>
                          <Textarea
                            id="testimonial-content"
                            value={testimonialForm.content}
                            onChange={(e) => setTestimonialForm(prev => ({ ...prev, content: e.target.value }))}
                            placeholder="Conteúdo do depoimento"
                            rows={4}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <Label htmlFor="testimonial-image">URL da Foto do Cliente</Label>
                          <Input
                            id="testimonial-image"
                            value={testimonialForm.image_url}
                            onChange={(e) => setTestimonialForm(prev => ({ ...prev, image_url: e.target.value }))}
                            placeholder="https://exemplo.com/foto.jpg"
                          />
                        </div>

                        <div className="md:col-span-2 flex items-center space-x-2">
                          <Switch
                            id="testimonial-featured"
                            checked={testimonialForm.featured}
                            onCheckedChange={(checked) => setTestimonialForm(prev => ({ ...prev, featured: checked }))}
                          />
                          <Label htmlFor="testimonial-featured">Depoimento em destaque</Label>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" onClick={() => setTestimonialDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleTestimonialSave}>
                          {editingTestimonial ? 'Atualizar' : 'Criar'} Depoimento
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          {testimonial.image_url && (
                            <img 
                              src={testimonial.image_url} 
                              alt={testimonial.client_name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          )}
                          <div>
                            <CardTitle className="text-lg">{testimonial.client_name}</CardTitle>
                            {testimonial.client_company && (
                              <p className="text-sm text-muted-foreground">
                                {testimonial.client_position} - {testimonial.client_company}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(testimonial.rating || 5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                            ))}
                          </div>
                          {testimonial.featured && (
                            <Badge variant="default">
                              <Star className="h-3 w-3 mr-1" />
                              Destaque
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-4 mb-4">
                          "{testimonial.content}"
                        </p>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleTestimonialEdit(testimonial)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleTestimonialDelete(testimonial.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPortfolio;