import ServiceLayout from '../../components/ServiceLayout';

const ExcelSheetsAutomation = () => {
  const serviceData = {
    title: "Excel & Google Sheets Automation",
    price: "₹1,999",
    mrp: "₹4,999",
    billingCadence: "Per project dashboard",
    category: "Individual Service",
    placeholderName: "Automated Excel Business Dashboard Wireframe",
    description: "Simplify your operations and decision-making. Get custom smart dashboards, financial sales tracking templates, and Google Apps Script workflow automations built specifically for your small business or agency.",
    features: [
      { text: "Custom Interactive Dashboards", desc: "Clean visual reporting dashboards to track daily/weekly sales, expenses, or inventory metrics." },
      { text: "Google Apps Script Automation", desc: "Automate sending alert emails or PDF invoices directly from row data clicks." },
      { text: "Automated Data Feeds & Pivot Tables", desc: "Connect external APIs or forms to feed data directly into sorted pivot tables." },
      { text: "Inventory & Expense Tracking", desc: "Automated calculation formulas and templates to track inventory restocks and costs." },
      { text: "Error-Free Macro Configurations", desc: "Custom VBA macros and Google Sheets triggers to automate repetitive data entry." }
    ],
    inclusions: [
      "Custom Excel or Google Sheets template creation.",
      "Google Apps Script automation triggers and scripts setup.",
      "Interactive charts and pivot reporting dashboard.",
      "15-minute video tutorial guide explaining how to use it.",
      "FREE MSME/Udyam Registration Support.",
      "Tailored Digital Action Steps."
    ],
    additionalInfo: [
      { title: "What's Included", desc: "Dashboard design, custom formulas & calculations, VBA macros / Google Apps scripts, automated email triggers setup, video walkthrough." },
      { title: "Delivery Time", desc: "Custom sheet template and basic script automation delivered in 3–5 days." },
      { title: "Requirements", desc: "Detailed list of tracking requirements, existing sample Excel data, and desired metrics/charts." },
      { title: "Support & SLA", desc: "Priority support for formula issues or script errors for 30 days post-delivery." },
      { title: "Billing & Taxes", desc: "Price is a one-time project fee. GST invoice available. Lucknow-first focus with Pan-India delivery." }
    ],
    seoKeywords: "Excel automation India, business dashboard Google Sheets, Google Apps Script freelancer Lucknow, automated sales tracker, inventory sheet automation",
    seoDescription: "Excel & Google Sheets Automation @ ₹1,999. Custom spreadsheets dashboards, financial tracker, inventory templates, and Apps Script mail notifications."
  };

  return <ServiceLayout {...serviceData} />;
};

export default ExcelSheetsAutomation;
