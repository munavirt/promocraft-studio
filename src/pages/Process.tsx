import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, PenTool, Code2, Rocket, TrendingUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTASection from '@/components/sections/CTASection';
import PageTransition from '@/components/PageTransition';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discover',
    description: 'We dive deep into your business, audience, and goals. Research, interviews, and competitive analysis form the foundation of every project.',
    duration: '1-2 weeks',
    deliverables: ['Market Research', 'User Personas', 'Competitive Analysis', 'Project Brief'],
  },
  {
    number: '02',
    icon: PenTool,
    title: 'Define',
    description: 'Strategy meets creativity. We define the brand positioning, user journeys, and design direction that will guide the entire project.',
    duration: '1-2 weeks',
    deliverables: ['Brand Strategy', 'Information Architecture', 'Wireframes', 'Moodboards'],
  },
  {
    number: '03',
    icon: PenTool,
    title: 'Design',
    description: 'Pixels meet purpose. We craft beautiful, functional designs that align with your brand and delight your users.',
    duration: '2-4 weeks',
    deliverables: ['UI Designs', 'Design System', 'Prototypes', 'Motion Concepts'],
  },
  {
    number: '04',
    icon: Code2,
    title: 'Develop',
    description: 'Code meets craft. Our developers bring designs to life with clean, performant, and scalable code.',
    duration: '4-8 weeks',
    deliverables: ['Frontend Development', 'Backend Integration', 'CMS Setup', 'QA Testing'],
  },
  {
    number: '05',
    icon: Rocket,
    title: 'Launch',
    description: 'The big moment. We ensure a smooth launch with thorough testing, optimization, and ongoing support.',
    duration: '1 week',
    deliverables: ['Deployment', 'Performance Optimization', 'Analytics Setup', 'Documentation'],
  },
  {
    number: '06',
    icon: TrendingUp,
    title: 'Scale',
    description: 'Growth never stops. We provide ongoing support, optimization, and strategic guidance to help you scale.',
    duration: 'Ongoing',
    deliverables: ['Performance Monitoring', 'A/B Testing', 'Feature Updates', 'Strategic Support'],
  },
];

export default function Process() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const progressHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

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
              <span className="text-primary font-medium mb-4 block">Our Process</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight">
                How we turn <span className="gradient-text">ideas into reality</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                A proven process refined over hundreds of projects. Transparent, 
                collaborative, and designed to deliver exceptional results.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="section-padding pt-0" ref={containerRef}>
          <div className="container-wide">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-border md:-translate-x-1/2">
                <motion.div
                  style={{ height: progressHeight }}
                  className="w-full bg-primary rounded-full"
                />
              </div>

              {/* Steps */}
              <div className="space-y-24">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className={`relative flex flex-col md:flex-row gap-8 md:gap-16 ${
                      index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background md:-translate-x-1/2 z-10" />

                    {/* Content */}
                    <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16 md:text-right'}`}>
                      <div className={`inline-flex items-center gap-4 mb-4 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                        <span className="text-4xl font-display font-bold text-primary/30">{step.number}</span>
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">{step.title}</h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{step.description}</p>
                      
                      <div className={`flex flex-wrap gap-2 mb-4 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                        {step.deliverables.map((item) => (
                          <span key={item} className="px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground">
                            {item}
                          </span>
                        ))}
                      </div>
                      
                      <span className="text-sm text-primary font-medium">
                        Duration: {step.duration}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
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
