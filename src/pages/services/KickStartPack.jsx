import ServiceLayout from '../../components/ServiceLayout';

const KickStartPack = () => {
  const serviceData = {
    title: "🚀 Kick-Start Pack",
    price: "₹499",
    mrp: "₹1,500",
    billingCadence: "One-time setup",
    category: "Bundle Pack",
    placeholderName: "Kick-Start Landing Page Preview",
    description: "Perfect for micro businesses, new MSMEs, and first-time digital sellers who want to quickly launch their online presence with minimal cost. This pack combines consultation, landing page setup, WhatsApp integration, and social media essentials to give your brand a professional start.",
    features: [
      { text: "30-min Expert Growth Call", desc: "A personalized digital growth session and strategic roadmap for your local business." },
      { text: "FREE SEO Snapshot & Audit Report", desc: "Site audit + actionable SEO updates at no extra cost to find search opportunities." },
      { text: "High-Converting 1-Section Landing Page", desc: "Designed using standard templates to capture customer leads & build online credibility." },
      { text: "Basic WhatsApp Business Setup", desc: "Configure custom auto-replies and product catalog sync for instant customer engagement." },
      { text: "3 Branded Social Media Posts", desc: "Professionally designed creatives in your brand colors for your business launch." },
      { text: "1 SEO-Optimized Guest Article", desc: "Includes an article with a high Domain Authority (DA 80+) backlink to boot search rank." }
    ],
    inclusions: [
      "FREE MSME/Udyam Registration Support – Get official recognition for your business.",
      "Tailored Digital Action Steps – Customized marketing strategy to dominate your local market.",
      "Local SEO Integration & Market Insights – Rank in 'near me' searches and Maps.",
      "Google My Business Setup & Optimization – Appear in Maps and build local buyer trust.",
      "WhatsApp Catalog Setup – Shareable product showcase directly in chat.",
      "Access to Premium Growth Guides & Resources – Learn how to scale your sales effectively."
    ],
    additionalInfo: [
      { title: "What's Included", desc: "30-min consultation, CRM integration & training, SEO audit & optimization snapshot, high-converting single-section landing page, basic WhatsApp setup, 3 professional social posts, 1 guest article with DA 80+ backlink, content strategy guide." },
      { title: "Delivery Time", desc: "All deliverables are provided within 24–48 hours of receiving required details." },
      { title: "Requirements", desc: "Business name, WhatsApp contact, logo or product images (optional), brief description of products/services." },
      { title: "Support & SLA", desc: "Priority WhatsApp & email support, 9 AM–7 PM IST, first response within 24 hours; revisions as per agreed scope." },
      { title: "Refunds & Revisions", desc: "Digital service; eligible for revisions as per agreed scope. Cancellations allowed only before setup begins." },
      { title: "Billing & Taxes", desc: "Price includes all taxes. GST invoice provided. Lucknow-first focus with Pan-India remote delivery." }
    ],
    seoKeywords: "Kick-Start Pack, MSME Digital Launch, SEO and WhatsApp Setup Lucknow, digital marketing Lucknow, small business launch package",
    seoDescription: "Prarambh Kick-Start Pack @ ₹499. Launch your business online with a custom landing page, SEO audit, GMB, 3 branded posts, and WhatsApp catalog. Save 67%!"
  };

  return <ServiceLayout {...serviceData} />;
};

export default KickStartPack;
