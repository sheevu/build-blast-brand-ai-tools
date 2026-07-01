import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Check, Clock, ShieldCheck, MessageCircle, AlertCircle, Sparkles, HelpCircle, ArrowLeft } from 'lucide-react';

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

  // Handle SEO updates dynamically on mount/update
  useEffect(() => {
    // Page Title
    const cleanTitle = title.replace(/[🌱🚀🏪📱💎📈⚡]/g, '').trim();
    document.title = `${cleanTitle} @ ${price} | Sudarshan AI Labs Lucknow`;

    // Meta Description
    let metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (!metaDescriptionTag) {
      metaDescriptionTag = document.createElement('meta');
      metaDescriptionTag.setAttribute('name', 'description');
      document.head.appendChild(metaDescriptionTag);
    }
    metaDescriptionTag.setAttribute('content', seoDescription || `${cleanTitle} service by Sudarshan AI Labs Lucknow. Premium digital marketing & technology solutions for Indian MSMEs starting at only ${price}.`);

    // Meta Keywords
    let metaKeywordsTag = document.querySelector('meta[name="keywords"]');
    if (!metaKeywordsTag) {
      metaKeywordsTag = document.createElement('meta');
      metaKeywordsTag.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywordsTag);
    }
    metaKeywordsTag.setAttribute('content', seoKeywords || `${cleanTitle}, Sudarshan AI Labs, digital marketing Lucknow, MSME growth, website setup, WhatsApp bot, local SEO`);

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [title, price, seoDescription, seoKeywords]);

  // Format WhatsApp message link
  const cleanTitleForWa = title.replace(/[🌱🚀🏪📱💎📈⚡]/g, '').trim();
  const waText = encodeURIComponent(`Hi Sudarshan AI Labs, I want to get started with "${cleanTitleForWa}" priced at ${price}. Please guide me on next steps.`);
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
        <div className="mb-6 flex items-center text-xs sm:text-sm text-slate-505 font-medium">
          <a href="/" className="hover:text-emerald-700 transition flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> Dashboard
          </a>
          <span className="mx-2 text-slate-350">/</span>
          <span className="text-slate-400">{category}</span>
          <span className="mx-2 text-slate-350">/</span>
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
            
            {/* Visual Placeholder Section */}
            <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-[#EBF5EB]/50 via-white to-[#E4F2E6]/40 p-1">
              <div className="flex h-56 sm:h-72 w-full flex-col items-center justify-center rounded-[22px] border border-dashed border-emerald-300 bg-white/70 p-6 text-center shadow-inner">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 shadow-sm mb-4">
                  <Sparkles className="h-7 w-7" />
                </div>
                <p className="text-sm font-semibold tracking-wider uppercase text-emerald-800">{placeholderName}</p>
                <p className="mt-2 max-w-sm text-xs text-slate-500">
                  Interactive visual setup, product mockups, and execution blueprints will be integrated here in Phase 2.
                </p>
                <span className="mt-4 inline-flex items-center rounded-full bg-emerald-100/60 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                  Image Placeholder
                </span>
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
