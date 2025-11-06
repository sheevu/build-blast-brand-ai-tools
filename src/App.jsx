import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { 
  Sparkles, Rocket, Bot, ShoppingBag, Star, 
  Check, X, ArrowRight, Menu, XIcon, 
  MessageCircle, Phone, ChevronDown
} from "lucide-react";

// Import new Firebase modules
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  // We no longer need signInWithCustomToken for Vercel
  onAuthStateChanged 
} from 'firebase/auth';
import { getFirestore, setLogLevel } from 'firebase/firestore';

// Import the new AI Presence Analyzer component
import OnlinePresenceAnalyzer from './OnlinePresenceAnalyzer.jsx';

// --- Animation Variants ---
const floatIn = { 
  hidden: { opacity: 0, y: 40 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } 
};
const staggerContainer = { 
  hidden: {}, 
  visible: { transition: { staggerChildren: 0.1 } } 
};

// --- Data Sources (from CSVs) ---

const planCategories = [
  {
    id: "start-scale",
    label: "Start & Scale with AI",
    subtitle: "MSME digital growth bundles",
    description:
      "Low-cost, high-impact plans to digitize your dukaan from ₹89 onwards. Perfect for MSMEs, local sellers, and first-time founders.",
    bullets: [
      "Launch-ready store, WhatsApp order flow, and Udyam setup",
      "Upgrade path from ₹89 launchpad to ₹1899 full-funnel growth"
    ],
    ctaLabel: "Compare launch bundles",
    ctaHref: "#plan-spotlights"
  },
  {
    id: "custom-blueprint",
    label: "Custom 90-Day AI Growth Blueprint",
    subtitle: "À la carte AI services",
    description:
      "Combine automation, content, and analytics modules for MSMEs who need custom upgrades or funded growth.",
    bullets: [
      "AI & automation setup, PPC pilots, and Hindi/English content",
      "Build your own action plan with transparent pricing"
    ],
    ctaLabel: "Design my growth plan",
    ctaHref: "#plan-table"
  },
  {
    id: "social-boost",
    label: "Always Visible Social Media Plans",
    subtitle: "AI-powered boost bundles",
    description:
      "Monthly creative + automation pods to stay visible on Google, Instagram, WhatsApp, and YouTube without hiring an agency.",
    bullets: [
      "Calendars, reels, PR drops, and influencer boosts",
      "Scale engagement from ₹1500/mo retainers"
    ],
    ctaLabel: "View content retainers",
    ctaHref: "#plan-table"
  }
];

const planSpotlights = [
  {
    id: "swaraj-tech-pack",
    label: "Swaraj Tech Pack @ ₹89",
    nickname: "Launch in 24 hours",
    category: "Bundle Pack",
    mrp: 999,
    price: 89,
    blurb:
      "Online store + WhatsApp + Google Business integration to get first sales live in a day.",
    inclusions: [
      "Product listings, price & offer setup",
      "WhatsApp catalog + auto replies",
      "Google Business profile draft ready"
    ],
    badge: "Starter favourite"
  },
  {
    id: "prarambh-pack",
    label: "Prarambh Kick-Start @ ₹499",
    nickname: "Lead-ready combo",
    category: "Bundle Pack",
    mrp: 1500,
    price: 499,
    blurb:
      "1 landing page revamp, catalog sync, and local SEO audit to capture leads affordably.",
    inclusions: [
      "Hyperlocal keyword + schema infusion",
      "Mini campaign calendar & offer hooks",
      "Performance check-ins on WhatsApp"
    ],
    badge: "Top seller"
  },
  {
    id: "raftar-booster",
    label: "Raftar Booster @ ₹1899/mo",
    nickname: "Full funnel growth",
    category: "Bundle Pack",
    mrp: 6500,
    price: 1899,
    blurb:
      "Agentic AI growth pod with PPC pilots, advanced SEO, and automation for category leaders.",
    inclusions: [
      "Agentic AI revenue alerts & dashboards",
      "PPC + reels playbooks & studio support",
      "Advanced CRM automations and inventory sync"
    ],
    badge: "Scale faster"
  },
  {
    id: "digital-dominance",
    label: "Digital Dominance @ ₹4500/mo",
    nickname: "Social authority suite",
    category: "Social Media Bundle",
    mrp: 7000,
    price: 4500,
    blurb:
      "30 posts, 12 blogs, PR drops, and creator collaborations to stay always-on across channels.",
    inclusions: [
      "Content calendar + AI caption bank",
      "Creator & influencer amplification",
      "Reporting + Hindi/English community mgmt"
    ],
    badge: "Most loved"
  }
];

const allPlans = [
  {
    name: "Swaraj Tech Pack",
    category: "Bundle Pack",
    mrp: 999,
    price: 89,
    cadence: "One-time",
    description:
      "Online store in 24 hours with product listings, WhatsApp integration, and Google Business setup."
  },
  {
    name: "Prarambh Kick-Start Pack",
    category: "Bundle Pack",
    mrp: 1500,
    price: 499,
    cadence: "One-time",
    description:
      "Growth bundle with audit, landing page, catalog sync, and combo pricing for fast lead capture."
  },
  {
    name: "Udaan Vyapari Pack",
    category: "Bundle Pack",
    mrp: 2399,
    price: 889,
    cadence: "One-time",
    description:
      "Full e-commerce stack with store setup, creative assets, SEO tools, and retention support."
  },
  {
    name: "Prabhav Dominator Pack",
    category: "Bundle Pack",
    mrp: 3200,
    price: 1399,
    cadence: "Per month",
    description:
      "Social media management, bio optimisation, local ads, and influencer promos for consistent visibility."
  },
  {
    name: "Vikas Growth Pro Pack",
    category: "Bundle Pack",
    mrp: 4500,
    price: 1599,
    cadence: "Per month",
    description:
      "Always-on AI marketing with CRM insights, multi-language content, and review automation."
  },
  {
    name: "Raftar Booster Pack",
    category: "Bundle Pack",
    mrp: 6500,
    price: 1899,
    cadence: "Per month",
    description:
      "Tez Raftar agentic pod with PPC pilots, local SEO domination, WhatsApp automation, and premium resources."
  },
  {
    name: "Business Growth Consultation",
    category: "Individual Service",
    mrp: 3500,
    price: 499,
    cadence: "Per session",
    description:
      "High-level direction to streamline operations, align resources, and map next growth moves."
  },
  {
    name: "WhatsApp Automation & Meta Suite (Basic)",
    category: "Individual Service",
    mrp: 899,
    price: 129,
    cadence: "One-time setup",
    description:
      "Implement WhatsApp Business automations and optimise Meta Suite for reliable lead capture."
  },
  {
    name: "Catalog Builder (Pro)",
    category: "Individual Service",
    mrp: 1499,
    price: 599,
    cadence: "One-time setup",
    description:
      "Guided catalog creation with no-code editor so non-tech owners manage products visually."
  },
  {
    name: "Research, Blogs & Article Writing",
    category: "Individual Service",
    mrp: 999,
    price: 499,
    cadence: "Per project",
    description:
      "Research-backed content in Hindi/English to grow organic reach and authority."
  },
  {
    name: "SaaS & AI Tool Development (MVP)",
    category: "Individual Service",
    mrp: 6999,
    price: 2999,
    cadence: "Project",
    description:
      "Scoping, prototyping, and launch of AI-enabled MVPs to test market demand fast."
  },
  {
    name: "Excel & Google Sheets Automation",
    category: "Individual Service",
    mrp: 4999,
    price: 1999,
    cadence: "Project",
    description:
      "Automate reporting, inventory, and finance workflows using custom scripts and dashboards."
  },
  {
    name: "Resume Writing",
    category: "Individual Service",
    mrp: 299,
    price: 99,
    cadence: "Per project",
    description:
      "Professional, ATS-ready resumes that highlight achievements and role fit."
  },
  {
    name: "AI Chatbot & Assistant",
    category: "Individual Service",
    mrp: 1499,
    price: 499,
    cadence: "Project",
    description:
      "Deploy AI assistants that converse naturally across web, WhatsApp, and support channels."
  },
  {
    name: "SEO & Content Boost",
    category: "Individual Service",
    mrp: 1899,
    price: 599,
    cadence: "Per month",
    description:
      "Blend SEO audits with keyword-rich content drops to lift organic traffic quickly."
  },
  {
    name: "Landing Pages (Lead Generation)",
    category: "Individual Service",
    mrp: 2099,
    price: 699,
    cadence: "Per page",
    description:
      "High-converting landing pages with single-focus CTAs and embedded tracking."
  },
  {
    name: "Full Custom Website (5 pages)",
    category: "Individual Service",
    mrp: 9600,
    price: 3500,
    cadence: "Project",
    description:
      "Custom web builds tailored to brand identity, audience needs, and conversion goals."
  },
  {
    name: "All Bio Link + Verified GMB (5 links)",
    category: "Individual Service",
    mrp: 1200,
    price: 229,
    cadence: "One-time setup",
    description:
      "Link-in-bio hub plus verified Google Business profile to centralise discovery and trust."
  },
  {
    name: "PR Launch",
    category: "Individual Service",
    mrp: 2499,
    price: 899,
    cadence: "Campaign",
    description:
      "Strategic PR launch with messaging, media kits, and distribution for new offerings."
  },
  {
    name: "Digital Foundation Pack",
    category: "Social Media Bundle",
    mrp: 3500,
    price: 1500,
    cadence: "Per month",
    description:
      "10 posts, 20 captions, and 1 blog with PR support to kickstart social visibility."
  },
  {
    name: "Digital Expansion Pack",
    category: "Social Media Bundle",
    mrp: 5500,
    price: 3000,
    cadence: "Per month",
    description:
      "15 posts, 5 blogs, campaign calendar, and PR drops for steady brand building."
  },
  {
    name: "Digital Dominance Pack",
    category: "Social Media Bundle",
    mrp: 7000,
    price: 4500,
    cadence: "Per month",
    description:
      "30 posts, 12 blogs, 2 PRs, and automation to stay always-on across channels."
  },
  {
    name: "Custom Influencer Boost",
    category: "Social Media Bundle",
    mrp: null,
    price: null,
    cadence: "On request",
    description:
      "Creator-led reels, video marketing, and studio production add-ons tailored to campaign goals."
  }
];

