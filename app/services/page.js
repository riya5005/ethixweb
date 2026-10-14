import Link from "next/link";
import Icon from "@/components/Icon";
import { services } from "@/lib/content";
export const metadata = { title: "Services | Ethixweb India" };

export default function Services() {
  return (
    <>
      <PageHead title="Our services" sub="Everything you need, with a clear plan and a quote in ₹ before you commit." />
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-14 sm:grid-cols-2">
        {services.map((s) => (
          <div key={s.t} className="flex flex-col rounded-2xl border p-7 transition hover:border-brand hover:shadow-xl">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand"><Icon name={s.icon} /></span>
            <h2 className="mt-5 text-2xl font-semibold">{s.t}</h2>
            <p className="mt-2 text-gray-600">{s.d}</p>
            <ul className="mt-4 space-y-2 text-sm">{s.pts.map((p) => <li key={p} className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-brand" />{p}</li>)}</ul>
            <Link href="/contact" className="mt-6 border-t pt-4 text-sm font-semibold text-brand hover:underline">Ask for a quote →</Link>
          </div>
        ))}
      </div>
      <div className="text-center"><Link href="/contact" className="inline-block rounded-full bg-brand px-8 py-3.5 font-semibold text-white transition hover:bg-deep">Get a free quote</Link></div>
    </>
  );
}
export function PageHead({ title, sub }) {
  return <section className="jaali bg-ink py-16 text-white"><div className="mx-auto max-w-6xl px-5"><h1 className="text-4xl font-bold sm:text-5xl">{title}</h1><p className="mt-3 max-w-xl text-white/75">{sub}</p></div></section>;
}
