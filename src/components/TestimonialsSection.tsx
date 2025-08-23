import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';
import { useFacebookPixel } from '@/hooks/useFacebookPixel'; // Importação do hook

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

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  loading: boolean;
}

const TestimonialsSection = ({ testimonials, loading }: TestimonialsSectionProps) => {
  // Inicializar o Meta Pixel e rastrear PageView
  useFacebookPixel('1891681904727826');

  if (loading) {
    return (
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-muted rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                    <div className="h-3 bg-muted rounded w-4/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const featuredTestimonials = testimonials.filter(t => t.featured);
  const displayTestimonials = featuredTestimonials.length > 0 ? featuredTestimonials : testimonials.slice(0, 6);

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">O que nossos clientes dizem</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Confira os depoimentos de alguns dos nossos clientes satisfeitos
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/20 absolute top-4 right-4" />
                
                {/* Client Info */}
                <div className="flex items-center gap-3 mb-4">
                  {testimonial.image_url ? (
                    <img
                      src={testimonial.image_url}
                      alt={testimonial.client_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold">
                        {testimonial.client_name.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h4 className="font-semibold">{testimonial.client_name}</h4>
                    {testimonial.client_position && (
                      <p className="text-sm text-muted-foreground">
                        {testimonial.client_position}
                        {testimonial.client_company && ` - ${testimonial.client_company}`}
                      </p>
                    )}
                  </div>
                  
                  {testimonial.featured && (
                    <Badge variant="secondary" className="text-xs">
                      Destaque
                    </Badge>
                  )}
                </div>

                {/* Rating */}
                {testimonial.rating && (
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Content */}
                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {displayTestimonials.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhum depoimento disponível no momento.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
