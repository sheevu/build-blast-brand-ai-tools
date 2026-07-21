import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { 
  Sparkles, Rocket, Bot, ShoppingBag, Star, 
  Check, X, ArrowRight, Menu, XIcon, 
  MessageCircle, Phone, ChevronDown, BarChart3
} from "lucide-react";
import { Routes, Route } from 'react-router-dom';
import AmbientBackground from './components/AmbientBackground.jsx';
import KineticTitle from './components/KineticTitle.jsx';
import MagnetButton from './components/MagnetButton.jsx';
import FigmaCanvas from './components/FigmaCanvas.jsx';
import ScrollTransitions from './components/ScrollTransitions.jsx';

const OnlinePresenceAnalyzer = React.lazy(() => import('./components/OnlinePresenceAnalyzer.jsx'));

// Lazy load the 19 individual service pages
const TechSwarajPack = React.lazy(() => import('./pages/services/TechSwarajPack.jsx'));
const KickStartPack = React.lazy(() => import('./pages/services/KickStartPack.jsx'));
const VyapariUdaanPack = React.lazy(() => import('./pages/services/VyapariUdaanPack.jsx'));
const SocialBoosterPack = React.lazy(() => import('./pages/services/SocialBoosterPack.jsx'));
const DigitalDominatorPack = React.lazy(() => import('./pages/services/DigitalDominatorPack.jsx'));
const GrowthProPack = React.lazy(() => import('./pages/services/GrowthProPack.jsx'));
const TezRaftarBooster = React.lazy(() => import('./pages/services/TezRaftarBooster.jsx'));
const BioLinkGMB = React.lazy(() => import('./pages/services/BioLinkGMB.jsx'));
const CustomBusinessWebsite = React.lazy(() => import('./pages/services/CustomBusinessWebsite.jsx'));
const LandingPage = React.lazy(() => import('./pages/services/LandingPage.jsx'));
const SocialMediaMarketing = React.lazy(() => import('./pages/services/SocialMediaMarketing.jsx'));
const SEOContentBoost = React.lazy(() => import('./pages/services/SEOContentBoost.jsx'));
const WhatsAppBusinessBot = React.lazy(() => import('./pages/services/WhatsAppBusinessBot.jsx'));
const ResearchArticleWriting = React.lazy(() => import('./pages/services/ResearchArticleWriting.jsx'));
const ResumeWriting = React.lazy(() => import('./pages/services/ResumeWriting.jsx'));
const AIChatbotAssistant = React.lazy(() => import('./pages/services/AIChatbotAssistant.jsx'));
const ExcelSheetsAutomation = React.lazy(() => import('./pages/services/ExcelSheetsAutomation.jsx'));
const SaaSDevelopment = React.lazy(() => import('./pages/services/SaaSDevelopment.jsx'));
const BusinessGrowthConsultation = React.lazy(() => import('./pages/services/BusinessGrowthConsultation.jsx'));
const NotFound = React.lazy(() => import('./pages/NotFound.jsx'));


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
    gradient: "from-[#3b0764] via-[#6d28d9] to-[#0f172a]",
    contrast: "light"
  },
  {
    title: "Agentic AI of Digital India",
    desc: "Your growth companion sends weekly WhatsApp reports: top-selling item, missed revenue, and the content to post—auto in Hindi/English.",
    metric: "Weekly AI briefing",
    gradient: "from-[#0f766e] via-[#22c55e] to-[#082f49]",
    contrast: "dark"
  },
  {
    title: "Bharat’s First Swadeshi Hindi CRM for MSME",
    desc: "Talk to your CRM in Hindi voice. Get order alerts, smart invoices, inventory sync, and customer insights—linked to Google Sheets.",
    metric: "Hindi voice ready",
    gradient: "from-[#7f1d1d] via-[#f43f5e] to-[#1e1b4b]",
    contrast: "light"
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

const heroSignalCards = [
  {
    label: "Missed revenue",
    value: "₹12,480",
    trend: "+18% urgency",
    cue: "Run the Thursday Thali flash combo before 7 PM."
  },
  {
    label: "Top SKU",
    value: "Lucknowi Chikankari",
    trend: "+38% vs last week",
    cue: "Push inventory-first reel and pin the product catalog."
  },
  {
    label: "Lead response",
    value: "2m 10s",
    trend: "52 chats converted",
    cue: "Keep WhatsApp auto-reply in Hindi + English for evenings."
  },
  {
    label: "Google intent",
    value: "Near me +34%",
    trend: "Hazratganj hotspot",
    cue: "Boost local offer post with map keywords and CTA."
  }
];

const valueSliderSignals = [
  { label: "Lead velocity", value: "+46%", note: "Campaign hooks auto-refresh weekly." },
  { label: "Response time", value: "2m", note: "Instant WhatsApp replies save hot leads." },
  { label: "Offer clicks", value: "3.2x", note: "Localized copy improves buyer intent." }
];

const detailPages = [
  {
    id: "value",
    eyebrow: "Deep Dive",
    title: "Why the ₹89 launchpad converts",
    summary: "Breakdown of pricing psychology, first-order automation, and how low-ticket onboarding unlocks higher lifetime value.",
    liveSection: "#value",
    steps: ["Offer stack sequencing for first-time buyers", "90-minute launch checklist with ready templates", "Hinglish messaging matrix for first 7 days"],
    deliverables: ["Pricing funnel map", "Starter campaign calendar", "Lead-to-order WhatsApp script"],
    metrics: [
      { label: "Avg first-week leads", value: "34", insight: "Local packs create immediate response momentum." },
      { label: "Upgrade rate", value: "41%", insight: "Users move from ₹89 to growth packs quickly." },
      { label: "CAC shift", value: "-29%", insight: "Lower friction onboarding reduces cost per lead." }
    ],
    related: ["process", "plans", "proof"]
  },
  {
    id: "process",
    eyebrow: "Deep Dive",
    title: "30-minute execution workflow",
    summary: "The stepwise operational flow from payment verification to SEO-ready storefront launch and retention automation.",
    liveSection: "#process",
    steps: ["Instant UPI + KYC handoff", "Business knowledge extraction from uploads", "Auto launch with CRM + Google listing sync"],
    deliverables: ["Go-live scorecard", "KYC validation record", "Daily operations checklist"],
    metrics: [
      { label: "Avg go-live time", value: "27 min", insight: "Automation removes manual setup delays." },
      { label: "Profile completion", value: "96%", insight: "Structured onboarding keeps data clean." },
      { label: "Day-1 response", value: "87%", insight: "Fast launch creates immediate engagement." }
    ],
    related: ["value", "pillars", "analyzer"]
  },
  {
    id: "pillars",
    eyebrow: "Deep Dive",
    title: "Platform pillars: CRM + Growth Companion",
    summary: "How operational intelligence and content intelligence combine to keep MSMEs visible and conversion-ready every day.",
    liveSection: "#pillars",
    steps: ["Daily sales and stock intelligence", "Content prompt generation from live demand", "Lead recovery through WhatsApp automations"],
    deliverables: ["Vyapaar dashboard setup", "Weekly suggestion playbook", "Automation flow templates"],
    metrics: [
      { label: "Hours saved weekly", value: "8+", insight: "Owners spend less time on repetitive operations." },
      { label: "Follow-up recovery", value: "32%", insight: "Missed chats are auto-recovered." },
      { label: "Campaign readiness", value: "3x", insight: "Prompted content ships faster." }
    ],
    related: ["process", "about", "proof"]
  },
  {
    id: "about",
    eyebrow: "Deep Dive",
    title: "Lucknow-first operating model",
    summary: "Inside the local pod structure, bilingual creative process, and city-wise expansion model used for Bharat MSMEs.",
    liveSection: "#about",
    steps: ["Local pod discovery and market scan", "Localized creative and keyword sprint", "Weekly optimization with merchant feedback"],
    deliverables: ["City growth blueprint", "Hinglish brand voice doc", "Area-level campaign tracker"],
    metrics: [
      { label: "Active MSMEs coached", value: "540+", insight: "Field-tested playbooks keep execution practical." },
      { label: "Avg ranking lift", value: "18 days", insight: "Hyperlocal SEO tactics deliver early." },
      { label: "Repeat order lift", value: "2.3x", insight: "Retention loops improve order frequency." }
    ],
    related: ["sectors", "proof", "campaigns"]
  },
  {
    id: "sectors",
    eyebrow: "Deep Dive",
    title: "Sector-specific playbooks",
    summary: "Custom launch and growth workflows by vertical, including kiranas, clinics, boutiques, and restaurants.",
    liveSection: "#sectors",
    steps: ["Select vertical growth archetype", "Deploy category-specific assets", "Track weekly KPI and optimize scripts"],
    deliverables: ["Sector checklist", "Creative + offer templates", "Conversion KPI board"],
    metrics: [
      { label: "Vertical templates", value: "40+", insight: "Faster deployment with proven structures." },
      { label: "Lead quality score", value: "8.6/10", insight: "Sector targeting improves intent quality." },
      { label: "Offer acceptance", value: "47%", insight: "Localized offers improve campaign outcomes." }
    ],
    related: ["plans", "campaigns", "proof"]
  },
  {
    id: "proof",
    eyebrow: "Deep Dive",
    title: "Outcome analytics and proof loops",
    summary: "Method used to validate results across map rankings, catalog orders, walk-ins, and weekly response SLAs.",
    liveSection: "#proof",
    steps: ["Define baseline and objective", "Measure conversion with channel tags", "Optimize with weekly sprint reviews"],
    deliverables: ["Proof dashboard", "Cohort performance report", "ROI narrative for each campaign"],
    metrics: [
      { label: "Map visibility lift", value: "Page 1 in 18 days", insight: "Listings and review flow work together." },
      { label: "Walk-in growth", value: "+42%", insight: "Geo-optimized campaigns drive store visits." },
      { label: "Retention growth", value: "2.3x", insight: "Broadcast + follow-up loops increase repeats." }
    ],
    related: ["campaigns", "testimonials", "analyzer"]
  },
  {
    id: "plans",
    eyebrow: "Deep Dive",
    title: "Plans, pricing, and upgrade architecture",
    summary: "How bundles, monthly retainers, and custom modules combine into a low-risk but scalable growth ladder.",
    liveSection: "#plans",
    steps: ["Pick entry plan by urgency", "Add operational modules by bottleneck", "Scale with monthly automation pods"],
    deliverables: ["Plan comparator matrix", "Upgrade timeline", "Custom scope worksheet"],
    metrics: [
      { label: "Entry price", value: "₹89", insight: "Low barrier accelerates onboarding." },
      { label: "Bundle savings", value: "Up to 91%", insight: "Clear MRP gap improves buying confidence." },
      { label: "Avg upgrade window", value: "21 days", insight: "Most clients move to advanced packs quickly." }
    ],
    related: ["value", "sectors", "faq"]
  },
  {
    id: "campaigns",
    eyebrow: "Deep Dive",
    title: "Campaign experiments and growth loops",
    summary: "A tactical map of local collaborations, meme-led funnels, UGC cycles, and measurable activation mechanics.",
    liveSection: "#campaigns",
    steps: ["Plan local moment + creator angle", "Connect reel to WhatsApp conversion path", "Measure, remix, and retarget weekly"],
    deliverables: ["Campaign storyboard", "Creator coordination pack", "Retargeting sequence"],
    metrics: [
      { label: "Top campaign ROI", value: "5x", insight: "Cinema-led collabs generated high-intent traffic." },
      { label: "Creator collabs", value: "30+", insight: "Continuous UGC pipeline sustains visibility." },
      { label: "Walk-in jump", value: "+212%", insight: "Locality-based promotions convert fast." }
    ],
    related: ["proof", "testimonials", "blog"]
  },
  {
    id: "testimonials",
    eyebrow: "Deep Dive",
    title: "Voice of merchants and service teams",
    summary: "Structured merchant feedback and qualitative sentiment loops used to improve offer clarity and support speed.",
    liveSection: "#testimonials",
    steps: ["Capture weekly user stories", "Map patterns by locality and category", "Convert feedback into feature priorities"],
    deliverables: ["Sentiment summary", "Objection handling sheet", "Support quality benchmark"],
    metrics: [
      { label: "Customer sentiment", value: "4.7/5", insight: "Speed + local language support drive trust." },
      { label: "Support SLA", value: "<10 min", insight: "Fast responses keep lead intent warm." },
      { label: "Referral intent", value: "62%", insight: "Happy merchants are active advocates." }
    ],
    related: ["proof", "faq", "plans"]
  },
  {
    id: "blog",
    eyebrow: "Deep Dive",
    title: "Content engine and knowledge pages",
    summary: "How insight-led articles, local SEO pages, and campaign notes are linked to conversion assets and offers.",
    liveSection: "#blog",
    steps: ["Plan topics by live search trends", "Write for local discovery + conversion", "Link each article to active offer flow"],
    deliverables: ["SEO topic cluster", "Article + reel repurposing map", "Interlinking framework"],
    metrics: [
      { label: "Publishing cadence", value: "Weekly", insight: "Consistent output compounds discovery." },
      { label: "Avg time on page", value: "4m 12s", insight: "Localized insights hold attention." },
      { label: "Content-assisted leads", value: "39%", insight: "Articles support high-intent conversions." }
    ],
    related: ["campaigns", "plans", "faq"]
  },
  {
    id: "faq",
    eyebrow: "Deep Dive",
    title: "Objection handling and support playbook",
    summary: "Standard responses, risk clarifications, and implementation expectations to reduce friction before onboarding.",
    liveSection: "#faq",
    steps: ["Map top founder questions", "Create transparent response templates", "Continuously refine from live objections"],
    deliverables: ["FAQ answer bank", "Sales call cheat sheet", "Launch-readiness checklist"],
    metrics: [
      { label: "Question coverage", value: "95%", insight: "Most buyer concerns are handled proactively." },
      { label: "Call-to-close lift", value: "+26%", insight: "Clear expectations reduce decision delay." },
      { label: "Onboarding drop-off", value: "-31%", insight: "Fewer surprises during setup." }
    ],
    related: ["plans", "testimonials", "analyzer"]
  },
  {
    id: "analyzer",
    eyebrow: "Deep Dive",
    title: "AI presence analyzer framework",
    summary: "How the analyzer turns Google-grounded results into practical action plans and WhatsApp-ready implementation steps.",
    liveSection: "#analyzer",
    steps: ["Scan business visibility signals", "Score local presence bottlenecks", "Generate ranked action plan with quick wins"],
    deliverables: ["Visibility snapshot", "3-week action plan", "WhatsApp handoff summary"],
    metrics: [
      { label: "Analysis speed", value: "60 sec", insight: "Fast diagnostics enable immediate action." },
      { label: "Actionability score", value: "9/10", insight: "Recommendations map directly to tasks." },
      { label: "Follow-up conversion", value: "44%", insight: "Analyzed users often move to paid support." }
    ],
    related: ["process", "proof", "faq"]
  }
];


// --- Main App Component ---

export default function App() {
  // --- Firebase State ---
  const [auth, setAuth] = useState(null);
  const [db, setDb] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [currentHash, setCurrentHash] = useState(() => window.location.hash || "#hero");
  const [showAmbientLayers, setShowAmbientLayers] = useState(false);
  const [showDeferredSections, setShowDeferredSections] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const isDetailView = currentHash.startsWith("#details/");
  const activeDetailId = isDetailView ? currentHash.replace("#details/", "").split("/")[0] : "";

  useEffect(() => {
    let isMounted = true;
    let unsubscribeAuth = () => {};
    let idleId;
    let fallbackTimer;

    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };

    const initFirebase = async () => {
      try {
        const [{ initializeApp }, authModule, firestoreModule] = await Promise.all([
          import("firebase/app"),
          import("firebase/auth"),
          import("firebase/firestore"),
        ]);

        if (!isMounted) {
          return;
        }

        const app = initializeApp(firebaseConfig);
        const authInstance = authModule.getAuth(app);
        const dbInstance = firestoreModule.getFirestore(app);
        firestoreModule.setLogLevel("error");

        if (!isMounted) {
          return;
        }
        setAuth(authInstance);
        setDb(dbInstance);

        unsubscribeAuth = authModule.onAuthStateChanged(authInstance, async (user) => {
          if (!isMounted) {
            return;
          }
          if (user) {
            setUserId(user.uid);
            setIsAuthReady(true);
          } else {
            try {
              await authModule.signInAnonymously(authInstance);
            } catch (error) {
              console.error("Firebase anonymous sign-in error:", error);
              if (isMounted) {
                setIsAuthReady(true);
              }
            }
          }
        });
      } catch (error) {
        console.error("Firebase initialization error:", error);
        if (isMounted) {
          setIsAuthReady(true);
        }
      }
    };

    if (firebaseConfig.apiKey) {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(() => {
          void initFirebase();
        }, { timeout: 2500 });
      } else {
        fallbackTimer = window.setTimeout(() => {
          void initFirebase();
        }, 700);
      }
    } else {
      console.warn("Firebase config environment variables (VITE_FIREBASE_...) are not set. AI tool will be disabled.");
      setIsAuthReady(true);
    }

    return () => {
      isMounted = false;
      unsubscribeAuth();
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
      }
    };
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) {
      return undefined;
    }
    let idleId;
    let fallbackTimer;

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(() => setShowAmbientLayers(true), { timeout: 1200 });
    } else {
      fallbackTimer = window.setTimeout(() => setShowAmbientLayers(true), 500);
    }

    return () => {
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
      }
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    let idleId;
    let fallbackTimer;

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(() => setShowDeferredSections(true), { timeout: 1800 });
    } else {
      fallbackTimer = window.setTimeout(() => setShowDeferredSections(true), 900);
    }

    return () => {
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
      }
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || "#hero");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // --- Render ---
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] text-white font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-400"></div>
          <p className="text-sm font-semibold tracking-wider uppercase text-emerald-300">Loading...</p>
        </div>
      </div>
    }>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen overflow-x-clip bg-[#0B0F19] text-white font-sans antialiased">
            <ScrollProgressBar />
            {showAmbientLayers && <AmbientBackground />}
            <Header isDetailView={isDetailView} />
            <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:px-6 md:pt-16 overflow-x-hidden relative z-10">
              {isDetailView ? (
                <DetailPageView detailId={activeDetailId} />
              ) : (
                <>
                  <Hero />
                  <SectionDivider />
                  <ScrollTransitions>
                    <ValuePropsSection />
                  </ScrollTransitions>
                  <SectionDivider />
                  <FigmaCanvas />
                  {showDeferredSections && (
                    <div className="deferred-sections">
                      <SectionDivider />
                      <ScrollTransitions>
                        <HowItWorksSection />
                      </ScrollTransitions>
                      <SectionDivider />
                      <ScrollTransitions>
                        <PlatformPillarsSection />
                      </ScrollTransitions>
                      <SectionDivider />
                      <RevenueStrip />
                      <SectionDivider />
                      <ScrollTransitions>
                        <WhySudarshan />
                      </ScrollTransitions>
                      <SectionDivider />
                      <ScrollTransitions>
                        <PlansSection />
                      </ScrollTransitions>
                      <SectionDivider />
                      <SectorsSection />
                      <SectionDivider />
                      <ScrollTransitions>
                        <ProofSection />
                      </ScrollTransitions>
                      <SectionDivider />
                      <Campaigns />
                      <SectionDivider />
                      <Testimonials />
                      <SectionDivider />
                      <BlogSection />
                      <SectionDivider />
                      <ScrollTransitions>
                        <FaqSection />
                      </ScrollTransitions>
                      <CTA />
                      <SectionDivider />
                      {/* --- AI Tool Section relocated just above footer --- */}
                      {isAuthReady && db && auth && (
                        <AiPresenceAnalyzerSection db={db} auth={auth} userId={userId} />
                      )}
                    </div>
                  )}
                </>
              )}
            </main>
            <FloatingCTA />
            <Footer />
          </div>
        } />
        <Route path="/services/TechSwarajPack" element={<TechSwarajPack />} />
        <Route path="/services/KickStartPack" element={<KickStartPack />} />
        <Route path="/services/VyapariUdaanPack" element={<VyapariUdaanPack />} />
        <Route path="/services/SocialBoosterPack" element={<SocialBoosterPack />} />
        <Route path="/services/DigitalDominatorPack" element={<DigitalDominatorPack />} />
        <Route path="/services/GrowthProPack" element={<GrowthProPack />} />
        <Route path="/services/TezRaftarBooster" element={<TezRaftarBooster />} />
        <Route path="/services/BioLinkGMB" element={<BioLinkGMB />} />
        <Route path="/services/CustomBusinessWebsite" element={<CustomBusinessWebsite />} />
        <Route path="/services/LandingPage" element={<LandingPage />} />
        <Route path="/services/SocialMediaMarketing" element={<SocialMediaMarketing />} />
        <Route path="/services/SEOContentBoost" element={<SEOContentBoost />} />
        <Route path="/services/WhatsAppBusinessBot" element={<WhatsAppBusinessBot />} />
        <Route path="/services/ResearchArticleWriting" element={<ResearchArticleWriting />} />
        <Route path="/services/ResumeWriting" element={<ResumeWriting />} />
        <Route path="/services/AIChatbotAssistant" element={<AIChatbotAssistant />} />
        <Route path="/services/ExcelSheetsAutomation" element={<ExcelSheetsAutomation />} />
        <Route path="/services/SaaSDevelopment" element={<SaaSDevelopment />} />
        <Route path="/services/BusinessGrowthConsultation" element={<BusinessGrowthConsultation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

// --- Page Sections ---

function Header({ isDetailView }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { href: "#value", label: "Why ₹89 Works" },
    { href: "#plans", label: "Pricing Matrix" },
    { href: "#proof", label: "Growth Proof" },
    { href: "#campaigns", label: "Campaign Lab" },
    { href: "#details/value", label: "Deep Dives" },
    { href: "#cta", label: "Contact & WhatsApp" }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          {/* Logo and Title */}
          <motion.a 
            href={isDetailView ? "#hero" : "#hero"}
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
              <p className="text-sm text-white/70">{isDetailView ? "Detailed Strategy Pages" : "Lucknow • MSME Growth Engine"}</p>
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
  const [activeSignal, setActiveSignal] = useState(0);
  const activeFigure = heroSignalCards[activeSignal];

  return (
    <section
      id="hero"
      className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(120deg,rgba(12,26,53,0.85),rgba(9,14,35,0.85),rgba(3,8,20,0.9))] px-4 py-10 sm:rounded-[36px] sm:px-6 sm:py-14 md:px-12 md:py-20 z-10"
    >
      <div className="pointer-events-none absolute -left-12 -top-10 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.2),rgba(15,23,42,0))] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-12 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.22),rgba(8,47,73,0))] blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-[420px] w-[2px] -translate-y-1/2 rounded-full bg-gradient-to-b from-transparent via-[#fbbf24]/30 to-transparent blur-[2px]" />
      <div className="pointer-events-none absolute -right-10 top-6 h-40 w-40 rounded-full bg-gradient-to-br from-[#00F1A0]/20 to-transparent blur-3xl" />

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

          <div className="flex justify-center lg:justify-start">
            <KineticTitle
              text="Launch Your Digital Dukaan in 30 Minutes With Agentic AI"
              className="mx-auto max-w-2xl text-[2rem] font-semibold leading-[1.12] text-white sm:text-5xl lg:mx-0 lg:text-[3.4rem]"
            />
          </div>

          <motion.p
            variants={floatIn}
            className="mx-auto max-w-xl text-sm leading-relaxed text-white/70 sm:text-lg lg:mx-0"
          >
            Hyperlocal SEO, WhatsApp automation, and Hindi-first CRM so every
            vyapari can capture more calls, orders, and repeat buyers—without
            hiring an agency.
          </motion.p>

          {/* Action Buttons wrapped in MagnetButton */}
          <motion.div
            variants={floatIn}
            className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <MagnetButton href="#plans" className="w-full sm:w-auto">
              <span className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#34d399] via-[#3b82f6] to-[#9333ea] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_40px_rgba(59,130,246,0.45)]">
                Explore ₹89 Launchpad
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </MagnetButton>
            <MagnetButton href="#process" className="w-full sm:w-auto">
              <span className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90">
                See 30-min Workflow
              </span>
            </MagnetButton>
            <MagnetButton href="https://agent.jotform.com/019aa7fd4aaa7cccb0ce1b2c0748666c3478" className="w-full sm:w-auto">
              <span className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-2.5 text-sm font-medium text-cyan-100">
                Contact Agent (2nd Line)
              </span>
            </MagnetButton>
          </motion.div>
        </motion.div>

        {/* Interactive Hero Monitor Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md lg:mx-0"
        >
          <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-[#101b33]/90 via-[#0b1222]/92 to-[#050a13]/96 p-4 shadow-[0_60px_140px_-60px_rgba(59,130,246,0.55)] sm:rounded-[32px] sm:p-6">
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
                  “{activeFigure.cue}”
                </p>
                <div className="mt-4 flex items-center justify-between text-[11px] text-white/50">
                  <span>Vyapaar Suggestions</span>
                  <ArrowRight className="h-4 w-4 text-emerald-300" />
                </div>
              </div>
              <div className="grid gap-3 text-xs text-white/70 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-200/80">
                    {activeFigure.label}
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`${activeFigure.label}-${activeFigure.value}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="mt-1 text-lg font-semibold text-white"
                    >
                      {activeFigure.value}
                    </motion.p>
                  </AnimatePresence>
                  <p className="mt-2 text-[11px] text-white/60">
                    {activeFigure.trend}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-200/80">
                    Auto mode
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {activeSignal + 1}/{heroSignalCards.length}
                  </p>
                  <p className="mt-2 text-[11px] text-white/60">
                    Tap any signal tile to switch insights.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-200/80">
                  Action cue
                </p>
                <p className="mt-2 text-sm text-white/75">
                  Schedule WhatsApp broadcast: “Udyam-verified MSME, get 10% off on pre-bookings.”
                </p>
                <motion.div
                  key={`progress-${activeSignal}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.6, ease: "linear" }}
                  className="mt-3 h-1 rounded-full bg-gradient-to-r from-[#34d399] via-[#38bdf8] to-[#a855f7]"
                />
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {heroSignalCards.map((item, index) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setActiveSignal(index)}
                      className={`rounded-xl border px-2.5 py-2 text-left text-[10px] transition sm:px-3 sm:text-[11px] ${
                        index === activeSignal
                          ? "border-emerald-300/60 bg-emerald-300/10 text-white"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/25"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
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
        detailId="analyzer"
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
            <Suspense fallback={<AnalyzerLoadingCard />}>
              <OnlinePresenceAnalyzer db={db} auth={auth} userId={userId} />
            </Suspense>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function AnalyzerLoadingCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#050814]/70 p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Loading analyzer</p>
      <div className="mt-4 space-y-3">
        <div className="h-10 rounded-xl bg-white/10" />
        <div className="h-10 rounded-xl bg-white/10" />
        <div className="h-10 rounded-xl bg-white/10" />
        <div className="h-28 rounded-xl bg-white/5" />
      </div>
    </div>
  );
}

function ValuePropsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSignalIndex, setActiveSignalIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const activeCard = valuePropsData[activeIndex];
  const activeSignal = valueSliderSignals[activeSignalIndex];
  const isDarkTextSlide = activeCard.contrast === "dark";
  const slideTitleClass = isDarkTextSlide ? "text-[#042021]" : "text-white";
  const slideBodyClass = isDarkTextSlide ? "text-[#073131]/95" : "text-white/85";
  const chipClass = isDarkTextSlide
    ? "border-[#083537]/35 bg-white/35 text-[#083537]"
    : "border-white/20 bg-white/10 text-white/80";
  const signalCardClass = isDarkTextSlide
    ? "border-[#0b3f42]/35 bg-white/35 text-[#083537] hover:border-[#0b3f42]/60"
    : "border-white/15 bg-white/10 text-white/75 hover:border-white/35";
  const signalActiveClass = isDarkTextSlide
    ? "border-[#0d5a5d]/80 bg-white/55 text-[#042021]"
    : "border-emerald-300/70 bg-emerald-300/20 text-white";
  const sidePanelClass = isDarkTextSlide
    ? "border-[#0d5a5d]/40 bg-[#d9fff3]/18"
    : "border-cyan-200/35 bg-white/10";
  const sideMutedTextClass = isDarkTextSlide ? "text-[#074246]/90" : "text-cyan-100/80";
  const sideNoteClass = isDarkTextSlide ? "text-[#083537]/90" : "text-white/70";

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + valuePropsData.length) % valuePropsData.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % valuePropsData.length);
  };

  useEffect(() => {
    if (!isAutoPlay) return undefined;
    const autoplayId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % valuePropsData.length);
    }, 4200);
    return () => window.clearInterval(autoplayId);
  }, [isAutoPlay]);

  useEffect(() => {
    const signalId = window.setInterval(() => {
      setActiveSignalIndex((prev) => (prev + 1) % valueSliderSignals.length);
    }, 2400);
    return () => window.clearInterval(signalId);
  }, []);

  return (
    <section id="value" className="mt-20 md:mt-28">
      <SectionHeader
        eyebrow="Why merchants switch"
        title="Launch fast, sell smarter, scale with agentic AI"
        subtitle="Built for Lucknow and Bharat MSMEs that want calls, catalog sales, and loyal buyers without agency chaos."
        detailId="value"
      />
      <div className="mt-8 sm:mt-10" onMouseEnter={() => setIsAutoPlay(false)} onMouseLeave={() => setIsAutoPlay(true)}>
        <div className="relative overflow-hidden rounded-[32px] border border-cyan-300/30 bg-black/45 p-1 shadow-[0_0_35px_rgba(34,211,238,0.2)]">
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-40"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ backgroundImage: "linear-gradient(120deg, rgba(34,211,238,0.08), rgba(168,85,247,0.08), rgba(34,211,238,0.08))", backgroundSize: "220% 220%" }}
          />
          <motion.div
            key={activeCard.title}
            initial={{ opacity: 0.4, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`relative flex flex-col gap-5 overflow-hidden rounded-[24px] bg-gradient-to-br ${activeCard.gradient} px-4 py-6 text-center sm:rounded-[30px] sm:px-8 sm:py-8 md:flex-row md:items-center md:px-10 md:py-10 md:text-left`}
          >
            <AuroraBlob className={`top-[-35%] left-[-20%] h-64 w-64 ${isDarkTextSlide ? "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),rgba(15,23,42,0))]" : "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(15,23,42,0))]"}`} />
            <AuroraBlob className={`bottom-[-30%] right-[-10%] h-72 w-72 ${isDarkTextSlide ? "bg-[radial-gradient(circle_at_center,rgba(8,58,60,0.28),rgba(15,23,42,0))]" : "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14),rgba(15,23,42,0))]"}`} />
            <div className="relative flex-1 space-y-4">
              <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] ${chipClass}`}>
                <Sparkles className="h-3 w-3" />
                {activeCard.metric}
              </span>
              <h3 className={`text-xl font-semibold sm:text-3xl ${slideTitleClass}`}>
                {activeCard.title}
              </h3>
              <p className={`text-sm leading-relaxed sm:text-lg ${slideBodyClass}`}>
                {activeCard.desc}
              </p>
              <SliderIllustration isDarkTheme={isDarkTextSlide} />
              <div className="grid gap-2 sm:max-w-sm sm:grid-cols-2">
                {valueSliderSignals.map((signal, idx) => (
                  <button
                    key={signal.label}
                    type="button"
                    onClick={() => setActiveSignalIndex(idx)}
                    className={`rounded-xl border px-2.5 py-2 text-left text-[10px] transition sm:px-3 sm:text-[11px] ${idx === activeSignalIndex ? signalActiveClass : signalCardClass}`}
                  >
                    <p className={`uppercase tracking-[0.16em] text-[10px] ${isDarkTextSlide ? "text-[#0f4f50]" : "text-white/75"}`}>{signal.label}</p>
                    <p className="mt-1 text-sm font-semibold">{signal.value}</p>
                  </button>
                ))}
              </div>
            </div>
            <motion.div
              className={`relative flex flex-col items-center justify-center gap-4 rounded-2xl border px-4 py-5 shadow-[0_0_40px_rgba(56,189,248,0.25)] md:w-[280px] ${sidePanelClass}`}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <motion.div
                className={`rounded-full p-4 shadow-[0_0_24px_rgba(34,211,238,0.35)] ${isDarkTextSlide ? "bg-[#0f6665]/20 text-[#073233]" : "bg-white/15 text-white"}`}
                animate={{ rotate: [0, 12, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
              >
                <Bot className="h-8 w-8" />
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeSignal.label}-${activeSignal.value}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-center"
                >
                  <p className={`text-[10px] uppercase tracking-[0.2em] ${sideMutedTextClass}`}>{activeSignal.label}</p>
                  <p className={`mt-1 text-xl font-semibold sm:text-2xl ${isDarkTextSlide ? "text-[#06292b]" : "text-white"}`}>{activeSignal.value}</p>
                  <p className={`mt-2 text-xs sm:text-sm ${sideNoteClass}`}>{activeSignal.note}</p>
                </motion.div>
              </AnimatePresence>
              <motion.div
                key={`value-progress-${activeIndex}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "linear" }}
                className="h-1 w-full rounded-full bg-gradient-to-r from-[#22d3ee] via-[#34d399] to-[#a855f7]"
              />
              <p className={`text-[11px] ${sideMutedTextClass}`}>{isAutoPlay ? "Auto slide ON" : "Auto slide paused"}</p>
            </motion.div>
          </motion.div>

          <div className="relative flex items-center justify-between px-3 py-3 md:px-4">
            <button
              type="button"
              aria-label="Previous value prop"
              onClick={handlePrev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
            >
              <ArrowRight className="h-5 w-5 -scale-x-100" />
            </button>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {valuePropsData.map((card, idx) => (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 w-6 rounded-full transition sm:w-7 md:w-8 ${
                    idx === activeIndex ? "bg-cyan-200 shadow-[0_0_14px_rgba(34,211,238,0.7)]" : "bg-white/20 hover:bg-white/40"
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

        <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
          {valuePropsData.map((card, idx) => (
            <motion.button
              key={card.title}
              onClick={() => setActiveIndex(idx)}
              className={`flex min-w-[188px] flex-1 items-center justify-between rounded-2xl border px-3 py-2.5 text-left transition sm:min-w-[220px] sm:px-4 sm:py-3 ${
                idx === activeIndex
                  ? "border-cyan-300/50 bg-cyan-300/10 text-white shadow-[0_0_18px_rgba(34,211,238,0.2)]"
                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-xs font-semibold sm:text-sm">{card.metric}</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function SliderIllustration({ isDarkTheme }) {
  const bars = [34, 52, 66, 48, 72];
  return (
    <div className={`relative overflow-hidden rounded-2xl border px-4 py-3 ${isDarkTheme ? "border-[#0f4f50]/40 bg-[#d8fff4]/30" : "border-white/20 bg-white/10"}`}>
      <motion.div
        className={`absolute inset-0 ${isDarkTheme ? "bg-[radial-gradient(circle_at_85%_15%,rgba(14,116,116,0.18),transparent_55%)]" : "bg-[radial-gradient(circle_at_85%_15%,rgba(34,211,238,0.2),transparent_55%)]"}`}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <p className={`text-[10px] uppercase tracking-[0.18em] ${isDarkTheme ? "text-[#0b4d4f]" : "text-cyan-100/75"}`}>Growth signals</p>
          <BarChart3 className={`h-4 w-4 ${isDarkTheme ? "text-[#0a3a3e]" : "text-cyan-100/90"}`} />
        </div>
        <div className="mt-3 flex items-end gap-2">
          {bars.map((bar, idx) => (
            <motion.span
              key={bar}
              className={`w-4 rounded-t-md ${isDarkTheme ? "bg-gradient-to-t from-[#0f4f50] to-[#4ade80]" : "bg-gradient-to-t from-[#22d3ee] to-[#a855f7]"}`}
              initial={{ height: 8 }}
              animate={{ height: [12, bar, Math.max(14, bar - 16), bar] }}
              transition={{ duration: 2.6, repeat: Infinity, delay: idx * 0.18, ease: "easeInOut" }}
            />
          ))}
          <motion.div
            className={`ml-2 h-[2px] flex-1 rounded-full ${isDarkTheme ? "bg-[#0f4f50]/50" : "bg-cyan-200/50"}`}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
}

function HowItWorksSection() {
  return (
    <section id="process" className="mt-20 md:mt-32">
      <SectionHeader
        eyebrow="Zero-chaos onboarding"
        title="Go live in three AI-assisted steps"
        subtitle="From UPI verification to a localized landing page—everything is orchestrated with agentic workflows so you can sell instantly."
        detailId="process"
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
          {howItWorksSteps.map((step, index) => (
            <motion.div
              key={step.step}
              variants={floatIn}
              className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-transparent to-black/[0.4] p-5 pl-16 shadow-[0_22px_60px_-40px_rgba(59,130,246,0.55)] sm:p-6 sm:pl-20"
            >
              <motion.span
                className="absolute left-7 top-7 bottom-7 w-[2px] rounded-full bg-gradient-to-b from-[#22d3ee]/90 via-[#3b82f6]/60 to-[#a855f7]/90"
                animate={{ opacity: [0.45, 0.9, 0.45] }}
                transition={{ duration: 3.2, repeat: Infinity, delay: index * 0.25 }}
              />
              <motion.span
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-2xl bg-gradient-to-br from-[#22d3ee] to-[#9333ea] text-black font-semibold shadow-[0_0_20px_rgba(130,87,230,0.65)] sm:h-10 sm:w-10"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4 + index, repeat: Infinity }}
              >
                {index + 1}
              </motion.span>
              <div>
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
        detailId="pillars"
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
            href="https://wa.me/+917388833006"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
          >
            Talk to an AI Growth Advisor
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="https://agent.jotform.com/019aa7fd4aaa7cccb0ce1b2c0748666c3478"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/20"
          >
            2nd contact
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
          <a
            href="#details/about"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/20"
          >
            Open detailed page
            <ArrowRight className="h-3 w-3" />
          </a>
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
        detailId="sectors"
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
        detailId="proof"
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
        detailId="plans"
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
      <SectionHeader eyebrow="Campaign highlights" title="When AI, memes & mohalla meet" subtitle="Real metrics from local experiments." detailId="campaigns" />
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
      <SectionHeader eyebrow="Testimonials" title="What Lucknow says" subtitle="Thoda emotion, full ROI." detailId="testimonials" />
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
      <SectionHeader eyebrow="From the blog" title="Local Insights, Global Tech" subtitle="Our playbook for MSME growth in UP and beyond." detailId="blog" />
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
        <div className="flex flex-col gap-3">
          <a href="https://wa.me/+917388833006" target="_blank" rel="noopener noreferrer" className="group w-full md:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#00F1A0] to-[#00FFFF] px-6 py-3 text-black font-semibold shadow-[0_0_25px_rgba(0,241,160,0.7)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,241,160,1)] hover:scale-105">
            DM on WhatsApp
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="https://agent.jotform.com/019aa7fd4aaa7cccb0ce1b2c0748666c3478"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-300/10 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/20"
          >
            2nd Contact Agent
            <ArrowRight className="h-4 w-4" />
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
  const servicePathMap = {
    "Swaraj Tech Pack": "/services/TechSwarajPack",
    "Tech Swaraj Pack": "/services/TechSwarajPack",
    "Prarambh Kick-Start Pack": "/services/KickStartPack",
    "Kick-Start Pack": "/services/KickStartPack",
    "Udaan Vyapari Pack": "/services/VyapariUdaanPack",
    "Vyapari Udaan Pack": "/services/VyapariUdaanPack",
    "Vikas Growth Pro Pack": "/services/GrowthProPack",
    "Growth Pro Pack": "/services/GrowthProPack",
    "Prabhav Dominator Pack": "/services/DigitalDominatorPack",
    "Digital Dominator Pack": "/services/DigitalDominatorPack",
    "Raftar Booster Pack": "/services/TezRaftarBooster",
    "Tez Raftar Booster": "/services/TezRaftarBooster",
    "Social Booster Pack": "/services/SocialBoosterPack",
    "Samajik Booster Pack": "/services/SocialBoosterPack",
    "All Bio Link + Verified GMB (5 links)": "/services/BioLinkGMB",
    "Bio Link + Google My Business (Verified)": "/services/BioLinkGMB",
    "Full Custom Website (5 pages)": "/services/CustomBusinessWebsite",
    "Custom Business Website (5 Pages)": "/services/CustomBusinessWebsite",
    "Landing Pages (Lead Generation)": "/services/LandingPage",
    "Landing Page (Lead Generation)": "/services/LandingPage",
    "Social Media Marketing": "/services/SocialMediaMarketing",
    "Social Media Marketing (SMM)": "/services/SocialMediaMarketing",
    "SEO & Content Boost": "/services/SEOContentBoost",
    "WhatsApp Automation & Meta Suite (Basic)": "/services/WhatsAppBusinessBot",
    "WhatsApp Business Bot": "/services/WhatsAppBusinessBot",
    "Research, Blogs & Article Writing": "/services/ResearchArticleWriting",
    "Research & Article Writing": "/services/ResearchArticleWriting",
    "Resume Writing": "/services/ResumeWriting",
    "AI Chatbot & Assistant": "/services/AIChatbotAssistant",
    "AI Chatbot & Virtual Assistant": "/services/AIChatbotAssistant",
    "Excel & Google Sheets Automation": "/services/ExcelSheetsAutomation",
    "SaaS & AI Tool Development (MVP)": "/services/SaaSDevelopment",
    "Business Growth Consultation": "/services/BusinessGrowthConsultation"
  };

  const fmt = new Intl.NumberFormat("en-IN");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const formatCurrency = (value) =>
    typeof value === "number" && !Number.isNaN(value) ? `₹${fmt.format(value)}` : "On request";
  const formatCadence = (cadence = "") =>
    cadence
      .toLowerCase()
      .replace(/^one-time/, "One-time")
      .replace(/^per/, "Per");

  const getPlanBadge = (savingPercent, hasPricing) => {
    if (!hasPricing) return { label: "Custom", tone: "border-cyan-300/35 bg-cyan-300/10 text-cyan-100" };
    if (savingPercent >= 85) return { label: "Hot Deal", tone: "border-emerald-300/50 bg-emerald-300/15 text-emerald-100" };
    if (savingPercent >= 70) return { label: "Best Value", tone: "border-sky-300/45 bg-sky-300/10 text-sky-100" };
    if (savingPercent >= 55) return { label: "Growth Pick", tone: "border-violet-300/45 bg-violet-300/10 text-violet-100" };
    return { label: "Flexible", tone: "border-white/20 bg-white/10 text-white/70" };
  };

  const handleRowPointer = (event, rowName) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredRow(rowName);
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/80">Interactive pricing matrix</p>
          <p className="text-xs text-white/60">{plans.length} options • hover rows to inspect value</p>
        </div>
        <table className="w-full min-w-[860px] text-left text-sm text-white/80">
          <thead className="bg-gradient-to-r from-white/[0.14] via-white/[0.02] to-white/[0.06] text-xs uppercase tracking-[0.16em] text-emerald-200/85">
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
              const badge = getPlanBadge(savingPercent, hasPricing);

              return (
                <tr
                  key={plan.name}
                  onMouseMove={(event) => handleRowPointer(event, plan.name)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className="border-b border-white/5 transition-colors duration-300 hover:bg-white/[0.03]"
                  style={
                    hoveredRow === plan.name
                      ? {
                          backgroundImage: `radial-gradient(340px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(45,212,191,0.18), rgba(56,189,248,0.12) 34%, rgba(5,8,20,0) 72%)`,
                        }
                      : undefined
                  }
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      {servicePathMap[plan.name] ? (
                        <a 
                          href={servicePathMap[plan.name]} 
                          className="font-semibold text-white hover:text-emerald-300 transition duration-200 underline decoration-dashed decoration-white/20 hover:decoration-emerald-300/40"
                        >
                          {plan.name}
                        </a>
                      ) : (
                        <p className="font-semibold text-white">{plan.name}</p>
                      )}
                      <span className={`inline-flex w-fit rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${badge.tone}`}>
                        {badge.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/70">
                    <span className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-[11px] uppercase tracking-[0.14em]">
                      {plan.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-white/55">
                    {hasPricing ? formatCurrency(plan.mrp) : "—"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-semibold text-emerald-300">
                      {hasPricing ? formatCurrency(plan.price) : "On request"}
                    </p>
                    {hasPricing && (
                      <p className="mt-1 text-[11px] text-white/50 line-through">{formatCurrency(plan.mrp)}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-sky-200">
                    <p className="font-semibold text-sky-300">
                      {hasPricing && savingAmount >= 0
                        ? `${formatCurrency(savingAmount)} • ${savingPercent}%`
                        : "Tailored"}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-white/65">
                    <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-cyan-100">
                      {formatCadence(plan.dashcadence || plan.cadence)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/70 leading-relaxed">{plan.description}</td>
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
          const badge = getPlanBadge(savingPercent, hasPricing);

          return (
            <div
              key={plan.name}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.09] via-white/[0.03] to-transparent p-4 shadow-[0_24px_70px_-45px_rgba(45,212,191,0.55)] transition-all duration-300 hover:border-emerald-300/45"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(130deg, rgba(45,212,191,0.14), transparent 65%)" }} />
              <div className="flex flex-wrap items-center justify-between gap-2">
                {servicePathMap[plan.name] ? (
                  <a 
                    href={servicePathMap[plan.name]} 
                    className="text-base font-semibold text-white hover:text-emerald-300 transition duration-200 underline decoration-dashed decoration-white/20 hover:decoration-emerald-300/40"
                  >
                    {plan.name}
                  </a>
                ) : (
                  <p className="text-base font-semibold text-white">{plan.name}</p>
                )}
                <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70">
                  {plan.category}
                </span>
              </div>
              <span className={`mt-3 inline-flex rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${badge.tone}`}>
                {badge.label}
              </span>
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
              <p className="mt-3 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-cyan-100">
                {formatCadence(plan.cadence)}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

function DetailPageView({ detailId }) {
  const page = detailPages.find((item) => item.id === detailId);
  const [activeMetricIndex, setActiveMetricIndex] = useState(0);

  useEffect(() => {
    setActiveMetricIndex(0);
  }, [detailId]);

  useEffect(() => {
    if (!page || !page.metrics?.length) return undefined;
    const intervalId = window.setInterval(() => {
      setActiveMetricIndex((prev) => (prev + 1) % page.metrics.length);
    }, 3200);
    return () => window.clearInterval(intervalId);
  }, [page]);

  if (!page) {
    return (
      <section className="mt-8">
        <SectionHeader
          eyebrow="Detailed Pages"
          title="Choose a section to view the full blueprint"
          subtitle="Every major section has a linked detailed page with execution and KPI context."
        />
        <DetailNavRail activeId="" />
      </section>
    );
  }

  const currentMetric = page.metrics[activeMetricIndex];
  const relatedPages = page.related
    .map((id) => detailPages.find((entry) => entry.id === id))
    .filter(Boolean);

  return (
    <section className="mt-2 space-y-8" id="details-hub">
      <DetailNavRail activeId={page.id} />

      <motion.div
        className="relative overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-br from-[#0f172a]/90 via-[#111827]/85 to-[#020617]/95 p-7 md:p-10"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <AuroraBlob className="top-[-20%] left-[-12%] h-72 w-72 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.24),rgba(15,23,42,0))]" />
        <AuroraBlob className="bottom-[-25%] right-[-14%] h-72 w-72 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.28),rgba(15,23,42,0))]" />

        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/80">{page.eyebrow}</p>
            <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">{page.title}</h1>
            <p className="mt-4 text-base leading-relaxed text-white/75">{page.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={page.liveSection}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/85 transition hover:border-white/35 hover:bg-white/15"
              >
                Back to live section
                <ArrowRight className="h-3 w-3" />
              </a>
              <a
                href={`#details/${page.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100"
              >
                Detailed page active
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/35 p-5 shadow-[0_22px_65px_-45px_rgba(59,130,246,0.75)]">
            <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-200/80">Auto KPI stream</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${page.id}-${currentMetric.label}-${currentMetric.value}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.25 }}
                className="mt-4 space-y-2"
              >
                <p className="text-sm text-white/70">{currentMetric.label}</p>
                <p className="text-3xl font-semibold text-white">{currentMetric.value}</p>
                <p className="text-sm text-cyan-100/90">{currentMetric.insight}</p>
              </motion.div>
            </AnimatePresence>
            <motion.div
              key={`metric-progress-${page.id}-${activeMetricIndex}`}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
              className="mt-5 h-1 rounded-full bg-gradient-to-r from-[#34d399] via-[#38bdf8] to-[#a855f7]"
            />
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
        >
          <h3 className="text-lg font-semibold text-white">Execution Blueprint</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            {page.steps.map((step) => (
              <li key={step} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 text-emerald-300" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.05 }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
        >
          <h3 className="text-lg font-semibold text-white">What You Get</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            {page.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 text-sky-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#001F3F]/70 via-[#050814]/80 to-[#120022]/70 p-6"
      >
        <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-200/80">Interlinked paths</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {relatedPages.map((related) => (
            <a
              key={related.id}
              href={`#details/${related.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 transition hover:border-white/40 hover:text-white"
            >
              {related.id}
              <ArrowRight className="h-3 w-3" />
            </a>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://wa.me/+917388833006"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00F1A0] to-[#00FFFF] px-4 py-2 text-sm font-semibold text-black shadow-[0_0_20px_rgba(0,241,160,0.65)]"
          >
            WhatsApp CTA
          </a>
          <a
            href="https://agent.jotform.com/019aa7fd4aaa7cccb0ce1b2c0748666c3478"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/70 hover:bg-cyan-300/20"
          >
            2nd contact agent
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function DetailNavRail({ activeId }) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-max gap-3">
        <a
          href="#hero"
          className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/75 transition hover:border-white/35 hover:text-white"
        >
          Home sections
        </a>
        {detailPages.map((page) => (
          <a
            key={page.id}
            href={`#details/${page.id}`}
            className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
              activeId === page.id
                ? "border-emerald-300/70 bg-emerald-300/15 text-white"
                : "border-white/20 bg-white/5 text-white/70 hover:border-white/35 hover:text-white"
            }`}
          >
            {page.id}
          </a>
        ))}
      </div>
    </div>
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
              <div className="grid rounded-[32px] bg-black/40 px-5 py-8 sm:px-8 sm:py-10 md:grid-cols-[1.2fr_1fr] md:gap-10 md:px-12">
                <div className="space-y-5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/85">
                    Sudarshan AI Labs
                  </span>
                  <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                    Ready to turn ₹89 into your always-on growth engine?
                  </h3>
                  <p className="text-sm text-white/80 sm:text-base">
                    Hop on a 15-minute discovery call with our Lucknow pod and see how fast agentic workflows can launch, automate, and scale your vyapaar.
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-4 md:mt-0">
                  <a
                    href="https://wa.me/+917388833006"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#34d399] via-[#3b82f6] to-[#9333ea] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_35px_rgba(59,130,246,0.45)] transition hover:scale-105 hover:shadow-[0_0_45px_rgba(59,130,246,0.65)] sm:px-6 sm:py-3"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp our team
                  </a>
                  <a
                    href="https://agent.jotform.com/019aa7fd4aaa7cccb0ce1b2c0748666c3478"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2.5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/70 hover:bg-cyan-300/20 sm:px-6 sm:py-3"
                  >
                    2nd Contact Agent
                  </a>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-xs text-white/70">
                    <p>Office: Indira nagar , Lucknow — Serving MSMEs pan-India with remote pods in UP, NCR & Bharat.</p>
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
                <li><a className="hover:text-white transition" href="#details/value">Detailed pages</a></li>
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
  const spotlightPathMap = {
    "swaraj-tech-pack": "/services/TechSwarajPack",
    "prarambh-pack": "/services/KickStartPack",
    "raftar-booster": "/services/TezRaftarBooster",
    "digital-dominance": "/services/DigitalDominatorPack"
  };

  const fmt = new Intl.NumberFormat("en-IN");
  const hasNumbers = typeof plan.mrp === "number" && typeof plan.price === "number";
  const save = hasNumbers ? Math.round(((plan.mrp - plan.price) / plan.mrp) * 100) : null;
  const hasBadge = Boolean(plan.badge);
  return (
    <motion.div
      variants={floatIn}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.1] via-white/[0.04] to-transparent p-6 ${hasBadge ? "pt-14" : ""} text-center shadow-[0_30px_90px_-50px_rgba(59,130,246,0.6)] transition-colors duration-300 hover:border-[#34d399]/60 sm:text-left`}
    >
      {plan.badge && (
        <span className="absolute left-4 top-4 inline-flex max-w-[75%] items-center gap-2 rounded-full bg-gradient-to-r from-[#f97316] to-[#ec4899] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-black shadow-[0_8px_22px_rgba(236,72,153,0.35)]">
          {plan.badge}
        </span>
      )}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ background: "linear-gradient(160deg, rgba(0,241,160,0.15), transparent 65%)" }}
      />
      <div className={`relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between ${hasBadge ? "pt-1" : ""}`}>
        <div className="w-full space-y-2 text-center sm:text-left">
          <p className="text-xs uppercase tracking-[0.18em] text-white/50">{plan.category}</p>
          <h3 className="text-xl font-semibold text-white">{plan.label}</h3>
          <p className="text-xs text-white/60">{plan.nickname}</p>
        </div>
        {save !== null && save > 0 && (
          <div className="inline-flex items-center justify-center self-center rounded-full bg-gradient-to-r from-[#34d399] to-[#3b82f6] px-3 py-1 text-xs font-semibold text-black shadow-[0_0_18px_rgba(59,130,246,0.35)] sm:self-start">
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
        <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-3">
          <a
            href="https://wa.me/+917388833006"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-grow inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#34d399] via-[#3b82f6] to-[#9333ea] py-2.5 text-xs font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(59,130,246,0.55)]"
          >
            Book on WhatsApp
            <ArrowRight className="h-4 w-4" />
          </a>
          {spotlightPathMap[plan.id] && (
            <a
              href={spotlightPathMap[plan.id]}
              className="inline-flex items-center justify-center gap-1 rounded-full border border-white/20 bg-white/5 py-2.5 px-4 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              Details
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function NeonGridBackdrop() {
  const cells = Array.from({ length: 10 });
  const colors = ["#00FFFF", "#00F1A0", "#3b82f6", "#7c3aed", "#06b6d4"];

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 hidden overflow-hidden lg:flex lg:items-center lg:justify-center">
      <div className="grid w-[108%] max-w-[1024px] grid-cols-5 gap-4 opacity-25">
        {cells.map((_, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-3xl border border-cyan-200/10 bg-black/90"
            style={{ height: 128 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at ${i % 2 === 0 ? "12%" : "82%"} ${i % 3 === 0 ? "22%" : "78%"}, ${colors[i % colors.length]}, transparent 58%)`
              }}
            />
          </div>
        ))}
      </div>
      <motion.div
        className="absolute h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.2),rgba(15,23,42,0))] blur-3xl"
        animate={{ opacity: [0.18, 0.34, 0.18] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function GlowBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden md:block">
      <motion.div
        className="absolute -top-40 -left-20 h-80 w-80 rounded-full bg-gradient-to-br from-[#22d3ee]/30 via-[#6366f1]/22 to-transparent blur-3xl"
        animate={{ opacity: [0.24, 0.38, 0.24] }}
        transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-10 h-96 w-96 rounded-full bg-gradient-to-br from-[#00F1A0]/30 via-[#0061FF]/22 to-transparent blur-3xl"
        animate={{ opacity: [0.2, 0.34, 0.2] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />
    </div>
  );
}

function ScrollMotionAura() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden xl:block">
      <motion.div
        className="absolute left-[8%] top-[16%] h-56 w-56 rounded-full bg-gradient-to-br from-[#22d3ee]/15 via-[#34d399]/10 to-transparent blur-3xl"
        animate={{ opacity: [0.12, 0.24, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[10%] top-[36%] h-64 w-64 rounded-full bg-gradient-to-br from-[#a855f7]/12 via-[#22d3ee]/10 to-transparent blur-3xl"
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
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

function SectionHeader({ eyebrow, title, subtitle, detailId }) { 
  return (
    <motion.div 
      className="max-w-2xl space-y-3"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
      <h2 className="text-[1.9rem] leading-[1.16] text-white sm:text-[3.12rem] md:text-[4.1rem]">{title}</h2>
      {subtitle && <p className="text-base text-white/75 sm:text-lg md:text-xl">{subtitle}</p>}
      {detailId && (
        <a
          href={`#details/${detailId}`}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/20 sm:px-4 sm:text-[11px]"
        >
          Open detailed page
          <ArrowRight className="h-3 w-3" />
        </a>
      )}
    </motion.div>
  ); 
}

function SectionDivider() {
  const shouldReduceMotion = useReducedMotion();
  const nodePositions = ["10%", "22%", "36%", "50%", "64%", "78%", "90%"];

  return (
    <motion.div
      className="mt-12 flex items-center justify-center md:mt-16"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="group relative w-full max-w-4xl px-2 sm:px-4">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
        <motion.div
          className="section-divider-circuit absolute inset-x-4 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.2),rgba(56,189,248,0.65),rgba(34,211,238,0.2),transparent)] shadow-[0_0_30px_rgba(56,189,248,0.28)] transition-all duration-300 group-hover:shadow-[0_0_38px_rgba(56,189,248,0.5)] sm:inset-x-10"
          animate={shouldReduceMotion ? { opacity: 0.9 } : { opacity: [0.72, 1, 0.72] }}
          transition={shouldReduceMotion ? undefined : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        />
        {!shouldReduceMotion && (
          <motion.span
            className="absolute left-1/4 top-1/2 h-14 w-14 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#34d399]/70 via-[#3b82f6]/65 to-[#9333ea]/55 opacity-75 blur-2xl"
            animate={{ x: ["0%", "148%", "0%"], opacity: [0.55, 0.85, 0.55] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <div className="absolute inset-x-3 top-1/2 hidden -translate-y-1/2 justify-between px-2 sm:flex">
          {nodePositions.map((pos, idx) => (
            <motion.span
              key={`${pos}-${idx}`}
              className="absolute h-2 w-2 rounded-full border border-cyan-200/45 bg-cyan-300/70 shadow-[0_0_14px_rgba(34,211,238,0.45)]"
              style={{ left: pos }}
              animate={shouldReduceMotion ? { opacity: 0.75 } : { opacity: [0.45, 1, 0.45], scale: [1, 1.16, 1] }}
              transition={shouldReduceMotion ? undefined : { duration: 2.4 + idx * 0.4, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
        <motion.span
          className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/50 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.25),rgba(5,12,30,0.94))] backdrop-blur-md shadow-[0_0_26px_rgba(34,211,238,0.4)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_35px_rgba(34,211,238,0.7)] md:h-16 md:w-16"
          whileHover={{ scale: 1.08 }}
          animate={shouldReduceMotion ? { y: 0 } : { y: [0, -2, 0], boxShadow: ["0 0 18px rgba(34,211,238,0.35)", "0 0 34px rgba(34,211,238,0.62)", "0 0 18px rgba(34,211,238,0.35)"] }}
          transition={shouldReduceMotion ? undefined : { duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span
            className="absolute inset-0 rounded-full border border-cyan-300/35"
            animate={shouldReduceMotion ? { opacity: 0.5 } : { scale: [1, 1.22, 1], opacity: [0.55, 0.1, 0.55] }}
            transition={shouldReduceMotion ? undefined : { duration: 3, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            className="absolute inset-[10px] rounded-full border border-sky-200/50"
            animate={shouldReduceMotion ? undefined : { rotate: [0, 360] }}
            transition={shouldReduceMotion ? undefined : { duration: 11, repeat: Infinity, ease: "linear" }}
          />
          <Sparkles className="relative z-10 h-5 w-5 text-cyan-50 md:h-[1.35rem] md:w-[1.35rem]" />
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
      <div className="relative h-full rounded-[30px] bg-black/30 p-5 sm:p-8">
        <AuroraBlob className="top-[-25%] left-[-15%] h-64 w-64 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),rgba(15,23,42,0))]" />
        <AuroraBlob className="bottom-[-30%] right-[-20%] h-72 w-72 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25),rgba(15,23,42,0))]" />
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/80">
          {post.category}
        </span>
        <h3 className="mt-5 text-2xl font-semibold text-white sm:mt-6 sm:text-3xl">{post.title}</h3>
        <p className="mt-3 text-sm text-white/80 sm:mt-4 sm:text-base">{post.desc}</p>
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
        detailId="faq"
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
        className="flex w-full items-center justify-between gap-3 rounded-[22px] bg-black/40 px-4 py-3 text-left sm:rounded-[26px] sm:px-6 sm:py-4"
      >
        <span className="text-xs font-medium text-white/90 sm:text-sm">{item.question}</span>
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
            className="overflow-hidden px-4 sm:px-6"
          >
            <div className="pb-4 text-xs text-white/70 sm:pb-5 sm:text-sm">
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
    <div className="fixed bottom-4 right-3 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="cta-card"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[220px] rounded-3xl border border-white/10 bg-[#050814]/95 p-3 text-left shadow-[0_0_25px_rgba(0,0,0,0.6)] backdrop-blur sm:w-[260px] sm:p-4"
          >
            <p className="text-[10px] uppercase tracking-[0.24em] text-emerald-200/80">Talk to a human</p>
            <p className="mt-2 text-xs text-white/70 sm:text-sm">Get a callback or send a WhatsApp note. Our Lucknow pod replies in under 10 minutes.</p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href="https://wa.me/+917388833006"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00F1A0] to-[#00FFFF] px-3 py-2 text-xs font-semibold text-black shadow-[0_0_18px_rgba(0,241,160,0.7)] transition-all duration-300 hover:shadow-[0_0_28px_rgba(0,241,160,0.9)] sm:px-4 sm:text-sm"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp team
              </a>
              <a
                href="https://agent.jotform.com/019aa7fd4aaa7cccb0ce1b2c0748666c3478"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-2 text-xs font-semibold text-cyan-100 transition hover:border-cyan-200/70 hover:bg-cyan-300/20 sm:px-4 sm:text-sm"
              >
                2nd contact agent
              </a>
              <a
                href="tel:+919559595959"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 transition-all duration-300 hover:border-white/30 hover:text-white sm:px-4 sm:text-sm"
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
        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00F1A0] via-[#00FFFF] to-[#7B2FF7] px-3 py-2 text-xs font-semibold text-black shadow-[0_0_25px_rgba(0,241,160,0.8)] focus:outline-none focus:ring-2 focus:ring-emerald-300/60 sm:gap-3 sm:px-4 sm:text-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        animate={{ boxShadow: ["0 0 18px rgba(0,241,160,0.45)", "0 0 32px rgba(0,241,160,0.78)", "0 0 18px rgba(0,241,160,0.45)"] }}
        transition={{ duration: 3.8, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
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
