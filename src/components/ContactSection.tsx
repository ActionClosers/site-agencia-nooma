import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-tektur text-4xl md:text-5xl font-bold text-foreground mb-4">
            Vamos Conversar?
          </h2>
          <p className="font-sora text-lg text-muted-foreground max-w-2xl mx-auto">
            Entre em contato conosco e descubra como podemos dar vida à sua marca
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="font-tektur text-2xl font-bold text-foreground">
                Solicite seu Orçamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-sora text-sm font-medium text-foreground mb-2 block">
                    Nome
                  </label>
                  <Input placeholder="Seu nome" className="font-sora" />
                </div>
                <div>
                  <label className="font-sora text-sm font-medium text-foreground mb-2 block">
                    E-mail
                  </label>
                  <Input type="email" placeholder="seu@email.com" className="font-sora" />
                </div>
              </div>
              
              <div>
                <label className="font-sora text-sm font-medium text-foreground mb-2 block">
                  Empresa
                </label>
                <Input placeholder="Nome da sua empresa" className="font-sora" />
              </div>
              
              <div>
                <label className="font-sora text-sm font-medium text-foreground mb-2 block">
                  Serviço de Interesse
                </label>
                <Input placeholder="Qual serviço você precisa?" className="font-sora" />
              </div>
              
              <div>
                <label className="font-sora text-sm font-medium text-foreground mb-2 block">
                  Mensagem
                </label>
                <Textarea 
                  placeholder="Conte-nos mais sobre seu projeto..."
                  className="font-sora min-h-[120px]"
                />
              </div>
              
              <Button className="w-full font-sora font-semibold">
                Enviar Mensagem
              </Button>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="font-tektur text-2xl font-bold text-foreground">
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-sora font-medium text-foreground">E-mail</div>
                    <div className="font-sora text-muted-foreground">contato@agencianooma.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-sora font-medium text-foreground">Telefone</div>
                    <div className="font-sora text-muted-foreground">(11) 99999-9999</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-sora font-medium text-foreground">Localização</div>
                    <div className="font-sora text-muted-foreground">São Paulo, SP</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="font-tektur text-2xl font-bold text-foreground">
                  Redes Sociais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="flex items-center justify-center w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center justify-center w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                </div>
                <p className="font-sora text-sm text-muted-foreground mt-4">
                  Siga-nos para acompanhar nossos projetos e novidades
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;