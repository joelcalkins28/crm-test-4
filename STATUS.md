# Project Status

## Overview

This document tracks the status, key decisions, and progress of the Job Search CRM project.

## Current Phase: Initial Setup

### Completed Steps (YYYY-MM-DD):

*   Initialized Next.js project (`create-next-app`):
    *   Framework: Next.js (App Router)
    *   Language: TypeScript
    *   Styling: Tailwind CSS
    *   Linting: ESLint
    *   Source Directory: `src/`
    *   Import Alias: `@/*`
*   Installed core dependencies:
    *   `next-auth`: For authentication.
    *   `@prisma/client`: Prisma ORM client.
    *   `prisma` (dev): Prisma CLI.
    *   Shadcn/UI dependencies (`class-variance-authority`, `clsx`, `lucide-react`, `tailwind-merge`, `tailwindcss-animate`).
*   Initialized Prisma:
    *   Provider: PostgreSQL
    *   Schema: `prisma/schema.prisma`
    *   Environment: `.env` created (requires configuration).
*   Initialized Shadcn/UI:
    *   Configured `components.json`.
    *   Setup `lib/utils.ts`.
    *   Updated `tailwind.config.ts` and `src/app/globals.css`.
*   Added `.env` and Prisma generated/migration files to `.gitignore`.
*   Defined initial Prisma schema (`User`, `Account`, `Session`, `VerificationToken`, `Contact`, `Application`).
    *   Modified `Contact.tags` from `String[]` to `String?` for SQLite compatibility.
*   Configured NextAuth.js API route (`src/app/api/auth/[...nextauth]/route.ts`) with Prisma adapter and Google provider.
*   Augmented NextAuth Session type (`src/types/next-auth.d.ts`) to include `user.id`.
*   Created `AuthProvider` client component (`src/components/providers/auth-provider.tsx`).
*   Wrapped root layout (`src/app/layout.tsx`) with `AuthProvider`.
*   **Switched to SQLite** (`dev.db`) for local development due to initial PostgreSQL connection issues.
    *   Updated `prisma.schema`, `.env`, and `.gitignore` accordingly.
*   Successfully ran initial database migration (`prisma migrate dev --name init`).
*   Generated Prisma Client.
*   Configured `package.json` to run `prisma migrate deploy` during Vercel build.
*   Removed initial local migration history (`prisma/migrations`) due to provider mismatch (P3019).
*   **Confirmed `prisma migrate deploy` runs successfully on Vercel**, connecting to the database but finding no migrations to apply (as expected for now).
*   Fixed Next.js build error by removing unnecessary `export` from `authOptions` in NextAuth route handler.

### Next Steps:

1.  **Run `prisma migrate dev` locally** to create the *actual* initial migration for PostgreSQL now that the deployment connection seems stable. This will create the tables in the Vercel DB.
2.  Update `ROADMAP.md` (Phase 1 progress).
3.  Implement basic UI layout (Navigation, Login/Logout button).
4.  Implement Contact Management (CRUD Pages/Components).
5.  Implement Application Tracking (CRUD Pages/Components).
6.  Add `.env` to `.gitignore`.
7.  Define initial Prisma schema (User, Account, Contact, Application).
8.  Configure NextAuth.js (Google Provider, Prisma Adapter).
9.  Set up basic UI layout.
10. Run initial database migration. 