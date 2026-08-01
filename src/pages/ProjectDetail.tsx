import { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, Box, Layout, Zap, Palette, Target, BarChart, Image as ImageIcon, ShoppingBag, Settings } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/PageTransition';
import { projects } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

import React from 'react';

const iconMap: Record<string, React.ElementType> = {
  Cube: Box, 
  Layout,
  Zap,
  Palette,
  Target,
  BarChart,
  Image: ImageIcon,
  ShoppingBag,
  Settings,
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const projectIndex = projects.findIndex(p => p.slug === slug);
  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  const showcaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project || !project.showcaseImages || project.showcaseImages.length === 0) return;

    // Use a small timeout to ensure DOM is fully rendered before calculating ScrollTrigger heights
    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        const panels = gsap.utils.toArray('.showcase-panel') as HTMLElement[];
        
        panels.forEach((panel) => {
          ScrollTrigger.create({
            trigger: panel,
            start: 'top top',
            end: 'bottom top',
            pin: true,
            pinSpacing: false,
            markers: false,
          });
        });

      }, containerRef);
      
      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [slug, project]);

  if (!project) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background flex flex-col">
          <Navbar />
          <main className="flex-1 flex flex-col items-center justify-center pt-20">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <Link to="/work" className="text-primary hover:underline flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Work
            </Link>
          </main>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background" ref={containerRef}>
        <Navbar />
        
        <main className="pt-24 md:pt-32 overflow-hidden">
          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex flex-col justify-center section-padding">
            <div className="absolute inset-0 pointer-events-none noise-overlay z-0" />
            
            {/* Floating Abstract Glow */}
            <div 
              className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full blur-[100px] opacity-15 pointer-events-none animate-pulse"
              style={{ backgroundColor: project.color }}
            />
            
            <div className="container-wide relative z-10 w-full">
              <Link to="/work" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Work</span>
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-5xl"
              >
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm text-sm font-medium mb-8">
                  <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: project.color }} />
                  {project.category}
                </div>
                
                <h1 className="hero-headline mb-8 tracking-tighter" style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}>
                  {project.name}
                </h1>
                
                <p className="hero-subline max-w-2xl mb-16 text-xl md:text-2xl font-light">
                  {project.tagline}
                </p>
              </motion.div>

              {/* Project Meta Details */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full border-t border-border pt-12"
              >
                <div>
                  <h4 className="text-sm text-muted-foreground mb-2 font-medium">Client</h4>
                  <p className="text-lg font-semibold">{project.clientName || project.name}</p>
                </div>
                <div>
                  <h4 className="text-sm text-muted-foreground mb-2 font-medium">Industry</h4>
                  <p className="text-lg font-semibold">{project.industry || 'Digital'}</p>
                </div>
                <div>
                  <h4 className="text-sm text-muted-foreground mb-2 font-medium">Year</h4>
                  <p className="text-lg font-semibold">{project.year || '2024'}</p>
                </div>
                <div>
                  <h4 className="text-sm text-muted-foreground mb-2 font-medium">Services</h4>
                  <ul className="text-lg font-semibold space-y-1">
                    {project.services?.slice(0, 3).map((service, i) => (
                      <li key={i}>{service}</li>
                    )) || <li>Design</li>}
                  </ul>
                </div>
              </motion.div>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
              <div className="w-[1px] h-12 bg-border relative overflow-hidden">
                <motion.div 
                  className="w-full h-full bg-primary"
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                />
              </div>
            </motion.div>
          </section>

          {/* Project Overview */}
          <section className="section-padding bg-card/30">
            <div className="container-wide">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                <div className="lg:col-span-5">
                  <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Our Challenge</h2>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-xl md:text-2xl leading-relaxed text-foreground/90 mb-12 font-light">
                    {project.challenge || project.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" /> Goals
                      </h3>
                      <ul className="space-y-3 text-muted-foreground">
                        {project.goals?.map((goal, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span> {goal}
                          </li>
                        )) || <li>Enhance digital presence</li>}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Layout className="w-5 h-5 text-primary" /> Details
                      </h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li><strong>Audience:</strong> {project.audience || 'General public'}</li>
                        <li><strong>Duration:</strong> {project.duration || '3 Months'}</li>
                        <li><strong>Team:</strong> {project.teamSize || '4 Members'}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Visual Showcase (Sticky Scrolling)
          {project.showcaseImages && project.showcaseImages.length > 0 && (
            <section ref={showcaseRef} className="relative bg-background">
              {project.showcaseImages.map((img, i) => (
                <div 
                  key={i} 
                  className="showcase-panel h-screen w-full sticky top-0 flex items-center justify-center overflow-hidden"
                >
                  <div className={`absolute inset-0 z-0 ${i % 2 === 0 ? 'bg-card/20' : 'bg-background'}`} />
                  
                  <div className="container-wide w-full h-full flex flex-col justify-center relative z-10 py-20">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 40 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: false, margin: "-10%" }}
                      transition={{ duration: 0.8 }}
                      className={`relative w-full rounded-2xl overflow-hidden shadow-2xl ${i % 2 === 0 ? 'ml-auto md:w-[85%]' : 'mr-auto md:w-[85%]'}`}
                      style={{ height: '80vh' }}
                    >
                      <img src={img} alt={`${project.name} showcase ${i + 1}`} className="w-full h-full object-cover object-center" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </section>
          )} 
          */}

          {/* Design Process Timeline */}
          {project.timeline && (
            <section className="section-padding bg-background relative z-10">
              <div className="container-wide">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">Process</h2>
                
                <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-8 custom-scrollbar snap-x snap-mandatory">
                  {project.timeline.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="min-w-[280px] md:min-w-[320px] flex-shrink-0 p-8 rounded-2xl bg-card border border-border snap-start"
                    >
                      <div className="text-5xl font-display font-bold text-muted-foreground/20 mb-6">
                        0{i + 1}
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{item.step}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Brand Identity */}
          {project.brandColors && (
            <section className="section-padding bg-card/30">
              <div className="container-wide">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">Brand Identity</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                  {/* Colors */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Colors</h3>
                    <div className="flex flex-col gap-4">
                      {project.brandColors.map((color, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border shadow-sm"
                        >
                          <div className="w-16 h-16 rounded-lg shadow-inner" style={{ backgroundColor: color.hex }} />
                          <div>
                            <p className="font-bold text-lg">{color.name}</p>
                            <p className="text-muted-foreground font-mono">{color.hex}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Typography */}
                  {project.brandTypography && (
                    <div>
                      <h3 className="text-2xl font-bold mb-6">Typography</h3>
                      <div className="flex flex-col gap-6">
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          className="p-8 rounded-xl bg-background border border-border overflow-hidden relative shadow-sm"
                        >
                          <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">Primary Typeface</p>
                          <p className="text-4xl sm:text-5xl lg:text-6xl" style={{ fontFamily: 'Space Grotesk' }}>Aa</p>
                          <p className="text-lg mt-2 font-medium">{project.brandTypography.primary}</p>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 }}
                          className="p-8 rounded-xl bg-background border border-border overflow-hidden relative shadow-sm"
                        >
                          <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">Secondary Typeface</p>
                          <p className="text-4xl sm:text-5xl lg:text-6xl font-bold" style={{ fontFamily: 'Syne' }}>Aa</p>
                          <p className="text-lg mt-2 font-medium">{project.brandTypography.secondary}</p>
                        </motion.div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Key Features */}
          {project.features && (
            <section className="section-padding">
              <div className="container-wide">
                <div className="max-w-3xl mx-auto text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Key Features</h2>
                  <p className="text-xl text-muted-foreground">Highlighting the core components that drive the digital experience.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {project.features.map((feature, i) => {
                    const Icon = iconMap[feature.icon] || Box;
                    return (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 }}
                        className="group relative p-8 rounded-3xl bg-card border border-border overflow-hidden card-hover"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-500" />
                        
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-500">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Before & After Placeholder (Split Layout) */}
          {project.beforeImage && project.afterImage && (
            <section className="section-padding bg-card/30">
              <div className="container-wide">
                 <div className="max-w-3xl mx-auto text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Transformation</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]"
                  >
                    <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium z-10 border border-border">Before</div>
                    <img src={project.beforeImage} alt="Before" className="w-full h-full object-cover grayscale-[30%] opacity-80" />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] ring-4 ring-primary/20"
                  >
                     <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium z-10 shadow-sm">After</div>
                    <img src={project.afterImage} alt="After" className="w-full h-full object-cover" />
                  </motion.div>
                </div>
              </div>
            </section>
          )}

          {/* Results */}
          {project.results && (
            <section className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
              <div className="absolute inset-0 noise-overlay opacity-20" />
              <div className="container-wide relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center">
                  {project.results.map((result, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", delay: i * 0.1, duration: 0.8 }}
                    >
                      <h3 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4">{result.value}</h3>
                      <p className="text-lg md:text-xl font-medium text-primary-foreground/80">{result.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Client Testimonial */}
          {project.testimonial && (
            <section className="section-padding bg-background">
              <div className="container-wide">
                <div className="max-w-4xl mx-auto text-center relative">
                  <Quote className="w-24 h-24 md:w-32 md:h-32 absolute -top-12 -left-12 md:-left-20 text-muted/30 -rotate-12" />
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10"
                  >
                    <p className="text-3xl md:text-4xl lg:text-5xl font-display font-medium leading-tight mb-12">
                      "{project.testimonial.quote}"
                    </p>
                    
                    <div className="flex flex-col items-center gap-4">
                      {project.testimonial.image && (
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-background shadow-xl">
                          <img src={project.testimonial.image} alt={project.testimonial.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <h4 className="text-xl font-bold">{project.testimonial.name}</h4>
                        <p className="text-muted-foreground">{project.testimonial.role}, {project.testimonial.company}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          )}

          {/* Next Project Navigation */}
          {nextProject && (
            <section className="h-[60vh] md:h-[70vh] relative overflow-hidden bg-foreground text-background flex items-center justify-center group cursor-pointer" onClick={() => navigate(`/work/${nextProject.slug}`)}>
              {/* Image Background */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                  src={nextProject.image} 
                  alt={nextProject.name} 
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000 ease-out" 
                />
                <div className="absolute inset-0 bg-background/80 group-hover:bg-background/40 transition-colors duration-700" />
              </div>
              
              <div className="container-wide relative z-10 text-center flex flex-col items-center">
                <span className="text-sm font-medium tracking-[0.3em] uppercase mb-6 opacity-70 group-hover:opacity-100 transition-opacity">Next Project</span>
                
                <h2 className="text-5xl md:text-7xl lg:text-9xl font-display font-bold mb-8 group-hover:-translate-y-4 transition-transform duration-500 text-foreground drop-shadow-2xl">
                  {nextProject.name}
                </h2>
                
                <div className="w-16 h-16 rounded-full border-2 border-foreground/20 flex items-center justify-center group-hover:border-foreground group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                  <ArrowRight className="w-8 h-8" />
                </div>
              </div>
            </section>
          )}

        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
}
