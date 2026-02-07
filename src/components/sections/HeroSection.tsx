import { useRef, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import FloatingShape from '@/components/three/FloatingShape';

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-word', {
        y: 80,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.08,
        delay: 0.2,
      });

      gsap.from('.hero-subline-word', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.04,
        delay: 0.6,
      });
    });

    return () => ctx.revert();
  }, []);

  const headlineWords = [
    'We',
    'craft',
    'brands,',
    'websites',
    '&',
    'experiences',
    'that',
    'people',
    'remember.',
  ];

  const sublineWords = ['Design', '•', 'Development', '•', 'Motion', '•', 'Growth'];

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden noise-overlay">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-50"
        style={{ background: 'var(--hero-gradient)' }}
      />

      {/* 3D Shape — hidden on mobile */}
      <div className="hidden md:block absolute inset-0">
        <Suspense fallback={null}>
          <FloatingShape />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide text-center pt-16 md:pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-xs md:text-sm font-medium text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            Creative Digital Studio
          </span>
        </motion.div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="mx-auto max-w-5xl mb-6 font-extrabold leading-tight
                     text-[2.4rem] sm:text-4xl md:text-6xl lg:text-8xl"
        >
          {headlineWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
              <span className="hero-word inline-block">
                {word === 'brands,' || word === 'experiences' ? (
                  <span className="gradient-text">{word}</span>
                ) : (
                  word
                )}
              </span>
            </span>
          ))}
        </h1>

        {/* Subline */}
        <p
          ref={sublineRef}
          className="mx-auto max-w-xl mb-8 text-sm sm:text-base md:text-lg text-muted-foreground"
        >
          {sublineWords.map((word, i) => (
            <span key={i} className="hero-subline-word inline-block mr-[0.5em]">
              {word}
            </span>
          ))}
        </p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 -mt-[5px]"
        >
          <Link to="/contact">
            <motion.button
              className="btn-hero w-full sm:w-auto"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Start a Project
            </motion.button>
          </Link>

          <Link to="/work">
            <motion.button
              className="btn-ghost w-full sm:w-auto"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              View Our Work
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
