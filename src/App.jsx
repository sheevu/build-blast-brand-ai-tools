import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Rocket, Bot, ShoppingBag, Star, MapPin } from "lucide-react";

// Sudarshan AI Labs - Optimized landing page v2
// React + TailwindCSS + Framer Motion

const floatIn = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

// Pricing data (optimized & final)
const pricingPlans = [
  { id: "swaraj-89", label: "Swaraj Tech Pack", nickname: "Nano launch pad", category: "bundle", mrp: 999, price: 89, blurb: "24-hr digital shop + WhatsApp ordering." },
  { id: "prarambh-499", label: "Prarambh Kick-Start", nickname: "Starter boost", category: "bundle", mrp: 1500, price: 499, blurb: "Profile clean-up + launch page." },
  { id: "prabhav-1399", label: "Prabhav Dominator", nickname: "Always-on engine", category: "bundle", mrp: 3200, price: 1399, blurb: "Managed social + reporting." },
  { id: "foundation-1500", label: "Digital Foundation", nickname: "Starter social", category: "social", mrp: 3500, price: 1500, blurb: "Profile setup + basic posts." },
  { id: "expansion-3000", label: "Digital Expansion", nickname: "Multi-platform", category: "social", mrp: 5500, price: 3000, blurb: "Content + light ads + reports." },
  { id: "dominance-4500", label: "Digital Dominance", nickname: "Category king", category: "social", mrp: 7000, price: 4500, blurb: "Aggressive content + ads." },
  { id: "consult-499", label: "1:1 Growth Consultation", nickname: "Strategy jam", category: "individual", mrp: 3500, price: 499, blurb: "60–90min tactical session." },
  { id: "catalog-pro-599", label: "Catalog Builder Pro", nickname: "Smart catalog", category: "individual", mrp: 1499, price: 599, blurb: "AI-assisted product catalog." },
  { id: "seo-599", label: "SEO & Content Boost", nickname: "Rank lift", category: "individual", mrp: 1899, price: 599, blurb: "90-day keyword + content plan." },
];

export default function SudarshanLandingV2() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-['Montserrat',system-ui] antialiased">
      <NeonGridBackdrop />
      <GlowBlobs />

      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:px-6 md:pt-16">
        <Hero />
        <About />
        <Services />
        <PricingSection />
        <Campaigns />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

/* ====== Small UI parts (clean, optimized) ====== */
function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-black/20 border-b border-white/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7F00FF] to-[#00FFFF] shadow-[0_0_25px_rgba(127,0,255,0.7)]">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/80">Sudarshan AI Labs</p>
            <p className="text-sm text-white/70">Lucknow • MSME Growth Engine</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#services" className="hover:text-white transition">Services</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#campaigns" className="hover:text-white transition">Campaigns</a>
          <a href="#testimonials" className="hover:text-white transition">Love</a>
        </nav>

        <div className="flex items-center gap-3">
          <a href="#cta" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00F1A0] to-[#00FFFF] px-4 py-2 text-xs font-semibold text-black shadow-[0_0_25px_rgba(0,241,160,0.7)] transition">
            <Rocket className="h-4 w-4" />
            <span>₹89 Launchpad</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-center">
      <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={floatIn} className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.26em] text-emerald-200/90">
          <Sparkles className="h-3 w-3" />
          <span>AI Enabled Growth • Lucknow Launchpad</span>
        </motion.div>

        <motion.h1 variants={floatIn} className="font-['Orbitron',system-ui] text-3xl sm:text-4xl md:text-5xl leading-tight">
          <span className="block text-white">India's Chillest</span>
          <span className="mt-1 inline bg-gradient-to-r from-[#00F1A0] via-[#00FFFF] to-[#7B2FF7] bg-clip-text text-transparent">AI Marketing HQ from Lucknow</span>
        </motion.h1>

        <motion.p variants={floatIn} className="max-w-xl text-sm leading-relaxed text-white/70">
          Sudarshan AI Labs builds Uni-commerce portals, reel-ready content and always-on campaigns — tuned to Hazratganj, Gomti Nagar and your mohalla.
        </motion.p>

        <motion.div variants={floatIn} className="flex gap-3">
          <a href="#pricing" className="rounded-full bg-gradient-to-r from-[#7F00FF] via-[#FF8C00] to-[#00FFFF] px-5 py-2 text-sm font-semibold text-black shadow-[0_0_30px_rgba(127,0,255,0.8)]">Start ₹89</a>
          <a href="#services" className="rounded-full border border-white/15 px-4 py-2 text-sm">View services</a>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative">
        <div className="rounded-[30px] bg-gradient-to-br from-[#001f3f] to-[#0b0f19] p-6 border border-white/5">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" />Live campaign monitor</span>
            <span className="text-[10px] rounded-full bg-white/5 px-3 py-1">Hazratganj • Gomti Nagar</span>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-white/80">AI watches your Google & Instagram and suggests next best campaigns — in Hindi/Hinglish.</p>
            </div>
            <div className="w-[110px]">
              <div className="rounded-xl bg-gradient-to-b from-[#001F3F] to-[#050814] p-4 text-center">
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

