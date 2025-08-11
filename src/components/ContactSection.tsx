import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Instagram, Linkedin, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Definir o tipo dos dados do formulário
interface QuoteFormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Configurar o formulário com react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<QuoteFormData>();

  // Função para enviar os dados para o Supabase
  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    
    try {
      // Inserir dados na tabela quotes do Supabase
      const { error } = await supabase
        .from('quotes')
        .insert([
          {
            name: data.name,
            email: data.email,
            company: data.company || null, // Campo opcional
            service: data.service,
            message: data.message
          }
        ]);

      if (error) {
        throw error;
      }

      // Sucesso! Mostrar mensagem e limpar formulário
      toast({
        title: "✅ Orçamento enviado com sucesso!",
        description: "Recebemos sua solicitação e entraremos em contato em breve.",
      });
      
      // Limpar o formulário
      reset();
      
    } catch (error) {
      console.error('Erro ao enviar orçamento:', error);
      toast({
        variant: "destructive",
        title: "❌ Erro ao enviar orçamento",
        description: "Houve um problema ao enviar sua solicitação. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-sora text-sm font-medium text-foreground mb-2 block">
                      Nome *
                    </label>
                    <Input 
                      placeholder="Seu nome" 
                      className="font-sora" 
                      {...register('name', { 
                        required: 'Nome é obrigatório',
                        minLength: { value: 2, message: 'Nome deve ter pelo menos 2 caracteres' }
                      })}
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="font-sora text-sm font-medium text-foreground mb-2 block">
                      E-mail *
                    </label>
                    <Input 
                      type="email" 
                      placeholder="seu@email.com" 
                      className="font-sora" 
                      {...register('email', { 
                        required: 'E-mail é obrigatório',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'E-mail inválido'
                        }
                      })}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="font-sora text-sm font-medium text-foreground mb-2 block">
                    Empresa
                  </label>
                  <Input 
                    placeholder="Nome da sua empresa (opcional)" 
                    className="font-sora" 
                    {...register('company')}
                  />
                </div>
                
                <div>
                  <label className="font-sora text-sm font-medium text-foreground mb-2 block">
                    Serviço de Interesse *
                  </label>
                  <Input 
                    placeholder="Qual serviço você precisa?" 
                    className="font-sora" 
                    {...register('service', { 
                      required: 'Serviço de interesse é obrigatório' 
                    })}
                  />
                  {errors.service && (
                    <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.service.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="font-sora text-sm font-medium text-foreground mb-2 block">
                    Mensagem *
                  </label>
                  <Textarea 
                    placeholder="Conte-nos mais sobre seu projeto..."
                    className="font-sora min-h-[120px]"
                    {...register('message', { 
                      required: 'Mensagem é obrigatória',
                      minLength: { value: 10, message: 'Mensagem deve ter pelo menos 10 caracteres' }
                    })}
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.message.message}
                    </p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full font-sora font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Enviar Orçamento
                    </>
                  )}
                </Button>
              </form>
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
                    <div className="font-sora text-muted-foreground">contato@agencianooma.com.br</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-sora font-medium text-foreground">Telefone</div>
                    <div className="font-sora text-muted-foreground">(47) 98486-9151</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-sora font-medium text-foreground">Localização</div>
                    <div className="font-sora text-muted-foreground">Balneário Camboriú, SC</div>
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