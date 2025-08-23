import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFacebookPixel } from '@/hooks/useFacebookPixel'; // Importação do hook

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

interface PortfolioGalleryProps {
  items: PortfolioItem[];
  loading: boolean;
}

const PortfolioGallery = ({ items, loading }: PortfolioGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<string>('all');

  // Inicializar o Meta Pixel e rastrear PageView
  useFacebookPixel('1891681904727826');

  // Get unique categories and services
  const categories = ['all', ...new Set(items.map(item => item.category))];
  const services = ['all', ...new Set(items.map(item => item.service_type).filter(Boolean))];

  // Filter items
  const filteredItems = items.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const serviceMatch = selectedService === 'all' || item.service_type === selectedService;
    return categoryMatch && serviceMatch;
  });

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-0">
                  <div className="h-48 bg-muted rounded-t-lg"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Galeria de Trabalhos</h2>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filtros:</span>
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Categorias</SelectItem>
              {categories.slice(1).map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Serviço" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos Serviços</SelectItem>
              {services.slice(1).map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                {item.image_url && (
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.featured && (
                      <Badge className="absolute top-2 right-2 bg-primary">
                        Destaque
                      </Badge>
                    )}
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    {item.project_url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          window.open(item.project_url, '_blank');
                          useFacebookPixel('1891681904727826').trackCustomEvent('Click', {
                            content_name: `${item.title} Project Link`,
                            content_category: 'Portfolio',
                          });
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{item.category}</Badge>
                      {item.service_type && (
                        <Badge variant="outline">{item.service_type}</Badge>
                      )}
                    </div>
                    
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {item.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {item.client_name && (
                      <p className="text-sm text-muted-foreground">
                        Cliente: {item.client_name}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhum projeto encontrado com os filtros selecionados.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioGallery;
