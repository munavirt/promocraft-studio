import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/PageTransition';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PDFDownloadLink } from '@react-pdf/renderer';
import ProposalPDF from '@/components/pdf/ProposalPDF';

interface OptionConfig {
  label: string;
  cost?: number;
  percentageCost?: number;
}

interface QuestionConfig {
  id: string;
  question: string;
  options: OptionConfig[];
}

interface ProjectTypeConfig {
  id: string;
  name: string;
  basePrice: number;
  baseTimeline: string;
  questions: QuestionConfig[];
}

const projectTypes: Record<string, ProjectTypeConfig> = {
  'Landing Page': {
    id: 'landing_page',
    name: 'Landing Page',
    basePrice: 15000,
    baseTimeline: '2–3 weeks',
    questions: [
      {
        id: 'sections',
        question: 'Number of sections?',
        options: [
          { label: '5' },
          { label: '8-10', cost: 10000 },
          { label: '10+', cost: 20000 }
        ]
      },
      {
        id: 'branding',
        question: 'Branding required?',
        options: [
          { label: 'Yes', cost: 12000 },
          { label: 'No' }
        ]
      },
      {
        id: 'contactForm',
        question: 'Contact Form?',
        options: [
          { label: 'Yes', cost: 3000 },
          { label: 'No' }
        ]
      },
      {
        id: 'cms',
        question: 'CMS Needed?',
        options: [
          { label: 'Yes', cost: 8000 },
          { label: 'No' }
        ]
      },
      {
        id: 'seo',
        question: 'Basic SEO',
        options: [
          { label: 'Yes', cost: 5000 },
          { label: 'No' }
        ]
      },
      {
        id: 'animations',
        question: 'Advanced Animations?',
        options: [
          { label: 'Yes', cost: 10000 },
          { label: 'No' }
        ]
      },
      {
        id: 'priority',
        question: 'When would you like to launch your project?',
        options: [
          { label: 'Standard Timeline', percentageCost: 0 },
          { label: 'Priority Delivery', percentageCost: 0.2 }
        ]
      }
    ]
  },
  'Business Website': {
    id: 'business_website',
    name: 'Business Website',
    basePrice: 25000,
    baseTimeline: '2–6 weeks',
    questions: [
      {
        id: 'pages',
        question: 'Number of pages?',
        options: [
          { label: '5' },
          { label: '10' },
          { label: '15+' }
        ]
      },
      {
        id: 'blog',
        question: 'Blog?',
        options: [
          { label: 'Yes', cost: 8000 },
          { label: 'No' }
        ]
      },
      {
        id: 'cms',
        question: 'Do you need CMS Integration?',
        options: [
          { label: 'Yes', cost: 10000 },
          { label: 'No' }
        ]
      },
      {
        id: 'branding',
        question: 'Do you need Branding?',
        options: [
          { label: 'Yes', cost: 15000 },
          { label: 'No' }
        ]
      },
      {
        id: 'seo',
        question: 'Do you need SEO?',
        options: [
          { label: 'Basic SEO', cost: 5000 },
          { label: 'Advanced SEO', cost: 15000 },
          { label: 'No' }
        ]
      },
      {
        id: 'booking',
        question: 'Booking System?',
        options: [
          { label: 'Yes', cost: 15000 },
          { label: 'No' }
        ]
      },
      {
        id: 'multiLang',
        question: 'Multi Language?',
        options: [
          { label: 'Yes', cost: 5000 },
          { label: 'No' }
        ]
      },
      {
        id: 'animations',
        question: 'Premium Animations?',
        options: [
          { label: 'Yes', cost: 15000 },
          { label: 'No' }
        ]
      },
      {
        id: 'priority',
        question: 'Priority Delivery?',
        options: [
          {
            label: 'Standard Timeline',
            percentageCost: 0
          },
          {
            label: 'Priority Delivery',
            percentageCost: 0.2
          }
        ]
      }
    ]
  },
  'Ecommerce Website': {
    id: 'ecommerce',
    name: 'Ecommerce Website',
    basePrice: 75000,
    baseTimeline: '8–12 weeks',
    questions: [
      {
        id: 'products',
        question: 'Number of Products',
        options: [
          { label: 'Up to 50' },
          { label: '50–200' },
          { label: '200+' }
        ]
      },
      {
        id: 'payment',
        question: 'Payment Gateway',
        options: [
          { label: 'Included' }
        ]
      },
      {
        id: 'inventory',
        question: 'Inventory Management',
        options: [
          { label: 'Yes', cost: 15000 },
          { label: 'No' }
        ]
      },
      {
        id: 'wishlist',
        question: 'Wishlist',
        options: [
          { label: 'Yes', cost: 8000 },
          { label: 'No' }
        ]
      },
      {
        id: 'coupons',
        question: 'Coupons',
        options: [
          { label: 'Yes', cost: 6000 },
          { label: 'No' }
        ]
      },
      {
        id: 'reviews',
        question: 'Reviews',
        options: [
          { label: 'Yes', cost: 5000 },
          { label: 'No' }
        ]
      },
      {
        id: 'accounts',
        question: 'Customer Accounts',
        options: [
          { label: 'Yes', cost: 10000 },
          { label: 'No' }
        ]
      },
      {
        id: 'shipping',
        question: 'Shipping Integration',
        options: [
          { label: 'Yes', cost: 12000 },
          { label: 'No' }
        ]
      },
      {
        id: 'multiVendor',
        question: 'Multi Vendor',
        options: [
          { label: 'Yes', cost: 80000 },
          { label: 'No' }
        ]
      },
      {
        id: 'mobileOpt',
        question: 'Mobile Optimization',
        options: [
          { label: 'Included' }
        ]
      },
      {
        id: 'seo',
        question: 'SEO',
        options: [
          { label: 'Yes', cost: 15000 },
          { label: 'No' }
        ]
      },
      {
        id: 'priority',
        question: 'When would you like to launch your project?',
        options: [
          { label: 'Standard Timeline', percentageCost: 0 },
          { label: 'Priority Delivery', percentageCost: 0.2 }
        ]
      }
    ]
  },
  'Custom Web Application': {
    id: 'webapp',
    name: 'Custom Web Application',
    basePrice: 150000,
    baseTimeline: '10–20 weeks',
    questions: [
      {
        id: 'auth',
        question: 'Authentication',
        options: [
          { label: 'Yes' },
          { label: 'No' }
        ]
      },
      {
        id: 'admin',
        question: 'Admin Dashboard',
        options: [
          { label: 'Yes' },
          { label: 'No' }
        ]
      },
      {
        id: 'userRoles',
        question: 'User Roles',
        options: [
          { label: 'Yes' },
          { label: 'No' }
        ]
      },
      {
        id: 'api',
        question: 'API Integration',
        options: [
          { label: 'Yes' },
          { label: 'No' }
        ]
      },
      {
        id: 'paymentInt',
        question: 'Payment Integration',
        options: [
          { label: 'Yes' },
          { label: 'No' }
        ]
      },
      {
        id: 'notifications',
        question: 'Notifications',
        options: [
          { label: 'Yes' },
          { label: 'No' }
        ]
      },
      {
        id: 'fileUpload',
        question: 'File Upload',
        options: [
          { label: 'Yes' },
          { label: 'No' }
        ]
      },
      {
        id: 'analytics',
        question: 'Analytics Dashboard',
        options: [
          { label: 'Yes' },
          { label: 'No' }
        ]
      },
      {
        id: 'ai',
        question: 'AI Features',
        options: [
          { label: 'Yes', cost: 50000 },
          { label: 'No' }
        ]
      },
      {
        id: 'chat',
        question: 'Chat System',
        options: [
          { label: 'Yes', cost: 30000 },
          { label: 'No' }
        ]
      },
      {
        id: 'multiTenant',
        question: 'Multi Tenant',
        options: [
          { label: 'Yes', cost: 70000 },
          { label: 'No' }
        ]
      },
      {
        id: 'mobileApi',
        question: 'Mobile API',
        options: [
          { label: 'Yes' },
          { label: 'No' }
        ]
      },
      {
        id: 'priority',
        question: 'When would you like to launch your project?',
        options: [
          { label: 'Standard Timeline', percentageCost: 0 },
          { label: 'Priority Delivery', percentageCost: 0.2 }
        ]
      }
    ]
  }
};

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small projects and startups looking to establish their digital presence.',
    price: '₹29,999',
    period: 'starting at',
    features: [
      'Brand Strategy Workshop',
      'Logo & Visual Identity',
      'Landing Page Design',
      'Responsive Development',
      '2 Rounds of Revisions',
      '30-Day Support',
    ],
    highlighted: false,
  },
  {
    name: 'Growth',
    description: 'For businesses ready to scale with a comprehensive digital experience.',
    price: '₹49,999',
    period: 'starting at',
    features: [
      'Everything in Starter',
      'Full Website Design (5-10 pages)',
      'Custom Animations & Interactions',
      'CMS Integration',
      'SEO Optimization',
      '3 Months Support',
      'Analytics Dashboard',
    ],
    highlighted: true,
  },
  {
    name: 'Premium',
    description: 'Enterprise-grade solutions for brands that demand excellence.',
    price: 'Custom',
    period: 'let\'s talk',
    features: [
      'Everything in Growth',
      'Complete Brand Overhaul',
      'Custom Web Application',
      '3D & WebGL Experiences',
      'E-commerce Integration',
      'Marketing Strategy',
      'Dedicated Account Manager',
      'Priority Support',
    ],
    highlighted: false,
  },
];

