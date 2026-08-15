# Evermore Website

The official marketing site for **Evermore** — "Exist Beyond the Moment." Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Pages

- `/` — Landing page
- `/how-to-register` — Step-by-step registration guide (with `HowTo` + `FAQPage` structured data)
- `/sign-up` — Client-side registration form (no backend; redirects to `/payment` on submit)
- `/payment` — Membership plans and checkout UI (no live payment integration yet)

## SEO

- Per-page metadata (title, description, canonical, Open Graph, Twitter cards)
- JSON-LD structured data: `Organization`, `WebSite`, `HowTo`, `FAQPage`, `BreadcrumbList`, `Product`
- `robots.ts`, `sitemap.ts`, `manifest.ts`
- Optimized favicon/app icon set (`favicon.ico`, `icon.png`, `apple-icon.png`) and a dedicated `og-image.jpg`

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Before going live

- Update `src/lib/site-config.ts` with the real production domain (`url`), social links, and contact email.
- Wire up real authentication/payment processing (`/sign-up` and `/payment` are currently frontend-only).
