import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StoryScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const strokeRef = useRef<HTMLDivElement>(null);
  
  const ideaRef = useRef<HTMLDivElement>(null);
  const strategyRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const developRef = useRef<HTMLDivElement>(null);
  const launchRef = useRef<HTMLDivElement>(null);
  const growRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !strokeRef.current || !cameraRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5, // Smooth scrubbing for a premium feel
        }
      });

      // --- INITIAL STATE ---
      gsap.set(strokeRef.current, { 
        xPercent: -50, yPercent: -50, 
        x: "0vw", y: "-30vh", 
        width: "4px", height: "100px", 
        opacity: 0, 
        rotate: 0,
        borderRadius: "4px"
      });
      
      const texts = [ideaRef, strategyRef, designRef, developRef, launchRef, growRef];
      texts.forEach(t => {
        if (t.current) {
          gsap.set(t.current, { opacity: 0, scale: 0.98, filter: "blur(12px)" });
        }
      });

      // --- CAMERA PARALLAX ---
      // Extremely subtle, continuous camera drift simulating depth
      tl.to(cameraRef.current, {
        scale: 1.05,
        y: "-8vh",
        ease: "none",
        duration: 30
      }, 0);


      // ==========================================
      // STAGE 1: IDEA (Quiet, Minimal)
      // ==========================================
      const timeIdea = 0;
      
      // Arrival: Stroke enters gracefully
      tl.to(strokeRef.current, {
        opacity: 1,
        y: "10vh", // Sits quietly below the word
        height: "6px",
        width: "6px", // Becomes a subtle dot/dash
        ease: "power3.out",
        duration: 1.5
      }, timeIdea);
      
      tl.to(ideaRef.current, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        duration: 2
      }, timeIdea + 0.5);

      // Pause/Focus: Hold the frame, creating curiosity
      tl.to(ideaRef.current, {
        scale: 1.01,
        ease: "none",
        duration: 3 
      }, timeIdea + 2.5);

      // Departure
      tl.to(ideaRef.current, {
        opacity: 0,
        filter: "blur(15px)",
        y: "-2vh",
        ease: "power2.inOut",
        duration: 1.5
      }, timeIdea + 5.5);


      // ==========================================
      // STAGE 2: STRATEGY (Guided, Clear)
      // ==========================================
      const timeStrategy = 7;

      // Arrival: Stroke flows beneath naturally
      tl.to(strokeRef.current, {
        y: "8vh",
        x: "-15vw",
        height: "4px",
        width: "80px", // stretches out
        ease: "power3.inOut",
        duration: 1.5
      }, timeStrategy - 0.5);

      tl.to(strokeRef.current, {
        x: "15vw", // travels across
        width: "120px", 
        ease: "power2.inOut",
        duration: 2
      }, timeStrategy + 1);

      // Text reveals as if guided by the stroke
      if (strategyRef.current) {
        gsap.set(strategyRef.current, { clipPath: "inset(0 100% 0 0)", x: "-2vw" });
      }
      tl.to(strategyRef.current, {
        opacity: 1,
        scale: 1,
        x: "0vw",
        filter: "blur(0px)",
        clipPath: "inset(0 0% 0 0)",
        ease: "power2.out",
        duration: 2
      }, timeStrategy + 1);

      // Pause/Focus
      tl.to(strokeRef.current, {
        x: "18vw",
        width: "40px", // stroke catches up to itself
        ease: "power2.out",
        duration: 1.5
      }, timeStrategy + 3);

      tl.to(strategyRef.current, {
        scale: 1.01,
        ease: "none",
        duration: 2.5
      }, timeStrategy + 3);

      // Departure
      tl.to(strategyRef.current, {
        opacity: 0,
        filter: "blur(15px)",
        scale: 1.03,
        ease: "power2.inOut",
        duration: 1.2
      }, timeStrategy + 5.5);


      // ==========================================
      // STAGE 3: DESIGN (Craftsmanship, Upward)
      // ==========================================
      const timeDesign = 12.5;

      // Arrival: Stroke moves elegantly to a new position
      tl.to(strokeRef.current, {
        x: "-12vw",
        y: "-4vh",
        width: "3px",
        height: "140px",
        rotate: 15, // elegant slight angle
        ease: "power3.inOut",
        duration: 2
      }, timeDesign - 1);

      // Text appears with subtle spacing adjustments and gentle upward movement
      if (designRef.current) {
        gsap.set(designRef.current, { letterSpacing: "-0.02em", y: "4vh" });
      }
      tl.to(designRef.current, {
        opacity: 1,
        y: "0vh",
        letterSpacing: "0.01em",
        filter: "blur(0px)",
        scale: 1,
        ease: "power3.out",
        duration: 2
      }, timeDesign);

      // Pause/Focus
      tl.to(designRef.current, {
        y: "-1vh",
        letterSpacing: "0.03em",
        ease: "none",
        duration: 2.5
      }, timeDesign + 2);

      // Departure
      tl.to(designRef.current, {
        opacity: 0,
        filter: "blur(15px)",
        y: "-5vh",
        ease: "power2.inOut",
        duration: 1.2
      }, timeDesign + 4.5);


      // ==========================================
      // STAGE 4: DEVELOP (Precision, Forward)
      // ==========================================
      const timeDevelop = 18;

      // Arrival: Confident stroke movement
      tl.to(strokeRef.current, {
        x: "15vw",
        y: "-8vh",
        rotate: -20,
        width: "4px",
        height: "180px",
        ease: "power4.inOut",
        duration: 1.5
      }, timeDevelop - 0.5);

      // Confident forward movement for typography
      if (developRef.current) {
        gsap.set(developRef.current, { scale: 0.85, filter: "blur(20px)" });
      }
      tl.to(developRef.current, {
        opacity: 1,
        scale: 1.05,
        filter: "blur(0px)",
        ease: "back.out(1.2)", // precise snap
        duration: 1.5
      }, timeDevelop);

      // Pause/Focus (slightly faster rhythm)
      tl.to(developRef.current, {
        scale: 1.1,
        ease: "none",
        duration: 1.8
      }, timeDevelop + 1.5);

      // Departure
      tl.to(developRef.current, {
        opacity: 0,
        filter: "blur(15px)",
        scale: 1.2,
        ease: "power2.inOut",
        duration: 1
      }, timeDevelop + 3.3);


      // ==========================================
      // STAGE 5: LAUNCH (Dynamic, Momentum)
      // ==========================================
      const timeLaunch = 22.5;

      // Arrival: Stroke accelerates horizontally
      tl.to(strokeRef.current, {
        x: "-5vw",
        y: "8vh",
        rotate: 90,
        width: "6px",
        height: "250px", // massive expansion
        ease: "expo.inOut",
        duration: 1.8
      }, timeLaunch - 0.8);

      // Word expands gently
      if (launchRef.current) {
        gsap.set(launchRef.current, { scale: 0.95 });
      }
      tl.to(launchRef.current, {
        opacity: 1,
        scale: 1.02,
        filter: "blur(0px)",
        ease: "power3.out",
        duration: 1.5
      }, timeLaunch);

      // Stroke decelerates and returns to minimal state
      tl.to(strokeRef.current, {
        height: "12px",
        width: "12px",
        rotate: 0,
        x: "5vw",
        ease: "power3.out",
        duration: 1.5
      }, timeLaunch + 1);

      // Pause/Focus
      tl.to(launchRef.current, {
        scale: 1.06,
        ease: "none",
        duration: 2
      }, timeLaunch + 1.5);

      // Departure
      tl.to(launchRef.current, {
        opacity: 0,
        filter: "blur(15px)",
        y: "-3vh",
        ease: "power2.inOut",
        duration: 1.2
      }, timeLaunch + 3.5);


      // ==========================================
      // STAGE 6: GROW (Calm, Optimistic, Longest)
      // ==========================================
      const timeGrow = 27.5;

      // Arrival: Stroke anchors beautifully
      tl.to(strokeRef.current, {
        x: "0vw",
        y: "-12vh",
        width: "3px",
        height: "80px",
        ease: "power3.inOut",
        duration: 2
      }, timeGrow - 1);

      if (growRef.current) {
        gsap.set(growRef.current, { letterSpacing: "-0.03em" });
      }
      tl.to(growRef.current, {
        opacity: 1,
        scale: 1,
        letterSpacing: "0.04em",
        filter: "blur(0px)",
        ease: "power2.out",
        duration: 2.5
      }, timeGrow);

      // Pause/Focus: Longest pause, breathing animation
      tl.to(growRef.current, {
        scale: 1.1,
        letterSpacing: "0.08em",
        ease: "none",
        duration: 5 
      }, timeGrow + 2.5);
      
      tl.to(strokeRef.current, {
        y: "8vh",
        height: "150px",
        ease: "none",
        duration: 5
      }, timeGrow + 2.5);

      // Exit (Travels down to connect seamlessly to "What We Do")
      const timeExit = 35;
      tl.to(growRef.current, {
        opacity: 0,
        filter: "blur(20px)",
        ease: "power2.in",
        duration: 2
      }, timeExit);

      tl.to(strokeRef.current, {
        y: "150vh", // Shoots out of the bottom
        height: "400px",
        ease: "power3.in",
        duration: 2
      }, timeExit);

      // Total timeline duration is roughly 37 units.
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background z-20"
      style={{ height: '800vh' }}
    >
      {/* Sticky container that holds everything */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        
        {/* Parallax Camera Container */}
        <div ref={cameraRef} className="relative w-full h-full flex items-center justify-center">
          
          {/* The Blue Stroke */}
          <div 
            ref={strokeRef}
            className="absolute bg-primary z-10 pointer-events-none" 
            style={{ 
              willChange: "transform, width, height",
              boxShadow: "0 0 30px rgba(14, 165, 233, 0.15)" // Very subtle premium glow
            }}
          />

          {/* Typography Layers */}
          {/* Using mix-blend-multiply so the stroke elegantly interacts with the text if they overlap */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            
            <div ref={ideaRef} className="absolute text-[16vw] md:text-[14vw] font-display font-bold leading-none tracking-tighter text-zinc-950 dark:text-foreground mix-blend-multiply dark:mix-blend-normal">
              IDEA
            </div>

            <div ref={strategyRef} className="absolute text-[14vw] md:text-[12vw] font-display font-bold leading-none tracking-tighter text-zinc-950 dark:text-foreground mix-blend-multiply dark:mix-blend-normal">
              STRATEGY
            </div>

            <div ref={designRef} className="absolute text-[15vw] md:text-[13vw] font-display font-bold leading-none tracking-tight text-zinc-950 dark:text-foreground mix-blend-multiply dark:mix-blend-normal">
              DESIGN
            </div>

            <div ref={developRef} className="absolute text-[14vw] md:text-[12vw] font-display font-bold leading-none tracking-tighter text-zinc-950 dark:text-foreground mix-blend-multiply dark:mix-blend-normal">
              DEVELOP
            </div>

            <div ref={launchRef} className="absolute text-[15vw] md:text-[13vw] font-display font-bold leading-none tracking-tight text-zinc-950 dark:text-foreground mix-blend-multiply dark:mix-blend-normal">
              LAUNCH
            </div>

            <div ref={growRef} className="absolute text-[17vw] md:text-[15vw] font-display font-bold leading-none tracking-tight text-zinc-950 dark:text-foreground mix-blend-multiply dark:mix-blend-normal">
              GROW
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
