import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteractiveBackground from '@/components/InteractiveBackground';

const Services = () => {
  const { toast } = useToast();

  const quickNavItems = [
    { name: 'Complementos para Sites', href: '#complementos-essenciais-para-sites' },
    { name: 'Marketing Digital', href: '#configuração-de-marketing-digital' },
    { name: 'Estratégias', href: '#estratégias-de-marketing-digital' },
    { name: 'Criação de Conteúdo', href: '#criação-de-conteúdo' },
    { name: 'Design', href: '#design-e-experiência-digital' },
    { name: 'Branding', href: '#gestão-de-marcas-branding' },
    { name: 'Performance', href: '#performance-e-resultados' },
    { name: 'Personalizados', href: '#soluções-personalizadas' },
    { name: 'Adicionais', href: '#itens-adicionais' }
  ];

  const trackServiceClick = async (serviceName: string) => {
    try {
      await supabase
        .from('service_clicks')
        .insert({
          service_name: serviceName,
          user_ip: null, // Could be populated with actual IP if needed
          user_agent: navigator.userAgent
        });
    } catch (error) {
      console.error('Error tracking service click:', error);
    }
  };

  const handleServiceClick = (serviceName: string) => {
    trackServiceClick(serviceName);
    toast({
      title: "Interesse registrado!",
      description: `Obrigado pelo interesse em ${serviceName}. Entre em contato para mais informações.`,
    });
  };

  const services = [
    {
      category: "Complementos Essenciais para Sites",
      items: [
        {
          title: "Domínio",
          description: "Criamos um endereço único para seu site, reforçando sua marca online. Um domínio próprio transmite credibilidade e profissionalismo para seus clientes."
        },
        {
          title: "Hospedagem",
          description: "Garantimos seu site sempre rápido e disponível para os clientes. Nossa hospedagem oferece alta performance e suporte técnico especializado."
        },
        {
          title: "Certificado SSL",
          description: "Adicionamos segurança com HTTPS, aumentando a confiança dos visitantes. Protegemos os dados dos seus clientes e melhoramos seu posicionamento no Google."
        }
      ]
    },
    {
      category: "Configuração de Marketing Digital",
      items: [
        {
          title: "Setup de Business Manager, Conta de Anúncio, Verificação de Domínio, Pixel e Integração de Canais",
          description: "Configuramos suas campanhas no Facebook, Instagram e WhatsApp, com ferramentas profissionais para anúncios que atingem o público certo. Estruturamos tudo para máxima eficiência."
        }
      ]
    },
    {
      category: "Estratégias de Marketing Digital",
      items: [
        {
          title: "Planejamento Estratégico de Marketing Digital",
          description: "Criamos um plano personalizado para atrair clientes e alcançar seus objetivos. Definimos táticas específicas baseadas no seu mercado e público-alvo."
        },
        {
          title: "Gestão de Campanhas de Anúncios (PPC)",
          description: "Gerenciamos anúncios pagos para colocar sua marca na frente de quem importa. Otimizamos constantemente para maximizar seu retorno sobre investimento."
        },
        {
          title: "Otimização de SEO",
          description: "Otimizamos seu site para aparecer no topo do Google. Aumentamos sua visibilidade orgânica e atraímos clientes qualificados para seu negócio."
        },
        {
          title: "Estratégia de Redes Sociais",
          description: "Planejamos conteúdo para engajar seu público nas redes. Criamos uma presença digital consistente que gera conexão e converte seguidores em clientes."
        }
      ]
    },
    {
      category: "Criação de Conteúdo",
      items: [
        {
          title: "Produção de Conteúdo para Blog",
          description: "Escrevemos artigos que atraem visitantes e mostram sua expertise. Conteúdo otimizado para SEO que posiciona sua marca como autoridade no mercado."
        },
        {
          title: "Storytelling de Marca",
          description: "Contamos a história da sua marca para criar conexões emocionais. Desenvolvemos narrativas que humanizam seu negócio e geram identificação com o público."
        },
        {
          title: "Posts Simples",
          description: "Criamos posts visuais para manter sua marca ativa nas redes. Design atrativo e mensagens estratégicas que engajam e convertem."
        },
        {
          title: "Carrossel",
          description: "Produzimos carrosséis que engajam e contam histórias completas. Formato interativo que mantém a audiência envolvida e aumenta o alcance."
        },
        {
          title: "Criação de Vídeos",
          description: "Fazemos vídeos promocionais que captam atenção e engajam. Conteúdo audiovisual de impacto que comunica sua mensagem de forma memorável."
        }
      ]
    },
    {
      category: "Design e Experiência Digital",
      items: [
        {
          title: "Desenvolvimento de Site (One-Page)",
          description: "Criamos sites modernos de uma página, perfeitos para apresentar sua marca. Design responsivo e otimizado para conversão em todos os dispositivos."
        },
        {
          title: "Desenvolvimento de Landing Page",
          description: "Desenvolvemos páginas focadas em converter visitantes em clientes. Estrutura estratégica que guia o usuário até a ação desejada."
        },
        {
          title: "Design de Interface (UI/UX)",
          description: "Projetamos interfaces fáceis de usar e visualmente atraentes. Experiência do usuário otimizada que facilita a navegação e aumenta conversões."
        }
      ]
    },
    {
      category: "Gestão de Marcas (Branding)",
      items: [
        {
          title: "Criação de Identidade Visual",
          description: "Desenvolvemos logos, cores e tipografia para destacar sua marca. Identidade coesa que comunica seus valores e diferencia você da concorrência."
        },
        {
          title: "Posicionamento de Marca",
          description: "Definimos o tom e os valores da sua marca para se diferenciar. Estratégia clara que conecta com seu público e fortalece sua presença no mercado."
        }
      ]
    },
    {
      category: "Performance e Resultados",
      items: [
        {
          title: "Análise de Dados e Relatórios",
          description: "Fornecemos relatórios com métricas para otimizar seu marketing. Insights claros que orientam decisões estratégicas para melhor performance."
        },
        {
          title: "Otimização de Conversão (CRO)",
          description: "Ajustamos campanhas para aumentar vendas e cadastros. Testes constantes que identificam oportunidades de melhoria e maximizam resultados."
        }
      ]
    },
    {
      category: "Soluções Personalizadas",
      items: [
        {
          title: "Consultoria Estratégica",
          description: "Oferecemos sessões para alinhar estratégias e impulsionar seu negócio. Orientação especializada que acelera seu crescimento no mercado digital."
        },
        {
          title: "Desenvolvimento de Projeto Personalizado",
          description: "Criamos projetos sob medida, como sites ou campanhas únicas. Soluções customizadas que atendem exatamente às suas necessidades específicas."
        }
      ]
    },
    {
      category: "Itens Adicionais",
      items: [
        {
          title: "Página Extra no Carrossel",
          description: "Adicionamos mais slides para carrosséis mais completos. Maior capacidade de storytelling para comunicar mensagens complexas de forma envolvente."
        },
        {
          title: "Edição Urgente",
          description: "Entregamos serviços em 24 horas para suas necessidades urgentes. Suporte ágil quando você precisa de resultados rápidos sem comprometer a qualidade."
        },
        {
          title: "Pacote Mensal Personalizado",
          description: "Combinamos serviços em planos feitos para você. Solução integrada que otimiza custos e garante consistência na sua estratégia digital."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen relative">
      <InteractiveBackground />
      <div className="relative z-10">
        <Header />
        
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-lg mb-6 geometric-cut">
                <span className="font-tektur text-xl font-bold text-primary-foreground">n.</span>
              </div>
              <h1 className="font-tektur text-4xl md:text-5xl font-bold text-foreground mb-4">
                Nossos Serviços
              </h1>
              <p className="font-sora text-lg text-muted-foreground max-w-2xl mx-auto">
                Soluções personalizadas para levar seu negócio ao próximo nível.
              </p>
            </div>

            {/* Quick Navigation */}
            <div className="mb-16">
              <div className="bg-muted/30 rounded-2xl p-6 max-w-5xl mx-auto">
                <h3 className="font-sora text-lg font-semibold text-foreground mb-4 text-center">
                  Navegação Rápida
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {quickNavItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-foreground hover:text-primary bg-background hover:bg-primary/10 rounded-lg transition-colors border border-border hover:border-primary/20"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Services Categories */}
            {services.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-16" id={category.category.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}>
                <h2 className="font-tektur text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                  {category.category}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((service, serviceIndex) => (
                    <Card 
                      key={serviceIndex}
                      className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20 cursor-pointer"
                      onClick={() => handleServiceClick(service.title)}
                    >
                      <CardHeader>
                        <CardTitle className="font-sora text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {service.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-sora text-sm text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}

            {/* Call to Action */}
            <div className="text-center mt-16">
              <div className="bg-primary/10 rounded-2xl p-8 geometric-cut max-w-3xl mx-auto">
                <h3 className="font-tektur text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Interessado em algum serviço?
                </h3>
                <p className="font-sora text-muted-foreground mb-6">
                  Entre em contato conosco e descubra como podemos transformar suas ideias em realidade.
                </p>
                <a 
                  href="https://wa.me/5547999971933/?text=Quero saber mais sobre a Nooma...."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-sora font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Fale Conosco
                </a>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Services;