# Ethixweb India

A redesign of ethixweb.com, made for Indian businesses. It has a public website, an enquiry form that saves leads to a real database, and a password-protected admin page where you can manage those leads.

I built this for the Ethixweb Full Stack Developer assessment.

## Links

- **Live site:** ADD_YOUR_VERCEL_URL
- **Admin page:** ADD_YOUR_VERCEL_URL/admin
- **Demo admin password:** ADD_DEMO_PASSWORD (a separate password made just for review)
- **PageSpeed screenshots:** see the `/screenshots` folder (mobile and desktop)
- **Walkthrough video:** ADD_LINK_IF_YOU_RECORD_ONE

## What's in it

- **Home page:** hero with a clear promise, services, how we work, featured work, why Ethixweb, testimonials, FAQ and a call to action.
- **Services, About and Contact pages:** same design system as the home page.
- **Enquiry form:** validates the input, blocks spam and saves the lead to MongoDB.
- **Admin page (`/admin`):** log in, see every lead, change its status (new, contacted, won, lost) or delete it.

## Tech stack, and why I chose it

| Tool | Why |
|---|---|
| **Next.js 14 (App Router)** | Pages are rendered on the server and send very little JavaScript to the browser, which helps PageSpeed. The backend API lives in the same project. |
| **Tailwind CSS** | Keeps the design consistent across pages and the CSS file small. |
| **MongoDB Atlas** | A real cloud database with a free tier. A lead is a small JSON-like record, so it fits well. |
| **Vercel** | Easy deploys from GitHub, with a safe place for secret keys. |

## Design rationale: why it feels Indian

The brief said how to make it India-specific was up to me, so here are my choices and the reasons.

- **Content that matches how India buys.** Indian customers pay with UPI, ask questions on WhatsApp, and search for things "near me". So the services are built around UPI and COD checkout, click-to-WhatsApp ads, GST-ready invoices and local SEO. Prices are in ₹.
- **A WhatsApp button on every page.** It's the most natural way for many Indian customers to get in touch, so it's always one tap away.
- **Local touches.** The case studies are from Jaipur, Pune and Bengaluru. Support hours are shown in IST, and the form accepts Indian mobile numbers (+91, starting with 6 to 9).
- **Colour.** I kept the Ethixweb red and added saffron as a small accent, with a thin saffron, white and green line in the footer. It's a quiet nod to India without turning the site into a flag.
- **A pattern from Indian architecture.** The dark sections have a faint dot lattice inspired by jaali screens. It's pure CSS, so it costs nothing in page weight.
- **Fast on cheap phones and slow data.** Many visitors are on budget Android phones. The site uses one font, no images, no heavy libraries, and almost no client-side JavaScript.

### What I improved over the current site

- It speaks to Indian businesses first, instead of US businesses.
- WhatsApp marketing and local SEO are added as services.
- The enquiry form actually works end to end, with spam protection and an admin dashboard.
- The pages load fast because they are mostly server-rendered, with one entrance animation and everything else on hover or tap.
- Motion respects `prefers-reduced-motion`.

## How the backend works

1. The form sends the details to `POST /api/leads`.
2. **Spam protection** runs first:
   - A hidden field that humans never see. Bots fill it in, and we quietly drop those requests.
   - A timer. Forms submitted in under 3 seconds are rejected.
   - A rate limit of 5 enquiries per IP address per 10 minutes.
3. **Validation on the server.** The browser can't be trusted, so we re-check everything: name length, email format, Indian mobile format, the service must be from our list, and the message must be 10 to 1000 characters.
4. **Save.** The lead goes into the `leads` collection in MongoDB.
5. **Errors.** Every route returns a clear message and the right status code (400, 401, 429 or 500).

### Admin login

- The password lives in an environment variable, not in the code.
- When you log in correctly, the server sets a cookie that is `httpOnly` (scripts on the page can't read it), `secure`, and `sameSite=strict`. It lasts 8 hours.
- The cookie holds a SHA-256 hash of the password plus a secret, so nobody can fake it without knowing both.
- `middleware.js` checks that cookie before any `/admin` page or `/api/admin` request runs. No cookie means a redirect to the login page.

## Project structure

```
app/
  page.js, services/, about/, contact/   public pages
  admin/                                 admin dashboard and login
  api/leads/                             public enquiry endpoint
  api/admin/                             login and lead management (protected)
components/                              nav, footer, icons, contact form
lib/
  content.js                             all text, prices and sample data in one place
  mongodb.js                             database connection
  auth.js                                admin token helper
middleware.js                            protects /admin
```

## Run it on your computer

You need Node.js 18 or newer and a free MongoDB Atlas account.

1. Install the packages:
   ```
   npm install
   ```
2. Copy the example settings file and fill it in:
   ```
   cp .env.example .env.local
   ```
   ```
   MONGODB_URI=your MongoDB Atlas connection string
   ADMIN_PASSWORD=a password for the admin page
   ADMIN_SECRET=any long random text
   ```
3. Start it:
   ```
   npm run dev
   ```
4. Open http://localhost:3000. The admin page is at http://localhost:3000/admin.

You don't need to create the database or collection. MongoDB creates them when the first lead is saved. In Atlas, allow your IP under **Network Access** (`0.0.0.0/0` for Vercel).

## Deploy

1. Push this project to GitHub. `.env.local` is in `.gitignore`, so your secrets stay private.
2. Import the repo on Vercel.
3. Add the three environment variables (`MONGODB_URI`, `ADMIN_PASSWORD`, `ADMIN_SECRET`).
4. Deploy.

## Honest limitations

I'd rather say these upfront than have them found:

- **The rate limit lives in memory,** so it resets when the server restarts. For production I'd use Upstash Redis.
- **There is one shared admin password.** For a real team I'd add proper user accounts with something like NextAuth.
- **The testimonials, case studies, prices and the WhatsApp number are sample content** that I wrote for the assessment. They'd be replaced with real data.
- **The logo is a text wordmark.** I'd swap in the official Ethixweb logo file.
- **There are no email notifications yet.** A new lead only shows up in the admin page. Sending an email or WhatsApp alert is the next feature I'd add.

## What I'd do next

- Email or WhatsApp alert for each new lead.
- Search, filters and CSV export in the admin page.
- Regional language versions of the site.
- Real case studies with photos.
