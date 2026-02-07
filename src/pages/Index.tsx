import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import CitySceneSection from '@/components/sections/CitySceneSection';
import CapabilitiesSection from '@/components/sections/CapabilitiesSection';
import WhySection from '@/components/sections/WhySection';
import CTASection from '@/components/sections/CTASection';
import PageTransition from '@/components/PageTransition';

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <CitySceneSection />
          <CapabilitiesSection />
          <WhySection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
