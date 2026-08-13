import ServiceLayout from '../../components/ServiceLayout';

const SocialBoosterPack = () => {
  const serviceData = {
    title: "📱 Social Booster Pack",
    price: "₹999/month",
    mrp: "₹2,499/month",
    billingCadence: "Billed monthly",
    category: "Social Media Retainer",
    placeholderName: "Social Booster Content Feed & Reels Preview",
    description: "The perfect plan for MSMEs, Kirana shops, startups, and local businesses who want consistent social media growth, strong SEO impact, and more customer engagement without hiring a full-time team.",
    features: [
      { text: "12 Professional Social Media Posts", desc: "High-quality branded creatives designed to showcase products and engage your audience." },
      { text: "20 Animated Stories", desc: "Daily story updates to keep your business top-of-mind and visible on Instagram & Facebook." },
      { text: "4 High-Impact Reels", desc: "Short, trending video content optimized for maximum organic reach and discoverability." },
      { text: "Hashtag & Captions Optimization", desc: "SEO-rich, copywriter-crafted captions and targeted hashtags to boost search discovery." },
      { text: "30-Day Content Calendar", desc: "Pre-planned monthly calendar showing exactly what will be posted and when." },
      { text: "Local Group Promotions (2/week)", desc: "Strategic sharing in local business & community groups in Lucknow to expand reach." },
      { text: "2 SEO-Optimized Blogs & Backlinks", desc: "Build Google ranking authority and drive organic traffic to your core offers." },
      { text: "Multi-Platform Account Setup", desc: "Facebook, Instagram, LinkedIn, Pinterest, Tumblr, Medium & X fully branded and optimized." },
      { text: "Weekly Meeting & Analytics Report", desc: "Strategy updates plus metrics on engagement, reach, leads, and ongoing growth." }
    ],
    inclusions: [
      "FREE MSME/Udyam Registration Support – Get your business officially recognized.",
      "Tailored Digital Action Steps – Customized roadmap for digital growth.",
      "Local SEO Integration & Market Insights – Rank in 'near me' searches on Google & Maps.",
      "Google My Business Setup & Optimization – Improve local visibility & credibility.",
      "WhatsApp Catalog Setup – Showcase products in chat for instant orders.",
      "Access to Premium Growth Guides & Resources – Learn proven strategies for ongoing success."
    ],
    additionalInfo: [
      { title: "What's Included", desc: "12 professional posts, 20 animated stories, 4 reels, 2 SEO blogs with backlinks, hashtag optimization, captions, local group promotions (2/week), 30-day calendar, account optimization (FB, Insta, LinkedIn, Pinterest, Tumblr, Medium, X), weekly reports & meetings." },
      { title: "Delivery Time", desc: "Monthly content calendar delivered in advance; posts/stories/reels are scheduled and published weekly." },
      { title: "Requirements", desc: "Business name, social media handles, brand guidelines, logo, and product/service updates." },
      { title: "Support & SLA", desc: "Priority WhatsApp/email support; weekly strategy meetings; transparent weekly analytics reports." },
      { title: "Billing & Taxes", desc: "Price includes all taxes. Billed monthly. GST invoice provided." },
      { title: "Ideal For", desc: "MSMEs, Kirana shops, startups & service providers wanting a consistent social presence and steady organic growth without hiring a heavy agency." }
    ],
    seoKeywords: "Social Booster Pack, Social Media Management Lucknow, SMM agency Lucknow, Facebook Instagram marketing Lucknow, affordable social media retainer",
    seoDescription: "Social Booster Pack @ ₹999/month. Complete monthly social media management: 12 posts, 20 stories, 4 reels, hashtag optimization, 2 blogs, and weekly reports."
  };

  return <ServiceLayout {...serviceData} />;
};

export default SocialBoosterPack;
