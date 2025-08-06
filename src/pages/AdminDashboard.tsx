import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteractiveBackground from '@/components/InteractiveBackground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Image, LogOut, Plus, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';


const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and is admin
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      
      setUser(user);
      
      // Check if user is admin
      try {
        const { data, error } = await supabase
          .rpc('is_current_user_admin');
        
        if (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(data);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      }
      
      setCheckingAdmin(false);
      setLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao fazer logout.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Logout realizado',
        description: 'Até logo!',
      });
      navigate('/');
    }
  };

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">
            {loading ? 'Carregando...' : 'Verificando permissões...'}
          </p>
        </div>
      </div>
    );
  }

  // Show access denied if user is not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <InteractiveBackground />
        <Header />
        
        <main className="relative z-10 pt-20 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Acesso negado. Você não tem permissão para acessar esta área.
                </AlertDescription>
              </Alert>
              
              <div className="text-center mt-8">
                <Button onClick={() => navigate('/')} variant="outline">
                  Voltar ao início
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
                Bem-vindo, {user?.email}
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

            {/* Future Features Placeholder */}
            <div className="text-center mb-8">
              <p className="text-muted-foreground">
                Mais funcionalidades administrativas serão adicionadas aqui no futuro.
              </p>
            </div>

            {/* Logout */}
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;