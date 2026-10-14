import Link from "next/link";
import Icon from "./Icon";
import NavLinks from "./NavLinks";
import { WHATSAPP, EMAIL } from "@/lib/content";
const links = [["Services", "/services"], ["About", "/about"], ["Contact", "/contact"]];

export function Nav() {
  return (
    <>
      <div className="bg-ink px-5 py-2 text-center text-xs text-white/80">Free website audit for Indian businesses. We reply in under an hour.</div>
      <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="rounded-lg bg-ink px-3 py-1.5"><img src="/logo.webp" alt="Ethixweb" width="130" height="28" className="h-7 w-auto" /></span>
            <span className="rounded bg-saffron/20 px-1.5 py-0.5 text-[11px] font-semibold text-ink">INDIA</span>
          </Link>
          <NavLinks links={links} />
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
        <div><img src="/logo.webp" alt="Ethixweb" width="130" height="28" className="h-7 w-auto" /><p className="mt-3 max-w-xs">Websites, Google Ads and digital marketing for Indian businesses.</p></div>
        <div><p className="font-semibold text-white">Pages</p><div className="mt-3 flex flex-col gap-2">{links.map(([l, h]) => <Link key={h} href={h} className="hover:text-white">{l}</Link>)}</div></div>
        <div><p className="font-semibold text-white">Talk to us</p><a href={`mailto:${EMAIL}`} className="mt-3 block hover:text-white">{EMAIL}</a><p className="mt-2">Average response under 1 hour</p></div>
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs">© {new Date().getFullYear()} Ethixweb. All rights reserved.</p>
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