function About() {
  return (
    <section id="about" className="mt-16 md:mt-24">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
        <motion.div variants={floatIn}>
          <SectionLabel>Why Sudarshan AI Labs?</SectionLabel>
          <h2 className="mt-2 font-['Orbitron'] text-2xl md:text-3xl">From kabab trails to killer funnels.</h2>
          <p className="mt-4 text-white/70">Lucknow-born, AI-first studio. We help MSMEs, creators & startups launch digital shops, content engines and growth flywheels — practical, low-cost, local-first.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <AboutChip title="₹89 Launchpad" desc="Plug-and-play portal + basic campaign." />
            <AboutChip title="Hindi + Hinglish" desc="Copy tuned to your audience." />
            <AboutChip title="Creator-First" desc="Templates for reels, shorts & carousels." />
          </div>
        </motion.div>

        <motion.div variants={floatIn} className="rounded-3xl border border-white/10 p-5 bg-gradient-to-br from-[#120022]/90 via-[#001F3F]/60 to-[#0B0F19]/90">
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
    <section id="services" className="mt-16 md:mt-24">
      <SectionHeader eyebrow="Top services" title="AI-first services for MSMEs, creators & startups" subtitle="Affordable, measurable and local-first." />
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <ServiceCard gradient="from-[#7F00FF] via-[#FF8C00] to-[#00FFFF]" title="AI Social Studio" badge="Top pick" price="₹1,500/mo" points={["Content calendar","Auto ideas with ChatGPT","Shorts & reels"]} />
        <ServiceCard gradient="from-[#00F1A0] via-[#00FFFF] to-[#0061FF]" title="Uni-Commerce Portal" badge="₹89" price="₹89 one-time" points={["WhatsApp ordering","Catalog upload","MSME onboarding"]} />
        <ServiceCard gradient="from-[#FF8C00] via-[#FF2D92] to-[#7B2FF7]" title="Campaign Pods" badge="Growth" price="Custom" points={["Full-funnel sprints","Quarterly playbooks","Invest UP alignment"]} />
      </div>
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
  const filtered = pricingPlans.filter((p) => p.category === active);

  return (
    <section id="pricing" className="mt-16 md:mt-24">
      <SectionHeader eyebrow="Transparent pricing" title="Pick a pack, scale your dhandha" subtitle="MRP shown for context; final invoice in INR." />

      <div className="mt-4 flex gap-3 flex-wrap">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setActive(t.id)} className={`px-4 py-1.5 rounded-full text-xs ${active===t.id?"bg-emerald-400/10 border border-emerald-400 text-emerald-200":"bg-black/30 border border-white/10 text-white/70"}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {filtered.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  );
}

function PricingCard({ plan }) {
  const fmt = new Intl.NumberFormat("en-IN");
  const save = plan.mrp ? Math.round(((plan.mrp - plan.price) / plan.mrp) * 100) : 0;
  return (
    <motion.div whileHover={{ y: -8 }} transition={{ type: "spring" }} className="rounded-3xl p-5 bg-[#050814]/90 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.6)]">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-white">{plan.label}</p>
          <p className="text-xs text-white/60">{plan.nickname}</p>
        </div>
        {save>0 && <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#7F00FF] to-[#00FFFF] text-black text-xs font-semibold">Save {save}%</div>}
      </div>
      <div className="mt-3">
        <div className="flex items-baseline gap-3">
          <div className="text-2xl font-bold">₹{fmt.format(plan.price)}</div>
          <div className="text-xs text-white/50 line-through">₹{fmt.format(plan.mrp)}</div>
        </div>
        <p className="text-xs text-white/70 mt-2">{plan.blurb}</p>
        <button className="mt-4 w-full rounded-full bg-gradient-to-r from-[#00F1A0] to-[#00FFFF] py-2 text-black font-semibold">Book on WhatsApp</button>
      </div>
    </motion.div>
  );
}

function Campaigns() {
  return (
    <section id="campaigns" className="mt-16 md:mt-24">
      <SectionHeader eyebrow="Campaign highlights" title="When AI, memes & mohalla meet" subtitle="Real metrics from local experiments." />
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <CampaignCard tag="Hazratganj" title="Weekend hotspot" metric="+212% walk-ins" desc="In-store + WhatsApp funnel." />
        <CampaignCard tag="Fun Republic" title="Movie-night combo" metric="5x ROI" desc="Cinema-collab & UGC." />
        <CampaignCard tag="Chacoco" title="Creator lab" metric="30+ collabs" desc="Weekly creator events." />
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="mt-16 md:mt-24">
      <SectionHeader eyebrow="Testimonials" title="What Lucknow says" subtitle="Thoda emotion, full ROI." />
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <TestimonialCard name="Aisha" area="Hazratganj" quote="WhatsApp orders doubled." />
        <TestimonialCard name="Raghav" area="Gomti Nagar" quote="Meme campaigns did wonders." />
        <TestimonialCard name="Meera" area="Aliganj" quote="Calendar + hooks = peace." />
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="mt-16 md:mt-24 p-[1px] rounded-[28px] bg-gradient-to-r from-[#001F3F] via-[#050814] to-[#120022]">
      <div className="rounded-[26px] bg-black/70 p-8 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div>
          <p className="text-xs uppercase text-emerald-200">Ready for 2025 growth?</p>
          <h3 className="font-['Orbitron'] text-2xl md:text-3xl">Launch your AI HQ for ₹89</h3>
          <p className="text-white/70 mt-2">Portal, audit and campaign idea — tuned to your street or mall.</p>
        </div>
        <div>
          <a href="https://wa.me/919999999999" className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#00F1A0] to-[#00FFFF] px-6 py-3 text-black font-semibold">DM on WhatsApp</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40 py-8 text-xs text-white/60">
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row md:justify-between gap-4">
        <div>
          <p className="font-semibold text-white">Sudarshan AI Labs Pvt. Ltd.</p>
          <p className="text-white/50">Built in Lucknow — MSME friendly.</p>
        </div>
        <div className="flex gap-4 items-center">
          <p>Made with 🟢 AI & chai</p>
          <div className="flex gap-3"><a href="#">Instagram</a><a href="#">LinkedIn</a></div>
        </div>
      </div>
    </footer>
  );
}

/* ====== Utility components ====== */
function NeonGridBackdrop() {
  // grid of animated radial gradients to mimic attached image
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
      <div className="absolute -top-40 -left-20 h-80 w-80 rounded-full bg-gradient-to-br from-[#7F00FF]/50 via-[#00FFFF]/30 to-transparent blur-3xl" />
      <div className="absolute -bottom-40 -right-10 h-96 w-96 rounded-full bg-gradient-to-br from-[#00F1A0]/60 via-[#0061FF]/40 to-transparent blur-3xl" />
    </div>
  );
}

function SectionLabel({ children }) { return (<p className="text-xs uppercase tracking-[0.26em] text-emerald-300/80 flex items-center gap-2"> <span className="h-[1px] w-6 bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />{children}</p>); }
function SectionHeader({ eyebrow, title, subtitle }) { return (<div className="space-y-3 max-w-2xl">{eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}<h2 className="font-['Orbitron'] text-2xl text-white md:text-3xl">{title}</h2>{subtitle && <p className="text-sm text-white/70 md:text-base">{subtitle}</p>}</div>); }
function AboutChip({ title, desc }) { return (<div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_0_18px_rgba(0,0,0,0.5)]"><div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-emerald-200/90"><span className="flex h-6 w-6 items-center justify-center rounded-xl bg-gradient-to-br from-[#00F1A0] via-[#00FFFF] to-[#7B2FF7] text-black shadow-[0_0_18px_rgba(34,197,94,0.8)]"><ShoppingBag className="h-3 w-3" /></span><span>{title}</span></div><p className="mt-3 text-xs text-white/70">{desc}</p></div>); }

function ServiceCard({ gradient, title, badge, price, points }) {
  return (<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4 }} className="group rounded-3xl bg-gradient-to-br from-white/5 via-white/0 to-white/5 p-[1px]"><div className="flex h-full flex-col rounded-[22px] bg-[#050814]/90 p-5"><div className="flex items-center justify-between gap-3"><h3 className="text-lg font-semibold text-white">{title}</h3><span className="rounded-full bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-200/90">{badge}</span></div><p className="mt-3 text-sm text-emerald-200/90">{price}</p><ul className="mt-4 space-y-2 text-xs text-white/70">{points.map((p) => (<li key={p} className="flex gap-2"><span className="mt-[3px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-[#00F1A0] to-[#00FFFF]" /><span>{p}</span></li>))}</ul><button className={`mt-5 inline-flex items-center justify-between gap-2 rounded-full bg-gradient-to-r ${gradient} px-4 py-1.5 text-[11px] font-semibold text-black shadow-[0_0_20px_rgba(0,0,0,0.6)] group-hover:shadow-[0_0_30px_rgba(0,0,0,0.9)] transition`}><span>View sample campaign</span><Sparkles className="h-3 w-3" /></button></div></motion.div>);
}

function CampaignCard({ tag, title, metric, desc }) { return (<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4 }} className="rounded-3xl border border-white/10 bg-[#050814]/80 p-5 shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:border-emerald-300/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.7)] transition"><p className="text-[11px] uppercase tracking-[0.19em] text-emerald-200/90">{tag}</p><h3 className="mt-2 text-base font-semibold text-white">{title}</h3><p className="mt-1 text-sm text-emerald-300">{metric}</p><p className="mt-3 text-xs text-white/70">{desc}</p></motion.div>); }
function TestimonialCard({ name, area, quote }) { return (<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4 }} className="rounded-3xl border border-white/10 bg-[#050814]/80 p-5 shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:border-[#00FFFF]/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] transition"><p className="text-xs text-white/70">“{quote}”</p><div className="mt-3 flex items-center justify-between text-[11px] text-white/60"><div><p className="font-semibold text-white/80">{name}</p><p className="text-white/50">{area}</p></div><Star className="h-4 w-4 text-amber-300" /></div></motion.div>); }
function StatPill({ label, value, tone }) { const colorMap={emerald:"from-emerald-400/80 to-emerald-300/40",rose:"from-rose-400/80 to-rose-300/40",sky:"from-sky-400/80 to-sky-300/40"}; return (<div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-white/70"><p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{label}</p><p className={`mt-1 inline-flex items-center rounded-full bg-gradient-to-r ${colorMap[tone]} px-2 py-0.5 text-xs font-semibold text-black shadow-[0_0_15px_rgba(0,0,0,0.7)]`}>{value}</p></div>); }

/* ====== END ====== */
