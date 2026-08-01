import woxSofa from '../assets/images/hero-sofa-cum-bed.png';
import nexus from '../assets/images/ms-banner.jpg';
import royaline from '../assets/images/royaline-p1.png';

export const projects = [
  {
    id: 1,
    slug: 'royaline-facade-website',
    name: 'Royaline',
    tagline: 'Designed a modern corporate website that reflects Royaline’s expertise in architectural facade solutions.',
    category: 'Website Design • Development',
    image: royaline,
    color: 'hsl(220 80% 55%)',
    description: 'We collaborated with Royaline to design a modern, corporate website that truly reflects their expertise in architectural facade solutions. The new platform is built to highlight their portfolio, ensuring an engaging and seamless experience for potential clients and partners.',
    // Extended fields for editorial layout
    clientName: 'Royaline Facades',
    industry: 'Architecture & Construction',
    year: '2025',
    services: ['UI/UX Design', 'Frontend Development', 'CMS Integration', '3D Modeling'],
    challenge: 'Royaline needed a digital presence that matched the precision, scale, and luxury of their physical architectural projects. Their old website was outdated, difficult to navigate, and failed to communicate their industry-leading position.',
    goals: ['Elevate brand perception', 'Showcase project portfolio dynamically', 'Improve lead generation by 40%'],
    audience: 'Architects, Developers, and Corporate Clients seeking premium facade solutions.',
    duration: '3 Weeks',
    teamSize: '5 Specialists',
    role: 'Lead Agency',
    showcaseImages: [royaline, woxSofa, nexus, royaline],
    timeline: [
      { step: 'Research', desc: 'Market analysis & stakeholder interviews' },
      { step: 'Wireframes', desc: 'Structural planning & user journeys' },
      { step: 'UI Design', desc: 'Visual identity & high-fidelity mockups' },
      { step: 'Development', desc: 'Webflow implementation & GSAP animations' },
      { step: 'Testing', desc: 'Cross-browser & performance optimization' },
      { step: 'Launch', desc: 'Deployment & SEO setup' }
    ],
    brandColors: [
      { hex: '#0052FF', name: 'Royal Blue' },
      { hex: '#0F172A', name: 'Slate Dark' },
      { hex: '#F8FAFC', name: 'Cloud White' }
    ],
    brandTypography: {
      primary: 'Space Grotesk',
      secondary: 'Syne'
    },
    features: [
      { title: 'Immersive Portfolio', desc: 'A custom WebGL portfolio to explore buildings in 3D.', icon: 'Cube' },
      { title: 'Dynamic Case Studies', desc: 'CMS-driven case studies with rich media support.', icon: 'Layout' },
      { title: 'Performance First', desc: 'Optimized for speed despite heavy visual assets.', icon: 'Zap' }
    ],
    beforeImage: nexus,
    afterImage: royaline,
    results: [
      { value: '+180%', label: 'Conversion Increase' },
      { value: '+72%', label: 'User Engagement' },
      { value: '40%', label: 'Faster Loading' },
      { value: '3.2x', label: 'Lead Generation' }
    ],
    testimonial: {
      quote: "PromoCraft didn't just build a website; they crafted a digital experience that perfectly mirrors the quality of our architectural work. The attention to detail in motion and design is unparalleled.",
      name: "Sarah Jenkins",
      role: "Head of Marketing, Royaline",
      company: "Royaline Facades",
      image: nexus
    }
  },
  {
    id: 3,
    slug: 'nexus-enterprises-branding',
    name: 'Nexus Enterprises Pvt. Ltd.',
    tagline: 'Driving brand visibility through strategic marketing and performance campaigns.',
    category: 'Branding • Digital Advertising',
    image: nexus,
    color: 'hsl(30 100% 55%)',
    description: 'For Nexus Enterprises, our strategy focused on driving substantial brand visibility through a combination of tailored marketing strategies and performance-driven campaigns. By analyzing market trends and audience behavior, we created impactful ad placements that generated high ROI and enhanced brand recognition.',
    // Extended fields for editorial layout
    clientName: 'Nexus Enterprises',
    industry: 'Logistics & Supply Chain',
    year: '2024',
    services: ['Digital Strategy', 'Brand Identity', 'Performance Marketing'],
    challenge: 'Nexus was struggling to stand out in a crowded B2B market. Their marketing efforts lacked a cohesive strategy, leading to high acquisition costs and low brand recall.',
    goals: ['Reduce CPA by 30%', 'Establish a unified brand voice', 'Increase market share in key regions'],
    audience: 'B2B Enterprise Clients, Supply Chain Managers, Operations Directors.',
    duration: '1 Year',
    teamSize: '4 Specialists',
    role: 'Growth Partner',
    showcaseImages: [nexus, royaline, woxSofa, nexus],
    timeline: [
      { step: 'Audit', desc: 'Review of existing campaigns & brand assets' },
      { step: 'Strategy', desc: 'Defining the new positioning & messaging' },
      { step: 'Identity', desc: 'Refining the visual language' },
      { step: 'Execution', desc: 'Rolling out the new campaigns' },
      { step: 'Optimization', desc: 'Data-driven refinements' }
    ],
    brandColors: [
      { hex: '#F59E0B', name: 'Nexus Amber' },
      { hex: '#111827', name: 'Deep Onyx' },
      { hex: '#E5E7EB', name: 'Cool Gray' }
    ],
    brandTypography: {
      primary: 'Inter',
      secondary: 'Space Grotesk'
    },
    features: [
      { title: 'Unified Identity', desc: 'A cohesive brand system across all touchpoints.', icon: 'Palette' },
      { title: 'Targeted Campaigns', desc: 'Data-driven ad campaigns for high-intent audiences.', icon: 'Target' },
      { title: 'Analytics Dashboard', desc: 'Real-time performance tracking for stakeholders.', icon: 'BarChart' }
    ],
    beforeImage: woxSofa,
    afterImage: nexus,
    results: [
      { value: '45%', label: 'Decrease in CPA' },
      { value: '2.5M', label: 'Impressions' },
      { value: '120%', label: 'Traffic Growth' },
      { value: '8.5%', label: 'Conversion Rate' }
    ],
    testimonial: {
      quote: "The strategic approach PromoCraft took completely transformed our digital presence. We're now seeing unprecedented growth and a much stronger market position.",
      name: "Marcus Thorne",
      role: "CEO",
      company: "Nexus Enterprises",
      image: royaline
    }
  },
  {
    id: 2,
    slug: 'wox-sofa-studio',
    name: 'WOX Sofa Studio',
    tagline: 'A modern digital storefront crafted to elevate a premium furniture brand.',
    category: 'E-commerce • Brand Identity',
    image: woxSofa,
    color: 'hsl(340 80% 55%)',
    description: 'WOX Sofa Studio required a digital storefront that mirrored the premium quality of their furniture. We designed and developed an elegant e-commerce platform that emphasizes user experience, seamless navigation, and a refined brand identity to help them stand out in a competitive market.',
    // Extended fields for editorial layout
    clientName: 'WOX Sofa Studio',
    industry: 'Premium Furniture & Retail',
    year: '2023',
    services: ['E-commerce Design', 'Shopify Development', 'Art Direction'],
    challenge: 'Transitioning from a traditional retail model to a direct-to-consumer digital storefront without losing the premium, tactile feel of their luxury furniture.',
    goals: ['Create a digital showroom experience', 'Streamline the checkout process', 'Increase online sales by 200%'],
    audience: 'Interior Designers, Premium Homeowners, Lifestyle Enthusiasts.',
    duration: '5 Months',
    teamSize: '6 Specialists',
    role: 'Digital Product Agency',
    showcaseImages: [woxSofa, nexus, royaline, woxSofa],
    timeline: [
      { step: 'Discovery', desc: 'Understanding the product catalog and brand ethos' },
      { step: 'UX Design', desc: 'Crafting the ideal shopping journey' },
      { step: 'Art Direction', desc: 'Planning product photography & visual style' },
      { step: 'Development', desc: 'Custom Shopify theme creation' },
      { step: 'Launch', desc: 'Go-live and post-launch support' }
    ],
    brandColors: [
      { hex: '#E11D48', name: 'WOX Rose' },
      { hex: '#1C1917', name: 'Warm Charcoal' },
      { hex: '#FAFAF9', name: 'Linen White' }
    ],
    brandTypography: {
      primary: 'Playfair Display',
      secondary: 'Syne'
    },
    features: [
      { title: 'Digital Showroom', desc: 'High-resolution imagery with subtle interactive details.', icon: 'Image' },
      { title: 'Seamless Checkout', desc: 'A frictionless, optimized purchasing flow.', icon: 'ShoppingBag' },
      { title: 'Custom Configurator', desc: 'Allowing users to customize fabrics and finishes.', icon: 'Settings' }
    ],
    beforeImage: royaline,
    afterImage: woxSofa,
    results: [
      { value: '250%', label: 'Online Sales Growth' },
      { value: '65%', label: 'Mobile Conversion Rate' },
      { value: '-40%', label: 'Bounce Rate' },
      { value: '3x', label: 'Average Order Value' }
    ],
    testimonial: {
      quote: "The new website is a masterpiece. It perfectly captures the essence of our furniture and provides an effortless shopping experience that our customers love.",
      name: "Elena Rostova",
      role: "Creative Director",
      company: "WOX Sofa Studio",
      image: nexus
    }
  }
];
