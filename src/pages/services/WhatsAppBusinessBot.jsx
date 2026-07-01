import React from 'react';
import ServiceLayout from '../../components/ServiceLayout';

const WhatsAppBusinessBot = () => {
  const serviceData = {
    title: "WhatsApp Business Bot",
    price: "₹129 (Basic) / ₹599 (Pro)",
    mrp: "₹899 (Basic) / ₹1,499 (Pro)",
    billingCadence: "One-time setup",
    category: "Individual Service",
    placeholderName: "WhatsApp Bot Interactive Chat Flow Preview",
    description: "Smart WhatsApp automation for auto-replies, lead capture, and UPI payment integration. Works with all Indian payment gateways to capture orders and customer questions 24/7. (Keywords: WhatsApp chatbot India, WhatsApp automation tool)",
    features: [
      { text: "Automated FAQ & Chat Replies", desc: "Instantly answer common customer questions, store hours, and service queries." },
      { text: "UPI & Payment Gateway Integration", desc: "Integrate UPI (Razorpay, Paytm) so clients can pay directly in chat (Pro feature)." },
      { text: "Interactive Product Catalog", desc: "Showcase products with prices, images, and order links directly inside the chat window." },
      { text: "Lead Capturing & CRM Sync", desc: "Automatically collect and save customer name, phone number, and requirements." },
      { text: "Broadcast List Setup support", desc: "Send promotional updates or offers to opted-in contact lists without getting blocked." }
    ],
    inclusions: [
      "Custom conversational flow design (up to 10 FAQs for Basic, 30 for Pro).",
      "WhatsApp Business App setup or official WhatsApp Cloud API integration (Pro).",
      "UPI/Payment link integration setup (Pro).",
      "Customer contact capturing template.",
      "FREE MSME/Udyam Registration Support.",
      "Tailored Digital Action Steps for mobile marketing."
    ],
    additionalInfo: [
      { title: "What's Included", desc: "Basic plan: Auto-reply setup, product catalog, up to 10 FAQ responses. Pro plan: AI/rule chatbot flow, payment gateway integration, API configuration, broadcast lists, and CRM template." },
      { title: "Delivery Time", desc: "Basic bot set up within 24–48 hours; Pro bot customized and live in 3–5 days." },
      { title: "Requirements", desc: "Active WhatsApp number (virtual or SIM), catalog product details with pricing, and payment merchant account keys (for Pro)." },
      { title: "Support & SLA", desc: "Priority WhatsApp & email support; 15 days of post-launch revisions; SLA-based bug fixes." },
      { title: "Billing & Taxes", desc: "One-time setup price all-inclusive; any monthly API gateway charges extra. GST invoice available." }
    ],
    seoKeywords: "WhatsApp chatbot India, WhatsApp automation tool, WhatsApp business API setup, UPI payment in WhatsApp, automatic chat order Lucknow",
    seoDescription: "WhatsApp Business Bot @ ₹129 (Basic) / ₹599 (Pro). Automate chats, showcase product catalogs, and accept UPI payments directly inside WhatsApp 24/7."
  };

  return <ServiceLayout {...serviceData} />;
};

export default WhatsAppBusinessBot;
