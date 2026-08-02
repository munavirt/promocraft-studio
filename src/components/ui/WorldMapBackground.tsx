import { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export default function WorldMapBackground() {
  const mouseX = useSpring(0, { stiffness: 30, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Subtle tilt from mouse (2-3 degrees)
  const rotateX = useTransform(mouseY, [-1, 1], [58, 62]);
  const rotateZ = useTransform(mouseX, [-1, 1], [-18, -22]);

  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-80"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        className="relative w-[75%] max-w-[1400px] aspect-[950/620]"
        style={{ 
          rotateX, 
          rotateZ,
          transformStyle: 'preserve-3d'
        }}
        animate={{
          y: ["-1%", "1%", "-1%"],
          z: [0, 20, 0], // Slight depth shift
          scale: [1, 1.02, 1] // Soft breathing
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Layer 1: Soft shadow / Deepest base */}
        <div 
          className="absolute inset-0"
          style={{ 
            transform: 'translateZ(-40px)',
            maskImage: 'url(/world-map.svg)',
            maskSize: '100% 100%',
            maskRepeat: 'no-repeat',
            WebkitMaskImage: 'url(/world-map.svg)',
            WebkitMaskSize: '100% 100%',
            WebkitMaskRepeat: 'no-repeat',
            backgroundColor: '#000000',
            opacity: 0.03,
            filter: 'blur(8px)'
          }}
        />

        {/* Layer 2: Lower Extrusion */}
        <div 
          className="absolute inset-0"
          style={{ 
            transform: 'translateZ(-20px)',
            maskImage: 'url(/world-map.svg)',
            maskSize: '100% 100%',
            maskRepeat: 'no-repeat',
            WebkitMaskImage: 'url(/world-map.svg)',
            WebkitMaskSize: '100% 100%',
            WebkitMaskRepeat: 'no-repeat',
            backgroundColor: '#f4f4f5', // zinc-100
            opacity: 0.8
          }}
        />

        {/* Layer 3: Mid Extrusion */}
        <div 
          className="absolute inset-0"
          style={{ 
            transform: 'translateZ(-10px)',
            maskImage: 'url(/world-map.svg)',
            maskSize: '100% 100%',
            maskRepeat: 'no-repeat',
            WebkitMaskImage: 'url(/world-map.svg)',
            WebkitMaskSize: '100% 100%',
            WebkitMaskRepeat: 'no-repeat',
            backgroundColor: '#e4e4e7', // zinc-200
            opacity: 0.9
          }}
        />

        {/* Layer 4: Top Surface (Subtle Blue Accent) */}
        <div 
          className="absolute inset-0"
          style={{ 
            transform: 'translateZ(0px)',
            maskImage: 'url(/world-map.svg)',
            maskSize: '100% 100%',
            maskRepeat: 'no-repeat',
            WebkitMaskImage: 'url(/world-map.svg)',
            WebkitMaskSize: '100% 100%',
            WebkitMaskRepeat: 'no-repeat',
            backgroundColor: '#2563EB', // Primary Blue
            opacity: 0.12 // 8-15% opacity as requested
          }}
        />
      </motion.div>
    </div>
  );
}
