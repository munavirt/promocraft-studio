import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTASection from '@/components/sections/CTASection';
import PageTransition from '@/components/PageTransition';

const timelineEvents = [
  {
    year: '2024',
    title: 'Founded',
    description:
      'PromoCraft was founded with a clear focus on building strong digital brands through strategy, design, and performance-driven marketing.',
  },
  {
    year: '2025',
    title: 'First Brand Collaborations',
    description:
      'Partnered with Nexus Enterprises Pvt. Ltd. to deliver branding and performance-focused advertising campaigns.',
  },
  {
    year: '2025',
    title: 'Web & Brand Delivery',
    description:
      'Designed and developed a complete website and brand identity for Wox Sofa Studio, strengthening their digital presence.',
  },
  {
    year: '2025',
    title: 'Expanding Client Portfolio',
    description:
      'Onboarded Abseco International for branding services, marking continued growth in trusted brand partnerships.',
  },
  {
    year: 'The Future',
    title: 'Looking Ahead',
    description:
      'Scaling our impact by combining creative branding, modern web technologies, and data-driven marketing strategies.',
  },
];


const values = [
  { title: 'Clarity over noise', description: 'We cut through the clutter to deliver focused, impactful solutions.' },
  { title: 'Design with purpose', description: 'Every element serves a function. Beauty meets utility.' },
  { title: 'Tech that scales', description: 'Future-proof solutions built on solid foundations.' },
  { title: 'Partnership mindset', description: "Your success is our success. We're in this together." },
];

export default function About() {
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
              className="max-w-4xl"
            >
              <span className="text-primary font-medium mb-4 block">About Us</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight">
                PromoCraft is a creative digital studio focused on{' '}
                <span className="gradient-text">clarity, craft, and results</span>.
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We believe great design isn't just about looking good—it's about solving problems, 
                telling stories, and creating experiences that resonate with people.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding bg-secondary/30 noise-overlay">
          <div className="container-wide relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-primary font-medium mb-4 block">Our Journey</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                The <span className="gradient-text">story</span> so far
              </h2>
            </motion.div>

            <div className="relative max-w-3xl mx-auto">
              {/* Vertical Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background md:-translate-x-1/2 z-10" />
                  
                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <span className="text-primary font-bold text-lg">{event.year}</span>
                    <h3 className="text-xl font-display font-bold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-primary font-medium mb-4 block">Our Values</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                What we <span className="gradient-text">believe</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-card border border-border card-hover"
                >
                  <h3 className="text-2xl font-display font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
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
