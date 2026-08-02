import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/PageTransition';
import { projects } from '@/data/projects';


export default function Work() {
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
                <span className="text-primary font-medium mb-4 block">Our Work</span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight">
                  Projects that <span className="gradient-text">speak volumes</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  A selection of our favorite projects. Each one tells a story of
                  collaboration, innovation, and measurable impact.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Projects Grid */}
          <section className="section-padding pt-0">
            <div className="container-wide">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link to={`/work/${project.slug}`}>
                      <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-card">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div
                          className="absolute inset-0 opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                          style={{
                            background: `linear-gradient(to top, ${project.color}, transparent 80%)`
                          }}
                        />

                        {/* Content */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                          <span className="text-sm font-medium text-primary-foreground/80 mb-1">
                            {project.category}
                          </span>
                          <h3 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-2">
                            {project.name}
                          </h3>
                          <p className="text-primary-foreground/80">
                            {project.tagline}
                          </p>
                        </div>

                        {/* Hover Icon */}
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center backdrop-blur-sm">
                            <ExternalLink className="w-4 h-4 text-primary-foreground" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}
