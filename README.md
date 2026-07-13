# HireForge

A full-stack developer job portal built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **MongoDB** and **JWT authentication**.

Real engineering roles with disclosed salary ranges, transparent tech stacks and a straight line from search to application — no recruiter noise.

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


## 4. Seed the database


**Demo credentials** (also available via the "Log in with a demo account" buttons on the login page):

| Role | Email | Password |
|---|---|---|
| Employer (can post/manage jobs) | `employer@hireforge.dev` | `demo1234` |
| Candidate (can browse/apply) | `candidate@hireforge.dev` | `demo1234` |


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
