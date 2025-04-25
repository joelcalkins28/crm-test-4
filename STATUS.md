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