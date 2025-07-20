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
            <h1 className="font-tektur text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4">
              Agência <span className="text-primary">nooma</span>
            </h1>
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
            <Button 
              size="lg" 
              className="font-sora font-semibold px-8 py-6 text-lg group"
            >
              Conheça Nossos Serviços
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="font-sora font-semibold px-8 py-6 text-lg border-2 border-foreground hover:bg-foreground hover:text-background"
            >
              Fale Conosco
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom geometric accent */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/5 to-transparent"></div>
    </section>
  );
};

export default HeroSection;