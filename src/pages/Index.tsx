import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import InteractiveBackground from '@/components/InteractiveBackground';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <InteractiveBackground />
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
