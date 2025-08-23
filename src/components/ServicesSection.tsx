import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Camera, 
  Video, 
  Edit3, 
  Palette, 
  TrendingUp, 
  FileText, 
  Play, 
  Calendar 
} from 'lucide-react';
import { useFacebookPixel } from '@/hooks/useFacebookPixel'; // Importação do hook

const ServicesSection = () => {
  const services = [
    {
      icon: Camera,
      title: 'Fotografia',
      description: 'Capturamos momentos únicos com técnica e criatividade profissional.'
    },
    {
      icon: Video,
      title: 'Filmagem',
      description: 'Produção audiovisual completa para suas necessidades corporativas.'
    },
    {
      icon: Edit3,
      title: 'Edição',
      description: 'Pós-produção de alta qualidade para fotos e vídeos.'
    },
    {
      icon: Palette,
      title: 'Design Gráfico',
      description: 'Identidade visual e materiais gráficos que comunicam sua marca.'
    },
    {
      icon: TrendingUp,
      title: 'Tráfego Pago',
      description: 'Estratégias de marketing digital para maximizar seu alcance.'
    },
    {
      icon: FileText,
      title: 'Criação de Conteúdo',
      description: 'Conteúdo estratégico para todas as suas plataformas digitais.'
    },
    {
      icon: Play,
      title: 'Storymaker',
      description: 'Narrativas envolventes que conectam sua marca ao público.'
    },
    {
      icon: Calendar,
      title: 'Cobertura de Eventos',
      description: 'Registro completo dos seus eventos mais importantes.'
    }
  ];

  // Inicializar o Meta Pixel e rastrear PageView
  useFacebookPixel('1891681904727826');

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-lg mb-6 geometric-cut">
            <span className="font-tektur text-xl font-bold text-primary-foreground">n.</span>
          </div>
          <h2 className="font-tektur text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nossos Serviços
          </h2>
          <p className="font-sora text-lg text-muted-foreground max-w-2xl mx-auto">
            Oferecemos soluções completas para elevar sua marca no mercado digital
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20"
            >
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="font-sora text-lg font-semibold text-foreground">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-sora text-sm text-muted-foreground text-center leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="text-center">
                  <a 
                    href={`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                    onClick={() => useFacebookPixel('1891681904727826').trackCustomEvent('Click', {
                      content_name: `${service.title} Details`,
                      content_category: 'Services',
                    })}
                  >
                    Saiba mais
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-primary/10 rounded-2xl p-8 geometric-cut max-w-3xl mx-auto">
            <h3 className="font-tektur text-2xl md:text-3xl font-bold text-foreground mb-4">
              Pronto para começar seu projeto?
            </h3>
            <p className="font-sora text-muted-foreground mb-6">
              Entre em contato conosco e descubra como podemos transformar suas ideias em realidade.
            </p>
            <a 
              href="https://wa.me/5547984869151/?text=Quero saber mais sobre a Nooma...."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-sora font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              onClick={() => useFacebookPixel('1891681904727826').trackCustomEvent('Click', {
                content_name: 'Request Quote',
                content_category: 'Call to Action',
              })}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Solicitar Orçamento
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
