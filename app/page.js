import Link from "next/link";
import Icon from "@/components/Icon";
import { services, process, work, stats, why, testimonials, faqs } from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="jaali relative overflow-hidden bg-ink text-white">
        <div className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-brand/40 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-24">
          <div className="rise">
            <p className="inline-block rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/80">Trusted by growing businesses across India</p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] sm:text-6xl">Websites and ads that bring customers to your door.</h1>
            <p className="mt-5 max-w-lg text-lg text-white/75">We build fast websites and run Google Ads for Indian businesses. UPI, WhatsApp and local SEO come built in, and every price is in ₹.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="rounded-full bg-brand px-7 py-3.5 font-semibold shadow-lg shadow-brand/30 transition hover:bg-red-600 active:scale-95">Get a free quote</Link>
              <Link href="/services" className="rounded-full border border-white/30 px-7 py-3.5 font-semibold transition hover:bg-white/10">See our services</Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              {["No hidden charges", "GST-ready invoices", "Support in IST"].map((t) => <li key={t} className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-saffron" />{t}</li>)}
            </ul>
          </div>

          {/* Sample dashboard: shows the result clients get */}
          <div className="rise relative mx-auto w-full max-w-md [animation-delay:.2s]">
            <div className="rounded-2xl bg-white p-6 text-ink shadow-2xl">
              <div className="flex items-center justify-between text-sm text-gray-500"><span>Leads this month</span><span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">+38%</span></div>
              <p className="mt-1 text-4xl font-bold">128</p>
              <div className="mt-5 flex h-28 items-end gap-2">
                {[40, 55, 45, 70, 62, 88, 100].map((h, i) => <div key={i} style={{ height: `${h}%` }} className={`flex-1 rounded-t ${i === 6 ? "bg-brand" : "bg-brand/25"}`} />)}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 border-t pt-4 text-sm">
                <div><p className="text-gray-500">Cost per lead</p><p className="text-lg font-semibold">₹146</p></div>
                <div><p className="text-gray-500">Ad spend</p><p className="text-lg font-semibold">₹18,700</p></div>
              </div>
            </div>
            <div className="float absolute -left-4 -top-5 flex items-center gap-3 rounded-xl bg-white p-3 text-ink shadow-xl sm:-left-10">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500 text-white"><Icon name="chat" className="h-5 w-5" /></span>
              <div className="text-xs"><p className="font-semibold">New WhatsApp enquiry</p><p className="text-gray-500">Jaipur, just now</p></div>
            </div>
            <div className="float-slow absolute -bottom-5 -right-3 rounded-xl bg-white p-3 text-ink shadow-xl sm:-right-8">
              <p className="text-xs text-gray-500">UPI payment received</p><p className="font-semibold text-green-700">₹4,999</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto -mt-0 grid max-w-6xl grid-cols-2 gap-6 px-5 py-12 text-center sm:grid-cols-4">
        {stats.map(([n, l]) => <div key={l}><p className="text-3xl font-bold text-brand">{n}</p><p className="mt-1 text-sm text-gray-500">{l}</p></div>)}
      </section>

      {/* SERVICES */}
      <Section title="What we do" sub="Everything an Indian business needs to be found online and turn visitors into customers.">
        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((s) => (
            <div key={s.t} className="group rounded-2xl border bg-white p-7 transition hover:-translate-y-1 hover:border-brand hover:shadow-xl">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white"><Icon name={s.icon} /></span>
              <h3 className="mt-5 text-xl font-semibold">{s.t}</h3><p className="mt-2 text-gray-600">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PROCESS */}
      <section className="mt-24 bg-soft py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-bold sm:text-4xl">How we work</h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-4">
            {process.map((p, i) => (
              <li key={p.t} className="relative">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand font-bold text-white">{i + 1}</span>
                <h3 className="mt-4 text-lg font-semibold">{p.t}</h3><p className="mt-1 text-sm text-gray-600">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WORK */}
      <Section title="Featured work" sub="A few of the businesses we have helped grow.">
        <div className="grid gap-6 sm:grid-cols-3">
          {work.map((w) => (
            <div key={w.n} className="group overflow-hidden rounded-2xl border bg-white transition hover:shadow-xl">
              <div className={`bg-gradient-to-br ${w.c} p-5`}>
                <div className="rounded-lg bg-white/95 p-3 shadow-lg transition group-hover:scale-105">
                  <div className="flex gap-1"><i className="h-2 w-2 rounded-full bg-red-400" /><i className="h-2 w-2 rounded-full bg-amber-400" /><i className="h-2 w-2 rounded-full bg-green-400" /></div>
                  <div className="mt-3 h-3 w-2/3 rounded bg-gray-300" /><div className="mt-2 h-2 w-full rounded bg-gray-200" /><div className="mt-1.5 h-2 w-5/6 rounded bg-gray-200" /><div className="mt-3 h-6 w-1/3 rounded bg-gray-800" />
                </div>
              </div>
              <div className="p-5"><h3 className="font-semibold">{w.n}</h3><p className="text-sm text-gray-500">{w.r}</p><p className="mt-3 font-semibold text-brand">{w.s}</p></div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-400">Sample case studies. Replace with real client results.</p>
      </Section>

      {/* WHY */}
      <section className="mt-24 bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-bold sm:text-4xl">Why Ethixweb</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {why.map(([t, d]) => <div key={t} className="rounded-2xl border border-white/10 p-6"><h3 className="text-lg font-semibold text-saffron">{t}</h3><p className="mt-2 text-white/70">{d}</p></div>)}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Section title="What clients say">
        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.n} className="rounded-2xl bg-soft p-6">
              <blockquote className="text-gray-700">“{t.q}”</blockquote>
              <figcaption className="mt-4 text-sm"><span className="font-semibold">{t.n}</span><br /><span className="text-gray-500">{t.r}</span></figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section title="Common questions">
        <div className="max-w-3xl divide-y rounded-2xl border">
          {faqs.map(([q, a]) => (
            <details key={q} className="group p-5">
              <summary className="flex cursor-pointer items-center justify-between font-medium">{q}<span className="plus text-2xl text-brand transition">+</span></summary>
              <p className="mt-3 text-gray-600">{a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="mx-auto mt-24 max-w-6xl px-5">
        <div className="jaali rounded-3xl bg-gradient-to-br from-brand to-deep p-10 text-center text-white sm:p-16">
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to get more customers?</h2>
          <p className="mx-auto mt-3 max-w-md text-white/85">Tell us about your business. We will reply within one working day with a clear plan and price in ₹.</p>
          <Link href="/contact" className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 font-semibold text-brand transition hover:scale-105">Get a free quote</Link>
        </div>
      </section>
    </>
  );
}
function Section({ title, sub, children }) {
  return (
    <section className="mx-auto mt-24 max-w-6xl px-5">
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {sub && <p className="mt-2 max-w-xl text-gray-600">{sub}</p>}
      <div className="mt-10">{children}</div>
    </section>
  );
}
