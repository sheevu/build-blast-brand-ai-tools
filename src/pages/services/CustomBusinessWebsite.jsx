import React from 'react';
import ServiceLayout from '../../components/ServiceLayout';

const CustomBusinessWebsite = () => {
  const serviceData = {
    title: "Custom Business Website (5 Pages)",
    price: "₹3,499",
    mrp: "₹9,600",
    billingCadence: "One-time setup",
    category: "Individual Service",
    placeholderName: "Custom 5-Page Website Blueprint",
    description: "Get a custom, mobile-first, and SEO-optimized website designed tailored to your brand identity, audience needs, and business goals. Ideal for startups, MSMEs, and retailers in India who want a premium online presence. (Domain & hosting purchase extra).",
    features: [
      { text: "Mobile-First Responsive Layout", desc: "Designed to look and run beautifully on mobile, tablet, and desktop browsers." },
      { text: "5 Custom Pages Setup", desc: "Includes standard pages: Home, About Us, Services/Products catalog, Gallery, and Contact Us." },
      { text: "SSL Certificate & Analytics", desc: "Secured setup with HTTPS and basic visitor tracking/analytics integration." },
      { text: "Built-In Contact/Lead Forms", desc: "Integrated contact forms sending customer inquiries directly to email or WhatsApp." },
      { text: "SEO-Optimized Codebase", desc: "Tuned for speed, clear heading hierarchy, and meta-tag structures to rank on Google." },
      { text: "Fast Loading Speed", desc: "Optimized images and lightweight clean code for lightning-fast page loading." }
    ],
    inclusions: [
      "Custom 5-page website design and setup.",
      "SSL configuration and basic Google Analytics integration.",
      "WhatsApp chat bubble integration.",
      "Google Maps embedding and contact form setup.",
      "FREE MSME/Udyam Registration Support.",
      "Tailored Digital Action Steps for launching your website."
    ],
    additionalInfo: [
      { title: "What's Included", desc: "Mobile-first website design, 5 custom pages, contact form, SSL configuration, Google Analytics linking, and basic SEO mapping." },
      { title: "Delivery Time", desc: "Complete website build and staging preview delivered in 5–7 days." },
      { title: "Requirements", desc: "Business details, logo, images (optional), page content, domain registrar login details (if purchased)." },
      { title: "Support & SLA", desc: "First 15 days of free support for content updates; ongoing WhatsApp & email support." },
      { title: "Billing & Taxes", desc: "Domain registration and server hosting fees are extra (we help you purchase at cost). GST invoice available." }
    ],
    seoKeywords: "affordable web design India, business website package, custom business website, website design Lucknow, React website developers Lucknow",
    seoDescription: "Custom Business Website (5 Pages) @ ₹3499. Get a mobile-friendly, fast, and SEO-optimized website with SSL, contact form, and Google Analytics setup."
  };

  return <ServiceLayout {...serviceData} />;
};

export default CustomBusinessWebsite;
