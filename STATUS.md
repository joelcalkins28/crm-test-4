*   **Fixed Vercel build error "Couldn't find any `pages` or `app` directory"** by:
    *   Converting `next.config.ts` to `next.config.mjs` for better compatibility
    *   Configuring Next.js properly with explicit options in the config file
    *   Setting appropriate distDir and other configuration options
*   **Updated Vercel deployment fix** by:
    *   Committing the `src/app` directory to Git
    *   Fixing Next.js 15 configuration option warnings
    *   Updating from `experimental.serverComponentsExternalPackages` to `experimental.serverExternalPackages`
    *   Removing the deprecated `swcMinify` option
*   **Fixed module resolution errors** by:
    *   Simplifying Next.js configuration to remove all experimental options
    *   Adding jsconfig.json file to improve path alias resolution
    *   Ensuring all referenced files (@/lib/prisma, @/components/providers/auth-provider, etc.) are properly committed
*   **Attempted further fix for module resolution errors** by:
    *   Removing potentially conflicting `jsconfig.json` file, relying solely on `tsconfig.json`.
*   **Attempted final fix for module resolution errors** by:
    *   Explicitly setting `"baseUrl": "."` in `tsconfig.json` to ensure correct path resolution.
*   **Fixed `@prisma/client` initialization error during build** by:
    *   Refactoring `src/lib/prisma.ts` to use lazy initialization (getPrismaInstance function).
    *   Updating `src/app/api/auth/[...nextauth]/route.ts` to call the new function.
*   **Fixed 'Missing Google OAuth environment variables' build error** by:
    *   Temporarily commenting out the Google provider and related env var checks in NextAuth config (`src/app/api/auth/[...nextauth]/route.ts`).
*   **Identified 'Missing NEXTAUTH_SECRET environment variable' build error**:
    *   Cause: NextAuth requires this secret for signing tokens, even without active providers.
    *   Resolution: User must add `NEXTAUTH_SECRET` environment variable in Vercel project settings (generate with `openssl rand -base64 32`).
*   **Attempted fix for recurring `@prisma/client` initialization error** by:
    *   Simplifying `src/lib/prisma.ts` singleton logic further (removing NODE_ENV/global checks).
    *   Adding explicit `--schema` flag to `prisma generate` in `package.json` build script.
*   **Attempted further fix for `@prisma/client` initialization error** by:
    *   Instantiating PrismaClient *directly* within `src/app/api/auth/[...nextauth]/route.ts` for build-time analysis, bypassing the singleton for the adapter.
*   **Added extensive logging for `@prisma/client` initialization error**:
    *   Injected detailed `console.log` statements throughout `src/app/api/auth/[...nextauth]/route.ts`.
    *   Enabled Prisma Client's internal query/info/warn/error logging via instantiation options.
    *   Enabled Prisma's deeper debug logging by setting `DEBUG="prisma*"` environment variable in the `package.json` build script.
*   **Temporarily removed ALL Prisma interaction from NextAuth route (`route.ts`) for build isolation**:
    *   Commented out `PrismaAdapter` and all related imports/instantiation.
    *   Forced JWT session strategy (`session: { strategy: "jwt" }`).
    *   Goal: Verify if build passes without Prisma client interaction in this specific file during build analysis.
    *   Result: **Build succeeded**, confirming the issue is with Prisma Client instantiation within this route during build analysis.
*   **Re-instated Prisma Adapter using Singleton:**
    *   Restored `PrismaAdapter` configuration in `src/app/api/auth/[...nextauth]/route.ts`.
    *   Using the lazy-loaded singleton `getPrismaInstance` from `src/lib/prisma.ts`.
    *   Removed temporary JWT strategy.
    *   Hypothesis: The build analysis might tolerate the function call (`getPrismaInstance()`) even if it failed on direct instantiation (`new PrismaClient()`).
    *   Result: **Build FAILED**, still encountering `@prisma/client did not initialize yet` error.
*   **Implemented `postinstall` Prisma generation strategy**:
    *   Added `postinstall` script to `package.json` for `npx prisma generate --schema=./prisma/schema.prisma`.
    *   Removed `prisma generate` from the `build` script in `package.json`.
    *   Reverted `src/lib/prisma.ts` to the standard singleton pattern (with dev caching).
    *   Goal: Ensure client generation completes reliably after installation and *before* the `next build` process starts.
    *   Result: **Build FAILED**, still encountering `@prisma/client did not initialize yet` error.
*   **Implemented Truly Lazy Prisma Client Instantiation**:
    *   Modified `src/lib/prisma.ts` to ensure `new PrismaClient()` is *only* called within the `getPrismaInstance` function, not at the module's top level.
    *   Removed `DEBUG="prisma*"` build flag as generation timing is not the root cause.
    *   Goal: Prevent build-time analysis from triggering client instantiation.
    *   Result: **Build FAILED**, still encountering `@prisma/client did not initialize yet` error, even with lazy instantiation.
*   **Attempting fix by TEMPORARILY disabling Prisma Accelerate**:
    *   Commented out `.extends(withAccelerate())` in `src/lib/prisma.ts`.
    *   Verified `engineType = "library"` is set in `prisma/schema.prisma`.
    *   Goal: Isolate if Accelerate extension is causing the build-time init failure.
    *   Result: **Build FAILED**, still encountering `@prisma/client did not initialize yet` error. Accelerate is not the root cause.
*   **Restructured Prisma Client Generation for Build Reliability**:
    *   Changed `prisma/schema.prisma` generator to use default output path (`node_modules/.prisma/client`) instead of custom `src/generated/prisma`.
    *   Updated `.gitignore` to exclude `/node_modules` but include `!/node_modules/.prisma/client`.
    *   Removed old `src/generated` directory from Git.
    *   Kept `postinstall` script for `prisma generate`.
    *   Kept truly lazy singleton in `src/lib/prisma.ts` (re-enabled Accelerate).
    *   Goal: Use Prisma's default, potentially more robust, client location mechanism during build.

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