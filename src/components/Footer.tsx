import { Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="font-tektur text-3xl font-bold mb-4">
              Agência <span className="text-primary">nooma</span>
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
                <span>(11) 99999-9999</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
          <p className="font-sora text-sm text-secondary-foreground/60">
            © 2024 Agência nooma. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;