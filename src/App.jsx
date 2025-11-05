import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Rocket, Bot, ShoppingBag, Star, 
  Check, X, ArrowRight, Menu, XIcon 
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

// Transcribed and updated from 'pricing - MainSheet.csv' and 'pricing - Info.csv'
const pricingPlans = [
  // Category: bundle (Launch Packs)
  { id: "swaraj-89", label: "Swaraj Tech Pack", nickname: "Nano launch pad", category: "bundle", mrp: 999, price: 89, blurb: "Launch your MSME online—Lucknow’s most affordable tech bundle!" },
  { id: "prarambh-499", label: "Prarambh Kick-Start", nickname: "Starter boost", category: "bundle", mrp: 1500, price: 499, blurb: "Get WhatsApp automation + digital business setup at the best value for UP MSMEs." },
  { id: "udaan-889", label: "Udaan Vyapari Pack", nickname: "Vyapari MSME Growth", category: "bundle", mrp: 2399, price: 889, blurb: "Business automation with smart digital marketing for every Vyapari." },
  { id: "prabhav-1399", label: "Prabhav Dominator", nickname: "Always-on engine", category: "bundle", mrp: 3200, price: 1399, blurb: "Scale with monthly lead generation & digital marketing." },
  { id: "vikas-1599", label: "Vikas Growth Pro Pack", nickname: "Full-stack Growth", category: "bundle", mrp: 4500, price: 1599, blurb: "Full-service digital marketing & automation for growing MSMEs." },

  // Category: social (Social Bundles)
  { id: "foundation-1500", label: "Digital Foundation", nickname: "Starter social", category: "social", mrp: 3500, price: 1500, blurb: "Entry-level social media marketing pack for MSMEs in Lucknow." },
  { id: "expansion-3000", label: "Digital Expansion", nickname: "Multi-platform", category: "social", mrp: 5500, price: 3000, blurb: "Upgrade social media—advanced marketing tools for MSMEs." },
  { id: "dominance-4500", label: "Digital Dominance", nickname: "Category king", category: "social", mrp: 7000, price: 4500, blurb: "Premium social media, content creation, integrated automation for MSMEs." },
  
  // Category: individual (Individual Services)
  { id: "consult-499", label: "1:1 Growth Consultation", nickname: "Strategy jam", category: "individual", mrp: 3500, price: 499, blurb: "1:1 strategy session with an AI growth expert for MSMEs." },
  { id: "catalog-pro-599", label: "Catalog Builder Pro", nickname: "Smart catalog", category: "individual", mrp: 1499, price: 599, blurb: "Build an AI-powered e-commerce catalog for WhatsApp & Google." },
  { id: "seo-599", label: "SEO & Content Boost", nickname: "Rank lift", category: "individual", mrp: 1899, price: 599, blurb: "Basic SEO/GMB audit + 90-day content plan for MSMEs." },
  { id: "landing-page-1299", label: "Custom Landing Page", nickname: "Conversion page", category: "individual", mrp: 3500, price: 1299, blurb: "High-conversion landing page for your MSME, built for ads." },
  { id: "bio-link-229", label: "All Bio Link+GMB", nickname: "Online presence", category: "individual", mrp: 1200, price: 229, blurb: "Get your 'All-in-one' bio link + verified Google Business Profile." },
  { id: "pr-launch-899", label: "PR Launch", nickname: "Get featured", category: "individual", mrp: 2499, price: 899, blurb: "Affordably launch your MSME with digital PR for instant trust." },
];

