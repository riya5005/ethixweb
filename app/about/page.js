import { PageHead } from "../services/page";
import { stats, why } from "@/lib/content";
export const metadata = { title: "About | Ethixweb India" };

export default function About() {
  return (
    <>
      <PageHead title="Our India story" sub="Global quality, built for how India actually buys." />
      <div className="mx-auto max-w-3xl space-y-5 px-5 py-14 text-lg leading-relaxed text-gray-700">
        <p>Ethixweb began by building websites and running Google Ads for businesses in the United States. Our team, based in India, kept noticing the same thing: Indian businesses were being served by tools made for somebody else.</p>
        <p>Indian customers pay with UPI, ask questions on WhatsApp, and browse on phones with patchy data. A website that ignores this loses sales.</p>
        <p>So we created Ethixweb India. It brings the quality we deliver to US clients, shaped for India: fast pages, simple ₹ pricing, GST-ready billing and support in your time zone.</p>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-5 px-5 sm:grid-cols-4">
        {stats.map(([n, l]) => <div key={l} className="rounded-2xl bg-soft p-6 text-center"><p className="text-2xl font-bold text-brand">{n}</p><p className="mt-1 text-sm text-gray-500">{l}</p></div>)}
      </div>
      <div className="mx-auto mt-16 max-w-6xl px-5">
        <h2 className="text-3xl font-bold">What we stand for</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {why.map(([t, d]) => <div key={t} className="border-l-4 border-saffron pl-5"><h3 className="font-semibold">{t}</h3><p className="mt-1 text-gray-600">{d}</p></div>)}
        </div>
      </div>
    </>
  );
}
