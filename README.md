# HireForge

A full-stack developer job portal built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **MongoDB**, and **JWT authentication**.

Real engineering roles with disclosed salary ranges, transparent tech stacks, and a straight line from search to application — no recruiter noise.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Backend | Next.js API Routes (Node.js runtime) |
| Database | MongoDB + Mongoose |
| Auth | JWT (via `jose`), httpOnly cookies, bcrypt password hashing |
| Validation | Zod |

---

## 1. Prerequisites

- Node.js 18.18+ (Node 20 LTS recommended)
- A MongoDB connection string — the free tier of [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) works well, or a local MongoDB instance

## 2. Install

```bash
npm install
```

## 3. Configure environment variables

Copy the example file and fill in your own values:

```bash
cp .env.example .env.local
```

```
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/hireforge
JWT_SECRET=<a long random string>
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Generate a strong `JWT_SECRET` quickly with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

## 4. Seed the database

This populates two demo accounts and ~20 realistic job listings so the app isn't empty on first run:

```bash
npm run seed
```

**Demo credentials** (also available via the "Log in with a demo account" buttons on the login page):

| Role | Email | Password |
|---|---|---|
| Employer (can post/manage jobs) | `employer@hireforge.dev` | `demo1234` |
| Candidate (can browse/apply) | `candidate@hireforge.dev` | `demo1234` |

## 5. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 6. Build for production

```bash
npm run build
npm start
```

---

## Deploying

### Recommended: Vercel + MongoDB Atlas

1. Push this repository to GitHub.
2. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register), add a database user, and allow network access from anywhere (`0.0.0.0/0`) or Vercel's IP ranges.
3. Import the repo into [Vercel](https://vercel.com/new).
4. In the Vercel project's **Environment Variables**, add `MONGODB_URI`, `JWT_SECRET`, and `NEXT_PUBLIC_APP_URL` (set this to your final Vercel URL).
5. Deploy. After the first deploy, run `npm run seed` locally against the same `MONGODB_URI` to populate demo data in production.

---

## Project structure

```
src/
  app/                 # App Router pages & API routes
    api/auth/          # register, login, logout, me
    api/jobs/          # list+create, get+delete by id
    jobs/              # explore, [id] details, add, manage
    login/ register/
    about/ contact/ blog/ faq/ privacy/
  components/          # Navbar, Footer, JobCard, forms, etc.
    sections/          # Homepage sections (Hero, Categories, ...)
  lib/                 # db connection, auth/jwt helpers, models, static content
  types/                # shared TypeScript types
middleware.ts          # protects /jobs/add and /jobs/manage
scripts/seed.ts         # database seed script
```

## Features implemented

- **Home page** — sticky navbar (3 routes logged out / 5+ logged in), hero with an animated interactive element, 9+ content sections, fully functional footer
- **Explore Jobs** — search, 4 filter fields (category, work mode, job type, experience level), sorting, pagination, skeleton loaders, 4 cards per row on desktop
- **Job details** — public page with overview, responsibilities/requirements, related roles
- **Auth** — register/login with validation, demo login buttons, JWT in httpOnly cookies
- **Post a Job** (`/jobs/add`) — protected, employer-only, redirects to `/login` if logged out
- **Manage Jobs** (`/jobs/manage`) — protected, table view with View/Delete actions
- **Additional pages** — About, Contact (working form), Blog + individual posts, FAQ, Privacy & Terms
- No lorem ipsum anywhere — every listing, testimonial, and blog post is realistic, purpose-written content

## Notes

- `npm audit` will flag a few advisories inherited from Next.js 14.2.x server-side request handling; consider upgrading to the latest Next.js major version before a real production launch.
- The demo/seed accounts use a simple password (`demo1234`) for evaluation convenience — rotate or remove them before using this as a real production app.
