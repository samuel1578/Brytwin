# Brytwin Homes — Client Handover

Thank you! This repo contains the Brytwin Homes website. This README helps the client, editors, and maintainers quickly understand how to run, maintain and update the site.

---

## 📘 Project Overview
- Repo content: A Vite + React (TypeScript) site built with Tailwind-like utility styles.
- Key pages: Home, About, Services, Gallery, Properties, Contact.
- Important features:
  - Global `BookingModal` for booking consultations (open anywhere)
  - Centralized `CONTACTS` config for phone numbers
  - `Contact` form + `BookingModal` both post to Formspree (form ID: `mvgjjvoz`)
  - `Seo` component for page meta/OG
  - Images lazy-loaded on Gallery & Properties pages
  - `ContactChooser` modal (Call/WhatsApp) used across the site
  - React, React-Router, react-hook-form + zod validation

---

## ⚙️ Quick Setup (for editors / devs)
PowerShell commands:

```powershell
# Install dependencies
npm ci

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npx serve dist
# Or use Vite preview
npm run preview
```

Notes:
- If you get `npm audit` warnings, run `npm run audit` to view details and `npm run audit:fix` to attempt safe upgrades.
- If you see TypeScript warnings related to temporary shims, they can be safely removed once the related dependencies are installed.

---

## 🚀 Deploying (Netlify / Vercel recommended)
- Vercel: connect repository to Vercel, Build command: `npm run build`, Output directory: `dist`.
- Netlify: add `_redirects` or use Netlify _headers file for SPA fallback. Example `_redirects` file:
```
/* /index.html 200
```
- Make sure the host has a SPA fallback (Netlify/Vercel do by default or via redirect file).

---

## 🧾 Key Files & Where to Edit
- `src/config/contacts.ts` — central contact numbers and WhatsApp/tel links. Edit here to change phone numbers across the site.
- `src/components/BookingModal.tsx` — booking modal content + form.
- `src/pages/Contact-Us.tsx` — Contact page and contact form.
- `src/components/ContactChooser.tsx` — small modal to choose Call/WhatsApp.
- `src/components/Seo.tsx` — per-page SEO and OG tags. Edit titles, descriptions, and images by updating props in pages.
- `public/og/` — maintain OG images for each page (home, services, properties, contact)
- `public/sitemap.xml` & `public/robots.txt` — search engines files

---

## 📄 Forms (Formspree) — How they work
- Current form ID used by contact & booking: `https://formspree.io/f/mvgjjvoz`.
- To change the Formspree endpoint: update the fetch POST URL in the BookingModal and Contact-Us files.
- Honeypot: forms include a `website` hidden field; if it is filled, the submission is treated as spam and silently ignored. This reduces bot submissions.
- To modify the form fields shown in the inbox (Formspree): log in to Formspree and configure the form.

---

## 🔐 Security & Maintenance
- NPM audit checks & CI:
  - Local audit: `npm run audit`
  - Auto-fix: `npm run audit:fix` (non-breaking changes)
  - There’s a GitHub Action that runs `npm audit` on push/PR and weekly.
- Keep dependencies updated: we recommend enabling Dependabot or Renovate.
- Consider adding reCAPTCHA to forms for high-traffic sites (not mandatory given low traffic expectation).

---

## 📈 Analytics & Monitoring (Recommended)
- Add a privacy-friendly analytics tool or GA4 (set up a property and paste the script in `index.html` or a tracking component).
- Consider Sentry for error monitoring so the support team receives errors in production.

---

## ♿ Accessibility Notes
- The booking modal has: `role="dialog"`, `aria-modal`, and `aria-labelledby`. It focuses the first input when opened, but does not currently trap focus.
- Suggestion: add a focus trap (`focus-trap-react` or a component library dialog) if strict keyboard-only accessibility is required.

---

## ✅ Final Pre-Launch Checklist
Use this checklist before giving the site to the client as the final actionable items:
1. [ ] Run `npm ci` then `npm run build` and preview `dist`. Confirm assets exist in `dist/assets` and the site loads with no 404s.
2. [ ] Test flows in local dev / build preview:
   - Booking modal: open/form validation/submission toast + Formspree receives the result.
   - Contact page / form: validation, honeypot, toast and Formspree.
   - Contact chooser: Call/WhatsApp links open as expected.
3. [ ] Confirm `Seo` props exist for pages and OG images are present in `public/og/`.
4. [ ] Run Lighthouse audits (desktop and mobile) and address the top 3 issues (images, caching, third-party JS, large bundle slices).
5. [ ] Run `npm run audit`, `npm run audit:fix`, and deploy only after confirming no critical vulnerabilities remain.
6. [ ] Set up analytics & Sentry if desired.
7. [ ] Deploy to your hosting and verify.

---

## 📦 Updating Content & Images
- To change a hero image or other image assets: update `src/assets/*` or the referenced Drive URLs in the properties spreadsheet (if Drive is used).
- Add OG images in `public/og/` and update `Seo` calls with the proper path (relative to public: `/og/home.jpg`, e.g.).
- Update contact phone numbers in `src/config/contacts.ts` to take effect across the site.

---

## 🧰 Developer Hints / Notes for Maintenance
- If you need to add a page, add it under `src/pages/`, update `App.tsx` routes, and set the `Seo` component on the new page.
- The app uses `React.lazy` + `Suspense` for route splitting — keep that pattern for large pages.
- If you add new third-party libraries, prefer dynamic imports to improve initial bundle size.
- If you need to remove the type shims for packages, delete `src/types/shims.d.ts` after installing real dependencies and update `tsconfig.app.json` accordingly.

---

## 🔧 Troubleshooting Tips
- If `dist/index.html` looks blank:
  - Check the browser console for errors and check `Network` for 404s to `assets/`.
  - Re-run `npm run build` and confirm `dist/assets` contains CSS/JS.
- If `npm install` fails:
  - Check call to `npm config get registry`. If using a private registry, ensure credentials are valid.
  - Run `npm cache clean --force`, remove `node_modules` and `package-lock.json` and retry.

---

## ⛑️ Support / Handover Contacts
- Primary developer: (Provide contact name/info if you'd like us to include it.)
- Support guidance:
  - How to change contact numbers: `src/config/contacts.ts`.
  - How to change hero images: `src/assets` or page component.
  - How to modify Formspree forms: log in to https://formspree.io and choose the form.

---

## Additional work you might want:
- Implement focus trap for the booking modal
- Add reCAPTCHA and honeypot improvements for forms
- Add monitoring & analytics
- Improve Lighthouse scores by compressing images and enabling faster loading techniques (LQIP, preconnect, preload for fonts)

---

