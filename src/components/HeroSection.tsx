import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary geometric-cut animate-float opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary geometric-cut-reverse animate-float opacity-10"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary geometric-cut animate-float opacity-15" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Brand Identity */}
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src="/lovable-uploads/dbf13934-02b2-40e9-922b-e6c1c1dbab1b.png" 
                alt="Agência nooma" 
                className="h-16 md:h-24 lg:h-32 w-auto"
              />
            </div>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          </div>

          {/* Tagline */}
          <div className="mb-12">
            <p className="font-sora text-xl md:text-2xl lg:text-3xl font-semibold text-foreground leading-relaxed">
              Atraímos com propósito.<br />
              <span className="text-primary">Conquistamos com criação.</span>
            </p>
          </div>

          {/* Description */}
          <div className="mb-12">
            <p className="font-sora text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Derivado do grego [πνεῦμα] que significa "Sopro de Vida" ou "Sopro de Espírito"
            </p>
            <p className="font-sora text-sm md:text-base text-muted-foreground mt-2">
              Se pronuncia "NUMA"
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/services"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                className="font-sora font-semibold px-8 py-6 text-lg group"
              >
                Conheça Nossos Serviços
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a 
              href="https://wa.me/5547999971933/?text=Quero saber mais sobre a Nooma...."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="inline-flex items-center gap-2 font-sora font-semibold px-8 py-6 text-lg border-2 border-foreground hover:bg-foreground hover:text-background"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Fale Conosco
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom geometric accent */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/5 to-transparent"></div>
    </section>
  );
};

export default HeroSection;