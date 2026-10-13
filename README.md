# Ethixweb India

India-specific redesign of ethixweb.com. Full stack: public site, enquiry form saved to MongoDB (Atlas), protected `/admin`.

## Tech stack (and why)
- **Next.js 14 (App Router)**: public pages are server-rendered with almost no client JS, which helps PageSpeed. API routes give us the backend in the same repo.
- **Tailwind CSS**: consistent design system with small CSS output.
- **MongoDB Atlas**: real database, free tier, flexible JSON documents.
- **Vercel**: one-click deploy, env vars in dashboard.

## Structure
- `app/` pages (`/`, `/services`, `/about`, `/contact`, `/admin`)
- `app/api/leads` public enquiry endpoint
- `app/api/admin/*` login + lead management (protected)
- `middleware.js` blocks `/admin` and `/api/admin` without the login cookie
- `lib/content.js` all copy in one place

## Backend: how it works
1. **Form** sends JSON to `POST /api/leads`.
2. **Spam protection**: hidden honeypot field, 3-second timing check, rate limit (5 per IP per 10 min).
3. **Validation on the server**: name, email, Indian mobile format (`+91`, starts 6-9), message length, service from an allowed list.
4. **Saved** in the `leads` table in the `leads` collection. The connection string is in an env var and only used on the server, so the browser can never read leads.
5. **Admin login**: password from env var. On success we set an `httpOnly`, `secure`, `sameSite=strict` cookie holding a SHA-256 hash of password+secret. Middleware compares it on every admin request.
6. **Errors**: every route returns clear JSON errors and correct status codes (400, 401, 429, 500).

## Design rationale: what makes it India-specific
- **Red brand kept, saffron accent added**, plus a tricolour line in the footer.
- **Poppins** (designed by an Indian foundry) as the single font, fast and clean.
- **Jaali (lattice) pattern** in the hero, a nod to Indian architecture, done in pure CSS.
- **Content that matches how India buys**: UPI, WhatsApp, GST, ₹ pricing, regional languages, local SEO ("near me").
- **Contact form** accepts Indian mobile numbers; support hours shown in IST; admin dates in IST.
- **About page** tells the story: US-focused agency building for India.

### What improved over the current site
- Audience: India first, not US first.
- WhatsApp and local-language services added.
- Real working lead pipeline with admin dashboard.
- Mostly server-rendered, minimal JavaScript, one entrance animation, `prefers-reduced-motion` respected.

## Run locally
```
npm install
cp .env.example .env.local   # fill values
npm run dev
```
## Deploy
Push to GitHub, import on Vercel, add the 3 env vars from `.env.example`.

## Known limitations (be honest in the interview)
- Rate limit is in-memory, so it resets on cold starts. Production fix: Upstash Redis.
- Single shared admin password. Production fix: an auth service such as NextAuth with individual users.
- Case studies are samples. Logo is text; swap in the official file.
- Add your PageSpeed screenshots and demo admin login here after deploying.
