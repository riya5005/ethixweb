# Ethixweb India

A redesign of ethixweb.com for Indian businesses: a fast public website, an enquiry form that saves leads to MongoDB, and a password-protected admin page to manage them. Built for the Ethixweb Full Stack Developer assessment.

## Links

- **Live site:** https://ethixweb-beta.vercel.app
- **Admin:** https://ethixweb-beta.vercel.app/admin
- **Demo admin password:** Ethix2026
- **PageSpeed screenshots:** `/screenshots` (mobile and desktop)

## Features

- **Pages:** Home, Services, About and Contact, sharing one design system.
- **Enquiry form:** server-side validation, spam protection, saved to MongoDB.
- **Admin (`/admin`):** view all leads, change status (new, contacted, won, lost), delete.

## Tech stack

| Tool | Why |
|---|---|
| Next.js 14 (App Router) | Server-rendered pages send little JavaScript, which helps PageSpeed. The API lives in the same project. |
| Tailwind CSS | Consistent design with a small CSS file. |
| MongoDB Atlas | Free cloud database; a lead is a small JSON-like record. |
| Vercel | Simple GitHub deploys and safe storage for secrets. |

## Why it feels Indian

- **Content:** services built around how India buys: UPI and COD checkout, click-to-WhatsApp ads, GST-ready invoices, local SEO. Prices in ₹, support hours in IST.
- **WhatsApp button on every page**, since it's the most natural way to reach many Indian customers.
- **Indian mobile validation** (+91, starting 6 to 9) and case studies from Jaipur, Pune and Bengaluru.
- **Design:** Ethixweb red with a small saffron accent, a thin saffron-white-green footer line, and a jaali-inspired dot pattern made with pure CSS.
- **Performance:** built for budget Android phones and slow data, with minimal client-side JavaScript.

## How the backend works

1. The form sends data to `POST /api/leads`.
2. **Spam protection:** a hidden honeypot field, a 3-second minimum fill time, and a limit of 5 enquiries per IP per 10 minutes.
3. **Validation on the server:** name, email, phone format, allowed service, and message length (10 to 1000 characters).
4. **Save** to the `leads` collection. Errors return clear messages with proper status codes (400, 401, 429, 500).

**Admin login:** the password is an environment variable. A correct login sets an `httpOnly`, `secure`, `sameSite=strict` cookie (8 hours) holding a SHA-256 hash of the password plus a secret. `middleware.js` checks it before any `/admin` or `/api/admin` request.

## Run locally

Needs Node.js 18+ and a free MongoDB Atlas account.

```
npm install
cp .env.example .env.local   # fill in the 3 values below
npm run dev
```

```
MONGODB_URI=your Atlas connection string
ADMIN_PASSWORD=password for /admin
ADMIN_SECRET=any long random text
```

Open http://localhost:3000. The database and collection are created on the first saved lead. In Atlas → Network Access, allow your IP (`0.0.0.0/0` for Vercel).

### Troubleshooting: MongoDB connection errors

If the contact form shows "Could not save your enquiry" and the terminal logs `ECONNREFUSED` (`querySrv`), `ENOTFOUND`, or a TLS / `ReplicaSetNoPrimary` error:

1. **Allow your IP in Atlas:** Network Access → add your current IP (or `0.0.0.0/0` for testing). Wait until it shows *Active*.
2. **Try a mobile hotspot.** Some college, office or ISP networks block the DNS SRV lookup that `mongodb+srv://` strings need.
3. **Use the standard (non-SRV) connection string** from Atlas → Connect → Drivers if the SRV one still fails:
   ```
   MONGODB_URI=mongodb://<user>:<password>@<shard-host-1>:27017,<shard-host-2>:27017,<shard-host-3>:27017/?tls=true&authSource=admin&replicaSet=<replica-set>&retryWrites=true&w=majority
   ```
4. **Check `.env.local`:** it must be in the project root, contain no `<` `>` characters, have special characters in the password URL-encoded (`@` → `%40`), and the server must be restarted after any change.

## Deploy

Push to GitHub, import the repo on Vercel, add the three environment variables, and deploy. `.env.local` is git-ignored, so secrets stay private.

## Problems I ran into

- **Couldn't connect to MongoDB locally** (`querySrv ECONNREFUSED`, then `ENOTFOUND`): my network blocked the DNS SRV lookup used by `mongodb+srv://` strings. Using the standard (non-SRV) connection string fixed it.
- **TLS handshake error afterwards:** Atlas was rejecting my IP, which changes often on my ISP. Allowing `0.0.0.0/0` fixed it (also required for Vercel).
- **"Could not save your enquiry" on the live site:** the Vercel runtime logs showed `MONGODB_URI is missing`. Environment variables apply only to new deployments, so I added them and redeployed.

## Limitations and next steps

- Rate limit is in memory and resets on restart; production would use Upstash Redis.
- One shared admin password; a real team would need user accounts (e.g. NextAuth).
- Testimonials, case studies, prices and the WhatsApp number are sample content.
- `0.0.0.0/0` on the database is a trade-off for this assessment; production would use a tighter allowlist.
- Next: email or WhatsApp alert for new leads, search/filter and CSV export in admin.
