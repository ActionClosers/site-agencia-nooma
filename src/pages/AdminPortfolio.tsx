import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit, Plus, Star } from 'lucide-react';

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
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('portfolio');
  const { toast } = useToast();

  // Portfolio form state
  const [portfolioForm, setPortfolioForm] = useState({
    id: '',
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

  // Testimonial form state
  const [testimonialForm, setTestimonialForm] = useState({
    id: '',
    client_name: '',
    client_company: '',
    client_position: '',
    content: '',
    rating: 5,
    image_url: '',
    featured: false
  });

  const [editingPortfolio, setEditingPortfolio] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [portfolioResponse, testimonialsResponse] = await Promise.all([
        supabase.from('portfolio_items').select('*').order('created_at', { ascending: false }),
        supabase.from('testimonials').select('*').order('created_at', { ascending: false })
      ]);

      if (portfolioResponse.data) setPortfolioItems(portfolioResponse.data);
      if (testimonialsResponse.data) setTestimonials(testimonialsResponse.data);
    } catch (error) {
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetPortfolioForm = () => {
    setPortfolioForm({
      id: '',
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
    setEditingPortfolio(false);
  };

  const resetTestimonialForm = () => {
    setTestimonialForm({
      id: '',
      client_name: '',
      client_company: '',
      client_position: '',
      content: '',
      rating: 5,
      image_url: '',
      featured: false
    });
    setEditingTestimonial(false);
  };

  const handlePortfolioSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const portfolioData = {
      ...portfolioForm,
      technologies: portfolioForm.technologies.split(',').map(tech => tech.trim()).filter(Boolean)
    };

    try {
      if (editingPortfolio) {
        const { error } = await supabase
          .from('portfolio_items')
          .update(portfolioData)
          .eq('id', portfolioForm.id);
        
        if (error) throw error;
        toast({ title: "Sucesso", description: "Item do portfólio atualizado!" });
      } else {
        const { error } = await supabase
          .from('portfolio_items')
          .insert([portfolioData]);
        
        if (error) throw error;
        toast({ title: "Sucesso", description: "Item do portfólio criado!" });
      }
      
      resetPortfolioForm();
      fetchData();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar item do portfólio",
        variant: "destructive",
      });
    }
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingTestimonial) {
        const { error } = await supabase
          .from('testimonials')
          .update(testimonialForm)
          .eq('id', testimonialForm.id);
        
        if (error) throw error;
        toast({ title: "Sucesso", description: "Depoimento atualizado!" });
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([testimonialForm]);
        
        if (error) throw error;
        toast({ title: "Sucesso", description: "Depoimento criado!" });
      }
      
      resetTestimonialForm();
      fetchData();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar depoimento",
        variant: "destructive",
      });
    }
  };

  const editPortfolioItem = (item: PortfolioItem) => {
    setPortfolioForm({
      ...item,
      technologies: item.technologies.join(', ')
    });
    setEditingPortfolio(true);
  };

  const editTestimonial = (testimonial: Testimonial) => {
    setTestimonialForm(testimonial);
    setEditingTestimonial(true);
  };

  const deletePortfolioItem = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este item?')) return;
    
    try {
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: "Sucesso", description: "Item do portfólio excluído!" });
      fetchData();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir item",
        variant: "destructive",
      });
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este depoimento?')) return;
    
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: "Sucesso", description: "Depoimento excluído!" });
      fetchData();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir depoimento",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="container mx-auto p-8">Carregando...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Administração - Portfólio</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="portfolio">Portfólio</TabsTrigger>
          <TabsTrigger value="testimonials">Depoimentos</TabsTrigger>
        </TabsList>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Portfolio Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  {editingPortfolio ? 'Editar Item' : 'Novo Item do Portfólio'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePortfolioSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={portfolioForm.title}
                      onChange={(e) => setPortfolioForm({...portfolioForm, title: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={portfolioForm.description}
                      onChange={(e) => setPortfolioForm({...portfolioForm, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="image_url">URL da Imagem</Label>
                    <Input
                      id="image_url"
                      value={portfolioForm.image_url}
                      onChange={(e) => setPortfolioForm({...portfolioForm, image_url: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Categoria</Label>
                      <Input
                        id="category"
                        value={portfolioForm.category}
                        onChange={(e) => setPortfolioForm({...portfolioForm, category: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="service_type">Tipo de Serviço</Label>
                      <Input
                        id="service_type"
                        value={portfolioForm.service_type}
                        onChange={(e) => setPortfolioForm({...portfolioForm, service_type: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="client_name">Cliente</Label>
                      <Input
                        id="client_name"
                        value={portfolioForm.client_name}
                        onChange={(e) => setPortfolioForm({...portfolioForm, client_name: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="project_url">URL do Projeto</Label>
                      <Input
                        id="project_url"
                        value={portfolioForm.project_url}
                        onChange={(e) => setPortfolioForm({...portfolioForm, project_url: e.target.value})}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="technologies">Tecnologias (separadas por vírgula)</Label>
                    <Input
                      id="technologies"
                      value={portfolioForm.technologies}
                      onChange={(e) => setPortfolioForm({...portfolioForm, technologies: e.target.value})}
                      placeholder="React, Node.js, PostgreSQL"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={portfolioForm.featured}
                      onCheckedChange={(checked) => setPortfolioForm({...portfolioForm, featured: checked})}
                    />
                    <Label htmlFor="featured">Item em destaque</Label>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      {editingPortfolio ? 'Atualizar' : 'Criar'} Item
                    </Button>
                    {editingPortfolio && (
                      <Button type="button" variant="outline" onClick={resetPortfolioForm}>
                        Cancelar
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Portfolio List */}
            <Card>
              <CardHeader>
                <CardTitle>Itens do Portfólio ({portfolioItems.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {portfolioItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      {item.image_url && (
                        <img src={item.image_url} alt={item.title} className="w-16 h-16 object-cover rounded" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">{item.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                        <div className="flex gap-1 mt-1">
                          <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                          {item.featured && <Badge className="text-xs">Destaque</Badge>}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => editPortfolioItem(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => deletePortfolioItem(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Testimonials Tab */}
        <TabsContent value="testimonials">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Testimonial Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  {editingTestimonial ? 'Editar Depoimento' : 'Novo Depoimento'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="client_name">Nome do Cliente</Label>
                    <Input
                      id="client_name"
                      value={testimonialForm.client_name}
                      onChange={(e) => setTestimonialForm({...testimonialForm, client_name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="client_company">Empresa</Label>
                      <Input
                        id="client_company"
                        value={testimonialForm.client_company}
                        onChange={(e) => setTestimonialForm({...testimonialForm, client_company: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="client_position">Cargo</Label>
                      <Input
                        id="client_position"
                        value={testimonialForm.client_position}
                        onChange={(e) => setTestimonialForm({...testimonialForm, client_position: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="content">Depoimento</Label>
                    <Textarea
                      id="content"
                      value={testimonialForm.content}
                      onChange={(e) => setTestimonialForm({...testimonialForm, content: e.target.value})}
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rating">Avaliação (1-5)</Label>
                      <Input
                        id="rating"
                        type="number"
                        min="1"
                        max="5"
                        value={testimonialForm.rating}
                        onChange={(e) => setTestimonialForm({...testimonialForm, rating: parseInt(e.target.value)})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="testimonial_image_url">URL da Foto</Label>
                      <Input
                        id="testimonial_image_url"
                        value={testimonialForm.image_url}
                        onChange={(e) => setTestimonialForm({...testimonialForm, image_url: e.target.value})}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="testimonial_featured"
                      checked={testimonialForm.featured}
                      onCheckedChange={(checked) => setTestimonialForm({...testimonialForm, featured: checked})}
                    />
                    <Label htmlFor="testimonial_featured">Depoimento em destaque</Label>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      {editingTestimonial ? 'Atualizar' : 'Criar'} Depoimento
                    </Button>
                    {editingTestimonial && (
                      <Button type="button" variant="outline" onClick={resetTestimonialForm}>
                        Cancelar
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Testimonials List */}
            <Card>
              <CardHeader>
                <CardTitle>Depoimentos ({testimonials.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      {testimonial.image_url ? (
                        <img src={testimonial.image_url} alt={testimonial.client_name} className="w-12 h-12 object-cover rounded-full" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-semibold">{testimonial.client_name.charAt(0)}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold">{testimonial.client_name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.client_company}</p>
                        <p className="text-sm line-clamp-2 mt-1">"{testimonial.content}"</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground/30'
                                }`}
                              />
                            ))}
                          </div>
                          {testimonial.featured && <Badge className="text-xs">Destaque</Badge>}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => editTestimonial(testimonial)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => deleteTestimonial(testimonial.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPortfolio;