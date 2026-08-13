import ServiceLayout from '../../components/ServiceLayout';

const SEOContentBoost = () => {
  const serviceData = {
    title: "SEO & Content Boost",
    price: "₹599/month",
    mrp: "₹1,899/month",
    billingCadence: "Billed monthly",
    category: "Individual Service",
    placeholderName: "SEO Keyword Matrix & GMB Audit Map",
    description: "Rank higher on Google with powerful local SEO, keyword optimization, Google My Business profile management, and targeted blog writing. Drive organic search traffic to your shop or service business.",
    features: [
      { text: "Google My Business Optimization", desc: "Profile audit, update, and optimization so you show up on Google Maps search rankings." },
      { text: "Targeted Keyword Research", desc: "Identify the top search queries customers use to find businesses like yours in Lucknow." },
      { text: "GMB Call-to-Action Buttons", desc: "Add call, chat, and location buttons to your GMB posts to convert searches into leads." },
      { text: "Local Map Citations", desc: "List your business in Lucknow directory listings to improve domain authority and trust." },
      { text: "Weekly Content/Blog Writing", desc: "Keyword-rich, SEO-optimized articles with high Domain Authority (DA) backlinks." }
    ],
    inclusions: [
      "GMB profile optimization and local map listings.",
      "High Domain Authority guest backlink references.",
      "Keyword research report.",
      "Custom GMB posts setup.",
      "FREE MSME/Udyam Registration Support.",
      "Tailored Digital Action Steps for organic search growth."
    ],
    additionalInfo: [
      { title: "What's Included", desc: "GMB optimization, local keyword research, GMB CTA buttons setup, directory submissions, blog writing, and high DA backlink generation." },
      { title: "Delivery Time", desc: "GMB fixes completed in 3–5 days; blog content written and linked weekly." },
      { title: "Requirements", desc: "GMB account access, business name, address, phone, and main keywords target." },
      { title: "Support & SLA", desc: "WhatsApp and email updates; monthly search visibility ranking reports." },
      { title: "Billing & Taxes", desc: "Subscription billed monthly; price includes all taxes. GST invoice provided." }
    ],
    seoKeywords: "SEO services India, affordable SEO Lucknow, Google My Business optimization, local SEO maps, blog content writing India",
    seoDescription: "SEO & Content Boost @ ₹599/month. Rank higher on Google and Maps. Optimized Google My Business profile, local keywords, blogs, and high DA backlinks."
  };

  return <ServiceLayout {...serviceData} />;
};

export default SEOContentBoost;