const valuePropsData = [
  {
    title: "Best Affordable Digital Marketing",
    desc: "Launch with ₹89, then move into ₹499/₹1599/₹1899 packs as you grow. Local SEO + reels + WhatsApp automation that actually converts.",
    metric: "₹89 launchpad",
    gradient: "from-[#3b0764] via-[#6d28d9] to-[#0f172a]"
  },
  {
    title: "Agentic AI of Digital India",
    desc: "Your growth companion sends weekly WhatsApp reports: top-selling item, missed revenue, and the content to post—auto in Hindi/English.",
    metric: "Weekly AI briefing",
    gradient: "from-[#0f766e] via-[#22c55e] to-[#082f49]"
  },
  {
    title: "Bharat’s First Swadeshi Hindi CRM for MSME",
    desc: "Talk to your CRM in Hindi voice. Get order alerts, smart invoices, inventory sync, and customer insights—linked to Google Sheets.",
    metric: "Hindi voice ready",
    gradient: "from-[#7f1d1d] via-[#f43f5e] to-[#1e1b4b]"
  }
];

const howItWorksSteps = [
  {
    step: "Pay & Verify",
    highlight: "₹89–₹499 onboarding",
    desc: "UPI auto-verify triggers instant KYC for PAN, GSTIN, or Udyam via OCR so you go live without paperwork.",
    benefit: "Faster onboarding"
  },
  {
    step: "Business Knowledge Builder",
    highlight: "AI profile setup",
    desc: "Upload receipts, WhatsApp chats, or product photos. AI maps your SKUs, categories, and hyperlocal keywords.",
    benefit: "Better local SEO"
  },
  {
    step: "Smart Go-Live",
    highlight: "Under 30 minutes",
    desc: "We launch your SEO-ready landing page, WhatsApp CTA, and Google Business listing with city + language localization.",
    benefit: "Start getting calls"
  }
];

const platformPillars = [
  {
    name: "Vyapaar CRM",
    tagline: "Swadeshi CRM for MSMEs",
    bullets: [
      "Hindi/English voice-mode dashboard",
      "Daily Vyapaar Suggestion with sales, content, and cost insights",
      "WhatsApp order alerts with local invoice builder",
      "Inventory + customer insights auto-synced with Google Sheets"
    ]
  },
  {
    name: "Growth Companion",
    tagline: "Agentic AI co-pilot",
    bullets: [
      "Weekly WhatsApp report on winners, missed revenue, and next-post ideas",
      "Nearby referrals powered by geo-AI for Lucknow & UP",
      "Festival and offer prompts in Hindi + English",
      "1-click upgrades to growth packs and agent network"
    ]
  }
];

const sectorsServed = [
  "Kirana & General Stores",
  "Salons & Clinics",
  "Clothing & Boutiques",
  "Sweet Shops & Bakeries",
  "Service Providers",
  "Property Dealers",
  "Cafés & Restaurants"
];

const proofPoints = [
  "Aminabad sari houses jumped to page-one on Google Maps within 18 days of onboarding.",
  "Hazratganj cafés booked 42% more table reservations after Hinglish WhatsApp automation.",
  "Gomti Nagar clinics save 8+ hours weekly with voice-first Vyapaar CRM prompts.",
  "Aliganj kiranas saw repeat orders rise 2.3x once loyalty broadcasts went bilingual."
];

const pricingFaq = [
  {
    q: "Can I start with ₹89 and upgrade later?",
    a: "Absolutely. Move from Swaraj to Prarambh, Vikas, or Raftar without losing your CRM, analytics, or automation history."
  },
  {
    q: "How are the three plan categories different?",
    a: "Start & Scale bundles launch your dukaan, the Custom 90-day blueprint mixes modules on demand, and Social Boost retainers keep you visible monthly."
  },
  {
    q: "Is Udyam and compliance support included?",
    a: "Yes. We help you secure your Udyam certificate free of cost so invoicing, tenders, and MSME benefits unlock quickly."
  }
];

// Data for Testimonials Section
const testimonialsData = [
  { name: "Aisha", area: "Hazratganj", quote: "WhatsApp orders doubled. Simple, effective, and local." },
  { name: "Raghav", area: "Gomti Nagar", quote: "The meme campaigns were a hit! We saw instant engagement." },
  { name: "Meera", area: "Aliganj", quote: "Finally, a content calendar and AI hooks that make sense. Peace of mind." },
];

// Data for new Blog Section
const blogPostsData = [
  { 
    category: "AI Marketing", 
    title: "Scale in Lucknow: 5 AI Tools for Your MSME", 
    desc: "Stop doing manual work. Discover 5 AI tools that can automate your marketing, sales, and support...",
    img: "https://placehold.co/600x400/0B0F19/00FFFF?text=AI+Tools",
    href: "https://sudarshan.ai/blog/ai-tools-for-msme"
  },
  { 
    category: "Local SEO", 
    title: "From Kabab Trails to Killer Funnels", 
    desc: "How a local Lucknow food joint used 'mohalla-first' SEO to triple their walk-in customers.",
    img: "https://placehold.co/600x400/0B0F19/00F1A0?text=Local+SEO",
    href: "https://sudarshan.ai/blog/local-seo-lucknow"
  },
  { 
    category: "Uni-Commerce", 
    title: "Beyond WhatsApp: The ₹89 Uni-Commerce Portal", 
    desc: "Your customers are on Instagram, Google, and WhatsApp. Why is your store only in one place?",
    img: "https://placehold.co/600x400/0B0F19/7F00FF?text=Commerce",
    href: "https://sudarshan.ai/blog/uni-commerce-portal"
  },
];

const faqItems = [
  {
    question: "How fast can you launch the ₹89 Uni-Commerce portal?",
    answer: "We set up your storefront, plug in WhatsApp ordering, and connect payments within 48 hours once we receive your product list and branding inputs."
  },
  {
    question: "Do you help with content creation for Hinglish audiences?",
    answer: "Yes. Our AI copy workflows are tuned for Lucknow’s tone, mixing Hindi, Hinglish, and English to match your mohalla’s vibe."
  },
  {
    question: "What happens after the AI presence audit?",
    answer: "You get a playbook that includes an SEO checklist, campaign calendar, and growth actions ranked by impact. We also track improvements in the dashboard."
  },
  {
    question: "Can MSMEs without design teams still run campaigns?",
    answer: "Absolutely. We provide ready-to-publish reels, posters, and captions. Our studio partners can shoot custom footage if needed."
  },
  {
    question: "Is there support beyond Lucknow?",
    answer: "We began in Lucknow but now run pods for MSMEs in Kanpur, Varanasi, Prayagraj, and NCR. Remote support is available nationwide."
  }
];


