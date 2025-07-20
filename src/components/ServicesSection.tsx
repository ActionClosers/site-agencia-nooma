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
                <p className="font-sora text-sm text-muted-foreground text-center leading-relaxed">
                  {service.description}
                </p>
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
            <button className="bg-primary text-primary-foreground font-sora font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
              Solicitar Orçamento
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;