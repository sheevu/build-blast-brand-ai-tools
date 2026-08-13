import ServiceLayout from '../../components/ServiceLayout';

const SocialMediaMarketing = () => {
  const serviceData = {
    title: "Social Media Marketing (SMM)",
    price: "₹999/month",
    mrp: "₹2,999/month",
    billingCadence: "Billed monthly",
    category: "Individual Service",
    placeholderName: "Social Media Campaign Creative Preview",
    description: "Launch targeted marketing campaigns across Facebook, Instagram, and LinkedIn. Includes custom content creation, ad campaign setup, and detailed analytics to grow your brand followers and customer inquiries.",
    features: [
      { text: "Multi-Platform Campaigns", desc: "Targeted campaigns and branding across Facebook, Instagram, and LinkedIn." },
      { text: "Custom Content Creation", desc: "Branded graphic posts and templates built specifically for your products/services." },
      { text: "Targeted Ads Campaign Setup", desc: "Setup and optimize Facebook/Instagram ads to target buyers in specific Lucknow areas." },
      { text: "Engagement & Performance Tracking", desc: "Basic analytics dashboard and reports to check reach, comments, and lead clicks." },
      { text: "Copywriting & Caption Setup", desc: "Catchy, search-friendly captions and local hashtags tailored to your target buyers." }
    ],
    inclusions: [
      "Social media account optimization and branding layout.",
      "Custom branded social post graphics.",
      "Meta Ads campaign setup and tracking pixels integration.",
      "Performance report updates.",
      "FREE MSME/Udyam Registration Support.",
      "Tailored Digital Action Steps."
    ],
    additionalInfo: [
      { title: "What's Included", desc: "Branded post designs, account setup/optimization, Meta Ads budget mapping, performance tracking, and copywriting support." },
      { title: "Delivery Time", desc: "Initial campaign strategy and post schedule set up within 3–5 days of details approval." },
      { title: "Requirements", desc: "Social handles logins or advertiser accesses, target audience details, business logo, and product images." },
      { title: "Support & SLA", desc: "Support via WhatsApp and email, 9 AM–7 PM IST; weekly strategy checks." },
      { title: "Billing & Taxes", desc: "Billed monthly subscription; ad budget paid directly to Meta. Price includes all taxes. GST invoice provided." }
    ],
    seoKeywords: "social media marketing Lucknow, SMM agency India, Facebook advertising Lucknow, Instagram growth agency, affordable SMM Lucknow",
    seoDescription: "Social Media Marketing (SMM) @ ₹999/month. Grow your brand on Facebook and Instagram with custom content, targeted ad campaigns, and weekly reports."
  };

  return <ServiceLayout {...serviceData} />;
};

export default SocialMediaMarketing;
