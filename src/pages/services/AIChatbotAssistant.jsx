import ServiceLayout from '../../components/ServiceLayout';

const AIChatbotAssistant = () => {
  const serviceData = {
    title: "AI Chatbot & Virtual Assistant",
    price: "₹499",
    mrp: "₹1,499",
    billingCadence: "One-time setup",
    category: "Individual Service",
    placeholderName: "AI Conversational Bot Flow Preview",
    description: "Add a custom multilingual AI chatbot to your website or WhatsApp. Automate customer support, capture leads, and streamline business bookings with ease. (Keywords: AI chatbot India, virtual assistant automation)",
    features: [
      { text: "Multilingual Conversations", desc: "Trained to chat naturally in Hindi, English, and other regional Indian languages." },
      { text: "Web & Social Integration", desc: "Easily integrate on your custom landing page, business website, or WhatsApp account." },
      { text: "24/7 Automated Support", desc: "Answer product details, availability, and FAQs instantly while you sleep." },
      { text: "Lead Capturing Forms", desc: "Conversational forms to ask for name, email, and requirements in chat flow." },
      { text: "Virtual Assistant Automation", desc: "Support booking appointments, raising service tickets, or sharing catalogue lists." }
    ],
    inclusions: [
      "Custom conversational AI chatbot setup.",
      "Integration snippet script for your website.",
      "Basic customization training (FAQ additions).",
      "Multilingual translation mapping.",
      "FREE MSME/Udyam Registration Support.",
      "Tailored Digital Action Steps for business automation."
    ],
    additionalInfo: [
      { title: "What's Included", desc: "Custom multilingual AI chatbot, website embedding script, basic FAQ training database, lead capture capability, 15 days support." },
      { title: "Delivery Time", desc: "Bot drafted, configured, and integrated in 3–5 days." },
      { title: "Requirements", desc: "List of common FAQs with answers, preferred chatbot name, brand website links, and integration access." },
      { title: "Support & SLA", desc: "WhatsApp & email priority support, 9 AM–7 PM IST; revisions as per agreed scope." },
      { title: "Billing & Taxes", desc: "One-time setup fee; any custom AI API credits costs extra if thresholds exceeded. GST invoice available." }
    ],
    seoKeywords: "AI chatbot India, virtual assistant automation, customer support bot, WhatsApp chatbot Lucknow, local business chatbot setup",
    seoDescription: "AI Chatbot & Virtual Assistant @ ₹499. Deploy a custom multilingual chatbot on your website or WhatsApp to automate queries and capture leads 24/7."
  };

  return <ServiceLayout {...serviceData} />;
};

export default AIChatbotAssistant;
