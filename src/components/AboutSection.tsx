import { useCounterAnimation } from '@/hooks/useCounterAnimation';

const AboutSection = () => {
  const { count: projectsCount, elementRef: projectsRef } = useCounterAnimation(100, 2000);
  const { count: yearsCount, elementRef: yearsRef } = useCounterAnimation(5, 2000);
  const { count: clientsCount, elementRef: clientsRef } = useCounterAnimation(50, 2000);
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="mb-8">
              <h2 className="font-tektur text-4xl md:text-5xl font-bold text-foreground mb-6">
                Sobre a <span className="text-primary">nooma</span>
              </h2>
              <div className="w-16 h-1 bg-primary mb-6"></div>
            </div>

            <div className="space-y-6">
              <p className="font-sora text-lg text-muted-foreground leading-relaxed">
                A agência nooma nasce da união entre propósito e criatividade. Nosso nome, 
                derivado do grego πνεῦμα (pneuma), significa "sopro de vida" ou "sopro de espírito", 
                representando nossa essência: dar vida às marcas através da comunicação visual.
              </p>

              <p className="font-sora text-lg text-muted-foreground leading-relaxed">
                Combinamos estratégia, design e tecnologia para criar experiências que não apenas 
                atraem, mas conquistam e fidelizam. Cada projeto é uma oportunidade de transformar 
                ideias em realidades visuais impactantes.
              </p>

              <div className="bg-primary/10 p-6 rounded-lg geometric-cut">
                <h3 className="font-tektur text-xl font-bold text-foreground mb-3">
                  Nossa Missão
                </h3>
                <p className="font-sora text-muted-foreground">
                  Elevar marcas através de soluções criativas que geram conexão genuína 
                  entre empresas e seus públicos, sempre com foco em resultados mensuráveis.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Main geometric shape */}
              <div className="w-80 h-80 bg-primary geometric-cut mx-auto relative">
                <div className="absolute inset-8 bg-background geometric-cut-reverse flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-tektur text-6xl font-bold text-foreground mb-2">n.</div>
                    <div className="font-sora text-sm text-muted-foreground">sopro de vida</div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-secondary geometric-cut animate-float opacity-80"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary geometric-cut-reverse animate-float opacity-60" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>

        {/* Stats or Values */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div ref={projectsRef} className="font-tektur text-4xl font-bold text-primary mb-2">
              {projectsCount}<span className="inline-block">+</span>
            </div>
            <div className="font-sora text-muted-foreground">Projetos Realizados</div>
          </div>
          <div className="text-center">
            <div ref={yearsRef} className="font-tektur text-4xl font-bold text-primary mb-2">
              {yearsCount}<span className="inline-block">+</span>
            </div>
            <div className="font-sora text-muted-foreground">Anos de Experiência</div>
          </div>
          <div className="text-center">
            <div ref={clientsRef} className="font-tektur text-4xl font-bold text-primary mb-2">
              {clientsCount}<span className="inline-block">+</span>
            </div>
            <div className="font-sora text-muted-foreground">Clientes Satisfeitos</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;