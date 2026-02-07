import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Palette, Code2, Megaphone, Layers } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTASection from '@/components/sections/CTASection';
import PageTransition from '@/components/PageTransition';

const services = [
  {
    id: 'branding',
    icon: Palette,
    title: 'Branding',
    description: 'Strategic brand identity that resonates with your audience and stands the test of time.',
    items: [
      { name: 'Brand Strategy', description: 'Deep research and positioning to define your unique market presence.' },
      { name: 'Visual Identity', description: 'Complete visual systems including color, typography, and imagery.' },
      { name: 'Brand Guidelines', description: 'Comprehensive documentation for consistent brand application.' },
      { name: 'Logo Design', description: 'Memorable, versatile logos that capture your brand essence.' },
    ],
  },
  {
    id: 'web-design',
    icon: Layers,
    title: 'Web Design',
    description: 'Beautiful, conversion-focused websites that captivate and convert visitors.',
    items: [
      { name: 'UX Research', description: 'User interviews, testing, and data-driven insights.' },
      { name: 'UI Design', description: 'Pixel-perfect interfaces with attention to every detail.' },
      { name: 'Motion Design', description: 'Engaging animations that enhance user experience.' },
      { name: 'Design Systems', description: 'Scalable component libraries for consistent design.' },
    ],
  },
  {
    id: 'development',
    icon: Code2,
    title: 'Development',
    description: 'High-performance web applications built with cutting-edge technology.',
    items: [
      { name: 'React / Next.js', description: 'Modern, fast, and SEO-friendly web applications.' },
      { name: 'Three.js / WebGL', description: 'Immersive 3D experiences and interactive graphics.' },
      { name: 'E-commerce', description: 'Full-featured online stores with seamless checkout.' },
      { name: 'CMS Integration', description: 'Easy content management with your preferred platform.' },
    ],
  },
  {
    id: 'marketing',
    icon: Megaphone,
    title: 'Growth & Marketing',
    description: 'Data-driven marketing strategies that fuel sustainable business growth.',
    items: [
      { name: 'SEO Strategy', description: 'Technical and content optimization for organic growth.' },
      { name: 'Content Marketing', description: 'Compelling content that attracts and engages.' },
      { name: 'Analytics', description: 'Performance tracking and actionable insights.' },
      { name: 'Conversion Optimization', description: 'A/B testing and funnel optimization.' },
    ],
  },
];

const techStack = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Framework' },
  { name: 'Three.js', category: '3D' },
  { name: 'GSAP', category: 'Animation' },
  { name: 'Tailwind', category: 'Styling' },
  { name: 'Node.js/Django', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Figma', category: 'Design' },
];

function ServiceAccordion({ service, isOpen, onToggle }: { 
  service: typeof services[0]; 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-border rounded-2xl overflow-hidden"
      id={service.id}
    >
      <button
        onClick={onToggle}
        className="w-full p-8 flex items-center justify-between gap-4 bg-card hover:bg-secondary/50 transition-colors text-left"
      >
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <service.icon className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-display font-bold mb-1">{service.title}</h3>
            <p className="text-muted-foreground">{service.description}</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.items.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-secondary/50"
                >
                  <h4 className="font-display font-bold mb-2">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Services() {
  const [openService, setOpenService] = useState<string | null>('branding');

  return (
    <PageTransition>
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="text-primary font-medium mb-4 block">Our Services</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight">
                What we can <span className="gradient-text">do for you</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                From brand strategy to development and growth, we offer end-to-end 
                services that transform ideas into impactful digital experiences.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Accordion */}
        <section className="section-padding pt-0">
          <div className="container-wide">
            <div className="space-y-4">
              {services.map((service) => (
                <ServiceAccordion
                  key={service.id}
                  service={service}
                  isOpen={openService === service.id}
                  onToggle={() => setOpenService(openService === service.id ? null : service.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="section-padding bg-secondary/30 noise-overlay">
          <div className="container-wide relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-primary font-medium mb-4 block">Technology</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                Our <span className="gradient-text">tech stack</span>
              </h2>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-4 rounded-full bg-card border border-border"
                >
                  <span className="font-medium">{tech.name}</span>
                  <span className="text-muted-foreground text-sm ml-2">/ {tech.category}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
    </PageTransition>
  );
}
