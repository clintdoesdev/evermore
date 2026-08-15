# Evermore Website

The official marketing site, admin console, and member portal for **Evermore** — "Exist Beyond the Moment." Built with Next.js (App Router), TypeScript, Tailwind CSS, and PostgreSQL (Prisma).

## Architecture: three hosts, one app

This is a single Next.js deployment that serves three logical sites based on the request's subdomain, handled in `src/proxy.ts` (Next 16 renamed `middleware.ts` → `proxy.ts`):

| Host | Serves | Indexable |
|---|---|---|
| `evermorewebsite.com.ng` (apex) | Public marketing site (`src/app/(marketing)/...`) | Yes |
| `admin.evermorewebsite.com.ng` | Internal admin console (`src/app/admin/...`) | No — `noindex` |
| `dashboard.evermorewebsite.com.ng` | Member portal (`src/app/portal/...`) | No — `noindex` |

The proxy rewrites `admin.*` requests to the internal `/admin/*` routes and `dashboard.*` requests to `/portal/*`, and returns a 404 if `/admin` or `/portal` is requested directly on the apex domain — those route trees are only reachable through their own subdomain. Each host has its own root layout (`(marketing)/layout.tsx`, `admin/layout.tsx`, `portal/layout.tsx`) since they need entirely different chrome.

`noindex` is enforced three ways on both subdomains: page-level `robots` metadata, `robots.ts` behaves the same for any host (it always points at the marketing sitemap), and — most robustly — the proxy sets an `X-Robots-Tag: noindex, nofollow, noarchive` response header on every response served from `admin.*` / `dashboard.*`.

### How someone joins

1. Admin logs into `admin.<domain>`, opens **Invites**, and generates a unique invite link (`dashboard.<domain>/join/<token>`).
2. The admin sends that link to the person directly — there is no public sign-up into the member system.
3. The invitee opens the link, registers (name/email/password), and lands on their portal dashboard in a **pending** state.
4. Once the admin confirms payment (manually, in **Members** — there's no live payment processor wired up yet), they mark the member **Active**, and the portal dashboard reflects that on next load.

Invite links are single-use: once registered, the invite flips to `USED` and the link no longer works.

## Marketing pages

- `/` — Landing page
- `/how-to-register` — Step-by-step registration guide (with `HowTo` + `FAQPage` structured data)
- `/sign-up` — Client-side demo form (no backend; redirects to `/payment` on submit) — unrelated to the real invite-gated member system
- `/payment` — Membership plans and checkout UI, priced in Naira (no live payment integration yet)

## Local development

### 1. Install dependencies

```bash
npm install
```

### 2. Set up PostgreSQL

Create a database and a `.env` (copy `.env.example`):

```bash
cp .env.example .env
```

Fill in:
- `DATABASE_URL` — your Postgres connection string
- `SESSION_SECRET` — generate with `openssl rand -base64 32`
- `ADMIN_SEED_USERNAME` / `ADMIN_SEED_PASSWORD` — used once by the seed script

### 3. Run migrations and seed the admin account

```bash
npm run db:migrate   # creates tables
npm run db:seed      # creates the AdminUser row from ADMIN_SEED_USERNAME/PASSWORD
```

After seeding, you can remove `ADMIN_SEED_USERNAME`/`ADMIN_SEED_PASSWORD` from `.env` — they're only read by the seed script, never by the running app.

### 4. Run the dev server

```bash
npm run dev
```

The marketing site is at `http://localhost:3000`. To exercise the admin/portal subdomains locally, either:
- Edit `/etc/hosts` to map `admin.localhost` and `dashboard.localhost` to `127.0.0.1`, then visit `http://admin.localhost:3000` / `http://dashboard.localhost:3000` (most browsers, and Chromium in particular, resolve any `*.localhost` host to loopback automatically, so this often works with no `/etc/hosts` edit at all), or
- Send requests with a custom `Host` header pointed at your dev server.

## Production deployment checklist

1. **DNS**: point `admin.<domain>` and `dashboard.<domain>` at the same target as the apex domain (same hosting project/deployment — this is one app, not three).
2. **Database**: provision a real PostgreSQL instance and set `DATABASE_URL` in your hosting provider's environment variables.
3. **Secrets**: set `SESSION_SECRET` to a fresh random value (`openssl rand -base64 32`) — different from any value used locally.
4. **Migrate**: run `npm run db:deploy` (uses `prisma migrate deploy`, safe for production) against the production database.
5. **Seed the admin account**: set `ADMIN_SEED_USERNAME` / `ADMIN_SEED_PASSWORD` in the production environment, run `npm run db:seed` once, then remove those two variables from the environment (they're not needed again — the password is stored only as a bcrypt hash in the database).
6. Update `src/lib/site-config.ts` if the production domain, social links, or contact email change.

**Security note:** the admin password used during local development/testing was shared in plaintext in this conversation. Treat it as compromised and change it (re-run the seed script with a new `ADMIN_SEED_PASSWORD`, or add an "change password" flow) before relying on it in production.

## SEO (marketing site only)

- Per-page metadata (title, description, canonical, Open Graph, Twitter cards)
- JSON-LD structured data: `Organization`, `WebSite`, `HowTo`, `FAQPage`, `BreadcrumbList`, `Product`
- `robots.ts`, `sitemap.ts`, `manifest.ts`
- Optimized favicon/app icon set (`favicon.ico`, `icon.png`, `apple-icon.png`) and a dedicated `og-image.jpg`

## Build

```bash
npm run build
npm start
```

## Still frontend-only

- `/sign-up` and `/payment` on the marketing site are demo flows with no backend — they're intentionally separate from the real invite-gated member system under `admin.*` / `dashboard.*`.
- No live payment processor is integrated; member activation is a manual admin action.
