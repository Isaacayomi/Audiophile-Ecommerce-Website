# Audiophile E-commerce Website

A full-stack e-commerce platform for premium audio gear — headphones, speakers, and earphones. The storefront is built for shoppers, and a separate admin dashboard lets store owners manage the catalog, sync products to a live backend, and receive email notifications when orders come in.

---

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232A.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [State Management](#state-management)
- [Caching Architecture](#caching-architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)
- [Stripe & Payments](#stripe--payments)
- [Admin Dashboard](#admin-dashboard)
- [Author](#author)

---

## Features

### Storefront
- Browse **headphones, speakers, and earphones** across dedicated category pages
- Full product detail pages with gallery, features list, box contents, and related products
- Responsive layout across mobile, tablet, and desktop
- Scroll-triggered animations via a shared **Rhythm motion system** (Framer Motion)
- Responsive image component that serves the right resolution per breakpoint

### Shopping Cart & Checkout
- Persistent cart — items survive page refreshes and navigation via localStorage
- Quantity picker on product pages; per-item increment/decrement controls inside the cart modal
- Checkout form with client-side validation (React Hook Form)
- Stripe-hosted payment flow: the form sends a checkout session request to the backend, then redirects the user to Stripe
- Post-payment success page that displays the exact items ordered and a running cost breakdown

### Authentication
- Sign-up, sign-in, and SSO (Google) via **Clerk**
- `/checkout` and `/admin` routes are middleware-protected — unauthenticated users are redirected to sign-in
- Auth toast notifications on sign-in and sign-up success

### Email Notifications
- When a Stripe payment completes, a webhook fires and sends an order summary email to the store owner via **Resend**
- Webhook signature verification (HMAC-SHA256 with timing-safe comparison) to prevent spoofed events
- Replay-attack protection via a 5-minute timestamp tolerance window

### Admin Dashboard
- Secure dashboard with sidebar navigation, accessible only to signed-in users
- Catalog metrics: total value, live product count, low-stock alerts, recent orders
- **Products page**: search and filter by category; CRUD operations (create, edit, delete)
- **Product form**: set name, category, price, stock, description, visibility status (`Live` / `Draft` / `Hidden`), and upload a product image
- Real-time **catalog sync** — changes in the admin are pushed to the FastAPI backend and reflected on the storefront immediately via cache invalidation
- Settings page: store name, support email, sync toggles, storefront notes

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 15 | App Router, SSR, API routes, middleware |
| **React** | 19 | UI library |
| **TypeScript** | 5 | End-to-end type safety |
| **Redux Toolkit** | 2 | Client-side state (cart, modals, admin UI) |
| **TanStack React Query** | 5 | Server-state management for admin catalog queries |
| **React Hook Form** | 7 | Checkout form validation |
| **Clerk** | 7 | Authentication — sign-up, sign-in, SSO, route protection |
| **Framer Motion** | 12 | Scroll-triggered animations |
| **Tailwind CSS** | 4 | Utility-first styling |
| **React Hot Toast** | 2 | Toast notifications |
| **Resend** | 6 | Transactional email (order notifications) |
| **Jest** | 30 | Unit test runner |
| **React Testing Library** | 16 | Hook and component testing |

---

## Project Structure

```
audiophile-website/
├── app/
│   ├── _components/          # Shared storefront UI
│   │   ├── ui/               # Cart, modals, nav menu, Rhythm animation system
│   │   └── ...               # Header, Footer, Hero, product sections
│   ├── admin/                # Admin dashboard (protected)
│   │   ├── _components/      # Admin hooks, skeletons, catalog provider
│   │   ├── _lib/             # Catalog utilities and fallback data
│   │   ├── products/         # Products list and new product form
│   │   └── settings/         # Admin settings page
│   ├── api/
│   │   ├── checkout-session/ # Proxies to FastAPI Stripe session endpoint
│   │   ├── storefront-cache/ # Mutates the server-side product cache
│   │   └── stripe/webhook/   # Stripe webhook — triggers order email
│   ├── lib/
│   │   ├── checkout.ts       # Price formatting and checkout totals
│   │   ├── products.server.ts# Server-side product fetching with fallbacks
│   │   ├── storefrontCatalogCache.ts # Disk-based + in-memory cache
│   │   └── storefrontRoutes.ts       # Slug resolution and legacy aliases
│   ├── store/                # Redux slices
│   │   ├── uiState/          # Nav, cart, checkout, order modals, cart items
│   │   ├── adminCatalog/     # Admin products, orders, settings
│   │   ├── adminUi/          # Sidebar, product filter, settings draft
│   │   └── adminProductForm/ # Product form fields and image upload state
│   ├── checkout/             # Checkout page and success page
│   ├── headphones/           # Category + product detail pages
│   ├── speakers/
│   ├── earphones/
│   └── sign-in/ sign-up/    # Clerk auth pages
├── __tests__/                # Unit tests
│   ├── lib/                  # Checkout and route utility tests
│   ├── store/                # Redux slice tests
│   ├── admin/                # Admin catalog utility tests
│   └── hooks/                # Custom hook tests
├── middleware.ts              # Clerk route protection
├── jest.config.ts            # Jest configuration
└── jest.setup.ts             # Test environment setup
```

---

## State Management

The app uses **Redux Toolkit** for all client-side state, split into focused slices:

| Slice | What it manages |
|---|---|
| `ui` | Mobile nav menu open/close |
| `cart` | Cart modal open/close |
| `checkout` | Checkout modal open/close |
| `orderCompletion` | Order confirmation modal open/close |
| `cartValue` | Cart line items, quantities, badge count — **persisted to localStorage** |
| `adminCatalog` | Admin products, orders, settings, sync status |
| `adminUi` | Sidebar state, product filter query/category, settings draft |
| `adminProductForm` | Product form fields, save mode, image upload state |

Cart persistence is handled by a `CartPersistence` component inside `Providers` that hydrates from localStorage on mount and subscribes to the Redux store to keep them in sync.

Admin catalog data is fetched and mutated via **TanStack React Query** hooks (`useAdminCatalogQueries`) which handle loading, upsert, delete, and post-write polling until the backend confirms the change.

---

## Caching Architecture

Product data flows through a layered cache to keep the storefront fast even when the backend is slow or temporarily unreachable:

```
FastAPI backend
       ↓
  products.server.ts (fetches with AbortController timeout)
       ↓
  Disk cache  (.audiophile-cache/storefront-catalog.json)
       ↓  ↑  (read on cold start, written after every backend fetch)
  In-memory cache  (globalThis — survives Next.js hot reloads)
       ↓
  Storefront pages
```

When an admin publishes or deletes a product, a `POST /api/storefront-cache` call mutates both layers and calls `revalidateTag("products")` to bust Next.js's fetch cache.

Base64 image uploads are stored only in the local cache — the remote API receives a clean URL-only payload (the base64 is stripped before any remote write).

---

## Getting Started

### Prerequisites

- Node.js 18+
- A running [FastAPI backend](https://github.com/Isaacayomi/Audiophille-database) for product data and Stripe session creation
- A [Clerk](https://clerk.com) account for authentication
- A [Stripe](https://stripe.com) account for payments
- A [Resend](https://resend.com) account for order notification emails

### Installation

```bash
git clone https://github.com/Isaacayomi/Audiophile-Ecommerce-Website.git
cd Audiophile-Ecommerce-Website
npm install
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# ── Clerk Authentication ─────────────────────────────────────────────────────
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_key_here
CLERK_SECRET_KEY=sk_live_your_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/checkout?auth=sign_in_success
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/checkout?auth=sign_in_success

# ── Backend API ──────────────────────────────────────────────────────────────
# URL of the FastAPI backend that serves product data and creates Stripe sessions
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# ── Stripe ───────────────────────────────────────────────────────────────────
# Secret used to verify that webhook events genuinely come from Stripe
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# ── Resend (order notification emails) ──────────────────────────────────────
RESEND_API_KEY=re_your_resend_api_key
# The email address that receives order notifications
ORDER_NOTIFICATION_EMAIL=orders@yourdomain.com
# Optional: the "From" address shown in the notification email
MAIL_FROM="Audiophile <no-reply@yourdomain.com>"
```

> The app runs without Clerk keys (useful for local UI work), but `/checkout` and `/admin` routes will be unprotected. Stripe and Resend keys are only needed for the payment and email flows.

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the storefront and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin dashboard.

---

## Running Tests

The project uses **Jest 30** with **React Testing Library** and **Next.js's SWC compiler** so TypeScript and path aliases work in tests out of the box.

```bash
# Run the full test suite once
npm test

# Re-run tests automatically as you edit files
npm run test:watch
```

### What's tested

| Suite | File | Tests |
|---|---|---|
| Checkout utilities | `__tests__/lib/checkout.test.ts` | `formatPrice`, `calculateCheckoutTotals`, `normalizeCheckoutFormValues` |
| Slug resolution | `__tests__/lib/storefrontRoutes.test.ts` | Legacy slug aliases, cross-category isolation, edge cases |
| Cart Redux slice | `__tests__/store/cartValueSlice.test.ts` | Quantity picker, add/merge items, in-cart adjustments, remove, hydration |
| Admin catalog utilities | `__tests__/admin/catalog.test.ts` | `slugify`, product sort order, featured pinning, base64 stripping, storefront mapping |
| `useDelayedBoolean` hook | `__tests__/hooks/useDelayedBoolean.test.tsx` | Delay, no-early-flip, reset on false, timer cancellation, custom duration |

**76 tests across 5 suites — all passing.**

Every test file includes short comments explaining what `describe`, `it`, `expect`, `renderHook`, `act`, and fake timers do, so the tests are readable even if you're new to testing.

---

## Stripe & Payments

The checkout flow works like this:

1. The user fills in their details on `/checkout` and clicks **Continue & Pay**
2. The form `POST`s to `/api/checkout-session`, which proxies the request to the FastAPI backend
3. FastAPI creates a Stripe Checkout Session and returns a `url`
4. The browser redirects to that Stripe-hosted URL
5. After payment, Stripe redirects back to `/checkout/success`
6. Stripe also fires a `checkout.session.completed` webhook to `/api/stripe/webhook`
7. The webhook verifies the signature, then sends an order summary email via Resend

To test webhooks locally, use the [Stripe CLI](https://stripe.com/docs/stripe-cli):

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

## Admin Dashboard

Access the admin dashboard at `/admin`. You must be signed in via Clerk.

### Key capabilities

- **Dashboard** — catalog value, live product count, low-stock warnings, recent orders
- **Products** — searchable, filterable product list with inline status badges
- **New / Edit product** — name, category, price, stock, description, image upload, and visibility status (`Live` / `Draft` / `Hidden`)
- **Catalog sync** — changes are pushed to the FastAPI backend and the storefront cache is invalidated immediately so the public site reflects updates without a redeploy
- **Settings** — store name, support email, email alert toggle, catalog sync toggle

---

## Author

- **LinkedIn**: [Isaac Ayomide Okunlola](https://www.linkedin.com/in/isaac-ayomide-okunlola-3568b7275/)
- **X (Twitter)**: [@_devPRIME](https://x.com/_devPRIME)
- **GitHub**: [Isaacayomi](https://github.com/Isaacayomi)

---

*Built with Next.js 15, React 19, TypeScript, Redux Toolkit, Clerk, Stripe, Resend, and Tailwind CSS.*
