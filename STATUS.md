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
*   Fixed Vercel build failure by adding generated Prisma Client (`src/generated/prisma/`) to ESLint ignores (`eslint.config.mjs`).
*   Fixed Vercel build failure by removing unused `NextAuth` import from `src/types/next-auth.d.ts`.
*   Fixed Vercel build failure by adding `prisma generate` to the build script in `package.json`.
*   Refactored Prisma Client instantiation to use a singleton pattern (`src/lib/prisma.ts`) to potentially resolve build-time initialization issues.
*   Explicitly set `engineType = "library"` in `prisma.schema` generator options as another attempt to fix build initialization.
*   Installed `@prisma/extension-accelerate` and applied it to the singleton Prisma Client instance to align with the Accelerate DATABASE_URL.
*   Added explicit `--schema` path to Prisma commands in `package.json` build script to potentially fix Vercel build path issues.
*   Modified explicit `--schema` path in build script (removed `./`) as another attempt to fix Vercel path issues.
*   Reverted `package.json` build script and removed Vercel build command override.
*   Specified Prisma schema location via `prisma.schema` key in `package.json`.
*   Reinstated `prisma migrate deploy && prisma generate` into `package.json` build script.
*   **Fixed Vercel build error "Could not load schema from `prisma/schema.prisma`"** by:
    *   Updating `.gitignore` to allow committing migration files to the repository
    *   Created initial migration with `prisma migrate dev --name init` 
    *   Committed migration files to Git to make them available during deployment

### Next Steps:

1.  Update `ROADMAP.md` (Phase 1 progress).
2.  Implement basic UI layout (Navigation, Login/Logout button).
3.  Implement Contact Management (CRUD Pages/Components).
4.  Implement Application Tracking (CRUD Pages/Components).
5.  Add `.env` to `.gitignore`.
6.  Define initial Prisma schema (User, Account, Contact, Application).
7.  Configure NextAuth.js (Google Provider, Prisma Adapter).
8.  Set up basic UI layout.
9.  Run initial database migration. 