import ServiceLayout from '../../components/ServiceLayout';

const BioLinkGMB = () => {
  const serviceData = {
    title: "Bio Link + Google My Business (Verified)",
    price: "₹229",
    mrp: "₹1,200",
    billingCadence: "One-time setup",
    category: "Individual Service",
    placeholderName: "Bio Link QR & GMB Profile Setup Preview",
    description: "Create a shareable digital visiting card with a custom link or QR code, and get verified on Google My Business. Perfect for freelancers, small retail shops, and local service providers in Lucknow to build trust and boost online visibility.",
    features: [
      { text: "Shareable Digital Visiting Card", desc: "Create a modern, responsive digital business card profile with QR code to share on WhatsApp or social media." },
      { text: "Add up to 5 Links", desc: "Attach up to 5 redirect links (WhatsApp chat, catalogs, website, phone, location) on your digital card." },
      { text: "Google My Business Verification", desc: "Get listed as a verified merchant on Google My Business and show up in local searches & Google Maps." },
      { text: "Boost Local Discovery", desc: "Perfect for local service providers, small shops, and freelancers to attract customers nearby." },
      { text: "Build Immediate trust", desc: "Clean layout displaying your logo, business details, reviews link, and contact details." }
    ],
    inclusions: [
      "Custom Digital Bio Link card with QR code generator.",
      "Google My Business verified merchant profile setup and draft listing.",
      "Basic Map citation and listing configuration.",
      "Tailored Digital Action Steps for local discovery.",
      "FREE MSME/Udyam Registration Support."
    ],
    additionalInfo: [
      { title: "What's Included", desc: "Digital visiting card with QR & link, add up to 5 redirection links, Google My Business verification setup, and basic Map citations." },
      { title: "Delivery Time", desc: "Setup completed and Google Business registration drafted within 24–48 hours." },
      { title: "Requirements", desc: "Business name, phone number, physical address (for GMB verification), logo, and social links." },
      { title: "Support & SLA", desc: "Priority support via WhatsApp & email, 9 AM–7 PM IST; first reply within 24 hours." },
      { title: "Billing & Taxes", desc: "Price includes all taxes. GST invoice provided. Lucknow-first focus with Pan-India delivery." }
    ],
    seoKeywords: "Bio Link Lucknow, Google My Business verification India, digital business card India, GMB local optimization, local SEO Lucknow",
    seoDescription: "Bio Link + Google My Business @ ₹229. Setup a shareable digital business card with QR and get verified on Google My Business and Google Maps."
  };

  return <ServiceLayout {...serviceData} />;
};

export default BioLinkGMB;