// Transcribed from 'pricing - Social media Info.csv'
const socialFeaturesData = [
  { feature: "Target Business", foundation: "New MSMEs, Startup/MUDRA", expansion: "Growing MSMEs, MSME Champions", dominance: "Established MSMEs, Export" },
  { feature: "Promotion Posters", foundation: "10", expansion: "15", dominance: "30" },
  { feature: "Post Text/Templates", foundation: "20 (industry specific)", expansion: "20 (inc. blog/quiz)", dominance: "30 (comprehensive)" },
  { feature: "Blog/Article", foundation: "1 (SEO, backlink)", expansion: "5 (authority focus)", dominance: "12 (thought leadership)" },
  { feature: "Media PR / Press Release", foundation: "1", expansion: "1", dominance: "2" },
  { feature: "Content Calendar", foundation: "Monthly planning", expansion: "PR calendar, notifications", dominance: "Full strategy, reminders" },
  { feature: "Reels/Stories", foundation: "4 (engagement)", expansion: "8", dominance: "12 (brand storytelling)" },
  { feature: "Brand Kit", foundation: "Logo, keywords, #", expansion: "Enhanced optimization", dominance: "Full kit, advanced optimization" },
  { feature: "Social Profile Optimization", foundation: "✅", expansion: "Audit/review & linking", dominance: "✅" },
  { feature: "Platform Listings", foundation: "All Major", expansion: "2 new platforms", dominance: "Full Profile Optimisation" },
  { feature: "Content Interlinking", foundation: "❌", expansion: "Account interlinking", dominance: "Landing page, website setup" },
  { feature: "Growth Report Module", foundation: "❌", expansion: "❌", dominance: "Monthly digital footprint" },
  { feature: "Competitor Analysis", foundation: "Basic overview", expansion: "Detailed analysis", dominance: "Comprehensive market intelligence" },
  { feature: "Gov. Scheme Checklist", foundation: "✅", expansion: "✅", dominance: "✅" },
  { feature: "Fund Application Support", foundation: "✅", expansion: "✅", dominance: "✅" },
  { feature: "Digital Marketing Training", foundation: "Basic guide", expansion: "Advanced workshops", dominance: "Complete digital transformation" },
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
    img: "https://placehold.co/600x400/0B0F19/00FFFF?text=AI+Tools"
  },
  { 
    category: "Local SEO", 
    title: "From Kabab Trails to Killer Funnels", 
    desc: "How a local Lucknow food joint used 'mohalla-first' SEO to triple their walk-in customers.",
    img: "https://placehold.co/600x400/0B0F19/00F1A0?text=Local+SEO"
  },
  { 
    category: "Uni-Commerce", 
    title: "Beyond WhatsApp: The ₹89 Uni-Commerce Portal", 
    desc: "Your customers are on Instagram, Google, and WhatsApp. Why is your store only in one place?",
    img: "https://placehold.co/600x400/0B0F19/7F00FF?text=Commerce"
  },
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
      <NeonGridBackdrop />
      <GlowBlobs />
      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:px-6 md:pt-16 overflow-x-hidden">
        <Hero />
        
        {/* --- AI Tool Section --- */}
        {/* This section now correctly renders the AI Analyzer tool */}
        {isAuthReady && db && auth && (
          <AiPresenceAnalyzerSection db={db} auth={auth} userId={userId} />
        )}
        
        <About />
        <Services />
        <PricingSection />
        <Campaigns />
        <Testimonials />
        <BlogSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

// --- Page Sections ---

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { href: "#analyzer", label: "AI Analyzer" }, // Link to the new tool
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#pricing", label: "Pricing" },
    { href: "#campaigns", label: "Campaigns" },
    { href: "#testimonials", label: "Love" },
    { href: "#blog", label: "Blog" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          {/* Logo and Title */}
          <motion.a 
            href="#"
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
    <section id="hero" className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-center min-h-[70vh]">
      {/* Hero Text Content */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={floatIn} className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.26em] text-emerald-200/90">
          <Sparkles className="h-3 w-3" />
          <span>AI Enabled Growth • Lucknow Launchpad</span>
        </motion.div>

        {/* --- LATEST HERO TITLE & TAGLINE --- */}
        <motion.h1 variants={floatIn} className="text-4xl sm:text-5xl md:text-5xl leading-tight font-semibold">
          <span className="block text-white">Best Digital Marketing Services in Lucknow</span>
          <span className="mt-1 inline-block bg-gradient-to-r from-[#00F1A0] via-[#00FFFF] to-[#7B2FF7] bg-clip-text text-transparent">Empowering Bharat’s Businesses for a Self-Reliant Future</span>
        </motion.h1>

        <motion.p variants={floatIn} className="max-w-xl text-lg leading-relaxed text-white/70 md:text-xl">
          “Vyapaar ka AI Yug – हर दुकानदार की डिजिटल क्रांति”
        </motion.p>
        {/* --- END LATEST HERO --- */}

        {/* Action Buttons */}
        <motion.div variants={floatIn} className="flex flex-col sm:flex-row gap-4">
          <a href="#pricing" className="group text-center rounded-full bg-gradient-to-r from-[#7F00FF] via-[#FF8C00] to-[#00FFFF] px-6 py-3 text-sm font-semibold text-black shadow-[0_0_30px_rgba(127,0,255,0.8)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(127,0,255,1)] hover:scale-105">
            Start at ₹89
          </a>
          <a href="#services" className="group text-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 transition-all duration-300 hover:bg-white/10 hover:border-white/40">
            View Services
          </a>
        </motion.div>
      </motion.div>

      {/* Hero Monitor Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }} 
        className="relative"
      >
        <div className="rounded-[30px] bg-gradient-to-br from-[#001f3f]/80 to-[#0b0f19]/80 p-6 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-white/60">
            {/* Animated "Live" Dot */}
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live campaign monitor
            </span>
            <span className="text-[10px] rounded-full bg-white/5 px-3 py-1">Hazratganj • Gomti Nagar</span>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-white/80">AI watches your Google & Instagram and suggests next best campaigns — in Hindi/Hinglish.</p>
            </div>
            <div className="w-[110px] flex-shrink-0">
              <div className="rounded-xl bg-gradient-to-b from-[#001F3F] to-[#050814] p-4 text-center border border-white/10">
                <Bot className="h-10 w-10 text-emerald-300 mx-auto" />
                <p className="text-xs mt-2">Sudarshan Buddy</p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <StatPill label="Engagement" value="+173%" tone="emerald" />
            <StatPill label="Ad Waste" value="-41%" tone="rose" />
            <StatPill label="Campaigns" value="500+" tone="sky" />
          </div>
        </div>
      </motion.div>
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
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Here is the connection to your OnlinePresenceAnalyzer.jsx file */}
        <OnlinePresenceAnalyzer db={db} auth={auth} userId={userId} />
      </motion.div>
    </section>
  );
}


