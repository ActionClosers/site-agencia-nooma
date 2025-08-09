import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteractiveBackground from '@/components/InteractiveBackground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Image, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <InteractiveBackground />
      <Header />
      
      <main className="relative z-10 pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="font-tektur text-4xl font-bold text-foreground mb-4">
                Painel Administrativo
              </h1>
              <p className="font-sora text-muted-foreground text-lg">
                Bem-vindo ao painel de administração da Agência nooma
              </p>
            </div>

            {/* Admin Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Blog Management */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-primary" />
                    Gerenciar Blog
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Crie, edite e publique artigos do blog.
                  </p>
                  <Button 
                    onClick={() => navigate('/admin/blog')}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Acessar Blog
                  </Button>
                </CardContent>
              </Card>

              {/* Portfolio Management */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Image className="h-6 w-6 text-primary" />
                    Gerenciar Portfólio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Adicione projetos e depoimentos de clientes.
                  </p>
                  <Button 
                    onClick={() => navigate('/admin/portfolio')}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Acessar Portfólio
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Back to Home */}
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                Voltar ao Site
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;