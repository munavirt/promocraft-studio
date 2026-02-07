import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Zap, Layers, TrendingUp } from 'lucide-react';

const reasons = [
  {
    icon: Target,
    title: 'Strategy-First',
    description: 'Every pixel has purpose. We start with deep research to understand your goals and audience.',
  },
  {
    icon: Zap,
    title: 'Conversion-Focused',
    description: 'Beautiful design that drives results. We optimize every touchpoint for maximum impact.',
  },
  {
    icon: Layers,
    title: 'Design + Tech Together',
    description: 'No handoff headaches. Our designers and developers work as one unified team.',
  },
  {
    icon: TrendingUp,
    title: 'Built to Scale',
    description: 'From startup to enterprise. We build foundations that grow with your business.',
  },
];

const processSteps = ['Idea', 'Design', 'Build', 'Launch', 'Scale'];

export default function WhySection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const lineWidth = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '100%']);

  return (
    <section ref={sectionRef} className="section-padding bg-secondary/30 noise-overlay overflow-hidden">
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Text Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-medium mb-4 block"
            >
              Why PromoCraft
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold mb-8"
            >
              We don't just make things <span className="gradient-text">look good</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-10 leading-relaxed"
            >
              We make them work. Every project starts with understanding your business, 
              your users, and your goals. Then we craft solutions that actually move the needle.
            </motion.p>

            {/* Reasons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="flex gap-4"
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <reason.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold mb-1">{reason.title}</h4>
                    <p className="text-sm text-muted-foreground">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Animated Process */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-8 lg:p-12 rounded-3xl bg-card border border-border"
            >
              <h4 className="font-display font-bold text-xl mb-8 text-center">Our Process</h4>
              
              {/* Process Flow */}
              <div className="relative">
                {/* Animated Line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 rounded-full overflow-hidden">
                  <motion.div
                    style={{ width: lineWidth }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>

                {/* Steps */}
                <div className="relative flex justify-between">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                      className="flex flex-col items-center"
                    >
                      <div 
                        className="w-10 h-10 rounded-full bg-card border-2 border-primary flex items-center justify-center mb-3 relative z-10"
                      >
                        <span className="text-sm font-bold text-primary">{index + 1}</span>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-primary/5 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-accent/5 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
