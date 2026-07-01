import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { 
  Sparkles, Rocket, Bot, ShoppingBag, Star, 
  Check, X, ArrowRight, Menu, XIcon, 
  MessageCircle, Phone, ChevronDown, BarChart3
} from "lucide-react";
import OnlinePresenceAnalyzer from '../components/OnlinePresenceAnalyzer';


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

const HomePage = () => {
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
    <div className="min-h-screen overflow-x-clip bg-[#0B0F19] text-white font-sans antialiased">
      <ScrollProgressBar />
      {showAmbientLayers && !shouldReduceMotion && <NeonGridBackdrop />}
      {showAmbientLayers && !shouldReduceMotion && <GlowBlobs />}
      {showAmbientLayers && !shouldReduceMotion && <ScrollMotionAura />}
      <Header isDetailView={isDetailView} />
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:px-6 md:pt-16 overflow-x-hidden">
        {isDetailView ? (
          <DetailPageView detailId={activeDetailId} />
        ) : (
          <>
            <Hero />
            <SectionDivider />
            <ValuePropsSection />
            {showDeferredSections && (
              <div className="deferred-sections">
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
              </div>
            )}
          </>
        )}
      </main>
      <FloatingCTA />
      <Footer />
    </div>
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
      className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(120deg,rgba(12,26,53,0.96),rgba(9,14,35,0.96),rgba(3,8,20,0.98))] px-4 py-10 sm:rounded-[36px] sm:px-6 sm:py-14 md:px-12 md:py-20"
    >
      <div className="pointer-events-none absolute -left-12 -top-10 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.28),rgba(15,23,42,0))] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-12 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.32),rgba(8,47,73,0))] blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-[420px] w-[2px] -translate-y-1/2 rounded-full bg-gradient-to-b from-transparent via-[#fbbf24]/60 to-transparent blur-[2px]" />
      <div className="pointer-events-none absolute -right-10 top-6 h-40 w-40 rounded-full bg-gradient-to-br from-[#00F1A0]/30 to-transparent blur-3xl" />

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
            className="mx-auto max-w-2xl text-[2rem] font-semibold leading-[1.12] text-white sm:text-5xl lg:mx-0 lg:text-[3.4rem]"
          >
            Launch Your Digital Dukaan in{" "}
            <span
              className="block bg-gradient-to-r from-[#22d3ee] via-[#818cf8] to-[#f97316] bg-clip-text text-transparent"
            >
              30 Minutes With Agentic AI
            </span>
          </motion.h1>

          <motion.p
            variants={floatIn}
            className="mx-auto max-w-xl text-sm leading-relaxed text-white/70 sm:text-lg lg:mx-0"
          >
            Hyperlocal SEO, WhatsApp automation, and Hindi-first CRM so every
            vyapari can capture more calls, orders, and repeat buyers—without
            hiring an agency.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={floatIn}
            className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <a
              href="#plans"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#34d399] via-[#3b82f6] to-[#9333ea] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_40px_rgba(59,130,246,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_55px_rgba(59,130,246,0.65)] sm:w-auto"
            >
              Explore ₹89 Launchpad
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#process"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90 transition-all duration-300 hover:border-white/35 hover:bg-white/10 sm:w-auto"
            >
              See 30-min Workflow
            </a>
            <a
              href="https://agent.jotform.com/019aa7fd4aaa7cccb0ce1b2c0748666c3478"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-2.5 text-sm font-medium text-cyan-100 transition-all duration-300 hover:border-cyan-200/60 hover:bg-cyan-300/20 sm:w-auto"
            >
              Contact Agent (2nd Line)
            </a>
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

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="mt-20 md:mt-32">
      <SectionHeader eyebrow="Common questions" title="Straightforward answers" subtitle="Everything you need to know before you start your growth journey." detailId="faq" />
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }} 
        variants={staggerContainer} 
        className="mt-10 max-w-3xl mx-auto"
      >
        {faqItems.map((item, index) => (
          <motion.div key={item.question} variants={floatIn} className="border-b border-white/10">
            <button
              onClick={() => toggleFaq(index)}
              className="flex w-full items-center justify-between py-6 text-left"
            >
              <span className="text-lg font-medium text-white/90">{item.question}</span>
              <ChevronDown
                className={`h-6 w-6 text-white/70 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-base leading-relaxed text-white/70">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="mt-24 md:mt-36">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#120022]/90 via-[#001F3F]/60 to-[#0B0F19]/90 px-8 py-12 md:px-12 md:py-16 text-center"
      >
        <AuroraBlob className="top-[-35%] left-[-25%] h-72 w-72 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3),rgba(15,23,42,0))]" />
        <AuroraBlob className="bottom-[-30%] right-[-15%] h-80 w-80 bg-[radial-gradient(circle_at_center,rgba(0,241,160,0.2),rgba(15,23,42,0))]" />
        <div className="relative">
          <SectionLabel>Ready to scale?</SectionLabel>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">Launch your business for just ₹89</h2>
          <p className="mt-4 max-w-xl mx-auto text-base text-white/70">
            Click below to start your journey. For custom needs or a demo, get in touch via WhatsApp.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#plans"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00F1A0] to-[#00FFFF] px-6 py-3 text-base font-semibold text-black shadow-[0_0_30px_rgba(0,241,160,0.7)] transition-transform hover:scale-105"
            >
              <Rocket className="h-5 w-5" />
              Get Started with ₹89
            </a>
            <a
              href="https://wa.me/+917388833006"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-base font-medium text-white/90 transition hover:bg-white/20"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp an Advisor
            </a>
          </div>
          <p className="mt-6 text-xs text-white/50">Free Udyam registration included with all packs.</p>
        </div>
      </motion.div>
    </section>
  );
}

function FloatingCTA() {
  return(
    <a href="https://wa.me/+917388833006" target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-40 flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-2xl transition-transform hover:scale-110">
      <MessageCircle className="h-8 w-8 text-white" />
    </a>
  )
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 text-white/50">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <a href="#hero" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7F00FF] to-[#00FFFF]">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/80">Sudarshan AI Labs</p>
                <p className="text-sm">MSME Growth Engine</p>
              </div>
            </a>
            <p className="mt-4 text-sm">
              Empowering Lucknow's local businesses with AI-driven marketing and automation.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm md:col-span-2">
            <div>
              <h3 className="font-semibold uppercase tracking-wider text-white/80">Navigation</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#value" className="hover:text-white">Why ₹89 Works</a></li>
                <li><a href="#plans" className="hover:text-white">Pricing</a></li>
                <li><a href="#proof" className="hover:text-white">Case Studies</a></li>
                <li><a href="#faq" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold uppercase tracking-wider text-white/80">Contact</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="https://wa.me/+917388833006" target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp</a></li>
                <li><a href="tel:+917388833006" className="hover:text-white">Phone Call</a></li>
                <li><a href="mailto:sudarshansain6@gmail.com" className="hover:text-white">Email</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Sudarshan AI Labs (NAVA-NETRA NEURAL SUDARSHAN LABS (OPC) PRIVATE LIMITED). All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// --- Detail Page View ---
function DetailPageView({ detailId }) {
  const detail = detailPages.find(p => p.id === detailId);

  if (!detail) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Detail Page Not Found</h2>
        <a href="#hero" className="mt-4 inline-block text-emerald-300 hover:text-emerald-200">
          &larr; Back to Home
        </a>
      </div>
    );
  }

  return (
    <motion.div
      key={detailId}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-12"
    >
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
          <Sparkles className="h-3 w-3" />
          {detail.eyebrow}
        </span>
        <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">{detail.title}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-white/70">{detail.summary}</p>
        <a href={detail.liveSection} className="mt-4 inline-block text-emerald-300 hover:text-emerald-200 text-sm">
          See live section on main page &rarr;
        </a>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-4 rounded-2xl border border-white/10 bg-[#050814]/70 p-6">
          <h3 className="text-lg font-semibold text-emerald-300">Key Steps</h3>
          <ul className="space-y-2 text-sm text-white/80">
            {detail.steps.map(step => <li key={step} className="flex items-start gap-3"><Check className="h-4 w-4 mt-1 flex-shrink-0 text-emerald-300" />{step}</li>)}
          </ul>
        </div>
        <div className="space-y-4 rounded-2xl border border-white/10 bg-[#050814]/70 p-6">
          <h3 className="text-lg font-semibold text-emerald-300">Deliverables</h3>
          <ul className="space-y-2 text-sm text-white/80">
            {detail.deliverables.map(item => <li key={item} className="flex items-start gap-3"><Rocket className="h-4 w-4 mt-1 flex-shrink-0 text-emerald-300" />{item}</li>)}
          </ul>
        </div>
        <div className="md:col-span-2 lg:col-span-1 space-y-4 rounded-2xl border border-white/10 bg-[#050814]/70 p-6">
          <h3 className="text-lg font-semibold text-emerald-300">Metrics & Impact</h3>
          <div className="space-y-3">
            {detail.metrics.map(metric => (
              <div key={metric.label}>
                <p className="text-xs uppercase tracking-widest text-white/60">{metric.label}</p>
                <p className="text-2xl font-bold text-white">{metric.value}</p>
                <p className="text-xs text-white/60">{metric.insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white/80">Related Deep Dives</h3>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {detail.related.map(relId => {
            const relDetail = detailPages.find(p => p.id === relId);
            return relDetail ? (
              <a key={relId} href={`#details/${relId}`} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 transition-all duration-300 hover:border-white/35 hover:bg-white/10">
                {relDetail.eyebrow}: {relDetail.title}
              </a>
            ) : null;
          })}
        </div>
      </div>
    </motion.div>
  );
}