// --- Main App Component ---

export default function App() {
  // --- Firebase State ---
  const [auth, setAuth] = useState(null);
  const [db, setDb] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // --- UPDATED Firebase Initialization Effect (for Vercel) ---
  useEffect(() => {
    // Construct the Firebase config object from Vercel's environment variables
    // Vite exposes env variables via `import.meta.env`
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };

    // Check if the keys are actually present
    if (firebaseConfig.apiKey) {
      try {
        const app = initializeApp(firebaseConfig);
        const authInstance = getAuth(app);
        const dbInstance = getFirestore(app);
        
        // You can keep this for development/debugging if you like
        setLogLevel('debug'); 

        setAuth(authInstance);
        setDb(dbInstance);

        // --- UPDATED Authentication Logic (for Vercel) ---
        onAuthStateChanged(authInstance, async (user) => {
          if (user) {
            // User is signed in
            setUserId(user.uid);
            setIsAuthReady(true);
            console.log("User is signed in with UID:", user.uid);
          } else {
            // User is signed out. In production, we just sign them in anonymously.
            // We no longer check for __initial_auth_token.
            console.log("No user found, attempting anonymous sign-in...");
            try {
              await signInAnonymously(authInstance);
              // The onAuthStateChanged listener will fire again once
              // the anonymous sign-in is complete, setting the user.
            } catch (error) {
              console.error("Firebase anonymous sign-in error:", error);
              setIsAuthReady(true); // Still ready, but auth failed
            }
          }
        });

      } catch (error) {
        console.error("Firebase initialization error:", error);
      }
    } else {
      // This will happen if you forget to add the env variables to Vercel
      console.warn("Firebase config environment variables (VITE_FIREBASE_...) are not set. AI tool will be disabled.");
    }
  }, []); // Empty dependency array ensures this runs only once

  // --- Render ---
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans antialiased">
      <ScrollProgressBar />
      <NeonGridBackdrop />
      <GlowBlobs />
      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:px-6 md:pt-16 overflow-x-hidden">
        <Hero />
        <SectionDivider />
        <ValuePropsSection />
        <SectionDivider />
        <HowItWorksSection />
        <SectionDivider />
        <PlatformPillarsSection />
        <SectionDivider />
        <RevenueStrip />
        <SectionDivider />
        <WhySudarshan />
        <SectionDivider />
        <PlansSection />
        <SectionDivider />
        <SectorsSection />
        <SectionDivider />
        <ProofSection />
        <SectionDivider />
        <Campaigns />
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <BlogSection />
        <SectionDivider />
        <FaqSection />
        <CTA />
        <SectionDivider />
        {/* --- AI Tool Section relocated just above footer --- */}
        {isAuthReady && db && auth && (
          <AiPresenceAnalyzerSection db={db} auth={auth} userId={userId} />
        )}
      </main>
      <FloatingCTA />
      <Footer />
    </div>
  );
}

