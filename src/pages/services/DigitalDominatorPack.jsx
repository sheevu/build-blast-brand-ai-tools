import React from 'react';
import ServiceLayout from '../../components/ServiceLayout';

const DigitalDominatorPack = () => {
  const serviceData = {
    title: "💎 Digital Dominator Pack",
    price: "₹1,399/month",
    mrp: "₹3,200/month",
    billingCadence: "Billed monthly",
    category: "Social Media Retainer",
    placeholderName: "Digital Dominator Dashboard & Campaign Lab Preview",
    description: "Our most powerful plan for MSMEs, startups, and ambitious local brands that want to dominate social media, grow followers fast, and drive consistent sales. Packed with advanced features, influencer reach, ad campaigns, and brand design upgrades – this plan is your ticket to serious digital dominance.",
    features: [
      { text: "20 Social Media Posts", desc: "10 standard + 10 animated posts for creative variety and maximum brand engagement." },
      { text: "4 High-Impact Reels", desc: "Short, trending audio and visual storytelling designed to boost organic video reach." },
      { text: "Full Bio & Link Hub Optimization", desc: "Keyword-rich, professional profile bio on all platforms with a universal smart link hub." },
      { text: "Google My Business Audit & Fixes", desc: "Review, optimize, and improve your local GMB ranking and rating profile." },
      { text: "Paid Local & Engagement Ads Setup", desc: "Target nearby customers with geo-focused Facebook/Instagram ads, likes, and reach campaigns." },
      { text: "Monthly Micro-Influencer Shoutouts", desc: "Partner with local influencers to boost your business trust and visibility." },
      { text: "Brand Redesigns (Logo/Menu Refresh)", desc: "A professional design update for your logo, digital menu, or brochure once a month." },
      { text: "3 SEO Blogs with High DA Backlinks", desc: "Write search-targeted content to build authority and lift Google organic traffic." },
      { text: "Dedicated Client Portal Access", desc: "Track progress, approved calendars, active ad campaigns, and detailed monthly reports." }
    ],
    inclusions: [
      "FREE MSME/Udyam Registration Support – Get official recognition for your business.",
      "Tailored Digital Action Steps – Personalized growth roadmap to scale effectively.",
      "Local SEO Integration & Market Insights – Appear in 'near me' searches and boost local visibility.",
      "Google My Business Setup & Optimization – Build trust & drive more local footfall.",
      "WhatsApp Catalog Setup – Enable chat-based product discovery and instant sales.",
      "Access to Premium Growth Guides & Resources – Ongoing strategies to keep you ahead."
    ],
    additionalInfo: [
      { title: "What's Included", desc: "20 social posts (10 static + 10 animated), 4 reels, bio optimization, universal link hub, Google My Business audit & fixes, ad campaigns (local, engagement, reel, like), influencer shoutouts, logo/menu redesign, custom highlights covers, plus 3 SEO blogs with backlinks." },
      { title: "Delivery Time", desc: "Content calendar posted weekly; ads & influencer campaigns launched within 3–5 days of approval; monthly insights reports provided." },
      { title: "Requirements", desc: "Social handles, branding assets (logo/menu), business goals, target market details, and ad budget approvals." },
      { title: "Support & SLA", desc: "Priority WhatsApp & email support; weekly engagement checks; monthly strategy review sessions." },
      { title: "Billing & Taxes", desc: "Subscription billed monthly; all taxes included; GST invoice available." },
      { title: "Ideal For", desc: "Growing MSMEs, startups & brands wanting daily buzz, advanced paid ads, influencer reach, and professional brand redesigns to dominate social media & sales." }
    ],
    seoKeywords: "Digital Dominator Pack, Social Media agency Lucknow, local influencer marketing Lucknow, paid ads management Lucknow, brand redesign Lucknow",
    seoDescription: "Digital Dominator Pack @ ₹1399/month. Accelerate your sales: 20 posts, 4 reels, local ads campaigns, influencer shoutout, GMB fixes, logo refresh, and client portal."
  };

  return <ServiceLayout {...serviceData} />;
};

export default DigitalDominatorPack;
