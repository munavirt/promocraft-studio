import { motion } from 'framer-motion';

export default function CTABackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-background">
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
      {/* Base soft gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-sky-50/20" />

      {/* Layer 1: Deepest, largest slow wave */}
      <motion.div
        animate={{
          y: ["-5%", "5%", "-5%"],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[120%] h-[140%] opacity-[0.05] blur-[120px] text-primary"
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <path fill="currentColor" d="M0,50 C30,20 70,80 100,50 L100,100 L0,100 Z" />
        </svg>
      </motion.div>

      {/* Layer 2: Midground, distinct overlapping curve */}
      <motion.div
        animate={{
          x: ["-3%", "3%", "-3%"],
          y: ["3%", "-3%", "3%"],
        }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-5%] w-[110%] h-[120%] opacity-[0.07] blur-[80px] text-sky-400"
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <path fill="currentColor" d="M0,80 C40,40 60,110 100,60 L100,100 L0,100 Z" />
        </svg>
      </motion.div>

      {/* Layer 3: Foreground, more defined soft ribbons */}
      <motion.div
        animate={{
          x: ["2%", "-2%", "2%"],
          scaleY: [1, 1.1, 1],
        }}
        transition={{ duration: 41, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[0%] w-[100%] h-[100%] opacity-[0.08] blur-[60px] text-primary"
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <path fill="currentColor" d="M0,100 C35,60 65,95 100,75 L100,100 L0,100 Z" />
        </svg>
      </motion.div>
      
      {/* Subtle overlay gradient to mask the bottom edge perfectly into the footer */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card to-transparent" />
    </div>
  );
}
