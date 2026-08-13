import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Search, Sparkles } from 'lucide-react';
import { formatPrice, serviceCatalog, serviceGoals } from '../data/serviceCatalog';

const ServicesPage = () => {
  const [goal, setGoal] = useState('All services');
  const [query, setQuery] = useState('');

  useEffect(() => {
    document.title = 'Affordable Digital Services in Lucknow | Sudarshan AI Labs';
    const description = 'Compare 19 affordable website, Google, WhatsApp, social media and AI services for Lucknow MSMEs, starting at ₹89.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  const visibleServices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return serviceCatalog.filter((service) => {
      const matchesGoal = goal === 'All services' || service.goals.includes(goal);
      const matchesQuery = !normalizedQuery || `${service.name} ${service.description} ${service.goals.join(' ')}`.toLowerCase().includes(normalizedQuery);
      return matchesGoal && matchesQuery;
    });
  }, [goal, query]);

  return (
    <div className="min-h-screen bg-[#050814] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050814]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-400 shadow-[0_0_28px_rgba(34,211,238,.35)]"><Sparkles className="h-5 w-5" /></span>
            <span><strong className="block text-sm">Sudarshan AI Labs</strong><small className="text-slate-400">Lucknow · MSME Growth Engine</small></span>
          </Link>
          <a href="https://wa.me/917388833006?text=Hi%20Sudarshan%20AI%20Labs%2C%20help%20me%20choose%20the%20right%20digital%20service." target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300 px-4 py-2.5 text-xs font-bold text-slate-950"><MessageCircle className="h-4 w-4" /> Get free guidance</a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#101b33] via-[#0b1222] to-[#170b2c] px-5 py-12 text-center sm:px-10 lg:py-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[.26em] text-cyan-200">Clear prices · Practical support · Starting at ₹89</p>
            <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">Choose your next <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-orange-300 bg-clip-text text-transparent">growth move.</span></h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">Select what you want to improve. Compare the options and see exactly what you receive before starting a WhatsApp conversation.</p>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {serviceGoals.map((item) => <button key={item} type="button" onClick={() => setGoal(item)} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${goal === item ? 'border-cyan-300/60 bg-cyan-300/15 text-cyan-100' : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/25'}`}>{item}</button>)}
            </div>
            <label className="flex min-w-72 items-center gap-2 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-slate-300 focus-within:border-cyan-300/50"><Search className="h-4 w-4" /><span className="sr-only">Search services</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search services" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500" /></label>
          </div>

          <div className="mt-7 flex items-end justify-between"><div><p className="text-xs uppercase tracking-[.22em] text-emerald-300">{goal}</p><h2 className="mt-2 text-2xl font-bold">{visibleServices.length} options for your business</h2></div></div>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleServices.map((service) => (
              <article key={service.id} className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[.08] to-white/[.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40">
                {service.badge && <span className="absolute right-5 top-5 rounded-full bg-amber-300/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-200">{service.badge}</span>}
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-2xl">{service.icon}</span>
                <p className="mt-5 text-[11px] font-bold uppercase tracking-[.2em] text-cyan-200">{service.type}</p>
                <h3 className="mt-2 text-xl font-bold">{service.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{service.description}</p>
                <div className="mt-6 flex items-end gap-2"><strong className="text-3xl">{formatPrice(service.price)}</strong><span className="pb-1 text-xs text-slate-500">{service.cadence}</span></div>
                <div className="mt-5 flex items-center gap-3"><Link to={`/services/${service.slug}`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 px-4 py-3 text-sm font-bold text-slate-950">View details <ArrowRight className="h-4 w-4" /></Link><a href={`https://wa.me/917388833006?text=${encodeURIComponent(`Hi Sudarshan AI Labs, I am interested in ${service.name} (${service.id}) at ${formatPrice(service.price)}. Page: https://vyapai.in/services/${service.slug}`)}`} target="_blank" rel="noreferrer" aria-label={`Ask about ${service.name}`} className="grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-white/5 text-emerald-300"><MessageCircle className="h-5 w-5" /></a></div>
              </article>
            ))}
          </div>
          {visibleServices.length === 0 && <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-slate-300">No exact match. Try another goal or clear your search.</div>}
        </section>
      </main>
    </div>
  );
};

export default ServicesPage;