// --- Utility & Helper Components ---

function SectionDivider() {
  return (
    <div className="relative my-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent md:my-16">
      <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0B0F19] text-white/20 flex items-center justify-center">
        <Sparkles className="h-4 w-4" />
      </span>
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle, detailId }) {
  return (
    <motion.div 
      className="max-w-3xl text-center mx-auto"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-white/70">{subtitle}</p>
      {detailId && (
        <a href={`#details/${detailId}`} className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/20">
          Open detailed page <ArrowRight className="h-3 w-3" />
        </a>
      )}
    </motion.div>
  );
}

function SectionLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
      <Sparkles className="h-3 w-3" />
      {children}
    </span>
  );
}

function PlanCategoryCard({ category }) {
  return (
    <motion.div
      variants={floatIn}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-transparent to-black/[0.4] p-6 text-center shadow-[0_22px_60px_-40px_rgba(59,130,246,0.55)]"
    >
      <AuroraBlob className="top-[-30%] left-[-20%] h-56 w-56 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2),rgba(15,23,42,0))]" />
      <p className="text-xs uppercase tracking-widest text-emerald-200/80">{category.subtitle}</p>
      <h3 className="mt-3 text-xl font-semibold text-white">{category.label}</h3>
      <p className="mt-3 text-sm text-white/70">{category.description}</p>
      <ul className="mt-4 space-y-2 text-xs text-white/60">
        {category.bullets.map(item => <li key={item} className="flex items-center justify-center gap-2"><Check className="h-4 w-4 flex-shrink-0 text-emerald-300" /> {item}</li>)}
      </ul>
      <a href={category.ctaHref} className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/20">
        {category.ctaLabel} <ArrowRight className="h-3 w-3" />
      </a>
    </motion.div>
  );
}