function About() {
  return (
    <section id="about" className="mt-20 md:mt-32">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer} className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
        <motion.div variants={floatIn}>
          <SectionLabel>Why Sudarshan AI Labs?</SectionLabel>
          <h2 className="mt-2 text-3xl md:text-4xl">From kabab trails to killer funnels.</h2>
          {/* Updated SEO Content */}
          <p className="mt-4 text-white/70 text-base leading-relaxed">
            Lucknow-born, AI-first studio. We help MSMEs, creators & startups launch digital shops, content engines, and growth flywheels. From AI-powered WhatsApp automation and smart-catalog builders to full-service lead generation campaigns, we build practical, low-cost, local-first solutions to scale your <em>dhandha</em>.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <AboutChip title="₹89 Launchpad" desc="Plug-and-play portal + basic campaign." />
            <AboutChip title="Hindi + Hinglish" desc="Copy tuned to your audience." />
            <AboutChip title="Creator-First" desc="Templates for reels, shorts & carousels." />
          </div>
        </motion.div>

        <motion.div variants={floatIn} transition={{ delay: 0.1 }} className="rounded-3xl border border-white/10 p-5 bg-gradient-to-br from-[#120022]/90 via-[#001F3F]/60 to-[#0B0F19]/90">
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/80">Lucknow Scene Map</p>
          <ul className="mt-3 text-white/75 space-y-2 text-sm">
            <li>• Hazratganj boutiques — Insta + GMB boost</li>
            <li>• Fun Republic Mall — meme-first launches</li>
            <li>• Kabab Trail — UGC contests & food reels</li>
            <li>• Chacoco Café — creator collabs & live pods</li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="mt-20 md:mt-32">
      <SectionHeader eyebrow="Top services" title="AI-first services for MSMEs, creators & startups" subtitle="Affordable, measurable and local-first." />
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }} 
        variants={staggerContainer} 
        className="mt-8 grid gap-6 md:grid-cols-3"
      >
        <ServiceCard gradient="from-[#7F00FF] via-[#FF8C00] to-[#00FFFF]" title="AI Social Studio" badge="Top pick" price="₹1,500/mo" points={["Content calendar","Auto ideas with ChatGPT","Shorts & reels"]} />
        <ServiceCard gradient="from-[#00F1A0] via-[#00FFFF] to-[#0061FF]" title="Uni-Commerce Portal" badge="₹89" price="₹89 one-time" points={["WhatsApp ordering","Catalog upload","MSME onboarding"]} />
        <ServiceCard gradient="from-[#FF8C00] via-[#FF2D92] to-[#7B2FF7]" title="Campaign Pods" badge="Growth" price="Custom" points={["Full-funnel sprints","Quarterly playbooks","Invest UP alignment"]} />
      </motion.div>
    </section>
  );
}

