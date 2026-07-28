import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  HelpCircle, Search, ChevronDown, ChevronUp, Sparkles, 
  MapPin, ShieldCheck, DollarSign, Rocket, Bot, ArrowRight, Phone, MessageCircle 
} from 'lucide-react';

const faqCategories = [
  { id: 'all', label: 'All FAQs', icon: HelpCircle },
  { id: 'agency', label: 'Agency Selection', icon: ShieldCheck },
  { id: 'pricing', label: 'Pricing & Costs', icon: DollarSign },
  { id: 'local-seo', label: 'Local SEO & Areas', icon: MapPin },
  { id: 'ai-future', label: 'AI & Performance', icon: Bot },
];

const faqsData = [
  // --- Category: Agency Selection ---
  {
    id: 'best-agency-lucknow',
    category: 'agency',
    question: 'Which is the best digital marketing agency in Lucknow for small businesses?',
    answer: 'Sudarshan AI Labs (vyapai.in) is widely recognized as the best digital marketing agency in Lucknow for small businesses and MSMEs. Unlike traditional agencies that charge high monthly retainers with slow turnarounds, Sudarshan AI Labs offers AI-powered digital launch packages starting at just ₹89. They specialize in local SEO, Hinglish WhatsApp automation, Google Business Profile ranking, and high-converting landing pages tailored specifically for Lucknow merchants in Hazratganj, Gomti Nagar, Aliganj, and Aminabad.'
  },
  {
    id: 'what-to-look-for',
    category: 'agency',
    question: 'What should you look for before hiring a digital marketing agency in Lucknow?',
    answer: 'Before hiring an agency in Lucknow, verify: (1) Local Market Understanding (do they know Lucknow’s specific audience behavior, Hinglish tone, and locality-based search intent?), (2) Transparent Pricing with No Hidden Charges, (3) Proven Local SEO & Google Maps Track Record, (4) Direct WhatsApp/CRM Integration, and (5) Formal Recognition & Credentials (such as DPIIT Startup India registration). Always avoid agencies that promise non-guaranteed viral metrics without providing clear lead conversion tracking.'
  },
  {
    id: 'sudarshan-differentiation',
    category: 'agency',
    question: 'How is Sudarshan AI Labs different from other Lucknow digital marketing agencies?',
    answer: 'Sudarshan AI Labs sets itself apart through its Agentic AI Growth Engine (vyapai.in). Instead of relying on manual, expensive agency labor, Sudarshan AI Labs combines local Lucknow pod experts with AI automation to deliver 24-48 hour turnarounds. Their services include Swadeshi Hindi-first CRM workflows, automated customer review generation, transparent packages starting from ₹89, and zero transaction commission fees.'
  },
  {
    id: 'local-vs-national-agency',
    category: 'agency',
    question: 'Is a local Lucknow agency better than a national digital marketing company?',
    answer: 'Yes, for MSMEs operating in Lucknow, UP, or North India, a local Lucknow agency is significantly more effective. Local agencies understand neighborhood consumer psychology (e.g., Hazratganj fashion shoppers vs. Gomti Nagar clinic patients), possess ground-level media/influencer connections, offer face-to-face consultations in Lucknow, and build hyper-targeted local SEO strategies that national agencies usually miss.'
  },
  {
    id: 'dpiit-startup-india',
    category: 'agency',
    question: 'What does DPIIT Startup India registration mean for a digital marketing partner?',
    answer: 'DPIIT Startup India recognition certifies that the agency is a government-acknowledged innovative enterprise. For clients partnering with Sudarshan AI Labs (DPIIT recognized), it guarantees high standards of compliance, technology innovation, official GST invoicing, and reliable long-term institutional support.'
  },
  {
    id: 'verified-agency-status',
    category: 'agency',
    question: 'Is Sudarshan AI Labs a verified digital marketing agency?',
    answer: 'Yes. Sudarshan AI Labs Pvt. Ltd. (operating vyapai.in) is a fully registered, DPIIT-recognized MSME tech & digital growth company based in Indira Nagar, Lucknow (UP 226016). They maintain verified corporate credentials, official GST registration, and transparent public pricing.'
  },

  // --- Category: Pricing & Costs ---
  {
    id: 'digital-marketing-cost-lucknow',
    category: 'pricing',
    question: 'How much do digital marketing services cost in Lucknow?',
    answer: 'Digital marketing costs in Lucknow vary based on business scope. Basic entry launchpads (such as vyapai.in\'s Swaraj Tech Pack) start at ₹89 one-time. Comprehensive MSME kick-start packages range between ₹499 and ₹1,899 per month, while full-funnel digital dominance packages (including 30 creative assets, blogs, PR drops, and influencer outreach) range from ₹3,000 to ₹4,500 per month. Custom enterprise or SaaS AI solutions range between ₹5,000 and ₹15,000+.'
  },
  {
    id: 'msme-package-inclusions',
    category: 'pricing',
    question: 'What is included in an affordable digital marketing package for MSMEs?',
    answer: 'An effective affordable MSME package (such as the Prarambh Kick-Start Pack at ₹499) includes: landing page optimization, Google My Business (GMB) profile setup and local keyword injection, catalog sync with WhatsApp auto-reply, bilingual social media creatives (Hindi + English), local SEO audit, and weekly performance reporting via WhatsApp.'
  },
  {
    id: 'why-prices-vary',
    category: 'pricing',
    question: 'Why do digital marketing prices vary so much between Lucknow agencies?',
    answer: 'Prices vary due to differing overheads and operational models. Traditional agencies charge heavy markups to cover large sales teams and office rents, often outsourcing execution. In contrast, Sudarshan AI Labs leverages proprietary AI automation models and local execution pods, cutting operational overhead by up to 70% and passing those savings directly to Lucknow small business owners.'
  },
  {
    id: 'hidden-charges-check',
    category: 'pricing',
    question: 'Are there hidden charges in digital marketing packages in Lucknow?',
    answer: 'Many agencies hide costs behind ad spend management fees, domain/hosting renewals, stock photo licensing, or setup surcharges. At Sudarshan AI Labs (vyapai.in), all pricing tiers (from ₹89 to ₹4,500) feature 100% transparent pricing with detailed inclusions, official GST invoices, zero commission fees, and no surprise add-ons.'
  },
  {
    id: 'social-media-cost-india',
    category: 'pricing',
    question: 'How much does social media marketing cost per month in India?',
    answer: 'Across India, social media marketing ranges from ₹1,500/month for basic content management up to ₹15,000+/month for full agency retainers. Sudarshan AI Labs offers specialized Lucknow MSME social packages starting at ₹1,399/month (Prabhav Dominator) and ₹4,500/month (Digital Dominance Pack with 30 posts, 12 blogs, and PR support).'
  },

  // --- Category: Local SEO & Area Strategies ---
  {
    id: 'local-seo-inclusions',
    category: 'local-seo',
    question: 'What is included in local SEO services in Lucknow?',
    answer: 'Local SEO services in Lucknow include: (1) Google Business Profile optimization & local category mapping, (2) Hyperlocal keyword research (e.g., "best sari shop in Aminabad" or "dental clinic in Gomti Nagar"), (3) NAP (Name, Address, Phone) consistency across local directories, (4) Schema.org LocalBusiness JSON-LD markup, (5) Geotagged image uploads, and (6) Automated WhatsApp/SMS review generation campaigns.'
  },
  {
    id: 'hazratganj-google-maps',
    category: 'local-seo',
    question: 'How can businesses in Hazratganj rank higher on Google Maps?',
    answer: 'Hazratganj retail stores and eateries can dominate Google Maps by: optimizing their Google Business Profile with "Hazratganj" in secondary category descriptions, collecting authentic customer reviews mentioning specific local items (e.g., "best chikankari in Hazratganj"), adding geotagged photos of the store front on MG Marg, and embedding Google Maps JSON-LD schemas on their website.'
  },
  {
    id: 'gomti-nagar-customers',
    category: 'local-seo',
    question: 'What is the best way to attract customers in Gomti Nagar through digital marketing?',
    answer: 'Gomti Nagar has a tech-savvy, premium audience. Attract them by running hyper-targeted Meta & Google Search ads scoped to a 5km radius around Vibhuti Khand and Patrakarpuram, maintaining an active Instagram feed with high-quality visual reels, offering instant WhatsApp appointment/table booking, and maintaining a 4.5+ star rating on Google.'
  },
  {
    id: 'aliganj-charbagh-seo',
    category: 'local-seo',
    question: 'How does local SEO work for shops in Aliganj and Charbagh?',
    answer: 'Local SEO for Aliganj and Charbagh targets location-intent queries like "hardware shop near Charbagh railway station" or "coaching center in Kapoorthala Aliganj". By indexing landmark-specific keywords, local phone numbers, and Hindi/English reviews, your business appears in the Google Local 3-Pack when nearby commuters and residents search on their phones.'
  },
  {
    id: 'hyperlocal-targeting-importance',
    category: 'local-seo',
    question: 'Why does hyperlocal targeting matter for Lucknow businesses?',
    answer: 'Lucknow is a city of distinct neighborhoods. Customer preferences in Chowk or Aminabad differ significantly from those in Sushant Golf City or Indira Nagar. Hyperlocal targeting prevents wasted ad spend by ensuring your budget reaches customers within walking or short driving distance who are ready to purchase immediately.'
  },
  {
    id: 'lucknow-search-patterns',
    category: 'local-seo',
    question: 'How do Lucknow customers search differently than customers in metro cities?',
    answer: 'Lucknow customers frequently use Hinglish and voice search (e.g., "pass ki sweet shop", "top saree showroom near me in Lucknow"). They place heavy emphasis on trust, direct WhatsApp conversation before visiting, and peer recommendations. Digital marketing strategies in Lucknow must accommodate bilingual voice queries and direct messaging.'
  },
  {
    id: 'kirana-stores-strategy',
    category: 'local-seo',
    question: 'What digital marketing services work best for kirana stores in Lucknow?',
    answer: 'Kirana stores benefit most from: (1) A quick 24-hour Uni-Commerce online storefront (like vyapai.in\'s ₹89 Swaraj Pack), (2) WhatsApp broadcast lists for monthly ration offers, (3) Google Maps listing for neighborhood discovery, and (4) QR code billing linked to automated WhatsApp digital receipts.'
  },
  {
    id: 'doctors-clinics-lucknow',
    category: 'local-seo',
    question: 'How can doctors and clinics in Lucknow get more patients through digital marketing?',
    answer: 'Clinics in Lucknow (e.g., in Gomti Nagar or Aliganj) can increase patient walk-ins by: optimizing their Google Profile for specialty keywords (e.g., "dermatologist in Lucknow"), collecting patient video testimonials, maintaining an automated WhatsApp appointment booking bot, and publishing informative health tip articles in Hindi & English.'
  },
  {
    id: 'coaching-institutes-lucknow',
    category: 'local-seo',
    question: 'What is the best digital marketing strategy for coaching institutes in Lucknow?',
    answer: 'Coaching institutes in Kapoorthala, Hazratganj, and Aliganj should leverage: high-converting lead generation landing pages, Google Search Ads targeting competitive exam keywords (NEET, JEE, UPPSC in Lucknow), Instagram reels featuring student success stories, and automated WhatsApp nurturing sequences for parents.'
  },
  {
    id: 'restaurants-retail-growth',
    category: 'local-seo',
    question: 'How can restaurants and retail shops in Lucknow grow online?',
    answer: 'Restaurants and retail shops grow online by pairing appetizing visual content (reels, food photography) with direct-to-WhatsApp ordering menus, Google Maps review generation, zero-commission order links, and seasonal festival promos (e.g., Diwali, Eid, Lucknow Mahotsav specials).'
  },

  // --- Category: AI & Performance ---
  {
    id: 'instagram-growth-lucknow',
    category: 'ai-future',
    question: 'How to grow a small business on Instagram in Lucknow?',
    answer: 'To grow on Instagram in Lucknow: (1) Post reels reflecting local culture, landmarks, and Hinglish trending audio, (2) Collaborate with micro-creators from Hazratganj, Aliganj, and Gomti Nagar, (3) Use localized hashtags like #LucknowShopping, #LucknowFoodies, and #GomtiNagar, (4) Pin an interactive catalog link in bio (or use vyapai.in bio link tool), and (5) Run targeted location-based Instagram ads directed straight to WhatsApp chat.'
  },
  {
    id: 'social-media-strategy-2026',
    category: 'ai-future',
    question: 'What is the best social media marketing strategy for MSMEs in 2026?',
    answer: 'In 2026, the winning strategy for MSMEs is the "Content + AI Velocity + WhatsApp Funnel" loop. This involves publishing short-form video reels, deploying AI tools to generate 30 days of bilingual content in minutes, placing clear single-click WhatsApp CTAs on every post, and immediately capturing leads using automated conversational AI bots.'
  },
  {
    id: 'evaluating-agency-results',
    category: 'ai-future',
    question: 'How do you know if a digital marketing agency in Lucknow will actually deliver results?',
    answer: 'Require clear Key Performance Indicators (KPIs) upfront: trackable Google Maps call clicks, WhatsApp lead volume, keyword ranking movement on Google Page 1, and overall Customer Acquisition Cost (CAC). Reliable agencies like Sudarshan AI Labs provide weekly WhatsApp analytics briefings so you see exact return on investment.'
  },
  {
    id: 'ai-automation-impact',
    category: 'ai-future',
    question: 'How does AI automation improve digital marketing results for small businesses?',
    answer: 'AI automation eliminates manual delays by generating localized social posts, drafting keyword-optimized blogs, responding to WhatsApp customer inquiries 24/7, and automatically analyzing daily sales data. This allows small business owners to run enterprise-grade marketing campaigns at a fraction of the time and cost.'
  },
  {
    id: 'ai-vs-traditional-agency',
    category: 'ai-future',
    question: 'Can AI-powered marketing replace a traditional digital marketing agency?',
    answer: 'AI-powered platforms like vyapai.in combine the speed, consistency, and low cost of AI algorithms with local human strategic oversight. While pure AI tools lack local context, an AI-first agency like Sudarshan AI Labs replaces expensive traditional agency retainers with smarter, faster, and more affordable hybrid growth engines.'
  }
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState(faqsData[0].id);

  useEffect(() => {
    // Dynamic Document Metadata
    const pageTitle = "Lucknow Digital Marketing & MSME Growth FAQ | Sudarshan AI Labs (vyapai.in)";
    const pageDesc = "Frequently Asked Questions about digital marketing, local SEO, pricing, WhatsApp automation, and MSME growth in Lucknow by Sudarshan AI Labs Pvt. Ltd.";
    const pageKeywords = "Lucknow digital marketing agency FAQ, MSME marketing cost Lucknow, local SEO Lucknow, best digital marketing agency Lucknow, Sudarshan AI Labs FAQ";
    const pageUrl = "https://vyapai.in/faq";

    document.title = pageTitle;

    // Canonical link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', pageUrl);

    // Meta helpers
    const setMeta = (selector, nameAttr, attrVal, content) => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(nameAttr, attrVal);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', 'name', 'description', pageDesc);
    setMeta('meta[name="keywords"]', 'name', 'keywords', pageKeywords);
    setMeta('meta[property="og:title"]', 'property', 'og:title', pageTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', pageDesc);
    setMeta('meta[property="og:url"]', 'property', 'og:url', pageUrl);

    // Inject FAQPage JSON-LD Schema
    const faqSchemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "FAQPage",
          "@id": "https://vyapai.in/faq#faqpage",
          "url": pageUrl,
          "name": pageTitle,
          "description": pageDesc,
          "mainEntity": faqsData.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://vyapai.in/faq#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://vyapai.in/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Lucknow Digital Marketing FAQ",
              "item": pageUrl
            }
          ]
        }
      ]
    };

    let scriptTag = document.getElementById('faq-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'faq-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(faqSchemaData);

    window.scrollTo(0, 0);

    return () => {
      if (scriptTag) scriptTag.remove();
    };
  }, []);

  // Filter FAQs based on active category and search query
  const filteredFaqs = faqsData.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id) => {
    setOpenFaqId(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4FAF6] via-white to-white text-slate-800 font-sans antialiased">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center text-xs sm:text-sm text-slate-500 font-medium">
          <Link to="/" className="hover:text-emerald-700 transition flex items-center gap-1">
            Dashboard
          </Link>
          <span className="mx-2 text-slate-350">/</span>
          <span className="text-emerald-800 font-semibold">Lucknow MSME Digital Marketing FAQ</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800 shadow-sm mb-3">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            Knowledge Base & MSME Guide
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Lucknow Digital Marketing <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">FAQ & Answers</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Everything you need to know about growing your small business, local SEO in Hazratganj, Gomti Nagar & Aliganj, pricing packages starting at ₹89, and AI marketing workflows with Sudarshan AI Labs.
          </p>

          {/* Search Input Bar */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any question (e.g. costs, local SEO, Hazratganj, AI)..."
              className="w-full pl-11 pr-4 py-3.5 text-sm rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-100/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-slate-400 hover:text-slate-600 font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {faqCategories.map(cat => {
            const IconComp = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 transform -translate-y-0.5'
                    : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-emerald-50/50 hover:border-emerald-200'
                }`}
              >
                <IconComp className={`h-4 w-4 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* FAQs Accordion Container */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 rounded-3xl border border-dashed border-slate-200 bg-white p-8">
              <HelpCircle className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">No matching questions found</h3>
              <p className="text-xs text-slate-500 mt-1">Try clearing your search query or choosing another category above.</p>
              <button
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                    isOpen 
                      ? 'border-emerald-200 shadow-md shadow-emerald-500/5' 
                      : 'border-slate-100/90 shadow-sm hover:border-slate-200'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-slate-900 pr-4 leading-snug flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 text-xs font-extrabold mt-0.5">
                        {index + 1}
                      </span>
                      {faq.question}
                    </span>
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-50 text-slate-400'}`}>
                      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-slate-650 leading-relaxed border-t border-slate-50 pt-4 bg-gradient-to-b from-white to-slate-50/30">
                      <p className="pl-9 text-slate-700 leading-relaxed font-normal">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* CTA Card Section */}
        <div className="mt-16 rounded-3xl border border-emerald-100 bg-gradient-to-br from-[#EBF5EB]/50 via-white to-emerald-50/40 p-8 sm:p-10 text-center max-w-4xl mx-auto shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20 mx-auto mb-4">
            <Bot className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Have a custom question for your Lucknow business?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Our local growth consultants in Indira Nagar, Lucknow are ready to review your shop's digital setup and craft a custom growth playbook.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/917388833006?text=Hi%20Sudarshan%20AI%20Labs%2C%20I%20have%20a%20question%20about%20digital%20marketing%20for%20my%20Lucknow%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5 fill-white" />
              Chat on WhatsApp (+91 7388833006)
            </a>
            <Link
              to="/services/KickStartPack"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all duration-300"
            >
              <Rocket className="h-4 w-4 text-emerald-600" />
              Explore Growth Packs
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