function PricingCard({ plan }) {
  return (
    <motion.div
      variants={floatIn}
      className={`group relative overflow-hidden rounded-3xl border p-6 text-center transition-all duration-300
        ${plan.badge === "Top seller" ? "border-emerald-300/60 bg-emerald-900/10" : "border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent"}
      `}
    >
      {plan.badge && (
        <span className="absolute top-0 right-6 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#00F1A0] to-[#00FFFF] px-3 py-1 text-xs font-semibold text-black shadow-lg">
          {plan.badge}
        </span>
      )}
      <p className="text-xs uppercase tracking-widest text-emerald-200/80">{plan.nickname}</p>
      <h3 className="mt-3 text-xl font-semibold text-white">{plan.label}</h3>
      <div className="mt-4 flex items-baseline justify-center gap-2">
        <span className="text-4xl font-bold text-white">₹{plan.price}</span>
        {plan.mrp && <span className="text-sm text-white/50 line-through">₹{plan.mrp}</span>}
      </div>
      <p className="mt-4 text-sm text-white/70">{plan.blurb}</p>
      <ul className="mt-6 space-y-2 text-xs text-left text-white/60">
        {plan.inclusions.map(item => (
          <li key={item} className="flex items-start gap-2">
            <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <a
        href="#cta"
        className={`mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300
          ${plan.badge === "Top seller" 
            ? "bg-gradient-to-r from-[#00F1A0] to-[#00FFFF] text-black shadow-lg hover:shadow-emerald-400/50" 
            : "bg-white/10 text-white/80 hover:bg-white/20"}
        `}
      >
        Get Started <ArrowRight className="h-4 w-4" />
      </a>
    </motion.div>
  );
}

function PlansTable({ plans }) {
  const [filter, setFilter] = useState("All");

  const filteredPlans = plans.filter(p => filter === "All" || p.category === filter);

  const categories = ["All", ...new Set(plans.map(p => p.category))];

  return (
    <div>
      <div className="flex flex-wrap gap-2 p-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              filter === cat 
                ? "bg-gradient-to-r from-[#00F1A0] to-[#00FFFF] text-black" 
                : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm text-left">
          <thead className="text-xs uppercase tracking-wider text-white/60">
            <tr>
              <th className="px-5 py-3">Plan Name</th>
              <th className="px-5 py-3">Price (INR)</th>
              <th className="px-5 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            <AnimatePresence>
              {filteredPlans.map(plan => (
                <motion.tr
                  key={plan.name}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-white/5"
                >
                  <td className="px-5 py-4 font-medium text-white/90">
                    {plan.name}
                    <div className="text-xs text-white/50">{plan.category}</div>
                  </td>
                  <td className="px-5 py-4">
                    {plan.price != null ? (
                      <>
                        <span className="font-bold text-white">₹{plan.price}</span>
                        {plan.cadence !== "One-time" && <span className="text-xs text-white/50">/{plan.cadence.replace('Per ','')}</span>}
                        {plan.mrp && <span className="ml-2 text-xs text-white/40 line-through">₹{plan.mrp}</span>}
                      </>
                    ) : <span className="text-white/70">{plan.cadence}</span>}
                  </td>
                  <td className="px-5 py-4 text-white/70">{plan.description}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AboutChip({ title, desc }) {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <p className="text-xs uppercase tracking-widest text-emerald-200/80">{title}</p>
      <p className="mt-2 text-xs text-white/70">{desc}</p>
    </motion.div>
  );
}

function KeyStatCard({ value, label }) {
  return (
    <motion.div
      variants={floatIn}
      className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
    >
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-white/60">{label}</p>
    </motion.div>
  );
}

function CampaignCard({ tag, title, metric, desc }) {
  return (
    <motion.div 
      variants={floatIn} 
      className="relative group overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-5 transition-all duration-300 hover:border-emerald-300/50 hover:bg-emerald-900/20"
    >
      <div className="absolute top-0 left-0 h-48 w-48 bg-gradient-to-br from-emerald-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">{tag}</span>
        <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-transparent">{metric}</p>
        <p className="mt-2 text-sm text-white/70">{desc}</p>
      </div>
    </motion.div>
  );
}

function TestimonialCard({ name, area, quote }) {
  return (
    <motion.div 
      variants={floatIn} 
      className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-6"
    >
      <p className="text-lg text-white/90">"{quote}"</p>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-sky-400 text-white font-bold">{name.charAt(0)}</div>
        <div>
          <p className="font-semibold text-white">{name}</p>
          <p className="text-sm text-white/60">{area}</p>
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedBlogCard({ post }) {
  return (
    <motion.a 
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      variants={floatIn}
      className="group relative md:col-span-12 lg:col-span-6 block overflow-hidden rounded-3xl border border-white/10 transition-all duration-300 hover:border-cyan-300/50"
    >
      <img src={post.img} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-20 transition-opacity duration-300 group-hover:opacity-30" />
      <div className="relative h-full flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
        <span className="text-xs uppercase tracking-widest text-cyan-200/80">{post.category}</span>
        <h3 className="mt-2 text-2xl font-semibold text-white">{post.title}</h3>
        <p className="mt-2 text-sm text-white/70">{post.desc}</p>
        <span className="mt-4 text-xs font-semibold text-cyan-200 flex items-center gap-2">Read More <ArrowRight className="h-3 w-3" /></span>
      </div>
    </motion.a>
  );
}

function MiniBlogCard({ post, index }) {
  return (
    <motion.a 
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      variants={floatIn}
      className="group relative md:col-span-6 lg:col-span-3 block overflow-hidden rounded-3xl border border-white/10 transition-all duration-300 hover:border-cyan-300/50"
    >
      <img src={post.img} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-10 transition-opacity duration-300 group-hover:opacity-20" />
      <div className="relative p-5 bg-gradient-to-b from-black/50 via-black/20 to-transparent">
        <span className="text-[10px] uppercase tracking-widest text-cyan-200/80">{post.category}</span>
        <h4 className="mt-2 font-semibold text-white">{post.title}</h4>
      </div>
    </motion.a>
  );
}


function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00F1A0] to-[#00FFFF] origin-[0%] z-50" style={{ scaleX }} />;
}

function NeonGridBackdrop() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div 
        className="absolute inset-0 bg-repeat"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 241, 160, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 241, 160, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 100% 60% at 50% 0%, black 20%, transparent 80%)'
        }}
      />
    </div>
  );
}

function GlowBlobs() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <motion.div 
        className="absolute top-[10%] left-[10%] h-96 w-96 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      <motion.div 
        className="absolute bottom-[15%] right-[5%] h-80 w-80 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 5
        }}
      />
    </div>
  );
}

function AuroraBlob({ className }) {
  return (
    <motion.div
      className={`pointer-events-none absolute blur-3xl ${className}`}
      initial={{ opacity: 0.5, scale: 1 }}
      animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function ScrollMotionAura() {
  const { scrollY } = useScroll();
  const [y, setY] = useState(0);

  useEffect(() => {
    return scrollY.onChange(latest => {
      setY(latest);
    });
  }, [scrollY]);

  return (
    <motion.div
      className="fixed top-0 left-0 h-96 w-96 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full blur-3xl pointer-events-none"
      style={{
        y: y * 0.1,
        x: y * 0.05,
        opacity: Math.max(0, 1 - (y / 1000)),
      }}
    />
  );
}
export default HomePage;
