import React from 'react';
import ServiceLayout from '../../components/ServiceLayout';

const GrowthProPack = () => {
  const serviceData = {
    title: "📈 Growth Pro Pack",
    price: "₹1,599",
    mrp: "₹4,500",
    billingCadence: "One-time setup",
    category: "Bundle Pack",
    placeholderName: "Growth Pro 5-Page Website & Chatbot Preview",
    description: "Built for growing MSMEs, service providers, and retailers ready to establish a strong online presence and capture more customers. This pack delivers a professional website, powerful marketing tools, and data-driven insights to help you scale fast.",
    features: [
      { text: "Professional 5-page Website", desc: "Mobile-first, fast-loading, and SEO-ready design to showcase your brand, products, or services. (Domain/hosting extra)" },
      { text: "10 SEO-Optimized Blogs", desc: "Keyword-rich, high-quality articles designed to rank higher on Google search and drive organic traffic." },
      { text: "Social Media Essentials + Ads Setup", desc: "8 branded content posts and targeted campaign setup to boost customer engagement and leads." },
      { text: "Basic Chatbot Setup", desc: "Automated FAQ assistant to capture leads and answer customer inquiries 24/7." },
      { text: "Complete SEO Audit & Action Plan", desc: "In-depth analysis of your site health, competitor keywords, and actionable optimization roadmap." },
      { text: "Performance Insights & Reporting", desc: "Monthly detailed metrics reporting on search reach, social engagement, leads, and web traffic." }
    ],
    inclusions: [
      "FREE MSME/Udyam Registration Support – Official business recognition assistance.",
      "Tailored Digital Action Steps – Personalized strategy for market expansion.",
      "Local SEO Integration & Market Insights – Rank in 'near me' searches and attract local customers.",
      "Google My Business Setup & Optimization – Boost credibility and discoverability.",
      "WhatsApp Catalog Setup – Showcase and sell products directly via chat.",
      "Access to Premium Growth Guides & Resources – Stay ahead with expert insights."
    ],
    additionalInfo: [
      { title: "What's Included", desc: "Professional 5-page website, 10 SEO-optimized blogs, social media essentials (8 posts + basic ads), basic chatbot setup for FAQs & lead capture, monthly performance insights, complete SEO audit & action plan." },
      { title: "Delivery Time", desc: "Website and other digital setup deliverables are completed within 5–7 days of receiving required content." },
      { title: "Requirements", desc: "Brand name, content, product/service details, target market info, logo, and preferred business images or videos." },
      { title: "Support & SLA", desc: "Monthly support via WhatsApp/email, updates within agreed schedule, SLA-based revisions." },
      { title: "Billing & Taxes", desc: "Price is all-inclusive of taxes; GST invoice provided; Lucknow-first focus with Pan-India remote delivery." }
    ],
    seoKeywords: "Growth Pro Pack, Professional business website India, chatbot integration, affordable local SEO Lucknow, MSME lead generation",
    seoDescription: "Vikas Growth Pro Pack @ ₹1599. Get a fast 5-page website, 10 SEO blogs, chatbot setup, 8 social posts with ads setup, and a full SEO audit. Save 64%!"
  };

  return <ServiceLayout {...serviceData} />;
};

export default GrowthProPack;
