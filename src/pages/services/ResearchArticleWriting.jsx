import React from 'react';
import ServiceLayout from '../../components/ServiceLayout';

const ResearchArticleWriting = () => {
  const serviceData = {
    title: "Research & Article Writing",
    price: "₹499",
    mrp: "₹999",
    billingCadence: "Per project/article",
    category: "Individual Service",
    placeholderName: "SEO Article Blueprint & Backlink Reference",
    description: "Expert-written, research-backed blogs and articles with high Domain Authority (DA 80+) backlinks. Perfect for startups and MSMEs in India looking to build authority, trust, and search rankings.",
    features: [
      { text: "Professional Content Writing", desc: "Expertly written articles in Hindi or English, tailored to your target audience." },
      { text: "DA 80+ Guest Post Backlink", desc: "Includes publishing on a high Domain Authority site to boost your own website search authority." },
      { text: "SEO Keyword Infusion", desc: "Optimized header structures, formatting, and keyword density for Google discovery." },
      { text: "Industry Research & Insights", desc: "Thoroughly researched topics aligned with your specific industry trends and customer pain points." },
      { text: "Lucrative Call-to-Actions", desc: "Designed with conversion hooks to redirect blog readers into your active product/service funnel." }
    ],
    inclusions: [
      "1 fully written, SEO-optimized article (800 - 1200 words).",
      "Keyword research and mapping report.",
      "High Domain Authority (DA 80+) backlink placement.",
      "Professional proofreading and editing.",
      "FREE MSME/Udyam Registration Support.",
      "Tailored Digital Action Steps."
    ],
    additionalInfo: [
      { title: "What's Included", desc: "SEO-optimized blog/article writing, high DA 80+ backlink placement, industry keyword research, plagiarism checks, and 2 rounds of revisions." },
      { title: "Delivery Time", desc: "Article draft provided within 48 hours; guest backlink publication in 3–5 days." },
      { title: "Requirements", desc: "Target topic or keywords, brand website (if any), preferred writing language (Hindi/English), and company values." },
      { title: "Support & SLA", desc: "WhatsApp and email support, draft revisions submitted within 24 hours." },
      { title: "Billing & Taxes", desc: "Price includes all taxes. GST invoice provided. Remote delivery available Pan-India." }
    ],
    seoKeywords: "content writing service India, guest posting backlink, SEO articles Lucknow, professional blog writer, affordable content marketing",
    seoDescription: "Research & Article Writing @ ₹499. Get expert-written, SEO-optimized articles with high Domain Authority (DA 80+) backlinks to boost your Google ranks."
  };

  return <ServiceLayout {...serviceData} />;
};

export default ResearchArticleWriting;
