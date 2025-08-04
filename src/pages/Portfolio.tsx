import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteractiveBackground from '@/components/InteractiveBackground';
import BackToTop from '@/components/BackToTop';
import PortfolioGallery from '@/components/PortfolioGallery';
import TestimonialsSection from '@/components/TestimonialsSection';
import { supabase } from '@/integrations/supabase/client';

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portfolioResponse, testimonialsResponse] = await Promise.all([
          supabase.from('portfolio_items').select('*').order('created_at', { ascending: false }),
          supabase.from('testimonials').select('*').order('created_at', { ascending: false })
        ]);

        if (portfolioResponse.data) setPortfolioItems(portfolioResponse.data);
        if (testimonialsResponse.data) setTestimonials(testimonialsResponse.data);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen relative">
      <InteractiveBackground />
      <div className="relative z-10">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Nosso Portfólio
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Conheça alguns dos projetos que desenvolvemos e as experiências dos nossos clientes
            </p>
          </div>
        </section>

        {/* Portfolio Gallery */}
        <PortfolioGallery items={portfolioItems} loading={loading} />

        {/* Testimonials */}
        <TestimonialsSection testimonials={testimonials} loading={loading} />

        <Footer />
      </div>
      <BackToTop />
    </div>
  );
};

export default Portfolio;