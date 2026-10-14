import ContactForm from "@/components/ContactForm";
import { PageHead } from "../services/page";
import { WHATSAPP, EMAIL, BOOKING } from "@/lib/content";
export const metadata = { title: "Contact | Ethixweb India" };

export default function Contact() {
  return (
    <>
      <PageHead title="Let's talk" sub="Share a few details and we will reply in under an hour." />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 lg:grid-cols-5">
        <div className="lg:col-span-3"><ContactForm /></div>
        <aside className="space-y-5 lg:col-span-2">
          <div className="rounded-2xl bg-soft p-6"><h2 className="font-semibold">Prefer WhatsApp?</h2><p className="mt-1 text-sm text-gray-600">Chat with us directly.</p>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-600">Chat on WhatsApp</a></div>
          <div className="rounded-2xl bg-soft p-6"><h2 className="font-semibold">Email</h2><a href={`mailto:${EMAIL}`} className="mt-1 block text-brand hover:underline">{EMAIL}</a></div>
          <div className="rounded-2xl bg-soft p-6"><h2 className="font-semibold">Book a call</h2><p className="mt-1 text-sm text-gray-600">Pick a free 30-minute slot.</p>
            <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-brand hover:underline">Open calendar →</a></div>
        </aside>
      </div>
    </>
  );
}
