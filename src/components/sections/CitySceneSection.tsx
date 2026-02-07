import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import cityDaySuperman from '@/assets/city-day-superman.mp4';
import cityNightBatman from '@/assets/city-night-batman.mp4';

export default function CitySceneSection() {
  const { theme } = useTheme();

  return (
    <section className="relative w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          className="relative w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <video
            key={theme}
            src={theme === 'dark' ? cityNightBatman : cityDaySuperman}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-cover"
          />
          
          {/* Gradient overlay for smooth transition to next section */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, hsl(var(--background)), transparent)'
            }}
          />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
