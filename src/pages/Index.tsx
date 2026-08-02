import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import StoryScrollSection from '@/components/sections/StoryScrollSection';
import CapabilitiesSection from '@/components/sections/CapabilitiesSection';
import WhySection from '@/components/sections/WhySection';
import PageTransition from '@/components/PageTransition';

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <StoryScrollSection />
          <CapabilitiesSection />
          <WhySection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
