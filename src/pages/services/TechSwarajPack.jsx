import React from 'react';
import ServiceLayout from '../../components/ServiceLayout';

const TechSwarajPack = () => {
  const serviceData = {
    title: "🌱 Tech Swaraj Pack",
    price: "₹89",
    mrp: "₹999",
    billingCadence: "One-time setup",
    category: "Bundle Pack",
    placeholderName: "Swaraj Kirana Digital Store Preview",
    description: "Welcome to Bharat’s most affordable small business Growth Platform, built exclusively for Kirana stores, grocery shops, local businesses, and MSMEs in Lucknow. Perfect for shopkeepers who want to sell online, increase footfall, and boost sales without paying commissions.",
    features: [
      { text: "Digitize Your Shop in 24 Hrs", desc: "Get your custom online store live with product listings, prices & special offers." },
      { text: "Boost Daily Store Footfall & Sales", desc: "Use simple AI-powered tools to attract nearby customers and repeat buyers." },
      { text: "Google Maps & Local Search SEO", desc: "Local SEO optimized so customers in your area can easily find your shop." },
      { text: "Zero Commission. 100% Profit", desc: "Sell directly to your customers. Keep every single rupee you earn." },
      { text: "Lucknow-First Local Optimizations", desc: "Tuned specifically for Lucknow neighborhoods to build immediate local trust." },
      { text: "WhatsApp & GMB Integration", desc: "Share your store link easily, and get orders directly on WhatsApp chat." }
    ],
    inclusions: [
      "FREE MSME/Udyam Registration Support – Get your official business recognition.",
      "Tailored Digital Action Steps – A customized step-by-step roadmap to dominate your local market.",
      "Local SEO Integration & Market Insights – Stand out in 'near me' searches on Google & Maps.",
      "Google My Business Setup & Optimization – Improve online credibility & foot traffic.",
      "WhatsApp Catalog Setup – Showcase products directly in chat for quick conversions.",
      "Online store setup (up to 30 products) with mobile-friendly design."
    ],
    additionalInfo: [
      { title: "What's Included", desc: "Online store setup (up to 30 products), mobile-friendly design, WhatsApp integration, Google Business linking, basic local SEO, ₹89 one-time setup, 24-hr delivery." },
      { title: "Delivery Time", desc: "Your store goes live within 24 hours of receiving your business details." },
      { title: "Requirements", desc: "Business name, product list with prices, contact details, and store logo or images (optional)." },
      { title: "Support & SLA", desc: "Priority support via WhatsApp & email, 9 AM–7 PM IST; first response within 24 hours." },
      { title: "Refunds & Revisions", desc: "Digital service; eligible for revisions as per agreed scope. Cancellations allowed only before setup begins." },
      { title: "Billing & Taxes", desc: "Price includes all taxes. GST invoice provided. Service designed for Lucknow-first rollout, available Pan-India." }
    ],
    seoKeywords: "Swaraj Tech Pack, Kirana Digital Store Setup Lucknow, digital marketing Lucknow, local SEO Lucknow, MSME growth Lucknow",
    seoDescription: "Swaraj Tech Pack @ ₹89. Digitize your Kirana store in Lucknow in 24 hours. No coding needed, zero commission, 100% profit. Get Udyam support free!"
  };

  return <ServiceLayout {...serviceData} />;
};

export default TechSwarajPack;
