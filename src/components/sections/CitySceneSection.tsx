import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import parallaxImage from '@/assets/parallax-divider.jpg';

export default function CitySceneSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden"
    >
      {/* Parallax Image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[140%] -top-[20%]"
      >
        <img
          src={parallaxImage}
          alt="Cinematic cityscape at golden hour"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/60" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-sm md:text-base uppercase tracking-[0.3em] text-primary font-semibold mb-4"
        >
          Our Philosophy
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="hero-headline text-3xl md:text-5xl lg:text-6xl max-w-4xl text-foreground"
        >
          We craft digital experiences
          <br />
          <span className="gradient-text">that move people.</span>
        </motion.h2>
      </motion.div>

      {/* Top & bottom fade edges */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}