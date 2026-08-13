import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Check, Clock, ShieldCheck, MessageCircle, AlertCircle, Sparkles, HelpCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { formatPrice, getRelatedServices, getServiceByPath } from '../data/serviceCatalog';

const ServiceLayout = ({
  title = '',
  price = '',
  mrp = '',
  billingCadence = 'One-time setup',
  description = '',
  features = [],
  inclusions = [],
  additionalInfo = [],
  seoKeywords = '',
  seoDescription = '',
  category = 'Growth Service',
  placeholderName = 'Service Visual Dashboard'
}) => {
  const pagePath = window.location.pathname;
  const currentService = getServiceByPath(pagePath);
  const relatedServices = getRelatedServices(currentService);

  // Handle SEO updates dynamically on mount/update
  useEffect(() => {
    // Page Title
    const cleanTitle = title.replace(/[🌱🚀🏪📱💎📈⚡]/g, '').trim();
    const fullTitle = `${cleanTitle} @ ${price} | vyapai.in Lucknow`;
    const fullDesc = seoDescription || `${cleanTitle} service by vyapai.in (Sudarshan AI Labs Lucknow). Premium digital marketing & technology solutions for Indian MSMEs starting at ${price}.`;
    const fullKeywords = seoKeywords || `${cleanTitle}, vyapai.in, Sudarshan AI Labs, digital marketing Lucknow, MSME growth, website setup, WhatsApp bot, local SEO`;
    const pageUrl = `https://vyapai.in${window.location.pathname}`;

    document.title = fullTitle;

    // Canonical Link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', pageUrl);

    // Helper to set or create meta tag
    const setMetaTag = (selector, nameAttr, attrValue, content) => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(nameAttr, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Meta Description & Keywords
    setMetaTag('meta[name="description"]', 'name', 'description', fullDesc);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', fullKeywords);

    // Open Graph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', fullDesc);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', pageUrl);

    // Twitter Card Tags
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', fullDesc);

    // Inject Service & Breadcrumb JSON-LD Schemas
    const numPrice = parseInt(price.replace(/[^0-9]/g, ''), 10) || 0;
    
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": `https://vyapai.in${pagePath}#service`,
          "name": cleanTitle,
          "description": seoDescription || description,
          "category": category,
          "provider": {
            "@type": "LocalBusiness",
            "name": "vyapai.in - Sudarshan AI Labs Pvt. Ltd.",
            "url": "https://vyapai.in",
            "telephone": "+91-7388833006",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Lucknow",
              "addressRegion": "Uttar Pradesh",
              "addressCountry": "IN"
            }
          },
          "areaServed": {
            "@type": "AdministrativeArea",
            "name": "Lucknow, Uttar Pradesh, India"
          },
          "offers": {
            "@type": "Offer",
            "price": numPrice,
            "priceCurrency": "INR",
            "url": `https://vyapai.in${pagePath}`,
            "availability": "https://schema.org/InStock"
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": `https://vyapai.in${pagePath}#breadcrumb`,
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
              "name": category || "Services",
              "item": "https://vyapai.in/#plans"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": cleanTitle,
              "item": `https://vyapai.in${pagePath}`
            }
          ]
        }
      ]
    };

    let scriptTag = document.getElementById('service-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'service-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);

    // Scroll to top on page load
    window.scrollTo(0, 0);

    return () => {
      if (scriptTag) scriptTag.remove();
    };
  }, [title, price, seoDescription, seoKeywords, description, category, pagePath]);

  // Format WhatsApp message link
  const cleanTitleForWa = title.replace(/[🌱🚀🏪📱💎📈⚡]/g, '').trim();
  const itemReference = currentService ? ` Item code: ${currentService.id}.` : '';
  const waText = encodeURIComponent(`Hi Sudarshan AI Labs, I want to get started with "${cleanTitleForWa}" priced at ${price}.${itemReference} Page: https://vyapai.in${pagePath}`);
  const waLink = `https://wa.me/917388833006?text=${waText}`;

  // Calculate savings percent if possible
  const numPrice = parseInt(price.replace(/[^0-9]/g, ''), 10);
  const numMrp = parseInt(mrp.replace(/[^0-9]/g, ''), 10);
  const savingPercent = (numPrice && numMrp && numMrp > numPrice) 
    ? Math.round(((numMrp - numPrice) / numMrp) * 100) 
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4FAF6] via-white to-white text-slate-800 font-sans antialiased">
      {/* Header component styled in White & Trusting Green theme */}
      <Header />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center text-xs sm:text-sm text-slate-500 font-medium">
          <Link to="/" className="hover:text-emerald-700 transition flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> Dashboard
          </Link>
          <span className="mx-2 text-slate-300">/</span>
          <Link to="/services" className="hover:text-emerald-700">Services</Link>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-slate-400">{category}</span>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-emerald-800 font-semibold truncate">{cleanTitleForWa}</span>
        </div>

        {/* Hero Section */}
        <div className="mb-10 text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800 shadow-sm">
            <Sparkles className="h-3 w-3 text-emerald-600" />
            {category}
          </span>
          <h1 id="service-title" className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base sm:text-lg text-slate-650 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Left Column - Details, Inclusions, Visuals, FAQs */}
          <div className="space-y-10 lg:col-span-8">
            
            {/* Reusable service journey visual */}
            <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-[#071426] via-[#10243c] to-[#22133c] p-6 text-white shadow-xl sm:p-8">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="absolute -bottom-16 left-1/3 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[.22em] text-cyan-200">How this service moves your business forward</p>
                    <h2 className="mt-2 text-lg font-bold sm:text-xl">{placeholderName}</h2>
                  </div>
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/10 text-2xl shadow-[0_0_25px_rgba(34,211,238,.18)]">{currentService?.icon || <Sparkles className="h-7 w-7" />}</span>
                </div>
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">01 · Choose</span>
                    <p className="mt-2 text-sm font-semibold">Confirm your business goal and required details.</p>
                  </div>
                  <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-200">02 · Build</span>
                    <p className="mt-2 text-sm font-semibold">Our Lucknow team completes and checks your setup.</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">03 · Grow</span>
                    <p className="mt-2 text-sm font-semibold">Launch, measure enquiries and take the next best step.</p>
                  </div>
                </div>
                {currentService?.goals?.length > 0 && <div className="mt-5 flex flex-wrap gap-2">{currentService.goals.map((goal) => <span key={goal} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-200">{goal}</span>)}</div>}
              </div>
            </div>

            {/* Core Features & Benefits */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-slate-950 sm:text-2xl mb-6 flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 font-bold">1</span>
                Key Benefits & Features
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((feature, index) => {
                  const isString = typeof feature === 'string';
                  const fTitle = isString ? feature : feature.text;
                  const fDesc = isString ? '' : feature.desc;

                  return (
                    <div key={index} className="flex gap-3 rounded-2xl border border-slate-50 bg-slate-50/50 p-4 transition hover:bg-emerald-50/20 hover:border-emerald-100">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 shadow-sm mt-0.5">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{fTitle}</h4>
                        {fDesc && <p className="mt-1 text-xs text-slate-500 leading-normal">{fDesc}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Standard Inclusions Section */}
            {inclusions.length > 0 && (
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold text-slate-950 sm:text-2xl mb-6 flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 font-bold">2</span>
                  Every Setup Includes
                </h2>
                <div className="space-y-3.5">
                  {inclusions.map((inc, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 mt-0.5 shadow-sm">
                        <Check className="h-3 w-3" />
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        {inc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Information Grid */}
            {additionalInfo.length > 0 && (
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold text-slate-950 sm:text-2xl mb-6 flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 font-bold">3</span>
                  Important Information & SLAs
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {additionalInfo.map((info, index) => (
                    <div key={index} className="rounded-2xl border border-slate-100 p-5 shadow-sm bg-slate-50/20">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                        {info.title}
                      </h3>
                      <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {info.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Why Choose Us & Trust Signals */}
            <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-[#EBF5EB]/30 via-white to-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-emerald-950 sm:text-2xl mb-4">Why partner with Sudarshan AI Labs?</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                We are a Lucknow-first tech agency committed to digitizing the backbone of India - our MSMEs, local stores, and startups. We design simple, affordable, high-converting platforms that bring you nearby customers without hefty commissions.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex flex-col items-center text-center p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 mb-2 shadow-sm">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">24-72h Delivery SLA</h4>
                  <p className="mt-1 text-[11px] text-slate-500">Fast turnaround to get you selling online quickly.</p>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 mb-2 shadow-sm">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">100% Commissions Free</h4>
                  <p className="mt-1 text-[11px] text-slate-500">No hidden transaction fees on your earnings.</p>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 mb-2 shadow-sm">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Priority WhatsApp Support</h4>
                  <p className="mt-1 text-[11px] text-slate-500">Dedicated local team in Lucknow to answer queries.</p>
                </div>
              </div>
            </div>

            {relatedServices.length > 0 && (
              <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="related-services-title">
                <p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-700">Your next best steps</p>
                <h2 id="related-services-title" className="mt-2 text-xl font-bold text-slate-950 sm:text-2xl">Related services for this goal</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {relatedServices.map((service) => (
                    <Link key={service.id} to={`/services/${service.slug}`} className="group rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50/40">
                      <span className="text-2xl">{service.icon}</span>
                      <h3 className="mt-3 text-sm font-bold text-slate-900">{service.name}</h3>
                      <p className="mt-2 text-xs leading-5 text-slate-500">{service.description}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-700">From {formatPrice(service.price)} <ArrowRight className="h-3.5 w-3.5" /></span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Right Column - Sticky Price Card */}
          <div className="lg:col-span-4 lg:self-start lg:sticky lg:top-28">
            
            <div id="service-price" className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-xl shadow-slate-100/70 relative overflow-hidden">
              {/* Highlight ribbon */}
              <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-emerald-400 to-green-600" />
              
              <div className="mt-2 text-left">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pricing Plan</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-slate-950 tracking-tight">{price}</span>
                  {mrp && (
                    <span className="text-base text-slate-400 line-through font-medium">{mrp}</span>
                  )}
                </div>
                
                {savingPercent && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 text-xs font-semibold text-emerald-700 mt-2">
                    Save {savingPercent}%
                  </span>
                )}
                
                <p className="mt-3 text-xs font-semibold text-slate-550 capitalize tracking-wide flex items-center gap-1.5 border-b border-slate-50 pb-4">
                  <Clock className="h-3.5 w-3.5 text-emerald-600" />
                  {billingCadence}
                </p>
              </div>

              {/* Direct Value Props inside pricing card */}
              <div className="mt-5 space-y-3.5 text-xs text-slate-650 font-medium">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Official GST invoice included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>MSME Registered Service Partner</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Free revisions before setup live</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Lucknow local support pod</span>
                </div>
              </div>

              {/* WhatsApp Checkout Button */}
              <div className="mt-8">
                <a
                  id="cta-whatsapp-button"
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 px-5 py-4 text-center text-sm font-bold text-white shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:bg-emerald-700 hover:shadow-emerald-700/40 transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-5 w-5 fill-white" />
                  Get Started on WhatsApp
                </a>
                <p className="mt-3 text-center text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                  ⚡ Setup Begins within 2 hrs
                </p>
              </div>
            </div>

            {/* Need Help Box */}
            <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/40 p-5 text-center">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest flex items-center justify-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5 text-slate-400" /> Need help choosing?
              </h4>
              <p className="mt-2 text-xs text-slate-500 leading-normal">
                Want to mix components or request institutional features? Send us a message and we'll draft a custom proposal.
              </p>
              <a 
                href="https://wa.me/917388833006?text=Hi%20Sudarshan%20AI%20Labs%2C%20I%20want%20to%20discuss%20a%20custom%20setup."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3.5 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition"
              >
                Chat with local consultant &rarr;
              </a>
            </div>

          </div>

        </div>

      </main>

      {/* Footer component styled in White & Trusting Green theme */}
      <Footer />
    </div>
  );
};

export default ServiceLayout;
