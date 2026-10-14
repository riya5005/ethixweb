"use client";
import { useState, useRef } from "react";

const services = ["Website Development", "Google Ads", "Local SEO", "WhatsApp Marketing", "Not sure yet"];
const input = "mt-1 w-full rounded-xl border bg-white px-4 py-3 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function ContactForm() {
  const [state, setState] = useState({ status: "idle", msg: "" });
  const loadedAt = useRef(Date.now()); // used for the "too fast = bot" check

  async function submit(e) {
    e.preventDefault();
    setState({ status: "loading", msg: "" });
    const body = { ...Object.fromEntries(new FormData(e.target)), t: loadedAt.current };
    try {
      const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) return setState({ status: "error", msg: data.error || "Something went wrong." });
      e.target.reset();
      setState({ status: "ok", msg: "Thank you! We will reply in under an hour." });
    } catch {
      setState({ status: "error", msg: "Network error. Please check your connection and try again." });
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-4">
      {/* Honeypot: hidden from humans, bots fill it in. */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="block text-sm font-medium">Your name<input name="name" required minLength={2} className={input} /></label>
      <label className="block text-sm font-medium">Email<input name="email" type="email" required className={input} /></label>
      <label className="block text-sm font-medium">Phone (optional)<input name="phone" type="tel" placeholder="+91 98765 43210" className={input} /></label>
      <label className="block text-sm font-medium">What do you need?
        <select name="service" className={input}>{services.map((s) => <option key={s}>{s}</option>)}</select></label>
      <label className="block text-sm font-medium">Tell us about your business<textarea name="message" required minLength={10} rows={4} className={input} /></label>
      <button disabled={state.status === "loading"} className="w-full rounded-full bg-brand py-3 font-semibold text-white transition hover:bg-red-800 active:scale-95 disabled:opacity-60">
        {state.status === "loading" ? "Sending..." : "Send enquiry"}
      </button>
      {state.msg && <p role="status" className={state.status === "ok" ? "text-green-700" : "text-brand"}>{state.msg}</p>}
    </form>
  );
}
