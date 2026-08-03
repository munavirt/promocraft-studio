import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Linkedin, Twitter, Instagram, Facebook, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlobeBackground from '../sections/RibbonBackground';
import WorldMapBackground from '../ui/WorldMapBackground';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  navigation: [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Work', href: '/work' },
    { name: 'Process', href: '/process' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Branding', href: '/services#branding' },
    { name: 'Web Design', href: '/services#web-design' },
    { name: 'Development', href: '/services#development' },
    { name: 'Marketing', href: '/services#marketing' },
  ],
  social: [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Instagram', href: 'https://www.instagram.com/promocraft.in/', icon: Instagram },
    { name: 'Facebook ', href: '#', icon: Facebook },
  ],
};

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const globeWrapperRef = useRef<HTMLDivElement>(null);
  const ctaContentRef = useRef<HTMLDivElement>(null);
  const footerContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !globeWrapperRef.current || !ctaContentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      // 1. Text fades in first
      tl.fromTo(ctaContentRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // 2. Ribbon fades in slightly after the heading
      tl.fromTo(globeWrapperRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
        "-=0.4"
      );

      // 3. Globe fades out as we scroll to the actual footer bottom
      gsap.to(globeWrapperRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: footerContentRef.current,
          start: "top bottom", 
          end: "top 50%",
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={containerRef} className="relative bg-background overflow-hidden">
      
      {/* SECTION ONE: Final CTA */}
      <div className="relative min-h-[95vh] flex items-center justify-center section-padding">
        
        {/* Abstract Layered Background */}
        <div 
          ref={globeWrapperRef}
          className="absolute inset-0 z-0"
          style={{ opacity: 0 }}
        >
          <GlobeBackground />
        </div>

        {/* CTA Content */}
        <div ref={ctaContentRef} className="container-wide relative z-10 text-center max-w-4xl mx-auto opacity-0">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-tight tracking-tight text-foreground">
            Let's Build Something <br className="hidden md:block" /> Extraordinary.
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            PromoCraft partners with ambitious businesses across the globe to craft unforgettable digital experiences.
          </p>
          <Link to="/contact">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-5 rounded-full font-medium transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2 group shadow-xl shadow-primary/20">
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>

      {/* SECTION TWO: Footer Information */}
      <div ref={footerContentRef} className="relative z-10 bg-background border-t border-border mt-10 overflow-hidden">
        <WorldMapBackground />
        <div className="relative z-10 container-wide section-padding pb-8">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
            {/* Brand */}
            <div className="lg:col-span-5">
              <Link to="/" className="inline-block mb-6">
                <div className="font-display text-3xl font-bold tracking-tight">
                  <span className="text-primary">Promo</span>
                  <span className="text-foreground">Craft</span>
                </div>
              </Link>
              <p className="text-muted-foreground max-w-sm leading-relaxed mb-8">
                We craft brands, websites & experiences that people remember.
                Strategy-first, design-focused, tech-powered.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {footerLinks.social.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-display font-bold text-foreground mb-4">Navigation</h4>
                <ul className="space-y-3">
                  {footerLinks.navigation.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                      >
                        {link.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-display font-bold text-foreground mb-4">Services</h4>
                <ul className="space-y-3">
                  {footerLinks.services.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                      >
                        {link.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-display font-bold text-foreground mb-4">Get in Touch</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="mailto:support@promocraft.in"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      support@promocraft.in
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+918714145252"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      +91 8714 1452 52
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PromoCraft. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
