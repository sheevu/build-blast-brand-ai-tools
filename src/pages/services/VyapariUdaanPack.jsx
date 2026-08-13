import ServiceLayout from '../../components/ServiceLayout';

const VyapariUdaanPack = () => {
  const serviceData = {
    title: "🏪 Vyapari Udaan Pack",
    price: "₹889",
    mrp: "₹2,399",
    billingCadence: "One-time setup",
    category: "Bundle Pack",
    placeholderName: "Vyapari Udaan E-commerce Store Preview",
    description: "Designed for Kirana stores, MSMEs, and startups who want a complete online presence and faster sales growth. This pack upgrades your business with a fully functional online store, professional marketing assets, and proven tools to attract, convert, and retain customers.",
    features: [
      { text: "Full Online Store Setup", desc: "Mobile-friendly, SEO-optimized store with catalog ready, product categories, and payment integration." },
      { text: "10 Product Uploads Included", desc: "Professionally formatted listings with images, descriptions & pricing to get you selling." },
      { text: "8 Premium Social Media Posts", desc: "Branded, highly engaging visuals to showcase your products and build social trust." },
      { text: "Email & WhatsApp Lead Capture", desc: "Collect customer inquiries and leads directly into your integrated CRM." },
      { text: "2 SEO-Optimized Articles", desc: "High-quality, search-targeted articles with high DA backlinks to build Google ranking authority." },
      { text: "Personalized 30-min Growth Call", desc: "1:1 growth planning session to plan your next store revenue milestones." },
      { text: "Everything in Kick-Start Pack", desc: "Includes all features from our ₹499 package (Google Business, Udyam support, audit, etc.)." }
    ],
    inclusions: [
      "FREE MSME/Udyam Registration Support – Get your official business recognition.",
      "Tailored Digital Action Steps – Step-by-step plan to dominate your local market.",
      "Local SEO Integration & Market Insights – Appear in 'near me' searches on Google & Maps.",
      "Google My Business Setup & Optimization – Improve online credibility & foot traffic.",
      "WhatsApp Catalog Setup – Showcase products directly in chat for quick conversions.",
      "Access to Premium Growth Guides & Resources – Keep scaling with expert material."
    ],
    additionalInfo: [
      { title: "What's Included", desc: "All Kick-Start Pack benefits plus full online store setup, 10 product uploads, 8 premium social posts, email & WhatsApp lead capture forms, 2 SEO-optimized articles, personalized 30-min store growth call, and a comprehensive SEO audit with PDF report." },
      { title: "Delivery Time", desc: "Complete setup & deliverables provided within 24–72 hours of receiving required details." },
      { title: "Requirements", desc: "Business name, WhatsApp contact, product list with prices, store logo or images, and preferred language for CRM." },
      { title: "Support & SLA", desc: "WhatsApp & email support, 9 AM–7 PM IST, first response in 24 hrs; scope-based revisions included." },
      { title: "Billing & Taxes", desc: "Price includes all taxes. GST invoice available. Lucknow-first focus with Pan-India delivery." }
    ],
    seoKeywords: "Vyapari Udaan Pack, Online Store Lucknow, E-commerce Setup for Shops, local SEO Lucknow, Lucknow digital marketing agency",
    seoDescription: "Vyapari Udaan Pack @ ₹889. Complete online store setup, WhatsApp integration, 10 products, 8 premium social posts, 2 blogs, and SEO audit. Save 63%!"
  };

  return <ServiceLayout {...serviceData} />;
};

export default VyapariUdaanPack;
