import { Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img 
                src="/lovable-uploads/dbf13934-02b2-40e9-922b-e6c1c1dbab1b.png" 
                alt="Agência nooma" 
                className="h-10 w-auto"
              />
            </div>
            <p className="font-sora text-secondary-foreground/80 mb-4">
              Atraímos com propósito.<br />
              Conquistamos com criação.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-tektur text-lg font-bold mb-4">Nossos Serviços</h3>
            <ul className="space-y-2 font-sora text-sm text-secondary-foreground/80">
              <li>Fotografia</li>
              <li>Filmagem</li>
              <li>Design Gráfico</li>
              <li>Tráfego Pago</li>
              <li>Criação de Conteúdo</li>
              <li>Cobertura de Eventos</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-tektur text-lg font-bold mb-4">Contato</h3>
            <div className="space-y-3 font-sora text-sm text-secondary-foreground/80">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contato@agencianooma.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(47) 99997-1933</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-secondary-foreground/80">Balneário Camboriú, SC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-secondary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="font-sora text-sm text-secondary-foreground/60 mb-2 sm:mb-0">
              © 2024 Agência nooma. Todos os direitos reservados.
            </p>
            <a 
              href="/admin" 
              className="font-sora text-xs text-secondary-foreground/40 hover:text-secondary-foreground/60 transition-colors"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;