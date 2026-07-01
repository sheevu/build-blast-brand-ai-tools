import React from 'react';
import ServiceLayout from '../../components/ServiceLayout';

const TezRaftarBooster = () => {
  const serviceData = {
    title: "⚡ Tez Raftar Booster",
    price: "₹1,899/month",
    mrp: "₹6,500/month",
    billingCadence: "Billed monthly",
    category: "Premium Growth Retainer",
    placeholderName: "Tez Raftar WhatsApp Automation & Web Panel Preview",
    description: "Our premium growth & automation package for MSMEs, e-commerce stores, service providers, and startups that want professional websites, SEO dominance, and AI-driven WhatsApp automation. Built for brands ready to scale fast and work smarter.",
    features: [
      { text: "3-Page Professional Website", desc: "Mobile-optimized, fast-loading site designed to showcase services/products with lead capture. (Domain/hosting extra)" },
      { text: "WhatsApp Bot Pro & Automation", desc: "AI-powered or rule-based WhatsApp chatbot to automate orders, catalog requests, payment replies, and FAQs 24/7." },
      { text: "WhatsApp Business Account Verification", desc: "Assistance with official Meta WhatsApp Business verification, auto-reply rules, quick templates, and broadcast setup." },
      { text: "Advanced SEO Strategy (15 Keywords)", desc: "Targeted keyword research and optimization for high local ranking on Google Maps & search results." },
      { text: "Excel & KPI Analytics Dashboard", desc: "Custom-built dashboard to easily track sales, SEO traffic, social media KPIs, and leads in one place." },
      { text: "Quarterly Brand Video Promotion", desc: "One professionally produced video creative per quarter to showcase your brand or main offerings." },
      { text: "Includes Growth Pro Pack Essentials", desc: "Everything from the Growth Pro Pack including content blogs, social posts, and ad setup." }
    ],
    inclusions: [
      "FREE MSME/Udyam Registration Support – Get official business recognition.",
      "Tailored Digital Action Steps for Growth – Custom-built growth steps to scale.",
      "Local SEO & 'Near Me' Ranking Boost – Optimize for local search map citations.",
      "Google My Business Setup & Audit – Fix details and boost star rating visibility.",
      "WhatsApp Catalog Integration – Easily share and sell products inside chat.",
      "Access to Premium Growth Guides & Resources – Learn from proven frameworks."
    ],
    additionalInfo: [
      { title: "What's Included", desc: "3-page website, advanced SEO (15 keywords), WhatsApp Bot Pro with automation (replies, catalogs, template broadcasts), basic analytics, Excel dashboard, 1 quarterly brand video promotion, monthly strategy review sessions, priority email support, plus everything in Growth Pro Pack." },
      { title: "Delivery Time", desc: "Website delivered in 5–7 days; WhatsApp bot setup & SEO keyword mapping within 7–10 days; brand video produced quarterly." },
      { title: "Requirements", desc: "Business name, domain/hosting details (if available), branding assets (logo/menu), social handles, product/service listings, target keywords, and a dedicated WhatsApp Business number." },
      { title: "Support & SLA", desc: "Priority WhatsApp & email support; monthly strategy sessions; SLA-based response (first reply within 24 hrs)." },
      { title: "Billing & Taxes", desc: "Monthly subscription; price includes all taxes; GST invoice available." },
      { title: "Ideal For", desc: "MSMEs, e-commerce stores, service businesses, startups & Kirana shops in Lucknow and across India seeking a professional website, top SEO rankings, and WhatsApp automation to accelerate growth." }
    ],
    seoKeywords: "Tez Raftar Booster, WhatsApp automation Lucknow, local SEO agency Lucknow, automated sales dashboard, e-commerce business growth",
    seoDescription: "Tez Raftar Booster @ ₹1899/month. Our premium growth plan: 3-page website, WhatsApp Bot Pro, 15 keywords advanced SEO, quarterly video, Excel dashboard. Save 71%!"
  };

  return <ServiceLayout {...serviceData} />;
};

export default TezRaftarBooster;
