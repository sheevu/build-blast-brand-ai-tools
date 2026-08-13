import ServiceLayout from '../../components/ServiceLayout';

const ResumeWriting = () => {
  const serviceData = {
    title: "Resume Writing Service",
    price: "₹99",
    mrp: "₹299",
    billingCadence: "Per resume project",
    category: "Individual Service",
    placeholderName: "ATS-Friendly Resume Template Layout",
    description: "Professionally crafted, ATS-friendly resumes optimized to pass modern hiring software screenings and help you stand out. Ideal for freshers and professionals looking to grow their careers fast.",
    features: [
      { text: "ATS-Friendly Formatting", desc: "Structured layouts and keywords specifically selected to pass Applicant Tracking Systems (ATS)." },
      { text: "Professional Resume Writers", desc: "Crafted by experts to highlight your core achievements, skills, and industry credentials." },
      { text: "LinkedIn Profile Tips", desc: "Get basic, actionable tips to optimize your LinkedIn page for recruiters." },
      { text: "Modern Design Templates", desc: "Clean, professional, and visually appealing layouts tailored to your industry." },
      { text: "Customized Skill Mapping", desc: "Align your profile skills and experience highlights with active job descriptions." }
    ],
    inclusions: [
      "1 professionally formatted, ATS-compliant resume (PDF format).",
      "Editable source file (Word/Docs format).",
      "LinkedIn profile optimization guide checklist.",
      "Up to 2 rounds of modifications/revisions.",
      "Tailored action steps to apply for roles."
    ],
    additionalInfo: [
      { title: "What's Included", desc: "Professional resume layout, ATS formatting, keyword optimizations, editable source file, and LinkedIn profile tips checklist." },
      { title: "Delivery Time", desc: "First draft delivered in 24–48 hours of receiving your career details." },
      { title: "Requirements", desc: "Existing resume or detailed list of education, work experience, key skills, and target job description." },
      { title: "Support & SLA", desc: "Priority email and WhatsApp coordination; revisions delivered in 24 hours." },
      { title: "Billing & Taxes", desc: "Price includes all taxes. Remote delivery available Pan-India." }
    ],
    seoKeywords: "professional resume writer India, ATS resume builder, resume writing Lucknow, CV layout templates, job application help",
    seoDescription: "Resume Writing Service @ ₹99. Get a professionally crafted, ATS-friendly resume to pass recruitment software and kickstart your career growth."
  };

  return <ServiceLayout {...serviceData} />;
};

export default ResumeWriting;
