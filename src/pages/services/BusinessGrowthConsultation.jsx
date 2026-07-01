import React from 'react';
import ServiceLayout from '../../components/ServiceLayout';

const BusinessGrowthConsultation = () => {
  const serviceData = {
    title: "Business Growth Consultation",
    price: "₹499",
    mrp: "₹3,500",
    billingCadence: "Per consultation session",
    category: "Individual Service",
    placeholderName: "1-on-1 Growth Consultation & Audit Notes",
    description: "Get a 1:1 strategy consultation session with a growth expert. Includes a comprehensive local SEO audit and a personalized digital marketing/automation roadmap to scale your business in India.",
    features: [
      { text: "1:1 Strategy Consultation Session", desc: "A dedicated 30-minute growth meeting to map out your digital channels, sales hooks, and CRM setups." },
      { text: "Comprehensive Local SEO Audit", desc: "A full review of your current Google search presence, Map citations, and competitor rankings." },
      { text: "Custom Marketing & Tech Roadmap", desc: "Actionable, step-by-step action plan tailored specifically for your target audience and location." },
      { text: "Automation Strategy & Scoping", desc: "Identify workflow bottlenecks that can be solved with WhatsApp bots, CRM syncs, or sheets automation." },
      { text: "Scale Planning (Local to National)", desc: "Strategies to expand your client acquisition from Lucknow-first to pan-India remote reach." }
    ],
    inclusions: [
      "30-minute 1:1 online strategy growth session.",
      "Comprehensive PDF local SEO audit report.",
      "Actionable digital marketing roadmap checklist.",
      "Post-consultation summary and tool recommendations list.",
      "FREE MSME/Udyam Registration Support."
    ],
    additionalInfo: [
      { title: "What's Included", desc: "30-min strategy call, local SEO audit report, digital roadmap PDF, automation scoping advice, and post-session checklist details." },
      { title: "Delivery Time", desc: "Strategy session scheduled and PDF audit delivered within 24–48 hours of details receipt." },
      { title: "Requirements", desc: "Business name, WhatsApp number, website link (if any), and 2-3 main competitors list." },
      { title: "Support & SLA", desc: "Follow-up questions answered via WhatsApp chat for 7 days post-session." },
      { title: "Billing & Taxes", desc: "Price includes all taxes. GST invoice available. Sessions conducted online via Google Meet or Zoom." }
    ],
    seoKeywords: "startup consultant India, business growth strategy Lucknow, local SEO audit, digital marketing consultant Lucknow, small business advisor",
    seoDescription: "Business Growth Consultation @ ₹499. Get a 1:1 growth strategy session with a local SEO audit report and step-by-step digital roadmap. Save 86%!"
  };

  return <ServiceLayout {...serviceData} />;
};

export default BusinessGrowthConsultation;
