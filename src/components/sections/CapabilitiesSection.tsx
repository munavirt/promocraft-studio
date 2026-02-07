import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Palette, Code2, Megaphone, Sparkles } from 'lucide-react';

const capabilities = [
  {
    icon: Palette,
    title: 'Branding',
    description: 'Strategic brand identity that resonates with your audience and stands the test of time.',
    services: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines', 'Logo Design'],
  },
  {
    icon: Code2,
    title: 'Web Design',
    description: 'Beautiful, conversion-focused websites that captivate and convert visitors.',
    services: ['UX Research', 'UI Design', 'Motion Design', 'Design Systems'],
  },
  {
    icon: Sparkles,
    title: 'Development',
    description: 'High-performance web applications built with cutting-edge technology.',
    services: ['React / Next.js', 'Three.js / WebGL', 'E-commerce', 'CMS Integration'],
  },
  {
    icon: Megaphone,
    title: 'Growth',
    description: 'Data-driven marketing strategies that fuel sustainable business growth.',
    services: ['SEO Strategy', 'Content Marketing', 'Analytics', 'Conversion Optimization'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function CapabilitiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-secondary/30 noise-overlay">
      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-medium mb-4 block"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold"
          >
            Our <span className="gradient-text">Capabilities</span>
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              variants={cardVariants}
              className="group relative p-8 lg:p-10 rounded-2xl bg-card border border-border card-hover overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div 
                  className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"
                  style={{ background: 'hsl(var(--primary) / 0.1)' }}
                />
              </div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <capability.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-2xl lg:text-3xl font-display font-bold mb-4">
                  {capability.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {capability.description}
                </p>

                {/* Services List */}
                <ul className="flex flex-wrap gap-2">
                  {capability.services.map((service) => (
                    <li
                      key={service}
                      className="px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground"
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
