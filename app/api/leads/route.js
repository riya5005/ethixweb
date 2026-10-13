import { NextResponse } from "next/server";
import { leadsCollection } from "@/lib/mongodb";

const SERVICES = ["Website Development", "Google Ads", "Local SEO", "WhatsApp Marketing", "Not sure yet"];
const hits = new Map(); // ip -> timestamps. In-memory rate limit (see README for the limitation).
const fail = (error, status = 400) => NextResponse.json({ error }, { status });

export async function POST(req) {
  try {
    // 1. Rate limit: max 5 enquiries per IP per 10 minutes
    const ip = (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
    if (recent.length >= 5) return fail("Too many requests. Please try again later.", 429);

    const b = await req.json();

    // 2. Spam traps: honeypot filled, or form submitted in under 3 seconds
    if (b.website) return NextResponse.json({ ok: true }); // pretend success so bots don't adapt
    if (now - Number(b.t) < 3000) return fail("Please take a moment and try again.");

    // 3. Validation (never trust the browser)
    const name = String(b.name || "").trim();
    const email = String(b.email || "").trim().toLowerCase();
    const phone = String(b.phone || "").trim();
    const message = String(b.message || "").trim();
    if (name.length < 2 || name.length > 80) return fail("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail("Please enter a valid email.");
    if (phone && !/^(\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/.test(phone)) return fail("Please enter a valid Indian mobile number.");
    if (!SERVICES.includes(b.service)) return fail("Please choose a service.");
    if (message.length < 10 || message.length > 1000) return fail("Message must be 10 to 1000 characters.");

    // 4. Save to the database
    const leads = await leadsCollection();
    await leads.insertOne({ name, email, phone: phone || null, service: b.service, message, status: "new", created_at: new Date() });

    hits.set(ip, [...recent, now]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("lead error:", err);
    return fail("Could not save your enquiry. Please try again.", 500);
  }
}