// --- Page Sections ---

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { href: "#value", label: "Why ₹89" },
    { href: "#plans", label: "Plans" },
    { href: "#proof", label: "Results" },
    { href: "#campaigns", label: "Case Studies" },
    { href: "#cta", label: "WhatsApp" }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          {/* Logo and Title */}
          <motion.a 
            href="#hero"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7F00FF] to-[#00FFFF] shadow-[0_0_25px_rgba(127,0,255,0.7)]">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/80">Sudarshan AI Labs</p>
              <p className="text-sm text-white/70">Lucknow • MSME Growth Engine</p>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            {navLinks.map((link, i) => (
              <motion.a 
                key={link.href}
                href={link.href} 
                className="hover:text-white transition"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.1, ease: "easeOut" }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* CTA and Mobile Menu Toggle */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <a href="#cta" className="group hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#00F1A0] to-[#00FFFF] px-4 py-2 text-xs font-semibold text-black shadow-[0_0_25px_rgba(0,241,160,0.7)] transition hover:shadow-[0_0_35px_rgba(0,241,160,1)] md:inline-flex">
              <Rocket className="h-4 w-4" />
              <span>₹89 Launchpad</span>
            </a>
            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(true)} className="md:hidden p-2 text-white/80 hover:text-white">
              <Menu className="h-6 w-6" />
            </button>
          </motion.div>
        </div>
      </header>

      {/* Mobile Menu (Animated) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-lg md:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-64 bg-[#0B0F19] border-l border-white/10 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 p-2 text-white/80 hover:text-white">
                <XIcon className="h-6 w-6" />
              </button>
              <nav className="flex flex-col gap-6 text-lg text-white/80 mt-16">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="hover:text-white transition" onClick={() => setIsMenuOpen(false)}>
                    {link.label}
                  </a>
                ))}
                <a href="#cta" className="group mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00F1A0] to-[#00FFFF] px-5 py-3 text-sm font-semibold text-black shadow-[0_0_25px_rgba(0,241,160,0.7)] transition">
                  <Rocket className="h-5 w-5" />
                  <span>₹89 Launchpad</span>
                </a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#0f172a]/95 via-[#101c30]/92 to-[#050b13]/95 px-6 py-14 md:px-12 md:py-20"
    >
      <AuroraBlob className="top-[-18%] left-[-14%] h-56 w-56 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.28),rgba(15,23,42,0))]" />
      <AuroraBlob className="bottom-[-18%] right-[-12%] h-72 w-72 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.32),rgba(8,47,73,0))]" />
      <LightBeam className="left-1/3 opacity-70" heightClass="h-[420px]" />

      <div className="relative grid gap-12 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
        {/* Hero Text Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6 text-center lg:text-left"
        >
          <motion.div
            variants={floatIn}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-white/[0.06] px-4 py-1 text-[11px] uppercase tracking-[0.26em] text-emerald-200/90 lg:mx-0"
          >
            <Sparkles className="h-3 w-3" />
            <span>AI launchpad • Lucknow & Bharat MSMEs</span>
          </motion.div>

          <motion.h1
            variants={floatIn}
            className="mx-auto max-w-2xl text-4xl font-semibold leading-[1.15] text-white sm:text-5xl lg:mx-0 lg:text-[3.4rem]"
          >
            Launch Your Digital Dukaan in{" "}
            <motion.span
              className="block bg-gradient-to-r from-[#22d3ee] via-[#818cf8] to-[#f97316] bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 200%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              30 Minutes With Agentic AI
            </motion.span>
          </motion.h1>

          <motion.p
            variants={floatIn}
            className="mx-auto max-w-xl text-base leading-relaxed text-white/70 sm:text-lg lg:mx-0"
          >
            Hyperlocal SEO, WhatsApp automation, and Hindi-first CRM so every
            vyapari can capture more calls, orders, and repeat buyers—without
            hiring an agency.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={floatIn}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <a
              href="#plans"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#34d399] via-[#3b82f6] to-[#9333ea] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(59,130,246,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_55px_rgba(59,130,246,0.65)] sm:w-auto"
            >
              Explore ₹89 Launchpad
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#process"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 transition-all duration-300 hover:border-white/35 hover:bg-white/10 sm:w-auto"
            >
              See 30-min Workflow
            </a>
          </motion.div>
        </motion.div>

        {/* Hero Monitor Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md lg:mx-0"
        >
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#101b33]/90 via-[#0b1222]/92 to-[#050a13]/96 p-6 shadow-[0_60px_140px_-60px_rgba(59,130,246,0.55)]">
            <AuroraBlob className="top-0 left-0 h-48 w-48 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.35),rgba(12,74,110,0))]" />
            <AuroraBlob className="bottom-[-15%] right-[-10%] h-56 w-56 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.3),rgba(15,23,42,0))]" />

            <div className="relative space-y-4">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span className="uppercase tracking-[0.24em]">Agentic AI</span>
                <span className="flex items-center gap-1 rounded-full border border-white/10 bg-black/30 px-2 py-1">
                  <Sparkles className="h-3 w-3 text-emerald-300" />
                  Live
                </span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
                <p className="text-sm text-white/80">
                  “Hazratganj searches up 34% this week. Push the Chikankari
                  combo reel before 7 PM.”
                </p>
                <div className="mt-4 flex items-center justify-between text-[11px] text-white/50">
                  <span>Vyapaar Suggestions</span>
                  <ArrowRight className="h-4 w-4 text-emerald-300" />
                </div>
              </div>
              <div className="grid gap-3 text-xs text-white/70 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-200/80">
                    Missed revenue
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    ₹12,480
                  </p>
                  <p className="mt-2 text-[11px] text-white/60">
                    Run the “Thursday Thali” combo again.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-200/80">
                    Top SKU
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    Lucknowi Chikankari
                  </p>
                  <p className="mt-2 text-[11px] text-white/60">
                    +38% vs last week.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-200/80">
                  Action cue
                </p>
                <p className="mt-2 text-sm text-white/75">
                  Schedule WhatsApp broadcast: “Udyam-verified MSME, get 10% off
                  on pre-bookings.”
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- This is the section that imports and displays your new tool ---
function AiPresenceAnalyzerSection({ db, auth, userId }) {
  return (
    <section id="analyzer" className="mt-20 md:mt-32">
      <SectionHeader 
        eyebrow="Free AI Tool" 
        title="AI Online Presence Analyzer" 
        subtitle="Enter your business name and location to get a free AI-powered analysis of your online presence and actionable tips for growth."
      />
      <motion.div
        className="relative mt-10 overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#0f172a]/90 via-[#1e1b4b]/80 to-[#050b13]/95 p-1 shadow-[0_40px_120px_-45px_rgba(59,130,246,0.55)]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="relative grid rounded-[32px] bg-black/40 p-6 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:p-12">
          <AuroraBlob className="top-[-25%] left-[-18%] h-72 w-72 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),rgba(15,23,42,0))]" />
          <AuroraBlob className="bottom-[-20%] right-[-10%] h-72 w-72 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.28),rgba(15,23,42,0))]" />

          <div className="relative space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
              Agentic diagnostic
            </span>
            <h3 className="text-3xl font-semibold text-white">
              Benchmark your digital footprint in 60 seconds.
            </h3>
            <p className="text-base text-white/75">
              Discover missing listings, content gaps, and WhatsApp conversion leaks. The analyzer pulls live signals from Google, Instagram, and Maps to build your next-step plan.
            </p>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-3">
                <Sparkles className="mt-1 h-4 w-4 text-sky-300" />
                Instant intent score and “near me” ranking health for your mohalla.
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="mt-1 h-4 w-4 text-sky-300" />
                Auto-generated three-week action plan tied to your chosen growth pack.
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="mt-1 h-4 w-4 text-sky-300" />
                WhatsApp handoff with insights saved to your Hindi CRM workspace.
              </li>
            </ul>
          </div>

          <div className="relative mt-8 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_22px_60px_-40px_rgba(59,130,246,0.55)] lg:mt-0">
            <OnlinePresenceAnalyzer db={db} auth={auth} userId={userId} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ValuePropsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCard = valuePropsData[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + valuePropsData.length) % valuePropsData.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % valuePropsData.length);
  };

  return (
    <section id="value" className="mt-20 md:mt-28">
      <SectionHeader
        eyebrow="Why merchants switch"
        title="Launch fast, sell smarter, scale with agentic AI"
        subtitle="Built for Lucknow and Bharat MSMEs that want calls, catalog sales, and loyal buyers without agency chaos."
      />
      <div className="mt-10">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/40 p-1">
          <motion.div
            key={activeCard.title}
            initial={{ opacity: 0.4, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`relative flex flex-col gap-6 overflow-hidden rounded-[30px] bg-gradient-to-br ${activeCard.gradient} px-6 py-10 text-center sm:px-10 md:flex-row md:items-center md:text-left`}
          >
            <AuroraBlob className="top-[-35%] left-[-20%] h-64 w-64 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(15,23,42,0))]" />
            <AuroraBlob className="bottom-[-30%] right-[-10%] h-72 w-72 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14),rgba(15,23,42,0))]" />
            <div className="relative flex-1 space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/80">
                <Sparkles className="h-3 w-3" />
                {activeCard.metric}
              </span>
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                {activeCard.title}
              </h3>
              <p className="text-base leading-relaxed text-white/85 sm:text-lg">
                {activeCard.desc}
              </p>
            </div>
            <motion.div
              className="relative flex flex-col items-center justify-center gap-6 rounded-3xl border border-white/15 bg-white/10 px-8 py-6 shadow-[0_0_40px_rgba(255,255,255,0.15)] md:w-[260px]"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <motion.div
                className="rounded-full bg-white/15 p-4 text-white"
                animate={{ rotate: [0, 12, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
              >
                <Bot className="h-8 w-8" />
              </motion.div>
              <p className="text-sm text-white/70">
                Swipe through the carousel to see why shops shift to Sudarshan AI.
              </p>
            </motion.div>
          </motion.div>

          <div className="relative flex items-center justify-between px-4 py-3">
            <button
              type="button"
              aria-label="Previous value prop"
              onClick={handlePrev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
            >
              <ArrowRight className="h-5 w-5 -scale-x-100" />
            </button>
            <div className="flex items-center gap-2">
              {valuePropsData.map((card, idx) => (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 w-8 rounded-full transition ${
                    idx === activeIndex ? "bg-white" : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Show slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next value prop"
              onClick={handleNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
          {valuePropsData.map((card, idx) => (
            <motion.button
              key={card.title}
              onClick={() => setActiveIndex(idx)}
              className={`flex min-w-[220px] flex-1 items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-left transition ${
                idx === activeIndex ? "bg-white/15 text-white" : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-sm font-semibold">{card.metric}</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="process" className="mt-20 md:mt-32">
      <SectionHeader
        eyebrow="Zero-chaos onboarding"
        title="Go live in three AI-assisted steps"
        subtitle="From UPI verification to a localized landing page—everything is orchestrated with agentic workflows so you can sell instantly."
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div
          className="relative overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-[#0f172a]/80 via-[#1e293b]/70 to-[#0b1120]/90 p-8 shadow-[0_30px_120px_-40px_rgba(59,130,246,0.6)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <AuroraBlob className="top-[-30%] right-[-20%] h-64 w-64 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3),rgba(15,23,42,0))]" />
          <AuroraBlob className="bottom-[-20%] left-[-10%] h-72 w-72 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.28),rgba(15,23,42,0))]" />
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
            <Sparkles className="h-3 w-3" />
            30-Minute Play
          </span>
          <h3 className="mt-6 text-3xl font-semibold text-white">
            AI guides every move from verification to live orders.
          </h3>
          <p className="mt-4 text-base text-white/75">
            Just upload receipts or catalog shots and the workflow builds your localized assets. Our pods in Lucknow keep humans in the loop so nothing breaks when you’re scaling.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-4 w-4 text-emerald-300" />
              UPI-powered KYC (PAN/GSTIN/Udyam) with automated validation
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-4 w-4 text-emerald-300" />
              Hyperlocal keyword suggestions in Hindi + English
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-4 w-4 text-emerald-300" />
              Google/WhatsApp storefront shipped with pre-built offers
            </li>
          </ul>
        </motion.div>

        <motion.div
          className="relative flex flex-col gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="absolute left-[18px] top-6 bottom-6 hidden w-[2px] bg-gradient-to-b from-[#38bdf8] via-transparent to-[#9333ea] lg:block" />
          {howItWorksSteps.map((step, index) => (
            <motion.div
              key={step.step}
              variants={floatIn}
              className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-transparent to-black/[0.4] p-6 shadow-[0_22px_60px_-40px_rgba(59,130,246,0.55)]"
            >
              <motion.span
                className="absolute -top-4 left-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#22d3ee] to-[#9333ea] text-black font-semibold shadow-[0_0_20px_rgba(130,87,230,0.65)]"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4 + index, repeat: Infinity }}
              >
                {index + 1}
              </motion.span>
              <div className="lg:pl-10">
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/80">{step.step}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{step.highlight}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{step.desc}</p>
                <div className="mt-3 inline-flex items-center gap-2 text-xs text-emerald-200">
                  <Check className="h-4 w-4" />
                  {step.benefit}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PlatformPillarsSection() {
  return (
    <section id="pillars" className="mt-20 md:mt-32">
      <SectionHeader
        eyebrow="Platform pillars"
        title="Two engines run your growth loop"
        subtitle="Vyapaar CRM keeps your operations sharp, while the Growth Companion AI fills your calendar with ideas, leads, and referrals."
      />
      <motion.div
        className="mt-10 grid gap-8 lg:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {platformPillars.map((pillar) => (
          <motion.div
            key={pillar.name}
            variants={floatIn}
            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent p-8 shadow-[0_40px_90px_-60px_rgba(59,130,246,0.55)] transition-all duration-500 hover:border-[#34d399]/60 hover:-translate-y-2"
          >
            <motion.div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "linear-gradient(140deg, rgba(0,241,160,0.18), transparent 60%)" }}
            />
            <div className="relative flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/70">{pillar.tagline}</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{pillar.name}</h3>
              </div>
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white/70"
                animate={{ rotate: [0, 6, -6, 0] }}
                transition={{ repeat: Infinity, duration: 8 }}
              >
                <Bot className="h-6 w-6" />
              </motion.div>
            </div>
            <ul className="relative mt-6 space-y-3 text-sm text-white/70">
              {pillar.bullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-[#00F1A0] to-[#00FFFF]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}


function RevenueStrip() {
  return (
    <div className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#001F3F] via-[#050814] to-[#120022] p-1">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center justify-between gap-4 rounded-[26px] bg-black/80 px-6 py-5 text-sm text-white/70 md:flex-row md:text-base"
      >
        <div className="flex flex-col gap-1 text-center md:text-left">
          <span className="text-xs uppercase tracking-[0.24em] text-emerald-200/80">Revenue loop</span>
          <span>Upsell-ready packs at ₹499 • ₹1599 • ₹1899 + earn 5% by referring MSMEs in your mohalla.</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#plans"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00F1A0] to-[#00FFFF] px-4 py-2 text-sm font-semibold text-black shadow-[0_0_18px_rgba(0,241,160,0.6)] transition hover:shadow-[0_0_28px_rgba(0,241,160,0.8)]"
          >
            Start with ₹89
          </a>
          <a
            href="https://wa.me/919559595959"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
          >
            Talk to an AI Growth Advisor
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

function WhySudarshan() {
  const highlights = [
    { title: "Local-first templates", desc: "City + mohalla tuned landing pages help you rank on Google Maps faster." },
    { title: "Bilingual by default", desc: "Hindi + English journeys for owners, staff, and customers—no translation stress." },
    { title: "No-code, low-cost", desc: "Agentic workflows ship campaigns without hiring a full agency." },
    { title: "Free Udyam support", desc: "Get your Udyam certificate at zero cost and start invoicing instantly." }
  ];

  return (
    <section id="about" className="mt-20 md:mt-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <motion.div variants={floatIn}>
          <SectionLabel>Why Sudarshan AI Labs?</SectionLabel>
          <motion.h2
            className="mt-3 text-3xl md:text-4xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Lucknow-first, Bharat-ready digital command center.
          </motion.h2>
          <motion.p
            className="mt-4 text-base leading-relaxed text-white/70"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            Built by vyaparis for vyaparis—our Lucknow pods mix Hinglish creatives, GIS-based SEO, and WhatsApp commerce so mohalla brands turn browsers into buyers without juggling agencies.
          </motion.p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <AboutChip key={item.title} title={item.title} desc={item.desc} />
            ))}
          </div>
          <motion.div
            className="mt-8 grid gap-4 sm:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={staggerContainer}
          >
            <KeyStatCard value="2.3x" label="Repeat orders from Aminabad kiranas" />
            <KeyStatCard value="18 days" label="Average time to page-one GMB rank" />
            <KeyStatCard value="540+" label="MSMEs coached via Hindi CRM cues" />
          </motion.div>
        </motion.div>

        <motion.div
          variants={floatIn}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#120022]/90 via-[#001F3F]/60 to-[#0B0F19]/90 p-6"
        >
          <AuroraBlob className="top-[-35%] right-[-25%] h-60 w-60 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.28),rgba(15,23,42,0))]" />
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/80">Lucknow Playbook</p>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li>• Hazratganj boutiques — reels, reviews & festival microsites shipped weekly.</li>
            <li>• Fun Republic launches — influencer reels + meme OOH stitched into WhatsApp retargeting.</li>
            <li>• Aminabad kirana — ₹89 catalog plus Hinglish offers for loyal WhatsApp lists.</li>
            <li>• Chacoco Café — creator collabs, FOMO events, and AI follow-up flows.</li>
          </ul>
          <motion.div
            className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-xs text-white/70"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-semibold uppercase tracking-[0.22em] text-white/60">Service footprint</span>
            <p>Pods active in Hazratganj, Gomti Nagar, Aminabad, Aliganj, Indira Nagar, plus remote teams for Kanpur, Prayagraj & NCR MSMEs.</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function SectorsSection() {
  return (
    <section id="sectors" className="mt-20 md:mt-32">
      <SectionHeader
        eyebrow="Who we work with"
        title="Designed for street-smart sellers & service pros"
        subtitle="From kiranas to clinics, every pack is tuned to the realities of your lane, locality, and buyer behaviour."
      />
      <motion.div
        className="mt-10 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {sectorsServed.map((sector, index) => (
          <motion.div
            key={sector}
            variants={floatIn}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-transparent to-black/[0.4] px-5 py-6 text-white/80 shadow-[0_22px_60px_-40px_rgba(14,165,233,0.65)] transition-all duration-500 hover:border-emerald-300/60 hover:-translate-y-2 hover:text-white"
          >
            <motion.div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "linear-gradient(135deg, rgba(0,241,160,0.18), transparent 65%)" }}
            />
            <div className="relative flex items-center justify-between">
              <p>{sector}</p>
              <motion.span
                className="text-xs uppercase tracking-[0.18em] text-emerald-200/70"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3 + index, repeat: Infinity }}
              >
                Ready
              </motion.span>
            </div>
            <a href="#process" className="relative mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200/90">
              See playbook <ArrowRight className="h-3 w-3" />
            </a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function ProofSection() {
  return (
    <section id="proof" className="mt-20 md:mt-32">
      <SectionHeader
        eyebrow="Proof & outcomes"
        title="MSMEs grow within weeks—not quarters"
        subtitle="We measure success in leads captured, catalog sales closed, and hours saved for non-tech founders."
      />
      <motion.div
        className="mt-8 space-y-4"
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true, amount: 0.3 }}
      >
        {proofPoints.map((line, idx) => (
          <motion.div
            key={line}
            variants={floatIn}
            className="flex items-start gap-3 rounded-3xl border border-white/10 bg-[#050814]/70 px-5 py-4 text-sm text-white/80"
          >
            <motion.span
              className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#00F1A0] to-[#00FFFF] text-black font-semibold"
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2.8 + idx, repeat: Infinity }}
            >
              {idx + 1}
            </motion.span>
            <span>{line}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function PlansSection() {
  return (
    <section id="plans" className="mt-20 md:mt-32">
      <SectionHeader
        eyebrow="All pricing & bundles"
        title="Transparent plans for every MSME growth stage"
        subtitle="Compare launch packs, monthly retainers, and à la carte services in one place. Savings shown against MRP so you know exactly what you keep."
      />
      <motion.div
        className="mt-10 grid gap-6 md:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {planCategories.map((category) => (
          <PlanCategoryCard key={category.id} category={category} />
        ))}
      </motion.div>

      <SectionDivider />

      <motion.div
        id="plan-spotlights"
        className="mt-12 grid gap-6 md:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {planSpotlights.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </motion.div>

      <motion.div
        id="plan-table"
        className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-[#050814]/80 backdrop-blur-sm"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <PlansTable plans={allPlans} />
      </motion.div>

      <motion.div
        className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {pricingFaq.map((item) => (
          <motion.div
            key={item.q}
            className="rounded-3xl border border-white/10 bg-[#030615]/90 p-5 text-sm text-white/75 shadow-[0_12px_30px_-20px_rgba(0,0,0,0.8)]"
            variants={floatIn}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/80">
              {item.q}
            </p>
            <p className="mt-3 leading-relaxed">{item.a}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Campaigns() {
  return (
    <section id="campaigns" className="mt-20 md:mt-32">
      <SectionHeader eyebrow="Campaign highlights" title="When AI, memes & mohalla meet" subtitle="Real metrics from local experiments." />
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }} 
        variants={staggerContainer} 
        className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3"
      >
        <CampaignCard tag="Hazratganj" title="Weekend hotspot" metric="+212% walk-ins" desc="In-store + WhatsApp funnel." />
        <CampaignCard tag="Fun Republic" title="Movie-night combo" metric="5x ROI" desc="Cinema-collab & UGC." />
        <CampaignCard tag="Chacoco" title="Creator lab" metric="30+ collabs" desc="Weekly creator events." />
      </motion.div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="mt-20 md:mt-32">
      <SectionHeader eyebrow="Testimonials" title="What Lucknow says" subtitle="Thoda emotion, full ROI." />
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }} 
        variants={staggerContainer} 
        className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3"
      >
        {testimonialsData.map((t) => (
          <TestimonialCard key={t.name} name={t.name} area={t.area} quote={t.quote} />
        ))}
      </motion.div>
    </section>
  );
}

// New Section
function BlogSection() {
  return (
    <section id="blog" className="mt-20 md:mt-32">
      <SectionHeader eyebrow="From the blog" title="Local Insights, Global Tech" subtitle="Our playbook for MSME growth in UP and beyond." />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="mt-10 grid gap-6 md:grid-cols-12"
      >
        {blogPostsData.length > 0 && (
          <FeaturedBlogCard post={blogPostsData[0]} />
        )}
        {blogPostsData.slice(1).map((post, index) => (
          <MiniBlogCard key={post.title} post={post} index={index} />
        ))}
      </motion.div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="mt-20 md:mt-32 p-[1px] rounded-[28px] bg-gradient-to-r from-[#001F3F] via-[#050814] to-[#120022]">
      <motion.div
        className="rounded-[27px] bg-black/80 backdrop-blur-sm p-8 flex flex-col md:flex-row md:justify-between md:items-center gap-6"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div>
          <p className="text-xs uppercase text-emerald-200">Ready for 2025 growth?</p>
          <h3 className="text-2xl md:text-3xl">Launch your AI HQ for ₹89</h3>
          <p className="text-white/70 mt-2">Get Udyam registration, localized SEO page, WhatsApp catalog, and Hindi CRM in a single agentic flow.</p>
        </div>
        <div>
          <a href="https://wa.me/919559595959" target="_blank" rel="noopener noreferrer" className="group w-full md:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#00F1A0] to-[#00FFFF] px-6 py-3 text-black font-semibold shadow-[0_0_25px_rgba(0,241,160,0.7)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,241,160,1)] hover:scale-105">
            DM on WhatsApp
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function PlanCategoryCard({ category }) {
  return (
    <motion.div
      className="relative flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-transparent to-black/[0.45] p-6 text-center shadow-[0_32px_80px_-45px_rgba(59,130,246,0.65)] transition-all duration-500 hover:border-[#3b82f6]/60 hover:-translate-y-2 sm:text-left"
      variants={floatIn}
    >
      <div>
        <p className="text-[10px] uppercase tracking-[0.24em] text-emerald-200/80">
          {category.subtitle}
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-white">{category.label}</h3>
        <p className="mt-2 text-sm text-white/70 leading-relaxed">
          {category.description}
        </p>
        <ul className="mt-5 space-y-2 text-xs text-white/65">
          {category.bullets.map((item) => (
            <li key={item} className="flex items-start gap-2 justify-center sm:justify-start">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-[#22d3ee] to-[#9333ea]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <a
        href={category.ctaHref}
        className="group mt-8 inline-flex items-center justify-center gap-2 text-sm font-medium text-emerald-300 transition-all sm:justify-start"
      >
        {category.ctaLabel}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    </motion.div>
  );
}

function PlansTable({ plans }) {
  const fmt = new Intl.NumberFormat("en-IN");
  const formatCurrency = (value) =>
    typeof value === "number" && !Number.isNaN(value) ? `₹${fmt.format(value)}` : "On request";

  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[720px] divide-y divide-white/10 text-left text-sm text-white/80">
          <thead className="bg-gradient-to-r from-white/[0.12] via-transparent to-white/[0.05] text-xs uppercase tracking-[0.16em] text-emerald-200/80">
            <tr>
              <th className="px-6 py-4">Plan</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-right">MRP</th>
              <th className="px-6 py-4 text-right">Sale price</th>
              <th className="px-6 py-4 text-right">Savings</th>
              <th className="px-6 py-4">Cadence</th>
              <th className="px-6 py-4">What you get</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {plans.map((plan) => {
              const hasPricing = typeof plan.mrp === "number" && typeof plan.price === "number";
              const savingAmount = hasPricing ? plan.mrp - plan.price : null;
              const savingPercent = hasPricing
                ? Math.round(((plan.mrp - plan.price) / plan.mrp) * 100)
                : null;

              return (
                <tr key={plan.name} className="transition hover:bg-white/4">
                  <td className="px-6 py-4 font-semibold text-white">
                    {plan.name}
                  </td>
                  <td className="px-6 py-4 text-white/70">{plan.category}</td>
                  <td className="px-6 py-4 text-right text-white/60">
                    {hasPricing ? formatCurrency(plan.mrp) : "—"}
                  </td>
                  <td className="px-6 py-4 text-right text-emerald-300">
                    {hasPricing ? formatCurrency(plan.price) : "On request"}
                  </td>
                  <td className="px-6 py-4 text-right text-sky-300">
                    {hasPricing && savingAmount >= 0
                      ? `${formatCurrency(savingAmount)} • ${savingPercent}%`
                      : "Tailored"}
                  </td>
                  <td className="px-6 py-4 text-white/60">{plan.cadence}</td>
                  <td className="px-6 py-4 text-white/70">{plan.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:hidden">
        {plans.map((plan) => {
          const hasPricing = typeof plan.mrp === "number" && typeof plan.price === "number";
          const savingAmount = hasPricing ? plan.mrp - plan.price : null;
          const savingPercent = hasPricing
            ? Math.round(((plan.mrp - plan.price) / plan.mrp) * 100)
            : null;

          return (
            <div
              key={plan.name}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent p-4 shadow-[0_24px_70px_-45px_rgba(45,212,191,0.55)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-base font-semibold text-white">{plan.name}</p>
                <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70">
                  {plan.category}
                </span>
              </div>
              <p className="mt-3 text-sm text-white/70">{plan.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="text-lg font-semibold text-emerald-300">
                  {hasPricing ? formatCurrency(plan.price) : "On request"}
                </div>
                {hasPricing && (
                  <div className="text-xs text-white/60 line-through">
                    {formatCurrency(plan.mrp)}
                  </div>
                )}
                {hasPricing && savingAmount >= 0 && (
                  <span className="rounded-full bg-gradient-to-r from-[#34d399] to-[#3b82f6] px-3 py-1 text-[11px] font-semibold text-black">
                    Save {savingPercent}% ({formatCurrency(savingAmount)})
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs text-white/60">{plan.cadence}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#020617] py-16 text-sm text-white/75">
      <AuroraBlob className="top-[-30%] left-[-10%] h-64 w-64 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3),rgba(15,23,42,0))]" />
      <AuroraBlob className="bottom-[-25%] right-[-15%] h-72 w-72 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.28),rgba(15,23,42,0))]" />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-white/[0.14] via-white/[0.04] to-transparent p-1 shadow-[0_40px_120px_-50px_rgba(59,130,246,0.55)]">
              <div className="grid rounded-[32px] bg-black/40 px-8 py-10 md:grid-cols-[1.2fr_1fr] md:gap-10 md:px-12">
                <div className="space-y-5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/85">
                    Sudarshan AI Labs
                  </span>
                  <h3 className="text-3xl font-semibold text-white">
                    Ready to turn ₹89 into your always-on growth engine?
                  </h3>
                  <p className="text-base text-white/80">
                    Hop on a 15-minute discovery call with our Lucknow pod and see how fast agentic workflows can launch, automate, and scale your vyapaar.
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-4 md:mt-0">
                  <a
                    href="https://wa.me/919559595959"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#34d399] via-[#3b82f6] to-[#9333ea] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_35px_rgba(59,130,246,0.45)] transition hover:scale-105 hover:shadow-[0_0_45px_rgba(59,130,246,0.65)]"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp our team
                  </a>
                  <a
                    href="tel:+919559595959"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/15"
                  >
                    <Phone className="h-5 w-5" />
                    +91 9559 595 959
                  </a>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-xs text-white/70">
                    <p>Office: Gomti Nagar, Lucknow — Serving MSMEs pan-India with remote pods in UP, NCR & Bharat.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h5 className="text-xs uppercase tracking-[0.22em] text-emerald-200/80">Explore</h5>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a className="hover:text-white transition" href="#value">Why ₹89 Launchpad</a></li>
                <li><a className="hover:text-white transition" href="#plans">Pricing & Bundles</a></li>
                <li><a className="hover:text-white transition" href="#proof">Results & Proof</a></li>
                <li><a className="hover:text-white transition" href="#analyzer">Free AI Analyzer</a></li>
                <li><a className="hover:text-white transition" href="#blog">Insights & Blog</a></li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h5 className="text-xs uppercase tracking-[0.22em] text-emerald-200/80">Top plans</h5>
              <ul className="mt-4 space-y-3 text-sm">
                <li>Swaraj Tech Pack — <span className="text-emerald-300">Save 91%</span></li>
                <li>Prarambh Kick-Start — <span className="text-emerald-300">Save 66%</span></li>
                <li>Raftar Booster — <span className="text-emerald-300">Save 71%</span></li>
                <li>Digital Dominance — <span className="text-emerald-300">Save 36%</span></li>
                <li><a className="hover:text-white transition" href="#plan-table">View full catalog →</a></li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:col-span-2 lg:col-span-1">
              <h5 className="text-xs uppercase tracking-[0.22em] text-emerald-200/80">Stay connected</h5>
              <p className="mt-4 text-sm text-white/70">
                hello@sudarshan.ai • DPIIT: DIPP216267
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <a
                  className="hover:text-white transition"
                  href="https://www.instagram.com/sudarshanailabs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <a
                  className="hover:text-white transition"
                  href="https://www.linkedin.com/company/sudarshan-ai-labs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="hover:text-white transition"
                  href="https://www.youtube.com/@sudarshanailabs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Sudarshan AI Labs Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <a className="hover:text-white transition" href="#faq">Support FAQ</a>
            <a className="hover:text-white transition" href="#plans">Compare Plans</a>
            <a className="hover:text-white transition" href="#cta">Schedule a demo</a>
          </div>
        </div>
      </div>
    </footer>
  );
}


// --- Re-usable Components ---

function PricingCard({ plan }) {
  const fmt = new Intl.NumberFormat("en-IN");
  const hasNumbers = typeof plan.mrp === "number" && typeof plan.price === "number";
  const save = hasNumbers ? Math.round(((plan.mrp - plan.price) / plan.mrp) * 100) : null;
  const hasBadge = Boolean(plan.badge);
  return (
    <motion.div
      variants={floatIn}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.1] via-white/[0.04] to-transparent p-6 ${hasBadge ? "pt-10" : ""} text-center shadow-[0_30px_90px_-50px_rgba(59,130,246,0.6)] transition-colors duration-300 hover:border-[#34d399]/60 sm:text-left`}
    >
      {plan.badge && (
        <span className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f97316] to-[#ec4899] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_8px_22px_rgba(236,72,153,0.35)]">
          {plan.badge}
        </span>
      )}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ background: "linear-gradient(160deg, rgba(0,241,160,0.15), transparent 60%)" }}
      />
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="w-full space-y-2 text-center sm:text-left">
          <p className="text-xs uppercase tracking-[0.18em] text-white/50">{plan.category}</p>
          <h3 className="text-xl font-semibold text-white">{plan.label}</h3>
          <p className="text-xs text-white/60">{plan.nickname}</p>
        </div>
        {save !== null && save > 0 && (
          <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#34d399] to-[#3b82f6] px-3 py-1 text-xs font-semibold text-black shadow-[0_0_18px_rgba(59,130,246,0.35)]">
            Save {save}%
          </div>
        )}
      </div>
      <div className="mt-4 flex-grow flex flex-col relative space-y-4">
        {hasNumbers ? (
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-baseline sm:gap-3">
            <div className="text-2xl font-bold text-white">₹{fmt.format(plan.price)}</div>
            <div className="text-xs text-white/50 line-through">₹{fmt.format(plan.mrp)}</div>
          </div>
        ) : (
          <div className="text-sm font-semibold text-emerald-300">Custom pricing on request</div>
        )}
        <p className="text-sm text-white/70 leading-relaxed">{plan.blurb}</p>
        {Array.isArray(plan.inclusions) && (
          <ul className="space-y-2 text-xs text-white/65">
            {plan.inclusions.map((item) => (
              <li key={item} className="flex items-start gap-2 justify-center sm:justify-start">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-[#22d3ee] to-[#9333ea]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        <a
          href="https://wa.me/919559595959"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#34d399] via-[#3b82f6] to-[#9333ea] py-2 text-sm font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(59,130,246,0.55)]"
        >
          Book on WhatsApp
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
}

function NeonGridBackdrop() {
  const cells = Array.from({ length: 12 });
  const colors = ["#FF00FF", "#00FFFF", "#00F1A0", "#FF8C00", "#0061FF"];
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 flex items-center justify-center">
      <div className="grid w-[110%] max-w-[1000px] grid-cols-4 gap-4 opacity-40">
        {cells.map((_, i) => (
          <div key={i} className="relative overflow-hidden rounded-3xl bg-black/95 border border-white/5" style={{height: 140}}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 16 + (i%4)*3, ease: 'linear' }} className="absolute inset-[-40%]" style={{ background: `radial-gradient(circle at 0 0, ${colors[i%colors.length]}, transparent 40%)` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function GlowBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <motion.div 
        className="absolute -top-40 -left-20 h-80 w-80 rounded-full bg-gradient-to-br from-[#7F00FF]/50 via-[#00FFFF]/30 to-transparent blur-3xl"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -bottom-40 -right-10 h-96 w-96 rounded-full bg-gradient-to-br from-[#00F1A0]/60 via-[#0061FF]/40 to-transparent blur-3xl" 
        animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      />
    </div>
  );
}

function SectionLabel({ children }) { 
  return (
    <p className="text-xs uppercase tracking-[0.26em] text-emerald-300/80 flex items-center gap-2"> 
      <span className="h-[1px] w-6 bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />
      {children}
    </p>
  ); 
}

function SectionHeader({ eyebrow, title, subtitle }) { 
  return (
    <motion.div 
      className="space-y-3 max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
      <h2 className="text-3xl text-white md:text-4xl">{title}</h2>
      {subtitle && <p className="text-base text-white/70 md:text-lg">{subtitle}</p>}
    </motion.div>
  ); 
}

function SectionDivider() {
  return (
    <motion.div
      className="mt-14 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="relative w-full max-w-4xl">
        <motion.div
          className="h-[3px] w-full overflow-hidden rounded-full bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ backgroundSize: "200% 200%" }}
        />
        <motion.span
          className="absolute left-1/4 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#34d399] via-[#3b82f6] to-[#9333ea] opacity-60 blur-2xl"
          animate={{ x: ["0%", "160%", "0%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="h-5 w-5 text-white/80" />
        </motion.span>
      </div>
    </motion.div>
  );
}

function AuroraBlob({ className = "" }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      initial={{ opacity: 0.2, scale: 0.8 }}
      animate={{ opacity: [0.25, 0.45, 0.25], scale: [0.95, 1.05, 0.95] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function LightBeam({ className = "", heightClass = "h-96" }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute top-1/2 w-[2px] -translate-y-1/2 rounded-full bg-gradient-to-b from-transparent via-[#fbbf24] to-transparent blur-[2px] ${className} ${heightClass}`}
      initial={{ opacity: 0.15 }}
      animate={{ opacity: [0.12, 0.3, 0.12] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function AboutChip({ title, desc }) { 
  return (
    <motion.div 
      variants={floatIn} 
      className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_0_18px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-emerald-200/90">
        <span className="flex h-6 w-6 items-center justify-center rounded-xl bg-gradient-to-br from-[#00F1A0] via-[#00FFFF] to-[#7B2FF7] text-black shadow-[0_0_18px_rgba(34,197,94,0.8)]">
          <ShoppingBag className="h-3 w-3" />
        </span>
        <span>{title}</span>
      </div>
      <p className="mt-3 text-xs text-white/70">{desc}</p>
    </motion.div>
  ); 
}

function KeyStatCard({ value, label }) {
  return (
    <motion.div
      variants={floatIn}
      className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.12] via-white/[0.05] to-transparent px-4 py-5 text-center shadow-[0_18px_40px_-28px_rgba(59,130,246,0.55)] sm:text-left"
    >
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-xs text-white/65">{label}</p>
    </motion.div>
  );
}

function CampaignCard({ tag, title, metric, desc }) { 
  return (
    <motion.div 
      variants={floatIn} 
      className="rounded-3xl border border-white/10 bg-[#050814]/80 p-5 shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-emerald-300/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.7)] hover:-translate-y-2"
    >
      <p className="text-[11px] uppercase tracking-[0.19em] text-emerald-200/90">{tag}</p>
      <h3 className="mt-2 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-emerald-300">{metric}</p>
      <p className="mt-3 text-xs text-white/70">{desc}</p>
    </motion.div>
  ); 
}

function TestimonialCard({ name, area, quote }) { 
  return (
    <motion.div 
      variants={floatIn} 
      className="rounded-3xl border border-white/10 bg-[#050814]/80 p-5 shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-[#00FFFF]/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] hover:-translate-y-2"
    >
      <p className="text-lg font-light text-white/90">“{quote}”</p>
      <div className="mt-4 flex items-center justify-between text-[11px] text-white/60">
        <div>
          <p className="font-semibold text-white/80">{name}</p>
          <p className="text-white/50">{area}</p>
        </div>
        <Star className="h-5 w-5 text-amber-300" fill="currentColor" />
      </div>
    </motion.div>
  ); 
}

// New Component
function BlogCard({ post }) {
  return (
    <motion.div 
      variants={floatIn} 
      className="group rounded-3xl border border-white/10 bg-[#050814]/80 shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-white/30 hover:-translate-y-2 overflow-hidden"
    >
      <div className="overflow-hidden">
        <img 
          src={post.img} 
          alt={post.title} 
          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105" 
          onError={(e) => { e.target.src = 'https://placehold.co/600x400/0B0F19/FFFFFF?text=Image'; }}
        />
      </div>
      <div className="p-5">
        <p className="text-[11px] uppercase tracking-[0.19em] text-emerald-200/90">{post.category}</p>
        <h3 className="mt-2 text-lg font-semibold text-white h-12">{post.title}</h3>
        <p className="mt-2 text-sm text-white/70 h-16">{post.desc}</p>
        <a
          href={post.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 transition-all group-hover:gap-3"
        >
          Read More <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
}

function FeaturedBlogCard({ post }) {
  return (
    <motion.div
      variants={floatIn}
      className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#312e81] via-[#1e1b4b] to-[#0f172a] p-1 md:col-span-7"
    >
      <div className="relative h-full rounded-[30px] bg-black/30 p-8">
        <AuroraBlob className="top-[-25%] left-[-15%] h-64 w-64 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),rgba(15,23,42,0))]" />
        <AuroraBlob className="bottom-[-30%] right-[-20%] h-72 w-72 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25),rgba(15,23,42,0))]" />
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/80">
          {post.category}
        </span>
        <h3 className="mt-6 text-3xl font-semibold text-white">{post.title}</h3>
        <p className="mt-4 text-base text-white/80">{post.desc}</p>
        <a
          href={post.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-200 transition hover:text-white"
        >
          Read full playbook
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
}

function MiniBlogCard({ post, index }) {
  const columnSpan = index % 2 === 0 ? "md:col-span-5" : "md:col-span-5";
  return (
    <motion.div
      variants={floatIn}
      className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.08] via-transparent to-black/[0.45] p-6 shadow-[0_24px_70px_-40px_rgba(59,130,246,0.55)] ${columnSpan}`}
    >
      <AuroraBlob className="top-[-20%] right-[-10%] h-40 w-40 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.22),rgba(15,23,42,0))]" />
      <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-200/80">{post.category}</p>
      <h4 className="mt-3 text-xl font-semibold text-white">{post.title}</h4>
      <p className="mt-3 text-sm text-white/70">{post.desc}</p>
      <a
        href={post.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sky-200 transition hover:text-white"
      >
        Read more
        <ArrowRight className="h-4 w-4" />
      </a>
    </motion.div>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section id="faq" className="mt-20 md:mt-32">
      <SectionHeader 
        eyebrow="Ask us anything" 
        title="FAQ for founders, shop owners & marketers" 
        subtitle="Short answers so you can get back to selling." 
      />
      <div className="mt-8 space-y-3">
        {faqItems.map((item, index) => (
          <FaqItem 
            key={item.question} 
            item={item} 
            isOpen={openIndex === index} 
            onToggle={() => setOpenIndex((prev) => prev === index ? null : index)} 
          />
        ))}
      </div>
    </section>
  );
}

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <motion.div 
      layout 
      className={`rounded-3xl border p-1 transition-colors duration-300 ${isOpen ? 'border-emerald-300/60 bg-white/10' : 'border-white/10 bg-[#050814]/70 hover:border-white/30'}`}
    >
      <button 
        type="button" 
        onClick={onToggle} 
        className="flex w-full items-center justify-between gap-4 rounded-[26px] bg-black/40 px-6 py-4 text-left"
      >
        <span className="text-sm font-medium text-white/90">{item.question}</span>
        <motion.span 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="rounded-full border border-white/10 bg-white/10 p-2 text-white/70"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden px-6"
          >
            <div className="pb-5 text-sm text-white/70">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="cta-card"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[260px] rounded-3xl border border-white/10 bg-[#050814]/95 p-4 text-left shadow-[0_0_25px_rgba(0,0,0,0.6)] backdrop-blur"
          >
            <p className="text-[10px] uppercase tracking-[0.24em] text-emerald-200/80">Talk to a human</p>
            <p className="mt-2 text-sm text-white/70">Get a callback or send a WhatsApp note. Our Lucknow pod replies in under 10 minutes.</p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href="https://wa.me/919559595959"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00F1A0] to-[#00FFFF] px-4 py-2 text-sm font-semibold text-black shadow-[0_0_18px_rgba(0,241,160,0.7)] transition-all duration-300 hover:shadow-[0_0_28px_rgba(0,241,160,0.9)]"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp team
              </a>
              <a
                href="tel:+919559595959"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition-all duration-300 hover:border-white/30 hover:text-white"
              >
                <Phone className="h-4 w-4" />
                Request a call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#00F1A0] via-[#00FFFF] to-[#7B2FF7] px-4 py-2 text-sm font-semibold text-black shadow-[0_0_25px_rgba(0,241,160,0.8)] focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
      >
        <Bot className="h-4 w-4" />
        {isOpen ? "Hide assistant" : "Need quick help?"}
      </motion.button>
    </div>
  );
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div 
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-[#00F1A0] via-[#00FFFF] to-[#7F00FF] shadow-[0_0_20px_rgba(0,241,160,0.4)]"
      style={{ scaleX }}
    />
  );
}

function StatPill({ label, value, tone }) { 
  const colorMap={
    emerald: "from-emerald-400/80 to-emerald-300/40",
    rose: "from-rose-400/80 to-rose-300/40",
    sky: "from-sky-400/80 to-sky-300/40"
  }; 
  return (
    <motion.div 
      className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-white/70"
      // Add subtle pulse animation with random delay
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ repeat: Infinity, duration: 2.5, delay: Math.random() * 2 }}
    >
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{label}</p>
      <p className={`mt-1 inline-flex items-center rounded-full bg-gradient-to-r ${colorMap[tone]} px-2 py-0.5 text-xs font-semibold text-black shadow-[0_0_15px_rgba(0,0,0,0.7)]`}>
        {value}
      </p>
    </motion.div>
  ); 
}