function PricingSection() {
  const [active, setActive] = useState("bundle");
  const tabs = [
    { id: "bundle", label: "Launch Packs" },
    { id: "social", label: "Social Bundles" },
    { id: "individual", label: "Individual Services" },
  ];
  
  const filteredCards = pricingPlans.filter((p) => p.category === active);

  return (
    <section id="pricing" className="mt-20 md:mt-32">
      <SectionHeader eyebrow="Transparent pricing" title="Pick a pack, scale your dhandha" subtitle="MRP shown for context; final invoice in INR." />

      <div className="mt-6 flex gap-3 flex-wrap">
        {tabs.map((t) => (
          <button 
            key={t.id} 
            onClick={() => setActive(t.id)} 
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${active===t.id?"bg-emerald-400/10 border border-emerald-400 text-emerald-200":"bg-black/30 border border-white/10 text-white/70 hover:border-white/30"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          {active === 'social' ? (
            <SocialCompareTable key="social-table" data={socialFeaturesData} />
          ) : (
            <motion.div 
              key={active} // Key ensures component re-mounts on tab change
              variants={staggerContainer} 
              initial="hidden" 
              animate="visible" 
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCards.map((plan) => (
                <PricingCard key={plan.id} plan={plan} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
        className="mt-8 grid gap-6 md:grid-cols-3"
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
        className="mt-8 grid gap-6 md:grid-cols-3"
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
        className="mt-8 grid gap-6 md:grid-cols-3"
      >
        {blogPostsData.map((post) => (
          <BlogCard key={post.title} post={post} />
        ))}
      </motion.div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="mt-20 md:mt-32 p-[1px] rounded-[28px] bg-gradient-to-r from-[#001F3F] via-[#050814] to-[#120022]">
      <div className="rounded-[27px] bg-black/80 backdrop-blur-sm p-8 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div>
          <p className="text-xs uppercase text-emerald-200">Ready for 2025 growth?</p>
          <h3 className="text-2xl md:text-3xl">Launch your AI HQ for ₹89</h3>
          <p className="text-white/70 mt-2">Portal, audit and campaign idea — tuned to your street or mall.</p>
        </div>
        <div>
          <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="group w-full md:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#00F1A0] to-[#00FFFF] px-6 py-3 text-black font-semibold shadow-[0_0_25px_rgba(0,241,160,0.7)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,241,160,1)] hover:scale-105">
            DM on WhatsApp
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40 py-8 text-xs text-white/60">
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row md:justify-between gap-4 text-center md:text-left">
        <div>
          <p className="font-semibold text-white">Sudarshan AI Labs Pvt. Ltd.</p>
          <p className="text-white/50">Built in Lucknow — MSME friendly.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
          <p>Made with 🟢 AI & chai</p>
          <div className="flex gap-3"><a href="#" className="hover:text-white">Instagram</a><a href="#" className="hover:text-white">LinkedIn</a></div>
        </div>
      </div>
    </footer>
  );
}


// --- Re-usable Components ---

function SocialCompareTable({ data }) {
  const CheckMark = () => <Check className="h-5 w-5 text-emerald-400 mx-auto" />;
  const CrossMark = () => <X className="h-5 w-5 text-white/30 mx-auto" />;
  
  const renderCell = (content) => {
    if (content === "✅") return <CheckMark />;
    if (content === "❌") return <CrossMark />;
    return <span className="text-sm text-white/90">{content}</span>;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full overflow-x-auto"
    >
      <div className="min-w-[1000px]">
        {/* Header Row */}
        <div className="grid grid-cols-4 gap-px rounded-t-2xl bg-white/10 p-px">
          <div className="bg-[#050814] p-4 rounded-tl-2xl">
            <p className="text-lg font-semibold">Features</p>
          </div>
          {pricingPlans.filter(p => p.category === 'social').map((plan, index) => (
            <div 
              key={plan.id} 
              className={`p-4 ${index === 1 ? 'bg-gradient-to-b from-[#003428] to-[#050814]' : 'bg-[#050814]'} ${index === 2 ? 'rounded-tr-2xl' : ''}`}
            >
              <p className="font-semibold text-white">{plan.label}</p>
              <p className="text-xs text-white/60">{plan.nickname}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <div className="text-xl font-bold">₹{new Intl.NumberFormat("en-IN").format(plan.price)}</div>
                <div className="text-xs text-white/50 line-through">₹{new Intl.NumberFormat("en-IN").format(plan.mrp)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Rows */}
        <div className="grid grid-cols-4 gap-px bg-white/10 p-px">
          {data.map((item, itemIndex) => (
            <React.Fragment key={item.feature}>
              <div className={`col-span-1 bg-[#0B0F19] p-4 text-sm font-semibold text-white/70 ${itemIndex === data.length - 1 ? 'rounded-bl-2xl' : ''}`}>
                {item.feature}
              </div>
              <div className={`bg-[#050814] p-4 text-center ${itemIndex === data.length - 1 ? 'border-b-0' : ''}`}>
                {renderCell(item.foundation)}
              </div>
              <div className={`bg-gradient-to-b from-[#003428]/20 to-[#050814] p-4 text-center ${itemIndex === data.length - 1 ? 'border-b-0' : ''}`}>
                {renderCell(item.expansion)}
              </div>
              <div className={`bg-[#050814] p-4 text-center ${itemIndex === data.length - 1 ? 'rounded-br-2xl border-b-0' : ''}`}>
                {renderCell(item.dominance)}
              </div>
            </React.Fragment>
          ))}
        </div>
         {/* Footer Button Row */}
        <div className="grid grid-cols-4 gap-px bg-white/10 p-px rounded-b-2xl">
          <div className="bg-[#0B0F19] p-4 rounded-bl-2xl"></div>
           {pricingPlans.filter(p => p.category === 'social').map((plan, index) => (
             <div 
              key={`btn-${plan.id}`}
              className={`p-4 ${index === 1 ? 'bg-gradient-to-b from-[#003428]/20 to-[#050814]' : 'bg-[#050814]'} ${index === 2 ? 'rounded-br-2xl' : ''} ${index === 0 ? 'bg-[#050814]' : ''}`}
            >
               <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="w-full text-center block rounded-full bg-gradient-to-r from-[#00F1A0] to-[#00FFFF] py-2 text-black font-semibold text-sm transition-all duration-300 hover:scale-105">
                 Book Now
               </a>
             </div>
           ))}
        </div>
      </div>
    </motion.div>
  );
}

function PricingCard({ plan }) {
  const fmt = new Intl.NumberFormat("en-IN");
  const save = plan.mrp ? Math.round(((plan.mrp - plan.price) / plan.mrp) * 100) : 0;
  return (
    <motion.div 
      variants={floatIn} 
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }} 
      className="rounded-3xl p-5 bg-[#050814]/90 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.6)] flex flex-col h-full"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-white">{plan.label}</p>
          <p className="text-xs text-white/60">{plan.nickname}</p>
        </div>
        {save>0 && <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#7F00FF] to-[#00FFFF] text-black text-xs font-semibold">Save {save}%</div>}
      </div>
      <div className="mt-3 flex-grow flex flex-col">
        <div className="flex items-baseline gap-3">
          <div className="text-2xl font-bold">₹{fmt.format(plan.price)}</div>
          <div className="text-xs text-white/50 line-through">₹{fmt.format(plan.mrp)}</div>
        </div>
        <p className="text-sm text-white/70 mt-2 flex-grow">{plan.blurb}</p>
        <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="mt-4 w-full block text-center rounded-full bg-gradient-to-r from-[#00F1A0] to-[#00FFFF] py-2 text-black font-semibold transition-all duration-300 hover:scale-105">
          Book on WhatsApp
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

function ServiceCard({ gradient, title, badge, price, points }) {
  return (
    <motion.div 
      variants={floatIn} 
      className="group rounded-3xl bg-gradient-to-br from-white/5 via-white/0 to-white/5 p-[1px] h-full"
    >
      <div className="flex h-full flex-col rounded-[22px] bg-[#050814]/90 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-200/90">{badge}</span>
        </div>
        <p className="mt-3 text-sm text-emerald-200/90">{price}</p>
        <ul className="mt-4 space-y-2 text-xs text-white/70 flex-grow">
          {points.map((p) => (
            <li key={p} className="flex gap-2">
              <span className="mt-[3px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-[#00F1A0] to-[#00FFFF]" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <a href="#pricing" className={`mt-5 inline-flex items-center justify-between gap-2 rounded-full bg-gradient-to-r ${gradient} px-4 py-1.5 text-[11px] font-semibold text-black shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.9)] group-hover:scale-105`}>
          <span>View Pricing</span>
          <Sparkles className="h-3 w-3" />
        </a>
      </div>
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
        <a href="#" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 transition-all group-hover:gap-3">
          Read More <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
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