const faqs = [
  {
    question: 'Why does website pricing vary?',
    answer: 'Website pricing depends on various factors including the complexity of the design, the number of pages, custom functionalities (like e-commerce or CMS), animations, and the timeline required for the project. A custom web application will naturally require more investment than a straightforward landing page.'
  },
  {
    question: 'How long does a project take?',
    answer: 'A standard landing page might take 1-2 weeks, while a comprehensive business website could take 4-8 weeks. Complex e-commerce platforms or custom web applications usually take 8-12 weeks or more. We will provide a specific timeline along with your proposal.'
  },
  {
    question: 'Do you provide support?',
    answer: 'Yes! All our packages include a period of post-launch support ranging from 30 days to priority ongoing support, ensuring your website continues to perform optimally.'
  },
  {
    question: 'Do you redesign existing websites?',
    answer: 'Absolutely. We can take your existing website and completely overhaul its design, user experience, and underlying technology to align with your current brand goals.'
  },
  {
    question: 'Are hosting and domain included?',
    answer: 'Hosting and domain registration are typically handled separately as they are ongoing third-party costs. However, we will guide you through the process of selecting the best providers and handle all the technical setup for you.'
  }
];

export default function Pricing() {
  const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, OptionConfig>>({});
  const [showResult, setShowResult] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadDetails, setLeadDetails] = useState({ name: '', company: '', email: '' });
  const [isLeadSubmitted, setIsLeadSubmitted] = useState(false);

  let currentQuestionData;
  let totalSteps = 1;

  if (!selectedProjectType) {
    currentQuestionData = {
      id: 'buildType',
      question: 'What would you like to build?',
      options: Object.keys(projectTypes).map(key => ({ label: key }))
    };
  } else {
    totalSteps = 1 + projectTypes[selectedProjectType].questions.length;
    currentQuestionData = projectTypes[selectedProjectType].questions[currentStep];
  }

  const handleOptionSelect = (option: OptionConfig) => {
    if (!selectedProjectType) {
      setSelectedProjectType(option.label);
      setCurrentStep(0);
    } else {
      const newAnswers = { ...answers, [currentQuestionData.id]: option };
      setAnswers(newAnswers);

      if (currentStep < projectTypes[selectedProjectType].questions.length - 1) {
        setTimeout(() => setCurrentStep(currentStep + 1), 300);
      } else {
        setTimeout(() => setShowResult(true), 300);
      }
    }
  };

  const resetCalculator = () => {
    setSelectedProjectType(null);
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
    setShowLeadForm(false);
    setIsLeadSubmitted(false);
    setLeadDetails({ name: '', company: '', email: '' });
  };

  const calculateResult = () => {
    if (!selectedProjectType) return null;

    const config = projectTypes[selectedProjectType];
    let subtotal = config.basePrice;
    let percentageExtra = 0;

    const breakdown: { label: string; cost: number; costFormatted?: string; isIncluded?: boolean }[] = [];

    breakdown.push({
      label: config.name,
      cost: config.basePrice
    });

    Object.entries(answers).forEach(([qId, option]) => {
      const questionDef = config.questions.find(q => q.id === qId);
      const featureLabel = questionDef?.question || qId;

      if (option.cost) {
        subtotal += option.cost;
        breakdown.push({ label: featureLabel, cost: option.cost });
      } else if (option.percentageCost) {
        percentageExtra += option.percentageCost;
      } else if (option.label !== 'No' && option.label !== 'Included') {
        breakdown.push({ label: featureLabel, cost: 0, isIncluded: true });
      } else if (option.label === 'Included') {
        breakdown.push({ label: featureLabel, cost: 0, isIncluded: true });
      }
    });

    const priorityCost = subtotal * percentageExtra;
    if (priorityCost > 0) {
      breakdown.push({ label: 'Priority Delivery', cost: priorityCost });
    }

    const totalCost = subtotal + priorityCost;

    let recommended = 'Starter';
    if (totalCost >= 50000 && totalCost <= 150000) recommended = 'Growth';
    if (totalCost > 150000) recommended = 'Premium';

    const format = (num: number) => '₹' + num.toLocaleString('en-IN');

    breakdown.forEach(item => {
      if (item.cost > 0) item.costFormatted = format(item.cost);
      if (item.isIncluded || item.cost === 0) item.costFormatted = 'Included';
    });

    let displayTime = config.baseTimeline;
    if (percentageExtra > 0) {
      displayTime += ' (Accelerated)';
    }

    return {
      totalCostFormatted: format(totalCost),
      time: displayTime,
      recommended,
      breakdown
    };
  };

  const result = showResult ? calculateResult() : null;
  const displayedStepNumber = selectedProjectType ? currentStep + 2 : 1;
  const progressPercentage = showResult ? 100 : ((displayedStepNumber - 1) / totalSteps) * 100;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20">
          {/* Hero */}
          <section className="section-padding pb-12">
            <div className="container-wide">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-3xl mx-auto"
              >
                <span className="text-primary font-medium mb-4 block">Pricing</span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight">
                  Invest in <span className="gradient-text">exceptional design</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Transparent pricing for transparent partnerships. Every project is unique,
                  but here's a starting point.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Website Cost Calculator */}
          <section className="section-padding pt-0">
            <div className="container-wide">
              <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 md:p-12 shadow-sm border border-border relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-secondary">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-bold text-foreground">Website Cost Calculator</h2>
                      <p className="text-sm text-muted-foreground">Get an instant project estimate</p>
                    </div>
                  </div>
                  {!showResult && (
                    <span className="text-sm font-medium text-muted-foreground">
                      Step {displayedStepNumber} of {totalSteps}
                    </span>
                  )}
                </div>

                <div className="min-h-[300px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {!showResult ? (
                      <motion.div
                        key={currentQuestionData.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8 text-center">
                          {currentQuestionData.question}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                          {currentQuestionData.options.map((option) => (
                            <button
                              key={option.label}
                              onClick={() => handleOptionSelect(option)}
                              className="p-4 md:p-6 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left text-base md:text-lg font-medium text-foreground/80 hover:text-primary"
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="text-center mb-10">
                          <h3 className="text-3xl font-display font-bold text-foreground mb-4">Your Project Estimate</h3>
                          <p className="text-muted-foreground">Based on your requirements, here is a professional proposal outline.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                          <div className="space-y-6">
                            <div className="bg-secondary/50 p-6 rounded-2xl border-2 border-primary/20">
                              <span className="text-sm text-primary font-medium uppercase tracking-wider mb-2 block">Recommended Package</span>
                              <div className="text-2xl font-display font-bold text-foreground">{result?.recommended}</div>
                              <p className="text-muted-foreground text-sm mt-2">Scroll down to see what's included in the {result?.recommended} package.</p>
                            </div>

                            <div className="bg-secondary/50 p-6 rounded-2xl">
                              <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-2 block">Estimated Timeline</span>
                              <div className="text-2xl font-bold text-foreground">{result?.time}</div>
                            </div>
                          </div>

                          <div className="bg-secondary/50 p-6 rounded-2xl">
                            <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-4 block">Price Breakdown</span>
                            <ul className="space-y-4">
                              {result?.breakdown.map((item, idx) => (
                                <li key={idx} className="flex justify-between items-start border-b border-border pb-3 last:border-0 last:pb-0">
                                  <span className="text-foreground/80 font-medium">{item.label}</span>
                                  <span className="font-semibold text-foreground">{item.costFormatted}</span>
                                </li>
                              ))}
                            </ul>

                            <div className="mt-6 pt-6 border-t-2 border-border flex justify-between items-center">
                              <span className="text-lg font-bold text-foreground">Total</span>
                              <span className="text-2xl font-bold text-primary">{result?.totalCostFormatted}</span>
                            </div>

                            <div className="mt-8">
                              <AnimatePresence mode="wait">
                                {!showLeadForm ? (
                                  <motion.div
                                    key="buttons"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, height: 0 }}
                                  >
                                    <button
                                      onClick={() => setShowLeadForm(true)}
                                      className="w-full py-4 mb-4 rounded-xl font-semibold transition-colors border-2 border-primary text-primary hover:bg-primary/5"
                                    >
                                      Download Proposal PDF
                                    </button>
                                    <Link to="/contact">
                                      <button className="w-full py-4 rounded-xl font-semibold transition-colors bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20">
                                        Book Free Consultation
                                      </button>
                                    </Link>
                                    <button
                                      onClick={resetCalculator}
                                      className="w-full mt-4 py-3 text-muted-foreground font-medium hover:text-foreground transition-colors"
                                    >
                                      Start Over
                                    </button>
                                  </motion.div>
                                ) : !isLeadSubmitted ? (
                                  <motion.div
                                    key="leadForm"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-primary/5 p-6 rounded-2xl border border-primary/20"
                                  >
                                    <h4 className="text-xl font-display font-bold text-foreground mb-2">Almost Done 👋</h4>
                                    <p className="text-sm text-muted-foreground mb-6">Enter your details to generate your personalized proposal.</p>

                                    <div className="space-y-4 mb-6">
                                      <input
                                        type="text"
                                        placeholder="Name"
                                        value={leadDetails.name}
                                        onChange={(e) => setLeadDetails({ ...leadDetails, name: e.target.value })}
                                        className="w-full p-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary"
                                      />
                                      <input
                                        type="text"
                                        placeholder="Company (Optional)"
                                        value={leadDetails.company}
                                        onChange={(e) => setLeadDetails({ ...leadDetails, company: e.target.value })}
                                        className="w-full p-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary"
                                      />
                                      <input
                                        type="email"
                                        placeholder="Email"
                                        value={leadDetails.email}
                                        onChange={(e) => setLeadDetails({ ...leadDetails, email: e.target.value })}
                                        className="w-full p-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-primary"
                                      />
                                    </div>

                                    <div className="flex gap-3">
                                      <button
                                        onClick={() => setShowLeadForm(false)}
                                        className="flex-1 py-3 rounded-xl font-semibold text-muted-foreground bg-background border border-border hover:bg-secondary/50"
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        onClick={() => setIsLeadSubmitted(true)}
                                        disabled={!leadDetails.name || !leadDetails.email}
                                        className="flex-1 py-3 rounded-xl font-semibold text-primary-foreground bg-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                                      >
                                        Generate PDF
                                      </button>
                                    </div>
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="download"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-900/50 text-center"
                                  >
                                    <Check className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                                    <h4 className="text-xl font-display font-bold text-foreground mb-2">Proposal Ready!</h4>
                                    <p className="text-sm text-muted-foreground mb-6">Your personalized proposal has been generated successfully.</p>

                                    <PDFDownloadLink
                                      document={<ProposalPDF leadDetails={leadDetails} result={result!} />}
                                      fileName={`PromoCraft_Proposal_${leadDetails.name.replace(/\s+/g, '_')}.pdf`}
                                      className="w-full block py-4 rounded-xl font-semibold transition-colors bg-green-600 dark:bg-green-700 text-white hover:bg-green-700 dark:hover:bg-green-600 shadow-lg shadow-green-600/20"
                                    >
                                      {({ loading }) => (loading ? 'Generating document...' : 'Download PDF Now')}
                                    </PDFDownloadLink>

                                    <button
                                      onClick={resetCalculator}
                                      className="w-full mt-4 py-3 text-muted-foreground font-medium hover:text-foreground transition-colors"
                                    >
                                      Start Over
                                    </button>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Cards */}
          <section className="section-padding pt-0">
            <div className="container-wide">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-display font-bold mb-4">Our Packages</h2>
                <p className="text-muted-foreground">Detailed breakdown of our service tiers</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative p-8 rounded-2xl border ${plan.highlighted
                      ? 'bg-card border-primary glow-primary'
                      : 'bg-card border-border'
                      }`}
                  >
                    {plan.highlighted && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                        Most Popular
                      </div>
                    )}

                    <div className="mb-8">
                      <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                      <p className="text-muted-foreground text-sm">{plan.description}</p>
                    </div>

                    <div className="mb-8">
                      <span className="text-4xl font-display font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-2">{plan.period}</span>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to="/contact">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-4 rounded-xl font-semibold transition-colors ${plan.highlighted
                          ? 'bg-primary text-primary-foreground hover:opacity-90'
                          : 'bg-secondary text-foreground hover:bg-secondary/80'
                          }`}
                      >
                        Get Started
                        <ArrowRight className="inline-block ml-2 w-4 h-4" />
                      </motion.button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="section-padding bg-secondary/30">
            <div className="container-wide max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Frequently Asked <span className="gradient-text">Questions</span>
                </h2>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="bg-card border border-border rounded-xl px-6">
                    <AccordionTrigger className="text-left font-display font-semibold hover:no-underline py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* Custom Quote */}
          <section className="section-padding noise-overlay">
            <div className="container-wide relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center max-w-2xl mx-auto"
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Need something <span className="gradient-text">custom?</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Every brand is unique. Let's discuss your specific needs and create
                  a tailored package that fits your goals and budget.
                </p>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-hero"
                  >
                    Request Custom Quote
                    <ArrowRight className="inline-block ml-2 w-5 h-5" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}
