import ServiceLayout from '../../components/ServiceLayout';

const LandingPage = () => {
  const serviceData = {
    title: "Landing Page (Lead Generation)",
    price: "₹699",
    mrp: "₹2,099",
    billingCadence: "One-time setup",
    category: "Individual Service",
    placeholderName: "Lead Gen Landing Page Wireframe",
    description: "High-conversion landing pages optimized for WhatsApp and ad campaigns. Capture customer inquiries, highlight products, and drive instant conversions with a clean, mobile-first design.",
    features: [
      { text: "High Conversion Design", desc: "Single-focus layout with a clear call-to-action (CTA) button to minimize visitor bounce rate." },
      { text: "Inbuilt WhatsApp Integration", desc: "Direct chat order flow so visitors land straight in your WhatsApp inbox." },
      { text: "Lead Capture Forms", desc: "Collect customer names, emails, and phone numbers directly." },
      { text: "Shared Domain Hosting", desc: "Deployed on our high-speed shared domain (no separate domain registry cost required)." },
      { text: "Ad-Ready Configuration", desc: "Optimized speed and layout structure for running Facebook Ads, Instagram Ads, or Google Ads." }
    ],
    inclusions: [
      "1-page landing page setup on a shared domain.",
      "WhatsApp direct click-to-chat button integration.",
      "Lead generation form setup.",
      "Fast page load optimization.",
      "FREE MSME/Udyam Registration Support.",
      "Tailored Digital Action Steps."
    ],
    additionalInfo: [
      { title: "What's Included", desc: "Single-page high-converting landing page, WhatsApp integration, lead form, shared domain hosting, mobile optimization." },
      { title: "Delivery Time", desc: "Goes live within 24–48 hours of receiving your business details." },
      { title: "Requirements", desc: "Business name, logo/images (optional), product description, WhatsApp phone number, and brief pricing/offers list." },
      { title: "Support & SLA", desc: "Priority WhatsApp & email support, 9 AM–7 PM IST; first response within 24 hours." },
      { title: "Billing & Taxes", desc: "Price includes all taxes. GST invoice provided. Remote setup available Pan-India." }
    ],
    seoKeywords: "lead generation landing page India, landing page design Lucknow, WhatsApp landing page Lucknow, affordable landing page package",
    seoDescription: "Landing Page (Lead Generation) @ ₹699. Get a high-converting, mobile-first landing page with WhatsApp integration and lead form. Save 67%!"
  };

  return <ServiceLayout {...serviceData} />;
};

export default LandingPage;
