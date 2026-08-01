import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "@/hooks/useTheme";
import SmoothScroll from "@/components/SmoothScroll";
import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Work from "./pages/Work";
import ProjectDetail from "./pages/ProjectDetail";
import Process from "./pages/Process";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function AppRoutes() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const lenis = useLenis();
  const isPopRef = useRef(false);

  useEffect(() => {
    isPopRef.current = navigationType === 'POP';
  }, [navigationType, location.pathname]);

  const handleExitComplete = () => {
    if (!isPopRef.current) {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      }
      window.scrollTo(0, 0);
    }
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };
  
  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
        <Route path="/process" element={<Process />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <ThemeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SmoothScroll>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <AppRoutes />
        </BrowserRouter>
      </SmoothScroll>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
