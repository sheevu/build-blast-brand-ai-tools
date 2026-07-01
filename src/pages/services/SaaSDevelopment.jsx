import React from 'react';
import ServiceLayout from '../../components/ServiceLayout';

const SaaSDevelopment = () => {
  const serviceData = {
    title: "SaaS & AI Tool Development (MVP)",
    price: "₹2,999",
    mrp: "₹6,999",
    billingCadence: "Per MVP project",
    category: "Individual Service",
    placeholderName: "SaaS MVP Architecture Blueprint",
    description: "Launch your startup idea fast. We help founders, entrepreneurs, and agencies build SaaS or AI tools quickly with no-code/low-code MVPs. Fast launch, low cost, and full future scalability.",
    features: [
      { text: "Rapid MVP Prototyping", desc: "Get a fully functional initial version of your SaaS application or tool in record time." },
      { text: "No-Code / Low-Code Tech Stack", desc: "Build using modern visual builders (Bubble, FlutterFlow, or light React) to minimize development costs." },
      { text: "AI API Integration", desc: "Connect OpenAI, Gemini, or custom AI models to create intelligent workflows or chatbot features." },
      { text: "User Authentication & Database", desc: "Secure signup/login setups with integrated databases to store user profile details." },
      { text: "Payment Gateways Configuration", desc: "Connect Stripe, Razorpay, or UPI gateways for subscription and product sales." }
    ],
    inclusions: [
      "Initial MVP scoping and database design blueprint.",
      "Frontend dashboard building and styling.",
      "API integrations (AI, database, payments).",
      "Staging preview site and testing logs.",
      "FREE MSME/Udyam Registration Support.",
      "Tailored Digital Action Steps for launching your MVP."
    ],
    additionalInfo: [
      { title: "What's Included", desc: "Scoping blueprint, database setup, frontend building, payment gateway configuration, basic AI API link, testing, and transfer of credentials." },
      { title: "Delivery Time", desc: "Basic MVP design & development prototype delivered in 7–14 days depending on scope." },
      { title: "Requirements", desc: "Detailed scoping document, logo/branding, desired user flows, payment merchant keys, and external API accounts." },
      { title: "Support & SLA", desc: "Includes 30 days of post-launch maintenance support for bug fixes." },
      { title: "Billing & Taxes", desc: "One-time setup price for agreed scope. Any third-party APIs or builder subscription costs paid directly by owner." }
    ],
    seoKeywords: "SaaS development India, MVP builder startup, AI tool development Lucknow, Bubble FlutterFlow developers Lucknow, no-code SaaS MVP",
    seoDescription: "SaaS & AI Tool Development (MVP) @ ₹2,999. Rapid no-code/low-code MVP prototyping for startup founders. Fast launch, low cost, full scalability."
  };

  return <ServiceLayout {...serviceData} />;
};

export default SaaSDevelopment;
