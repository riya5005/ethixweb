import Link from "next/link";
import Icon from "./Icon";
import { WHATSAPP } from "@/lib/content";
const links = [["Services", "/services"], ["About", "/about"], ["Contact", "/contact"]];

export function Nav() {
  return (
    <>
      <div className="bg-ink px-5 py-2 text-center text-xs text-white/80">Free website audit for Indian businesses. We reply within one working day.</div>
      <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          {/* Text logo. Swap for the official logo file in /public if you have it. */}
          <Link href="/" className="text-xl font-bold tracking-tight text-brand">ETHIXWEB<span className="ml-1.5 rounded bg-saffron/20 px-1.5 py-0.5 text-[11px] font-semibold text-ink">INDIA</span></Link>
          <nav className="flex items-center gap-7 text-sm font-medium">
            {links.map(([l, h]) => <Link key={h} href={h} className="hidden hover:text-brand sm:block">{l}</Link>)}
            <Link href="/contact" className="hidden rounded-full bg-brand px-5 py-2.5 text-white shadow-sm transition hover:bg-deep active:scale-95 sm:block">Get a free quote</Link>
            {/* Mobile menu with plain HTML <details>: no JavaScript needed */}
            <details className="relative sm:hidden">
              <summary className="cursor-pointer rounded p-2" aria-label="Menu"><Icon name="menu" /></summary>
              <div className="absolute right-0 mt-2 w-52 rounded-xl border bg-white p-2 shadow-xl">
                {[...links, ["Get a free quote", "/contact"]].map(([l, h]) => <Link key={l} href={h} className="block rounded-lg px-4 py-3 hover:bg-soft">{l}</Link>)}
              </div>
            </details>
          </nav>
        </div>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-sm text-white/70">
      <div className="h-1 bg-gradient-to-r from-saffron via-white to-green-700" />
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
        <div><p className="text-xl font-bold text-white">ETHIXWEB INDIA</p><p className="mt-3 max-w-xs">Websites, Google Ads and digital marketing for Indian businesses.</p></div>
        <div><p className="font-semibold text-white">Pages</p><div className="mt-3 flex flex-col gap-2">{links.map(([l, h]) => <Link key={h} href={h} className="hover:text-white">{l}</Link>)}</div></div>
        <div><p className="font-semibold text-white">Talk to us</p><p className="mt-3">Mon to Sat, 10am to 7pm IST</p><Link href="/contact" className="mt-2 inline-block text-saffron hover:underline">Send an enquiry</Link></div>
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs">© {new Date().getFullYear()} Ethixweb India. Made in India.</p>
    </footer>
  );
}
export function WhatsAppButton() {
  return (
    <a href={`https://wa.me/${WHATSAPP}?text=Hi%20Ethixweb%2C%20I%20need%20a%20website`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:scale-110">
      <Icon name="chat" className="h-7 w-7" />
    </a>
  );
}
