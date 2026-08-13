
const Footer = () => {
  return (
    <footer className="border-t border-slate-100 bg-slate-50/50 py-10 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-450">Sudarshan AI Labs</p>
        <p className="mt-3 text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Premium digital marketing & tech solutions built with ❤️ for local shops, MSMEs, and startups in Lucknow & across Bharat.
        </p>
        
        {/* Quick Links / Disclaimers */}
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs font-medium text-slate-400">
          <a href="/services" className="hover:text-emerald-700 transition font-semibold text-emerald-800">All Services</a>
          <a href="/#plans" className="hover:text-emerald-700 transition">Pricing Plans</a>
          <a href="/#value" className="hover:text-emerald-700 transition">Why Choose Us</a>
          <a href="/faq" className="hover:text-emerald-700 transition font-semibold text-emerald-800">Lucknow Marketing FAQ</a>
          <a href="https://wa.me/917388833006" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700 transition">Direct WhatsApp Support</a>
          <a href="/#proof" className="hover:text-emerald-700 transition">Client Case Studies</a>
        </div>

        <p className="mt-8 text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Sudarshan AI Labs (OPC) Private Limited. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
