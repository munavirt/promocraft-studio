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

const calculatorSteps = [
  {
    id: 'buildType',
    question: 'What would you like to build?',
    options: ['Landing Page', 'Business Website', 'E-commerce Website', 'Custom Web Application'],
  },
  {
    id: 'pages',
    question: 'How many pages?',
    options: ['1–5', '6–10', '10+'],
  },
  {
    id: 'branding',
    question: 'Do you need branding?',
    options: ['Yes', 'No'],
  },
  {
    id: 'cms',
    question: 'Do you need CMS?',
    options: ['Yes', 'No'],
  },
  {
    id: 'seo',
    question: 'Do you need SEO?',
    options: ['Basic SEO', 'Advanced SEO', 'No'],
  },
  {
    id: 'animations',
    question: 'Do you need custom animations?',
    options: ['Yes', 'No'],
  },
  {
    id: 'timeline',
    question: 'Project timeline?',
    options: ['Standard', 'Priority'],
  }
];

export default function Pricing() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (option: string) => {
    const currentQuestion = calculatorSteps[currentStep];
    const newAnswers = { ...answers, [currentQuestion.id]: option };
    setAnswers(newAnswers);

    if (currentStep < calculatorSteps.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      setTimeout(() => setShowResult(true), 300);
    }
  };

  const calculateResult = () => {
    let recommended = 'Starter';
    let minPrice = 30000;
    let maxPrice = 50000;
    let time = '2-4 Weeks';

    if (answers.buildType === 'E-commerce Website' || answers.buildType === 'Custom Web Application' || answers.pages === '10+') {
      recommended = 'Premium';
      minPrice = 100000;
      maxPrice = 250000;
      time = '8-12+ Weeks';
    } else if (answers.buildType === 'Business Website' || answers.pages === '6–10' || answers.cms === 'Yes') {
      recommended = 'Growth';
      minPrice = 50000;
      maxPrice = 100000;
      time = '4-8 Weeks';
    }

    const format = (num: number) => '₹' + num.toLocaleString('en-IN');
    const priceRange = recommended === 'Premium' ? 'Custom Quote' : `${format(minPrice)} - ${format(maxPrice)}`;

    if(answers.timeline === 'Priority') {
       time = 'Accelerated (Priority)';
    }

    let features = [];
    if (answers.buildType) features.push(`${answers.buildType}`);
    if (answers.pages && answers.pages !== '1–5') features.push(`${answers.pages} Pages`);
    if (answers.branding === 'Yes') features.push('Brand Identity & Strategy');
    if (answers.cms === 'Yes') features.push('Content Management System');
    if (answers.seo && answers.seo !== 'No') features.push(`${answers.seo}`);
    if (answers.animations === 'Yes') features.push('Premium Custom Animations');

    return { recommended, priceRange, time, features };
  };

  const result = showResult ? calculateResult() : null;

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
            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
                <motion.div 
                  className="h-full bg-blue-600"
                  initial={{ width: '0%' }}
                  animate={{ width: showResult ? '100%' : `${((currentStep) / calculatorSteps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-slate-900">Website Cost Calculator</h2>
                    <p className="text-sm text-slate-500">Get an instant project estimate</p>
                  </div>
                </div>
                {!showResult && (
                  <span className="text-sm font-medium text-slate-400">
                    Step {currentStep + 1} of {calculatorSteps.length}
                  </span>
                )}
              </div>

              <div className="min-h-[300px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {!showResult ? (
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-8 text-center">
                        {calculatorSteps[currentStep].question}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        {calculatorSteps[currentStep].options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleOptionSelect(option)}
                            className="p-4 md:p-6 rounded-2xl border-2 border-slate-100 hover:border-blue-600 hover:bg-blue-50 transition-all text-left text-base md:text-lg font-medium text-slate-700 hover:text-blue-700"
                          >
                            {option}
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
                        <h3 className="text-3xl font-display font-bold text-slate-900 mb-4">Your Project Estimate</h3>
                        <p className="text-slate-500">Based on your requirements, here is a professional proposal outline.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                        <div className="space-y-6">
                          <div className="bg-slate-50 p-6 rounded-2xl">
                            <span className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-2 block">Estimated Investment Range</span>
                            <div className="text-3xl font-bold text-blue-600">{result?.priceRange}</div>
                          </div>
                          
                          <div className="bg-slate-50 p-6 rounded-2xl">
                            <span className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-2 block">Estimated Timeline</span>
                            <div className="text-2xl font-bold text-slate-900">{result?.time}</div>
                          </div>
                          
                          <div className="bg-slate-50 p-6 rounded-2xl border-2 border-blue-100">
                            <span className="text-sm text-blue-600 font-medium uppercase tracking-wider mb-2 block">Recommended Package</span>
                            <div className="text-2xl font-display font-bold text-slate-900">{result?.recommended}</div>
                            <p className="text-slate-500 text-sm mt-2">Scroll down to see what's included in the {result?.recommended} package.</p>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl">
                          <span className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-4 block">Features Included</span>
                          <ul className="space-y-4">
                            {result?.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                <span className="text-slate-700 font-medium">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <div className="mt-8 pt-8 border-t border-slate-200">
                            <Link to="/contact">
                              <button className="w-full py-4 rounded-xl font-semibold transition-colors bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20">
                                Book Free Consultation
                              </button>
                            </Link>
                            <button 
                              onClick={() => {
                                setCurrentStep(0);
                                setAnswers({});
                                setShowResult(false);
                              }}
                              className="w-full mt-4 py-3 text-slate-500 font-medium hover:text-slate-800 transition-colors"
                            >
                              Start Over
                            </button>
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
                  className={`relative p-8 rounded-2xl border ${
                    plan.highlighted 
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
                      className={`w-full py-4 rounded-xl font-semibold transition-colors ${
                        plan.highlighted
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
