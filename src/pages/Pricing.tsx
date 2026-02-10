import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/PageTransition';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small projects and startups looking to establish their digital presence.',
    price: '₹34,999',
    period: 'starting at',
    features: [
      'Brand Strategy Workshop',
      'Logo & Visual Identity',
      'Landing Page Design',
      'Responsive Development',
      '2 Rounds of Revisions',
      '30-Day Support',
    ],
    highlighted: false,
  },
  {
    name: 'Growth',
    description: 'For businesses ready to scale with a comprehensive digital experience.',
    price: '₹74,999',
    period: 'starting at',
    features: [
      'Everything in Starter',
      'Full Website Design (5-10 pages)',
      'Custom Animations & Interactions',
      'CMS Integration',
      'SEO Optimization',
      '3 Months Support',
      'Analytics Dashboard',
    ],
    highlighted: true,
  },
  {
    name: 'Premium',
    description: 'Enterprise-grade solutions for brands that demand excellence.',
    price: 'Custom',
    period: 'let\'s talk',
    features: [
      'Everything in Growth',
      'Complete Brand Overhaul',
      'Custom Web Application',
      '3D & WebGL Experiences',
      'E-commerce Integration',
      'Marketing Strategy',
      'Dedicated Account Manager',
      'Priority Support',
    ],
    highlighted: false,
  },
];

export default function Pricing() {
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
              className="text-center max-w-3xl mx-auto"
            >
              <span className="text-primary font-medium mb-4 block">Pricing</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight">
                Invest in <span className="gradient-text">exceptional design</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Transparent pricing for transparent partnerships. Every project is unique, 
                but here's a starting point.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="section-padding pt-0">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-8 rounded-2xl border ${
                    plan.highlighted 
                      ? 'bg-card border-primary glow-primary' 
                      : 'bg-card border-border'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </div>

                  <div className="mb-8">
                    <span className="text-4xl font-display font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">{plan.period}</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 rounded-xl font-semibold transition-colors ${
                        plan.highlighted
                          ? 'bg-primary text-primary-foreground hover:opacity-90'
                          : 'bg-secondary text-foreground hover:bg-secondary/80'
                      }`}
                    >
                      Get Started
                      <ArrowRight className="inline-block ml-2 w-4 h-4" />
                    </motion.button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Quote */}
        <section className="section-padding bg-secondary/30 noise-overlay">
          <div className="container-wide relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Need something <span className="gradient-text">custom?</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Every brand is unique. Let's discuss your specific needs and create 
                a tailored package that fits your goals and budget.
              </p>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-hero"
                >
                  Request Custom Quote
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
    </PageTransition>
  );
}
